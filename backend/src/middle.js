const moment = require('moment');
const hostname = require('os').hostname();

const checkAuth = (req, res, next) => {
  let token = req.get('X-Arcis-Token');
  if(!token){
    token = req.query.token.toString();
  }
  if(!token){
    return res.status(403).send();
  }
  sql.Login.findOne({
     where: { token }
  })
  .then((login) => {
    if(login){
      // Setting this for downstream use prevents spoofing
      // The req object doesn't have a setter, but this works fine too
      res.set('X-Arcis-Username', login.email);
      next();
    }
    else{
      res.status(401).send();
    }
  });
};

const logOnly = (req, res, next) => {
 let method = req.method.toUpperCase();
 let path = req.path;
 let code = res.statusCode;
 if(method === 'GET' && path.indexOf('image') === 1){
   // no need to log these
   return next();
 }
 const start = Date.now();
 res.on('finish', function(){
  const timing = Date.now() - start;
  let username = res.get('X-Arcis-Username');
  if(!username){
    username = "UNK";
  }
  const date = moment().toISOString();
  console.log(`${date} ${hostname} "${username}" ${method} ${path} ${code} - ${timing}ms`);
 });
 next();
};


module.exports = {
  logOnly,
  checkAuth,
};

