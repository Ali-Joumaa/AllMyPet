import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import './UnifiedEditModal.css';

export default function UnifiedEditModal({ open, onClose, type, fields, initialData, onSubmit }) {
  const [formData, setFormData] = useState({});
  console.log("🧠 Initial Data:", initialData);

  useEffect(() => {
    if (open && Object.keys(formData).length === 0 && initialData) {
      setFormData({ ...initialData });
    }
  }, [open, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("🚀 Submitting updated data for:", type);
    console.table(formData);

    if (type === 'Pet' && !formData.petId) {
      console.warn("⚠️ Missing petId in payload!");
    }
    if (type === 'Post' && !formData.postId) {
      console.warn("⚠️ Missing postId in payload!");
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3 }}
      >
        <DialogTitle>Edit {type}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            {fields.map((field, idx) => (
              <Grid item xs={12} sm={field.fullWidth ? 12 : 6} key={idx}>
                {field.select ? (
                  <TextField
                    select
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                    SelectProps={{ native: true }}
                  >
                    <option value="">Select</option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option}>{option}</option>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={handleChange}
                    fullWidth
                    multiline={field.multiline || false}
                    rows={field.rows || 1}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
}
