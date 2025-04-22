// src/components/UserProfile.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, Grid, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';
import UnifiedEditModal from './UnifiedEditModal';
import './AdminUserProfile.css';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [pets, setPets] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalData, setEditModalData] = useState({});
  const [editModalType, setEditModalType] = useState('');
  const [editModalFields, setEditModalFields] = useState([]);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const [userRes, petsRes, postsRes] = await Promise.all([
        fetch(`http://localhost:5555/api/admin/users/${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:5555/api/admin/users/${userId}/pets`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`http://localhost:5555/api/admin/users/${userId}/adoptions`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      const user = await userRes.json();
      const pets = await petsRes.json();
      const posts = await postsRes.json();

      setUserInfo(user);
      setPets(pets);
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const openEditModal = (type, data) => {
    setEditModalType(type);
    setEditModalData(data);

    if (type === "User") {
      setEditModalFields([
        { label: 'First Name', name: 'firstname' },
        { label: 'Last Name', name: 'lastname' },
        { label: 'Username', name: 'username' },
        { label: 'Email', name: 'email' },
        { label: 'Address', name: 'address' },
        { label: 'Bio', name: 'bio', multiline: true, rows: 3 },
        { label: 'Years Petting', name: 'yearsPetting' },
        { label: 'Profile Picture URL', name: 'userProfilePicture' },
      ]);
    } else if (type === "Pet") {
      setEditModalFields([
        { label: 'Name', name: 'name' },
        { label: 'Species', name: 'species' },
        { label: 'Breed', name: 'breed' },
        { label: 'Age', name: 'age' },
        { label: 'Sex', name: 'sex' },
        { label: 'Pet Photo URL', name: 'petPhoto' },
        { label: 'Description', name: 'description', multiline: true, rows: 3 },
        { label: 'Location', name: 'location' },
        { label: 'Status', name: 'status' },
        { label: 'Vaccines', name: 'vaccines' },
        { label: 'Health Info', name: 'healthInfo', multiline: true, rows: 3 },
      ]);
    } else if (type === "Post") {
      setEditModalFields([
        { label: 'Title', name: 'title' },
        { label: 'Description', name: 'description', multiline: true, rows: 3 },
        { label: 'Status', name: 'status' },
        { label: 'Adoption Type', name: 'adoptionType' },
        { label: 'Vaccines', name: 'vaccines' },
        { label: 'Health Info', name: 'healthInfo', multiline: true, rows: 3 },
      ]);
    }

    setEditModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const token = localStorage.getItem('token');
      let url = '';
      let method = 'PUT';

      if (editModalType === 'User') {
        url = `http://localhost:5555/api/admin/users/${userId}`;
      } else if (editModalType === 'Pet') {
        url = `http://localhost:5555/api/admin/pets/${editModalData.petId}`;
      } else if (editModalType === 'Post') {
        url = `http://localhost:5555/api/admin/adoptions/${editModalData.postId}`;
      }

      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updatedData)
      });

      setEditModalOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5555/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/adminPage');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeletePet = async (petId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5555/api/admin/pets/${petId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5555/api/admin/adoptions/${postId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userInfo) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography>User not found.</Typography>
      </Container>
    );
  }

  return (
    <Container className="user-profile">
      {/* Profile Header */}
      <Paper elevation={3} className="profile-header">
        <Avatar src={userInfo.profilePictureURL} sx={{ width: 100, height: 100 }} />
        <Box className="profile-info">
          <Typography variant="h5">{userInfo.firstname} {userInfo.lastname}</Typography>
          <Typography>Username: {userInfo.username}</Typography>
          <Typography>Email: {userInfo.email}</Typography>
          <Typography>Location: {userInfo.address}</Typography>
          <Typography>Years of Petting: {userInfo.yearsPetting}</Typography>
          <Typography>Bio: {userInfo.bio}</Typography>
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<EditIcon />} onClick={() => openEditModal('User', userInfo)}>
              Modify
            </Button>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => setDeleteConfirmOpen(true)}>
              Delete
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Stats */}
      <Box className="profile-stats">
        <Paper className="stat-card"><Typography><PetsIcon /> Pets: {pets.length}</Typography></Paper>
        <Paper className="stat-card"><Typography><ArticleIcon /> Posts: {posts.length}</Typography></Paper>
      </Box>

      {/* Pets */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Pet Cards</Typography>
      <Grid container spacing={2}>
        {pets.map(pet => (
          <Grid item xs={12} sm={6} md={4} key={pet.petId}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Paper className="entity-card">
                <Typography><strong>Name:</strong> {pet.name}</Typography>
                <Typography><strong>Breed:</strong> {pet.breed}</Typography>
                <Typography><strong>Age:</strong> {pet.age}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={() => openEditModal('Pet', pet)}>Modify</Button>
                  <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeletePet(pet.petId)}>Delete</Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Posts */}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Adoption Posts</Typography>
      <Grid container spacing={2}>
        {posts.map(post => (
          <Grid item xs={12} sm={6} md={4} key={post.postId}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Paper className="entity-card">
                <Typography><strong>Title:</strong> {post.title}</Typography>
                <Typography><strong>Description:</strong> {post.description}</Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button size="small" variant="contained" startIcon={<EditIcon />} onClick={() => openEditModal('Post', post)}>Modify</Button>
                  <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => handleDeletePost(post.postId)}>Delete</Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Edit Modal */}
      <UnifiedEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        type={editModalType}
        fields={editModalFields}
        initialData={editModalData}
        onSubmit={handleUpdate}
      />

      {/* Confirm Delete Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteUser}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
