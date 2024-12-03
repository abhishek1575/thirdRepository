import axios from "axios";
import config from "./config";

import { Component } from "react"; 
 
const URL = config.serverURL + "auth/"; 
 
 
class AuthService extends Component {
 
 login(email, password){
   return axios
     .post(URL + "login", {
       email,
       password,
     })
     .then((response) => {
       if (response.data.jwt) {
        // console.log("We are Logged in");
         
         sessionStorage.setItem("UserId", response.data.id);
         sessionStorage.setItem("Email", response.data.email);
         sessionStorage.setItem("Name", response.data.name);
         
         sessionStorage.setItem("Role", response.data.role);
         sessionStorage.setItem("type", response.data.type);
         sessionStorage.setItem("token", response.data.jwt);
         sessionStorage.setItem("isLoggedIn", true);
         console.log( sessionStorage.getItem("UserId"));
         console.log( sessionStorage.getItem("Email"));
         console.log( sessionStorage.getItem("Name"));
         console.log( sessionStorage.getItem("Email"));
         console.log( sessionStorage.getItem("Role"));
         

       }
 
       return response;
     });
 };
 
  logout(){
    sessionStorage.removeItem("UserId");
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Name");
    // sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Role");
    sessionStorage.removeItem("type");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("isLoggedIn");
   return Promise.resolve(); // Return a resolved Promise
   
 };


 
 uploadFirmware =(formDataToSend)=>{

  return axios.post(URL + "upload", formDataToSend, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure proper content type for file upload
      "Accept":"*/*"
    }
  });
}


forgetPassword = (email,password) => {
  return axios.post(URL + "forgetPassword",null,{
      params: {
          email:email ,
          password:password
      },
      
  });


};

 }
 
 
 
 export default new AuthService();