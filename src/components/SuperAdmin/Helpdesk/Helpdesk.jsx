import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { toast,ToastContainer } from 'react-toastify';
import Topbar from "../Topbar"; // Importing the Topbar component
import TicketDetail from './TicketDetail'; // Component to display ticket details
import TicketFormDialog from './TicketFormDialog'; // Component for ticket creation form
import noTicketsImage from '../../../images/helpdesk.png'; // Image for no tickets available
import TicketService from '../../../Services/TicketService'; 
const Helpdesk = () => {
  const [status, setStatus] = useState('active');
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const fetchActiveTickets = async () => {
    const UserId = sessionStorage.getItem('UserId');
    try {
      const response = await TicketService.getAllActiveTickets(UserId);
      setTickets(response.data || []);
    } catch (error) {
      console.error('Error fetching active tickets:', error);
      toast.error("Error fetching active tickets.");
      setTickets([]);
    }
  };

  const fetchTicketHistory = async () => {
    const UserId = sessionStorage.getItem('UserId');
    try {
      const response = await TicketService.getTicketHistory(UserId);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching ticket history:', error);
      toast.error("Error fetching ticket history.");
      setTickets([]);
    }
  };
  useEffect(() => {
    if (status === 'active') {
      fetchActiveTickets();
    } else {
      fetchTicketHistory();
    }
  }, [status]);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return '#4caf50'; // Green for open tickets
      case 'WITHDRAWN':
        return '#000000'; // Orange for in-progress tickets
      case 'CLOSED':
        return '#f44336'; // Red for closed tickets
      default:
        return '#000'; // Default color
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return '#f44336'; // Red for high priority
      case 'MEDIUM':
        return '#efb170'; // Orange for medium priority
      case 'LOW':
        return '#64c719'; // Green for low priority
      default:
        return '#000'; // Default color
    }
  };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailClose = () => {
    setSelectedTicket(null);
  };

  const handleWithdrawTicket = async () => {
    try {
      await TicketService.withdrawTicket(selectedTicket.id);
      setHistory([...history, selectedTicket]);
      setTickets(tickets.filter(ticket => ticket.id !== selectedTicket.id));
      setSelectedTicket(null);
      toast.success("Ticket withdrawn successfully.");
    } catch (error) {
      console.error('Error withdrawing ticket:', error);
      toast.error("Failed to withdraw ticket.");
    }
  };

  return (
    <Box sx={{minHeight: '100vh', boxShadow: 1 }}backgroundColor= "#EEF0F6">
      <Topbar />
      <Box sx={{ marginTop:"75px" ,mb: 5, p: 2 }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
            <Button 
              variant="contained" 
              sx={{ backgroundColor: '#d9d9f5', color: '#000', '&:hover': { backgroundColor: '#8e93e4' } }} 
              onClick={handleClickOpen}
            >
              + New Request
            </Button>
          </Grid>
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 2, marginLeft: "290px" }}>
              <ButtonGroup>
                <Button
                  onClick={() => handleStatusChange('active')}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  sx={{ minWidth: '150px', backgroundColor: status === 'active' ? '#babded' : 'transparent', color: status === 'active' ? '#fff' : '#babded', '&:hover': { backgroundColor: status === 'active' ? '#babded' : '#e3f2fd', }, px: 4 }}
                >
                  Active
                </Button>
                <Button
                  onClick={() => handleStatusChange('closed')}
                  variant={status === 'closed' ? 'contained' : 'outlined'}
                  sx={{ minWidth: '150px', backgroundColor: status === 'closed' ? '#babded' : 'transparent', color: status === 'closed' ? '#fff' : '#babded', '&:hover': { backgroundColor: status === 'closed' ? '#babded' : '#e3f2fd', }, px: 4 }}
                >
                  History
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} justifyContent="center" sx={{ mt: 3 }}>
          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            {/* Grid for no tickets image */}
            {tickets.length === 0 && (
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '290px' }}>
               <img
                 src={noTicketsImage}
                 alt="No tickets"
                 style={{
                   position: 'fixed',
                   maxWidth: '150%',
                   maxHeight: '400px',
                   opacity: 0.3,
                   display: 'block',
                 }}
               />
               <Typography variant="h6" color="#888" sx={{ textAlign: 'center', mt: 50 , position: 'fixed' }}>
                 {status === 'active' 
                   ? "Looks like you're all caught up! No active tickets to display." 
                   : 'Uh-oh! Looks like you’ve got a clean slate. No closed tickets here!'}
               </Typography>
             </Box>
            )}

            {/* Grid for displaying tickets */}
            <Grid item xs={12} sx={{ px: 2, marginLeft: '290px'}}>
  <Box>
    {tickets.length > 0 ? (
      <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {tickets.map(ticket => (
          <Grid item key={ticket.id} xs={12} sm={6} md={4} lg={3}>
    <Box
  sx={{
    border: '1px solid #ccc',
    borderRadius: '4px',
    p: 2, // Padding for better spacing
    mb: 1, // Bottom margin
    cursor: 'pointer',
    boxShadow: 2, // Light shadow
    width: '90%', // Maintain width
    maxWidth: '350px', // Maintain maximum width
    mx: 'auto', // Center the box horizontally
    backgroundColor: 'whitesmoke',
    height: '120px', // Fixed height (adjust as needed)
    display: 'flex', // Use flexbox for layout
    flexDirection: 'column', // Align items vertically
    justifyContent: 'space-between', // Space out content
    overflow: 'hidden', // Prevent overflow
  }}
  onClick={() => handleTicketClick(ticket)} // Show ticket details on click
>
  <Typography variant="h6" noWrap>{ticket.subject}</Typography>
  <Typography variant="body2" color="textSecondary" noWrap>{ticket.category}</Typography>
  <Typography variant="body1" color="textSecondary" sx={{ fontSize: '0.875rem', color: getPriorityColor(ticket.priority) }} ><strong>{ticket.priority}</strong></Typography>
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
    <Typography variant='body2' color="textSecondary" sx={{ fontSize: '0.875rem', color: getStatusColor(ticket.status) }}>
      {ticket.status}
    </Typography>
  </Box>
</Box>

                      </Grid>
                    ))}
                  </Grid>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>

        {selectedTicket && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} onWithdraw={handleWithdrawTicket} />
        )}

        <TicketFormDialog open={open} onClose={handleClose} setTickets={setTickets} />
      </Box>
      <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};

export default Helpdesk;
