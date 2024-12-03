import axios from "axios";
import authHeader from "./authHeader";
import config from "./config";

const API_URL = config.serverURL;

class TicketService {
    getAllTickets() {
    return axios.get(`${API_URL}tickets/getalltickets`, {
      headers: authHeader()
    });
  }

  getAllClosedTickets() {
    return axios.get(`${API_URL}tickets/closedtickets`, {
      headers: authHeader()
    });
  }

  // add remark parameter 
  
  resolveAndCloseTicket= (id, remark) => {  // ,adminName
   
    return axios.put(`${API_URL}tickets/resolveandclose`,{remark, resolved_by:sessionStorage.getItem("Name")}, {
        params: { id:id },// Pass Id as a query parameter
        headers: authHeader() 
    },  );
  }

  exportTickets= () => {
    return axios.get(`${API_URL}tickets/exports`, {
      responseType: 'blob',
        headers: authHeader() 
    });
  }
  getAllWithdrawnTickets() {
    return axios.get(`${API_URL}tickets/withdrawntickets`, {
      headers: authHeader()
    });
  }
}


export default new TicketService();