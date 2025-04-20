// File: src/components/AdminPage.jsx

import React, { useState } from 'react';
import './AdminPage.css';
import {
  Box, Drawer, List, ListItem, ListItemText,
  AppBar, Toolbar, Typography, Container,
  Paper, Grid, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import EntityTable from './EntityTable';

const dummyChartData = [
  { value: 10 }, { value: 30 }, { value: 20 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 30 }, { value: 70 }
];

const cards = [
  { title: 'Users', value: '1.2K', icon: <PeopleIcon fontSize="large" />, color: '#7b61ff' },
  { title: 'Pets', value: '230', icon: <PetsIcon fontSize="large" />, color: '#2196f3' },
  { title: 'Posts', value: '3.4K', icon: <ArticleIcon fontSize="large" />, color: '#ff9800' }
];

const sidebarItems = [
  { label: 'Dashboard', icon: <DashboardIcon /> },
  { label: 'Users', icon: <PeopleIcon /> },
  { label: 'Pets', icon: <PetsIcon /> },
  { label: 'Posts', icon: <ArticleIcon /> },
];

export default function AdminPage() {
  const [selectedView, setSelectedView] = useState('Dashboard');

  const users = [
    { id: 1, name: 'Alice Smith' },
    { id: 2, name: 'Bob Johnson' },
    { id: 2, name: 'Bob Johnson' },
    { id: 2, name: 'Bob Johnson' },
  ];

  const pets = [
    { id: 1, name: 'Milo', breed: 'Golden Retriever' },
    { id: 2, name: 'Luna', breed: 'Siamese Cat' },
    { id: 2, name: 'Luna', breed: 'Siamese Cat' },
    { id: 2, name: 'Luna', breed: 'Siamese Cat' },
  ];

  const posts = [
    { id: 1, content: 'Adopt Milo!', author: 'Alice Smith' },
    { id: 2, content: 'Lost dog near AUB gate', author: 'Bob Johnson' },
  ];

  const vetRequests = [
    { id: 1, doctor: 'Dr. Sarah Connor', pet: 'Luna' },
    { id: 2, doctor: 'Dr. John Doe', pet: 'Max' },
    { id: 3, doctor: 'Dr. Jane Smith', pet: 'Bella' }
  ];

  const renderCard = (title, value, icon, color) => (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 3,
        bgcolor: color,
        color: '#fff',
        borderRadius: '16px',
        width: '100%',
        minWidth: '600px'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">{title}</Typography>
          <Typography variant="h3" fontWeight="bold">{value}</Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box sx={{ mt: 2, height: 60 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyChartData} margin={{ left: -40, right: -40 }}>
            <Line type="monotone" dataKey="value" stroke="#ffffffaa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );

  const renderDashboard = () => (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3} direction="column">
        {cards.map((card, index) => (
          <Grid item xs={12} key={index}>
            {renderCard(card.title, card.value, card.icon, card.color)}
          </Grid>
        ))}
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Veterinarian Requests
        </Typography>
        <Grid container spacing={2}>
          {vetRequests.map((req) => (
            <Grid item xs={12} md={6} key={req.id}>
              <Paper elevation={1} sx={{ p: 2, borderRadius: 2, border: '1px solid #ccc' }}>
                <Typography>
                  Request from {req.doctor} for pet "{req.pet}".
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                  Approve Request
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );

  const renderContent = () => {
    switch (selectedView) {
      case 'Users':
        return (
          <Box>
            {renderCard('Users', '1.2K', <PeopleIcon fontSize="large" />, '#7b61ff')}
            <EntityTable
              title="Users"
              columns={[{ label: 'Username', key: 'name' }]}
              rows={users}
              onDelete={(user) => console.log('Delete User:', user)}
            />
          </Box>
        );
      case 'Pets':
        return (
          <Box>
            {renderCard('Pets', '230', <PetsIcon fontSize="large" />, '#2196f3')}
            <EntityTable
              title="Pets"
              columns={[{ label: 'Name', key: 'name' }, { label: 'Breed', key: 'breed' }]}
              rows={pets}
              onDelete={(pet) => console.log('Delete Pet:', pet)}
            />
          </Box>
        );
      case 'Posts':
        return (
          <Box>
            {renderCard('Posts', '3.4K', <ArticleIcon fontSize="large" />, '#ff9800')}
            <EntityTable
              title="Posts"
              columns={[{ label: 'Content', key: 'content' }, { label: 'Author', key: 'author' }]}
              rows={posts}
              onDelete={(post) => console.log('Delete Post:', post)}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box className="admin-root">
      <Drawer
        variant="permanent"
        className="admin-drawer"
        classes={{ paper: 'admin-drawer-paper' }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {sidebarItems.map(({ label, icon }) => (
              <ListItem
                button
                key={label}
                onClick={() => setSelectedView(label)}
                selected={selectedView === label}
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {icon}
                  <ListItemText primary={label} />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box component="main" className="admin-main">
        <AppBar position="fixed" className="admin-appbar">
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography variant="h6" noWrap>
              Admin Panel – {selectedView}
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {selectedView === 'Dashboard' ? renderDashboard() : renderContent()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}