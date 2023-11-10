//import * as Cookies from "js-cookie";

import md5 from "md5";
import moment from "moment";
export default class Session {

  constructor() {
    // Unique prefix prevents stored hashes from matching
    // other websites
    this.prefix = 'TRIBUS';
    // Use of a timestamp salt transmitted with the result
    // means each authentication string is unique
    this.salt= moment().utc().format();
  }

  getBase64(file) {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result.split(',').pop());
     reader.onerror = error => reject(error);
    });
  }

  uploadFile(path, file) {
    const size = file.size;
    return this.getBase64(file)
    .then((base64) => {
      return this.callApi(path, {size, base64});
    });
  }


  beforeUploadXHR(request){
    const token = window.sessionStorage.getItem("arcis_token");
    request.setRequestHeader('X-Arcis-Token',token);
    return request;
  }

  getToken(){
    const token = window.sessionStorage.getItem("arcis_token");
    return token;
  }
  
  async callApi(path, postBody) {
    const token = window.sessionStorage.getItem("arcis_token");
    let method = 'get';
    if (postBody) {
      method = 'post';
    }

    const body = JSON.stringify(postBody);

    const res = await fetch('/api' + path, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Client-Version': '1',
        'X-Arcis-Token': token,
      },
      body,
    });

    let error;
    let json;
    if (res.status >= 400) {
      error = { path, postBody, status: res.status, response: res };
    }
    else {
      json = await res.json();
    }
    return { error, json };

  }

  getUser() {
    let user = window.sessionStorage.getItem("arcis_user");
    if(user === 'undefined'){
      user = undefined
    }
    return user;
  }

  async logout(){
    // The device id or email is unecessary here, the server can get that
    // from the token in the database if it needs it
    let token = window.sessionStorage.getItem("arcis_token");
    if(token === 'undefined'){
      token = undefined;
    }
    const res = await fetch('/auth/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token})
    });
    // Ensure e2e is completed
    await res.json();
 
    window.sessionStorage.setItem("tribus_token", undefined);
    // really rather always return true, even if there's a server disconnect
    return true;
  }

  async isLoggedIn(end2end){
    let token = window.sessionStorage.getItem("tribus_token");
    if(token === 'undefined'){
      token = undefined;
    }
    
    if(!token){
      return false;
    }
    if(!end2end){
      return true;
    }
    const result = await this.callApi('/status');
    
    if(result.error){
      window.sessionStorage.setItem("tribus_token", undefined);
      return false;
    }
    return true;
  }

  async login(email, pass) {
    let salt = this.salt;
    let plain = email + pass;
    let digest = md5(this.prefix + plain);
    // The server stores the digest and performs this same check
    let hash = md5(salt + digest);
    const post={timestamp: salt, email, hash};
    const res = await fetch('/auth/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const json = await res.json();
    console.log(post);
    console.log(json);
 
    if(json.token){
      window.sessionStorage.setItem("tribus_token", json.token);
      window.sessionStorage.setItem("tribus_user", email);
    }
    return json.authorized;
  }

  get(path) {
    return fetch(path,{
      method:'get',
      headers: {
        'Accept': 'application/json',
      }
    })
    .then(res => res.json());
  }
}

