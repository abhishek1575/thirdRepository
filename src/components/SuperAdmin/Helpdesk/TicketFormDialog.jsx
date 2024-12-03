import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Slide,
  CircularProgress,
  Grid,
  FormControl,
  TextField
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import TicketService from '../../../Services/TicketService'; 
import { toast, ToastContainer } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const TicketFormDialog = ({ open, onClose, setTickets }) => {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    file: null,
    priority: '',
    name: '', // Will be set from session storage
    email: '', // Will be set from session storage
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedName = sessionStorage.getItem('Name'); // Use your session storage key
    const storedEmail = sessionStorage.getItem('Email'); // Use your session storage key
    if (storedName) {
      setFormData((prev) => ({ ...prev, name: storedName }));
    }
    if (storedEmail) {
      setFormData((prev) => ({ ...prev, email: storedEmail }));
    }
  }, [open]); // Fetch name and email when the dialog opens

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
    }
  };

  const validateForm = () => {
    const wordCount = formData.description.trim().split(/\s+/).length;
    const charCount = formData.description.length;
    return (
      formData.category &&
      formData.name &&
      formData.email &&
      formData.priority &&
      formData.subject &&
      formData.description &&
      wordCount <= 255 &&
      charCount <= 255
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const wordCount = formData.description.trim().split(/\s+/).length;
    const charCount = formData.description.length;

    if (!validateForm()) {
      if (wordCount > 255) {
        toast.error("Description cannot exceed 255 words.");
      } else if (charCount > 255) {
        toast.error("Description cannot exceed 255 characters.");
      } else {
        toast.error("Please fill in all required fields.");
      }
      return;
    }

    try {
      setLoading(true);
      await handleCreateTicket(formData);
      toast.success("Ticket created successfully!");
      resetForm();
      onClose();
    } catch (error) {
      toast.error("Failed to Create Ticket!");
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
    handleClickNavigateSPage();
  };

  const navigates = useNavigate();
  const handleClickNavigateSPage = () => {
    setTimeout(() => {
      // navigates(0);
    }, 3000);
  };

  const handleCreateTicket = async (ticketData) => {
    const { category, priority, name, email, subject, description, file } = ticketData;
    await TicketService.createTicket(category, priority, name, email, subject, description, file);
  };

  const resetForm = () => {
    setFormData({
      category: '',
      subject: '',
      description: '',
      file: null,
      priority: '',
      name: '',
      email: '',
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Box>
      <Grid container>
        <Grid item xs={false} md={4} lg={4} xl={3}></Grid>
        <Grid item xs={12} md={5} lg={5} xl={6}>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" TransitionComponent={Transition} sx={{ zIndex: 999999, overflow: 'auto' }}>
            <Box sx={{ border: "4px solid #579aef" }}>
              <DialogTitle>
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>New Ticket</Typography>
                  <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close" sx={{ right: 8, top: 8 }}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </DialogTitle>
              <DialogContent>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Select 
                          name="category" 
                          value={formData.category} 
                          onChange={handleInputChange} 
                          displayEmpty 
                          variant="outlined" 
                          fullWidth 
                          required
                          MenuProps={{ style: { zIndex: 9999992 } }}
                        >
                          <MenuItem value="" disabled>Select Category</MenuItem>
                          <MenuItem value="technical">Technical Query</MenuItem>
                          <MenuItem value="template">Template Query</MenuItem>
                          <MenuItem value="general">General Query</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <Select 
                          name="priority" 
                          value={formData.priority} 
                          onChange={handleInputChange} 
                          displayEmpty 
                          variant="outlined" 
                          fullWidth 
                          required
                          MenuProps={{ style: { zIndex: 9999992 } }}
                        >
                          <MenuItem value="" disabled>Select Priority</MenuItem>
                          <MenuItem value="High">High</MenuItem>
                          <MenuItem value="Medium">Medium</MenuItem>
                          <MenuItem value="Low">Low</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        margin="dense" 
                        name="subject" 
                        label="Subject" 
                        type="text" 
                        fullWidth 
                        variant="outlined" 
                        value={formData.subject} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField 
                        margin="dense" 
                        name="description" 
                        label="Description" 
                        type="text" 
                        fullWidth 
                        variant="outlined" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        required 
                        multiline 
                        rows={4} 
                        inputProps={{ maxLength: 255 }} 
                      />
                      <Typography variant="caption" sx={{ color: '#888', marginTop: '8px' }}>
                        Limit: 255 characters. Current count: {formData.description.length}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '16px', padding: '4px', border: '1px dashed #ccc', borderRadius: '4px', backgroundColor: '#fafafa', cursor: 'pointer' }}>
                        <input 
                          type="file" 
                          onChange={handleFileChange} 
                          accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.jpeg,.png" 
                          style={{ display: 'none' }} 
                          id="file-upload" 
                        />
                        <label htmlFor="file-upload" style={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                            <IconButton component="span" sx={{ fontSize: '1.25rem', color: '#42a5f5' }}>
                              <AttachFileIcon />
                            </IconButton>
                            <Typography variant="body1" sx={{ marginLeft: '8px' }}>{formData.file ? formData.file.name : 'Attach File'}</Typography>
                          </Box>
                        </label>
                      </Box>
                      <Typography variant="caption" sx={{ color: '#888', marginTop: '8px' }}>
                        Allowed file types: .pdf, .xls, .xlsx, .doc, .docx, .txt, .ppt, .pptx, .gif, .jpg, .jpeg, .png
                      </Typography>
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleClose} variant="outlined" color="secondary">Cancel</Button>
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#8e93e4', color: '#fff' }} disabled={loading}>
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Box>
          </Dialog>
        </Grid>
        <Grid item xs={false} md={4} lg={4} xl={3}></Grid>
      </Grid>
      
      <ToastContainer style={{ zIndex: "1000000" }} />
    </Box>
  );
};

export default TicketFormDialog;
