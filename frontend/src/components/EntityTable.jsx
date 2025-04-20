// File: src/components/EntityTable.jsx

import React from 'react';
import './EntityTable.css';
import {
  Paper, Typography, Button, Box, Grid, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';

const EntityTable = ({ title, columns, rows, onDelete }) => {
  const getIcon = () => {
    if (title === 'Users') return <PersonIcon />;
    if (title === 'Pets') return <PetsIcon />;
    if (title === 'Posts') return <ArticleIcon />;
    return null;
  };

  return (
    <Paper elevation={4} className="entity-table-container">
      <Typography variant="h6" gutterBottom className="entity-table-title">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {rows.map((row, idx) => (
          <Grid item xs={12} key={idx}>
            <Paper className="entity-card">
              <Box className="entity-info">
                <Avatar className="entity-avatar">
                  {getIcon()}
                </Avatar>
                <Box className="entity-card-content">
                  {columns.map((col, i) => (
                    <Typography key={i} className="entity-text">
                      {row[col.key]}
                    </Typography>
                  ))}
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="error"
                size="small"
                className="entity-delete"
                onClick={() => onDelete(row)}
              >
                <DeleteIcon />
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default EntityTable;