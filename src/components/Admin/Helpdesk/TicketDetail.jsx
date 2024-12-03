import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import TicketService from '../../../Services/TicketService';
import { toast, ToastContainer } from 'react-toastify';

const TicketDetail = ({ ticket, onClose, onWithdraw }) => {
  const [loading, setLoading] = useState(false);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#f44336';
      case 'MEDIUM': return '#efb170';
      case 'LOW': return '#64c719';
      default: return '#000';
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE': return '#4caf50';
      case 'WITHDRAWN': return '#000000';
      case 'CLOSED': return '#f44336';
      default: return '#000';
    }
  };
  // Function to handle file download
  const handleDownload = async () => {
    const UserId = sessionStorage.getItem('UserId'); // Get the user ID from session storage
    setLoading(true); // Set loading state to true
    try {
      // Call the service to download the file
      const response = await TicketService.downloadFile(ticket.id, UserId);
      if (response.status === 200) {
        // Get the content-disposition header to extract the filename
        const contentDisposition = response.headers['content-disposition'];
        let filename = 'downloaded-file'; // Default filename

        // If content-disposition is present, extract the filename
        if (contentDisposition) {
          const filenameRegex = /filename[^;=\n]*=[\'"]?([^\'";\n]*)[\'"]?/;
          const matches = filenameRegex.exec(contentDisposition);
          if (matches != null && matches[1]) {
            filename = decodeURIComponent(matches[1]); // Decode filename
          }
        }

        // Create a Blob from the response data and prepare it for download
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
        const link = document.createElement('a'); // Create a temporary link element
        link.href = url; // Set the link's href to the Blob URL
        link.setAttribute('download', filename); // Set the download attribute to the filename
        document.body.appendChild(link); // Append the link to the document
        link.click(); // Programmatically click the link to trigger the download
        document.body.removeChild(link); // Remove the link from the document
        window.URL.revokeObjectURL(url); // Clean up the Blob URL

        toast.success("File downloaded successfully"); // Show success message
      } else {
        throw new Error("File download failed: " + response.statusText);
      }
    } catch (error) {
      // Show error message if download fails
      toast.error("File download failed: " + error.message);
      console.error('Error downloading file:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box>
      <Grid container>
        {/* Left spacer for layout */}
        <Grid item xs={false} md={4} lg={4} xl={3}></Grid>
        {/* Main content area */}
        <Grid item xs={12} md={5} lg={5} xl={6}>
          <Dialog open={Boolean(ticket)} onClose={onClose} fullWidth maxWidth="md" sx={{ zIndex: 9999991 , border: "4px solid #579aef", '& .MuiDialog-paper': {
      border: "4px solid #579aef", // Ensures border applies to the dialog paper
    }}}>
            <DialogTitle>
              <Box>
                <Typography variant="h5"><strong>{ticket?.subject}</strong></Typography>
                <Typography variant="body2"><strong>Submitted By:</strong> {ticket?.name}</Typography>
                <Typography variant="body2"><strong>Email:</strong> {ticket?.email}</Typography>
                <Typography variant="body2">Priority: <strong  style={{ color: getPriorityColor(ticket?.priority) }}>{ticket?.priority}</strong> </Typography>    
                <IconButton onClick={onClose} color="inherit" aria-label="close" sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>

            <DialogContent sx={{ padding: '16px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Details:</Typography>
                  <Typography variant="body2">Category: {ticket?.category}</Typography>
                  <Typography
                    variant="body1"
                    style={{
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      maxWidth: '500px',
                    }}
                  >
                    Description: {ticket?.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Status: <strong style={{ color: getStatusColor(ticket?.status) }} >{ticket?.status || 'N/A'}</strong>
                  </Typography>
                  {/* Show download button if a file is attached */}
                  {ticket?.filename && (
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                      <Typography variant="body1" sx={{ marginRight: 1 }}>
                        Attached File: 
                        <Button onClick={handleDownload} startIcon={loading ? <CircularProgress size={20} /> : <DownloadIcon />} disabled={loading}>
                          {ticket.filename}
                        </Button>
                      </Typography>
                    </Box>
                  )}
                  <Typography variant="body2" sx={{ mt: 2, textAlign: 'right' }}>
                    Created At: {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleString() : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>

           
          </Dialog>
        </Grid>
        {/* Right spacer for layout */}
        <Grid item xs={false} md={4} lg={4} xl={3}></Grid>
      </Grid>
      <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};

export default TicketDetail;
