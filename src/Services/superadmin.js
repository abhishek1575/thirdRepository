import axios from "axios";
import authHeader from "./authHeader";
import { Component } from "react";
import config from "./config";

const API_URL = config.serverURL; 


class SuperAdminService extends Component {


addUser =(user)=>{
  return axios.post(API_URL + "api/addUser", user,{ headers: authHeader() });
}



  getAllUsers = () => {
    return axios.get(API_URL + "api/getAll", { headers: authHeader() });
  };


  modifyUser =(editUser)=>{
    return axios.put(API_URL + "api/modifyUser",editUser,{ headers: authHeader() });
  }

  deleteUser = (id) => {
    return axios.delete(API_URL + "api/deleteUser",{
        params: {
            id: id // Use the passed dealer parameter here
        },
        headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
    });


};

getUserById = (id) => {
  return axios.get(API_URL + "api/getUserById",{
      params: {
          Id: id // Use the passed dealer parameter here
      },
      headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
  });


};


changePassword =(id,oldPassword,newPassword)=>{
 
  return axios.post(API_URL + "api/changePassword ",{id,oldPassword,newPassword}, {
   
    headers: authHeader() });
  

    
}


addVersion =(addVersions)=>{
  return axios.post(API_URL + "api/addVersion",addVersions,{ headers: authHeader() });
}

getVesions = () => {
  return axios.get(API_URL + "api/getVesions", { headers: authHeader() });
};

getlaunchedVersions = () => {
  return axios.get(API_URL + "api/launched", { headers: authHeader() });
};


getDir = (versionId) => {
  return axios.get(API_URL + "api/getDir", {params: {
    VersionId: versionId // Use the passed dealer parameter here
}, headers: authHeader() });
};

getFilesByDirId = (dirId) => {
  return axios.get(API_URL + "api/getFilesByDirId",{params: {
    dirId:dirId // Use the passed dealer parameter here
}, headers: authHeader() });
};

uploadBulkFiles =(formData)=>{
  return axios.post(API_URL + "api/uploadBulkFiles",formData,{ headers: authHeader() });
}
downloadFile = (id,UserId) => {
  return axios.get(API_URL + "api/downloadFile", {
    params: {
      fileId: id,
      userId: UserId
    },
    responseType:'blob',
    headers: authHeader(),
    
  });
};


deleteFile = (id) => {
  return axios.delete(API_URL + "api/deleteFile",{
      params: {
        fileId:id // Use the passed dealer parameter here
      },
      headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
  });


};

deleteVersion = (vid) => {
  return axios.delete(API_URL + "api/deleteVersion",{
      params: {
        versionId:vid // Use the passed dealer parameter here
      },
      headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
  });


};


versionlaunch =(vid,userid)=>{
  return axios.put(API_URL + "api/launch",null,{
    params: {
      versionId:vid,
      userId:userid // Use the passed dealer parameter here
  }, 
  headers: authHeader() });
}
deleteDir = (dirId) => {
  return axios.delete(API_URL + "api/deleteDir",{
      params: {
        dirId:dirId // Use the passed dealer parameter here
      },
      headers: authHeader() // Assuming authHeader() returns the necessary authorization headers
  });


};
createDir =(addFolder)=>{
  return axios.post(API_URL + "api/createDir ",addFolder,{ headers: authHeader() });
}

createSubDir =(addSubFolder)=>{
  return axios.post(API_URL + "api/createSubDir ",addSubFolder,{ headers: authHeader() });
}


getSubDir = (dirId) => {
  return axios.get(API_URL + "api/getSubDir", { 
    params: {
    dirId:dirId // Use the passed dealer parameter here
  }, headers: authHeader() });
};
}


export default new SuperAdminService();