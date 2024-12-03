import axios from "axios";
import authHeader from "./authHeader";
import { Component } from "react";
import config from "./config";

const API_URL = config.serverURL; 


class NotificationService extends Component {

unReadCount=(userId)=>{
    return axios.get(API_URL + "notification/notificationCount", {
        params: {
            userId: userId // Use the passed dealer parameter here
        },
        headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
    });
  
  }

  unReadNotification=(userId)=>{
    return axios.get(API_URL + "notification/getnotification", {
        params: {
            userId: userId // Use the passed dealer parameter here
        },
        headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
    });
  
  }

  getHistory=(userId)=>{
    return axios.get(API_URL + "notification/gethistory", {
        params: {
            userId: userId // Use the passed dealer parameter here
        },
        headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
    });
  
  }


 




    
}

export default new NotificationService();