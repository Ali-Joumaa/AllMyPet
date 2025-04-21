// src/components/EntityTable.jsx

import React from 'react';
import {
  Paper, Typography, Button, Box, Grid, Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import './EntityTable.css';

const EntityTable = ({ title, columns, rows, onDelete, onApprove, type, onRowClick }) => {
  const getIcon = () => {
    if (type === 'Users') return <PersonIcon />;
    if (type === 'Pets') return <PetsIcon />;
    if (type === 'Posts') return <ArticleIcon />;
    if (type === 'Vets') return <PendingActionsIcon />;
    return null;
  };

  return (
    <Paper elevation={4} className="entity-table-container">
      <Typography variant="h6" gutterBottom className="entity-table-title">
        {title}
      </Typography>

      <Grid container spacing={2}>
        {rows.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" className="entity-empty">
              No {title.toLowerCase()} found.
            </Typography>
          </Grid>
        ) : (
          rows.map((row, idx) => (
            <Grid item xs={12} key={idx}>
              <Paper className="entity-card">
                <Box
                  className="entity-info"
                  onClick={type === 'Users' && onRowClick ? () => onRowClick(row) : undefined}
                  sx={type === 'Users' ? { cursor: 'pointer', width: '100%' } : {}}
                >
                  {/* Avatar */}
                  {type === "Vets" ? (
                    <Avatar
                      src={row.profilePicture || undefined}
                      alt={`${row.firstName} ${row.lastName}`}
                      className="entity-avatar"
                      sx={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <Avatar className="entity-avatar">{getIcon()}</Avatar>
                  )}

                  {/* Content */}
                  {type === "Vets" ? (
                    <Box className="entity-card-content">
                      <Typography className="entity-text" fontSize="20px" fontWeight="bold">
                        {row.firstName} {row.lastName}
                      </Typography>
                      <Typography className="entity-text">
                        📧 Email: {row.email}
                      </Typography>
                      <Typography className="entity-text">
                        📞 Phone: {row.phoneNumber}
                      </Typography>
                      <Typography className="entity-text">
                        📍 Location: {row.location}
                      </Typography>
                      <Typography className="entity-text">
                        Gender: {row.sex}
                      </Typography>
                      <Typography className="entity-text">
                        Experience: {row.expYears} years
                      </Typography>
                    </Box>
                  ) : (
                    <Box className="entity-card-content">
                      {columns.map((col, i) => (
                        <Typography key={i} className="entity-text">
                          {row[col.key]}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>

                {/* Actions */}
                {type === 'Vets' && onApprove && (
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    className="entity-action"
                    onClick={() => onApprove(row)}
                  >
                    <CheckIcon />
                  </Button>
                )}

                {type !== 'Vets' && onDelete && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    className="entity-action"
                    onClick={() => onDelete(row)}
                  >
                    <DeleteIcon />
                  </Button>
                )}
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default EntityTable;
