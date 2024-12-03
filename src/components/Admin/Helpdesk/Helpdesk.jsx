import React, { useState, useEffect } from 'react';
import { Box, ButtonGroup, Grid, Typography, Button, Menu, MenuItem, Modal, TextField, IconButton } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Importing the icon
import Topbar from "../Topbar"; 
import TicketDetail from './TicketDetail'; 
import noTicketsImage from '../../../images/helpdesk.png'; 
import TicketService from '../../../Services/adminticketService'; 
import { toast, ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx'; // Importing XLSX for Excel export
import { saveAs } from 'file-saver'; // Importing file-saver for file download
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const Helpdesk = () => {
  // State to track the ticket status (active or closed)
  const [status, setStatus] = useState('active');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // State for dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, [status]);

  const fetchTickets = async () => {
    try {
      const response = status === 'active'
        ? await TicketService.getAllTickets()
        : await TicketService.getAllClosedTickets();
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleTicketDetailClose = () => {
    setSelectedTicket(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#4caf50';
      case 'WITHDRAWN': return '#000000';
      case 'CLOSED': return '#f44336';
      default: return '#000';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#f44336';
      case 'MEDIUM': return '#efb170';
      case 'LOW': return '#64c719';
      default: return '#000';
    }
  };


  //,adminName
  //, adminName
  const handleResolveAndClose = async (ticketId,remark) => {
    try {
      await TicketService.resolveAndCloseTicket(ticketId,remark);
      fetchTickets();
      toast.success('Ticket resolved and closed successfully.');
    } catch (error) {
      console.error('Error resolving and closing ticket:', error);
      toast.error(error.response?.data || 'Error closing ticket');
    }
  };

  const handleExportClick = (exportType) => {
    exportToExcels(exportType);
    setAnchorEl(null); // Close the dropdown after selection
  };
  const exportToExcels = async (exportType) => {
    try {
      let response;
  
      // Determine which tickets to fetch based on exportType
      if (exportType === 'active') {
        response = await TicketService.getAllTickets(); // Fetch active tickets
      } else if (exportType === 'closed') {
        response = await TicketService.getAllClosedTickets(); // Fetch closed tickets
      } else {
        // Fetch active, closed, and withdrawn tickets
        const activeTickets = await TicketService.getAllTickets();
        const closedTickets = await TicketService.getAllClosedTickets();
        const withdrawnTickets = await TicketService.getAllWithdrawnTickets(); // Fetch withdrawn tickets
        
        response = {
          data: [
            ...activeTickets.data, 
            ...closedTickets.data, 
            ...withdrawnTickets.data // Combine all three arrays
          ],
        };
      }
  
      // Prepare the data for Excel export
      const header = ["ID",  "Category","Subject","Priority", "Submitted By","Submitted_Date", "Status","Remark", "Closed_By","Closed_Date" ];
      const data = response.data.map(ticket => {
        // Parse the dates
        const createdAt = new Date(ticket.createdAt);
        const closedAt = ticket.closed_at ? new Date(ticket.closed_at) : null;
        const resolve_By = String (ticket.resolvedBy);
      
        return [
            ticket.id,
            ticket.category,
            ticket.subject,  //desc of tickets
            ticket.priority,
            ticket.name,   // Name of the user who raise the ticket
            createdAt,     // Date when ticket raised
            ticket.status, // status
            ticket.remark, 
            ticket.resolvedBy,       // Name who resolved the ticket
            closedAt,       // Date when ticket resolved and closed
                      

        ];
    });
      
      const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(excelData, 'tickets.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      toast.error('Failed to export tickets.');
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openRemarkModal, setOpenRemarkModal] = useState(false);  // Modal state
  const [remark, setRemark] = useState('');
  const [remarkError, setRemarkError] = useState('');  // Error state for remark
  const [remarkTicket, setRemarkTicket] = useState(null);  // New state for remark modal ticket
  


  // Handle opening the modal
  const handleOpenRemarkModal = (ticket) => {
    setRemarkTicket(ticket);   
    setOpenRemarkModal(true);
  };  

  const handleCloseRemarkModal = () => {
    setOpenRemarkModal(false);
    setRemark('');
    setRemarkError('');
  };

  // Handle submitting the remark and closing the ticket
  const handleSubmitRemark = (ticket) => {
    if (!remark.trim()) {
      setRemarkError('Remark is required');
      return;
    }
    setRemarkError('');
    console.log('ticket is ',ticket);
    // const adminName = sessionStorage.getItem("Name");
    //, adminName
    // Assuming 'Name' is stored here
    handleResolveAndClose(ticket.id, remark); 
    // handleResolveAndClose(ticket.id, remark);  // Pass remark to your handler function
    handleCloseRemarkModal();
  };

  return (
    <Box sx={{ minHeight: '100vh', boxShadow: 1 }} backgroundColor="#EEF0F6">
      <Topbar />
      <Box sx={{ mt: '75px', mb: 5, p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
          {/* Button to export tickets to Excel with dropdown */}
          <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
    <Button
      variant="contained"
      onClick={handleClick}
      sx={{ backgroundColor: '#d9d9f5', color: '#000', '&:hover': { backgroundColor: '#8e93e4' }, display: 'flex', alignItems: 'center' }} // Added display: 'flex' and alignItems for alignment
    >
      <InsertDriveFileIcon sx={{ mr: "10px" }} />
      Export
      <ExpandMoreIcon sx={{ ml: 1 }} /> {/* Added dropdown arrow icon */}
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      sx={{ marginTop: '10px', zIndex: 100000 }}
    >
      <MenuItem onClick={() => handleExportClick('active')}>Export Active Tickets</MenuItem>
      <MenuItem onClick={() => handleExportClick('closed')}>Export Closed Tickets</MenuItem>
      <MenuItem onClick={() => handleExportClick('all')}>Export All Tickets</MenuItem>
    </Menu>
  </Grid>

          {/* Button group to filter tickets by status */}
          <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
            <Grid item display="flex" justifyContent='center' sx={{ mb: 1, marginLeft: "290px" }}>
              <ButtonGroup>
                <Button
                  onClick={() => handleStatusChange('active')}
                  variant={status === 'active' ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: status === 'active' ? '#babded' : 'transparent',
                    color: status === 'active' ? '#fff' : '#91b3ec',
                    '&:hover': {
                      backgroundColor: status === 'active' ? '#babded' : '#e3f2fd',
                    },
                    px: 4
                  }}
                >
                  Active
                </Button>
                <Button
                  onClick={() => handleStatusChange('closed')}
                  variant={status === 'closed' ? 'contained' : 'outlined'}
                  sx={{
                    backgroundColor: status === 'closed' ? '#babded' : 'transparent',
                    color: status === 'closed' ? '#fff' : '#babded',
                    '&:hover': {
                      backgroundColor: status === 'closed' ? '#babded' : '#e3f2fd',
                    },
                    px: 4
                  }}
                >
                  Closed
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        {/* Display for tickets */}
        <Box display={"flex"} flexDirection={"column"} alignItems="center" sx={{ mt: 3 }}>
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
              <Typography variant="h6" color="#888" sx={{ textAlign: 'center', mt: 50, position: 'fixed' }}>
                {status === 'active'
                  ? "Looks like you're all caught up! No active tickets to display."
                  : 'Uh-oh! Looks like you’ve got a clean slate. No closed tickets here!'}
              </Typography>
            </Box>
          )}

          <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ px: 2, marginLeft: '290px' }}>
              <Box>
                {tickets.length > 0 ? (
                  <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {tickets.map(ticket => (
                      <Grid item key={ticket.id} xs={12} sm={6} md={4} lg={3}>
                        <Box
                          sx={{
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            p: 2,
                            mb: 1,
                            cursor: 'pointer',
                            boxShadow: 2,
                            width: '90%',
                            maxWidth: '350px',
                            mx: 'auto',
                            backgroundColor: 'whitesmoke',
                            height: '180px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            overflow: 'hidden',
                          }}
                          onClick={() => handleTicketClick(ticket)}
                        >
                          <Typography variant="h6" noWrap>{ticket.subject}</Typography>
                          <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
                          <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem', color: getPriorityColor(ticket.priority) }}><strong>{ticket.priority}</strong></Typography>
                          <Typography variant="body2">Submitted By: {ticket?.name}</Typography>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                            <Typography variant='body2' color="textSecondary" sx={{ mb: '3', textAlign: 'right', fontSize: '0.875rem', color: getStatusColor(ticket.status) }}>
                              {ticket.status}
                            </Typography>
                            {status === 'active' && (
                               <Button
                               onClick={(e) => {
                                e.stopPropagation(); // Stop the event from propagating to the outer Box
                                handleOpenRemarkModal(ticket); // Open the modal
                              }}  // Open the modal
                               variant="contained"
                               sx={{
                                 padding: 0.5,
                                 fontSize: { xl: "0.9rem", lg: '0.8rem', md: '0.6rem' },
                                 mt: 1,
                                 backgroundColor: '#d9d9f5',
                                 color: '#000',
                                 '&:hover': { backgroundColor: '#8e93e4' },
                                 visibility: 'visible',  // Ensure visibility is set to 'visible'
                                 display: 'inline-block',  // Make sure the button is not accidentally hidden
                               }}
                             >
                               Resolve & Close
                             </Button>
                            )}
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

        {selectedTicket && !openRemarkModal && (
          <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} />
        )}
      </Box>
      <ToastContainer style={{ zIndex: "1000000" }} />
      <Modal open={openRemarkModal} onClose={handleCloseRemarkModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            padding: 3,
            boxShadow: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <IconButton
            onClick={handleCloseRemarkModal}  // Close the modal
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              color: '#aaa',
              '&:hover': { backgroundColor: 'transparent' },
            }}
          >
            <CloseIcon />
          </IconButton>

          <h2>Resolve & Close Ticket</h2>
          
          <TextField
            label="Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            error={!!remarkError}  // Show error if there's a validation issue
            helperText={remarkError}
            sx={{ mb: 2 }}
          />

          <Button
            onClick={() => handleSubmitRemark(remarkTicket)}
            variant="contained"
            color="primary"
            sx={{
              padding: 1.5,
              fontSize: { xl: "1rem", lg: '0.9rem', md: '0.8rem' },
            }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Helpdesk;






// import React, { useState, useEffect } from 'react';
// import { Box, ButtonGroup, Grid, Typography, Button, Menu, MenuItem } from '@mui/material';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Importing the icon
// import Topbar from "../Topbar"; 
// import TicketDetail from './TicketDetail'; 
// import noTicketsImage from '../../../images/helpdesk.png'; 
// import TicketService from '../../../Services/adminticketService'; 
// import { toast, ToastContainer } from 'react-toastify';
// import * as XLSX from 'xlsx'; // Importing XLSX for Excel export
// import { saveAs } from 'file-saver'; // Importing file-saver for file download
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// const Helpdesk = () => {
//   // State to track the ticket status (active or closed)
//   const [status, setStatus] = useState('active');
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
  
//   // State for dropdown menu
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     fetchTickets();
//   }, [status]);

//   const fetchTickets = async () => {
//     try {
//       const response = status === 'active'
//         ? await TicketService.getAllTickets()
//         : await TicketService.getAllClosedTickets();
//       setTickets(response.data);
//     } catch (error) {
//       console.error('Error fetching tickets:', error);
//     }
//   };

//   const handleStatusChange = (newStatus) => {
//     setStatus(newStatus);
//   };

//   const handleTicketClick = (ticket) => {
//     setSelectedTicket(ticket);
//   };

//   const handleTicketDetailClose = () => {
//     setSelectedTicket(null);
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'ACTIVE': return '#4caf50';
//       case 'WITHDRAWN': return '#000000';
//       case 'CLOSED': return '#f44336';
//       default: return '#000';
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'HIGH': return '#f44336';
//       case 'MEDIUM': return '#efb170';
//       case 'LOW': return '#64c719';
//       default: return '#000';
//     }
//   };

//   const handleResolveAndClose = async (ticketId) => {
//     try {
//       await TicketService.resolveAndCloseTicket(ticketId);
//       fetchTickets();
//       toast.success('Ticket resolved and closed successfully.');
//     } catch (error) {
//       console.error('Error resolving and closing ticket:', error);
//       toast.error(error.response?.data || 'Error closing ticket');
//     }
//   };

//   const handleExportClick = (exportType) => {
//     exportToExcels(exportType);
//     setAnchorEl(null); // Close the dropdown after selection
//   };
//   const exportToExcels = async (exportType) => {
//     try {
//       let response;
  
//       // Determine which tickets to fetch based on exportType
//       if (exportType === 'active') {
//         response = await TicketService.getAllTickets(); // Fetch active tickets
//       } else if (exportType === 'closed') {
//         response = await TicketService.getAllClosedTickets(); // Fetch closed tickets
//       } else {
//         // Fetch active, closed, and withdrawn tickets
//         const activeTickets = await TicketService.getAllTickets();
//         const closedTickets = await TicketService.getAllClosedTickets();
//         const withdrawnTickets = await TicketService.getAllWithdrawnTickets(); // Fetch withdrawn tickets
        
//         response = {
//           data: [
//             ...activeTickets.data, 
//             ...closedTickets.data, 
//             ...withdrawnTickets.data // Combine all three arrays
//           ],
//         };
//       }
  
//      // Prepare the data for Excel export
// const header = [
//   "ID",
//   "Issue_Description",
//   "Category",
//   "Submitted By",
//   "Status",
//   "Priority",
//   "Created At", // New column
//   "Closed At",  // New column
//   "Duration (days)" // new column add for duration
// ];

// const data = response.data.map(ticket => {
//   // Parse the date
//   const createdAt = new Date(ticket.createdAt);
//   const closedAt = ticket.closed_at ? new Date(ticket.closed_at) : null;

//   // Calculate the duration in hours if closed_at is not null
//   const durationInHours = closedAt ? (closedAt - createdAt) / 86400000 : null;

//   return [
//     ticket.id,
//     ticket.subject,
//     ticket.category,
//     ticket.name,
//     ticket.status,
//     ticket.priority,
//     createdAt.toLocaleString(),      // Add createdAt with formatted date and time
//     closedAt ? closedAt.toLocaleString() : "N/A", // Add closedAt with formatted date and time or "N/A"
//     durationInHours // Include the duration in hours
//   ];
// });

  
//       const worksheet = XLSX.utils.aoa_to_sheet([header, ...data]);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'Tickets');
//       const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
//       const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//       saveAs(excelData, 'tickets.xlsx');
//     } catch (error) {
//       console.error('Error exporting to Excel:', error);
//       toast.error('Failed to export tickets.');
//     }
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ minHeight: '100vh', boxShadow: 1 }} backgroundColor="#EEF0F6">
//       <Topbar />
//       <Box sx={{ mt: '75px', mb: 5, p: 2 }}>
//         <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
//           {/* Button to export tickets to Excel with dropdown */}
//           <Grid item xs={12} display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
//     <Button
//       variant="contained"
//       onClick={handleClick}
//       sx={{ backgroundColor: '#d9d9f5', color: '#000', '&:hover': { backgroundColor: '#8e93e4' }, display: 'flex', alignItems: 'center' }} // Added display: 'flex' and alignItems for alignment
//     >
//       <InsertDriveFileIcon sx={{ mr: "10px" }} />
//       Export
//       <ExpandMoreIcon sx={{ ml: 1 }} /> {/* Added dropdown arrow icon */}
//     </Button>
//     <Menu
//       anchorEl={anchorEl}
//       open={Boolean(anchorEl)}
//       onClose={handleClose}
//       sx={{ marginTop: '10px', zIndex: 100000 }}
//     >
//       <MenuItem onClick={() => handleExportClick('active')}>Export Active Tickets</MenuItem>
//       <MenuItem onClick={() => handleExportClick('closed')}>Export Closed Tickets</MenuItem>
//       <MenuItem onClick={() => handleExportClick('all')}>Export All Tickets</MenuItem>
//     </Menu>
//   </Grid>

//           {/* Button group to filter tickets by status */}
//           <Grid item xs={12} container justifyContent="center" alignItems="center" sx={{ flexDirection: 'column' }}>
//             <Grid item display="flex" justifyContent='center' sx={{ mb: 1, marginLeft: "290px" }}>
//               <ButtonGroup>
//                 <Button
//                   onClick={() => handleStatusChange('active')}
//                   variant={status === 'active' ? 'contained' : 'outlined'}
//                   sx={{
//                     backgroundColor: status === 'active' ? '#babded' : 'transparent',
//                     color: status === 'active' ? '#fff' : '#91b3ec',
//                     '&:hover': {
//                       backgroundColor: status === 'active' ? '#babded' : '#e3f2fd',
//                     },
//                     px: 4
//                   }}
//                 >
//                   Active
//                 </Button>
//                 <Button
//                   onClick={() => handleStatusChange('closed')}
//                   variant={status === 'closed' ? 'contained' : 'outlined'}
//                   sx={{
//                     backgroundColor: status === 'closed' ? '#babded' : 'transparent',
//                     color: status === 'closed' ? '#fff' : '#babded',
//                     '&:hover': {
//                       backgroundColor: status === 'closed' ? '#babded' : '#e3f2fd',
//                     },
//                     px: 4
//                   }}
//                 >
//                   Closed
//                 </Button>
//               </ButtonGroup>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Display for tickets */}
//         <Box display={"flex"} flexDirection={"column"} alignItems="center" sx={{ mt: 3 }}>
//           {tickets.length === 0 && (
//             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '290px' }}>
//               <img
//                 src={noTicketsImage}
//                 alt="No tickets"
//                 style={{
//                   position: 'fixed',
//                   maxWidth: '150%',
//                   maxHeight: '400px',
//                   opacity: 0.3,
//                   display: 'block',
//                 }}
//               />
//               <Typography variant="h6" color="#888" sx={{ textAlign: 'center', mt: 50, position: 'fixed' }}>
//                 {status === 'active'
//                   ? "Looks like you're all caught up! No active tickets to display."
//                   : 'Uh-oh! Looks like you’ve got a clean slate. No closed tickets here!'}
//               </Typography>
//             </Box>
//           )}

//           <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
//             <Grid item xs={12} sx={{ px: 2, marginLeft: '290px' }}>
//               <Box>
//                 {tickets.length > 0 ? (
//                   <Grid container spacing={2} sx={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
//                     {tickets.map(ticket => (
//                       <Grid item key={ticket.id} xs={12} sm={6} md={4} lg={3}>
//                         <Box
//                           sx={{
//                             border: '1px solid #ccc',
//                             borderRadius: '4px',
//                             p: 2,
//                             mb: 1,
//                             cursor: 'pointer',
//                             boxShadow: 2,
//                             width: '90%',
//                             maxWidth: '350px',
//                             mx: 'auto',
//                             backgroundColor: 'whitesmoke',
//                             height: '180px',
//                             display: 'flex',
//                             flexDirection: 'column',
//                             justifyContent: 'space-between',
//                             overflow: 'hidden',
//                           }}
//                           onClick={() => handleTicketClick(ticket)}
//                         >
//                           <Typography variant="h6" noWrap>{ticket.subject}</Typography>
//                           <Typography variant="body2" color="textSecondary">{ticket.category}</Typography>
//                           <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.875rem', color: getPriorityColor(ticket.priority) }}><strong>{ticket.priority}</strong></Typography>
//                           <Typography variant="body2">Submitted By: {ticket?.name}</Typography>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
//                             <Typography variant='body2' color="textSecondary" sx={{ mb: '3', textAlign: 'right', fontSize: '0.875rem', color: getStatusColor(ticket.status) }}>
//                               {ticket.status}
//                             </Typography>
//                             {status === 'active' && ( 
//                               <Button onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleResolveAndClose(ticket.id);
//                               }} variant="contained" sx={{ padding: 0.5, fontSize: { xl: "0.9rem", lg: '0.8rem', md: '0.6rem' }, mt: 1, backgroundColor: '#d9d9f5', color: '#000', '&:hover': { backgroundColor: '#8e93e4' } }}>
//                                 Resolve & Close
//                               </Button>
//                             )}
//                           </Box>
//                         </Box>
                        
//                       </Grid>
//                     ))}
//                   </Grid>
//                 ) : null}
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>

//         {selectedTicket && (
//           <TicketDetail ticket={selectedTicket} onClose={handleTicketDetailClose} />
//         )}
//       </Box>
//       <ToastContainer style={{ zIndex: "1000000" }} />
//     </Box>
//   );
// };

// export default Helpdesk;
