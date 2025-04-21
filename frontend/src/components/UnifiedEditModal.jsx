// src/components/UnifiedEditModal.jsx

import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Grid
} from '@mui/material';
import { motion } from 'framer-motion';
import './UnifiedEditModal.css';

export default function UnifiedEditModal({ open, onClose, type, fields, initialData, onSubmit }) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
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
                <TextField
                  label={field.label}
                  name={field.name}
                  value={formData[field.name] || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                  fullWidth
                  multiline={field.multiline || false}
                  rows={field.rows || 1}
                />
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
