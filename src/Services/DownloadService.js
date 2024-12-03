import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";

const API_URL = config.serverURL;

class DownloadService {
    getAllDownloadLogs=  () => {
       return axios.get(`${API_URL}api/downloadlogs`,
        {headers: authHeader()}); 
      }

      getDownloadLogsByUserId= (userid) => {
        return axios.get(`${API_URL}api/downloadlogsbyuserid`,{
          params: {
            userid: userid,
            // timestamp: Date.now(), // Append timestamp to bypass cache
          },
          headers: authHeader(),
        });
    }
    
}

export default new DownloadService();
