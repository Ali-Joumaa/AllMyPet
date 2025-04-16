import React, { useState } from 'react';
import './AdminPage.css';
import {
  Box, Drawer, List, ListItem, ListItemText,
  AppBar, Toolbar, Typography, Container,
  Paper, Grid, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material';

export default function AdminPage() {
  const [selectedView, setSelectedView] = useState('Users');

  const users = [
    { id: 1, name: 'Alice Smith'},
    { id: 2, name: 'Bob Johnson'},
  ];

  const pets = [
    { id: 1, name: 'Milo', breed: 'Golden Retriever' },
    { id: 2, name: 'Luna', breed: 'Siamese Cat' },
  ];

  const posts = [
    { id: 1, content: 'Adopt Milo!', author: 'Alice Smith' },
    { id: 2, content: 'Lost dog near AUB gate', author: 'Bob Johnson' },
  ];

  const renderContent = () => {
    switch (selectedView) {
      case 'Users':
        return (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Users</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell><button className="delete-btn">Delete</button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );

      case 'Pets':
        return (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Pets</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Breed</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pets.map((pet) => (
                    <TableRow key={pet.id}>
                      <TableCell>{pet.name}</TableCell>
                      <TableCell>{pet.breed}</TableCell>
                      <TableCell><button className="delete-btn">Delete</button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );

      case 'Posts':
        return (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Posts</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Content</TableCell>
                    <TableCell>user</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.content}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell><button className="delete-btn">Delete</button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        );

      default:
        return null;
    }
  };

  return (
    <Box className="admin-root">
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        className="admin-drawer"
        classes={{ paper: 'admin-drawer-paper' }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Users', 'Pets', 'Posts'].map((text) => (
              <ListItem button key={text} onClick={() => setSelectedView(text)} selected={selectedView === text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" className="admin-main">
        <AppBar position="fixed" className="admin-appbar">
          <Toolbar>
            <Typography variant="h6" noWrap>
              Admin Panel – {selectedView}
            </Typography>
          </Toolbar>
        </AppBar>

        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {renderContent()}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
