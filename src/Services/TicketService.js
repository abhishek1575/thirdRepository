import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";


const API_URL = config.serverURL;

class TicketService {

      createTicket = async (category,priority, name, email, subject, description, file) => {
        // Retrieve UserId from session storage
        const UserId = sessionStorage.getItem('UserId');
    
        // Create FormData object
        const formData = new FormData();
        formData.append('userid', UserId);
        formData.append('category', category);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('description', description);
        formData.append('priority',priority);
        // Append the file if it exists
        if (file) {
          formData.append('file', file);
        }
    
        // Make the POST request
        return axios.post(`${API_URL}tickets/createticket`, formData, {
          headers: authHeader(),
        });
      }
    
  
  
  getAllActiveTickets= (UserId) => {
    return axios.get(`${API_URL}tickets/gettickets`,{
      params:{
        userid:UserId
      },
      headers: authHeader() 
    });
  }
  getTicketHistory= (UserId) => {
    return axios.get(`${API_URL}tickets/history`, {
      params:{
        userid:UserId
      },
        headers: authHeader() // Send userId as a query parameter
    });
  }
  withdrawTicket= (id) => {
    return axios.put(`${API_URL}tickets/withdraw`, null, {
      params:{
        id:id
      },
        headers: authHeader() // Send userId as a query parameter
    });
  }
  downloadFile =  (id, UserId) => {
    return axios.get(`${API_URL}tickets/downloadFile`, {
        params: {  id:id, userid: UserId },
        responseType: 'blob', // Important for handling binary data
        headers: authHeader(),
    });
}

}
export default new TicketService();

  