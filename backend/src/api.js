const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/status', (req,res) => {
  let ready = mongoose.connection._readyState;
  result = {ready};
  if(ready != 1){
    result.error = "Database not connected"
  }
  res.status(200).send(result);
});
module.exports = router;

