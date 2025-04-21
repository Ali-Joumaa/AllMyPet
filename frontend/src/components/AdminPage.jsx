import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Paper, Grid, Button, CircularProgress, AppBar, Toolbar
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PetsIcon from '@mui/icons-material/Pets';
import ArticleIcon from '@mui/icons-material/Article';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import HomeIcon from '@mui/icons-material/Home';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import EntityTable from './EntityTable';
import './AdminPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const dummyChartData = [
  { value: 10 }, { value: 30 }, { value: 20 }, { value: 50 }, { value: 40 }, { value: 60 }, { value: 30 }, { value: 70 }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [view, setView] = useState('Users');
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [posts, setPosts] = useState([]);
  const [vetRequests, setVetRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchVetRequests();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5555/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      const usersData = await res.json();
      setUsers(usersData);

      const petsPromises = usersData.map(user =>
        fetch(`http://localhost:5555/api/admin/users/${user.userId}/pets`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => res.json())
      );

      const postsPromises = usersData.map(user =>
        fetch(`http://localhost:5555/api/admin/users/${user.userId}/adoptions`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => res.json())
      );

      const allPetsArrays = await Promise.all(petsPromises);
      const allPostsArrays = await Promise.all(postsPromises);

      setPets(allPetsArrays.flat());
      setPosts(allPostsArrays.flat());
    } catch (error) {
      console.error('Error fetching users or pets/posts:', error);
      toast.error('Error fetching users.');
    }
    setLoading(false);
  };

  const fetchVetRequests = async () => {
    try {
      const res = await fetch('http://localhost:5555/api/admin/vets/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await res.json();
      setVetRequests(data);
    } catch (error) {
      console.error('Error fetching vet requests:', error);
      toast.error('Error fetching vet requests.');
    }
  };

  const deleteUser = async (user) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete user "${user.username}"?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5555/api/admin/users/${user.userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        toast.success('User deleted successfully!');
        setUsers(prev => prev.filter(u => u.userId !== user.userId));
      } else {
        toast.error('Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user.');
    }
  };

  const approveVet = async (vet) => {
    try {
      const res = await fetch(`http://localhost:5555/api/admin/approve-vet/${vet.vetId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        toast.success(`Vet ${vet.firstName} approved successfully!`);
        setVetRequests(prev => prev.filter(v => v.vetId !== vet.vetId));
      } else {
        toast.error('Failed to approve vet.');
      }
    } catch (error) {
      console.error('Error approving vet:', error);
      toast.error('Error approving vet.');
    }
  };

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
        minWidth: '350px'
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h5" fontWeight="bold">{title}</Typography>
          <Typography variant="h3" fontWeight="bold">{value}</Typography>
        </Box>
        <Box>{icon}</Box>
      </Box>
      <Box sx={{ mt: 2, height: 80 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dummyChartData} margin={{ left: -40, right: -40 }}>
            <Line type="monotone" dataKey="value" stroke="#ffffffaa" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );

  return (
    <Container className="admin-dashboard">
      {/* 🏡 Top AppBar with Home Button */}
      <AppBar position="sticky" color="primary" sx={{ mb: 3 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/home')}>
            Home
          </Button>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
          <Box width="80px" /> {/* Just to balance the Home button width */}
        </Toolbar>
      </AppBar>

      <ToastContainer />

      {/* Dashboard Cards */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3} direction="row">
          <Grid item xs={12}>{renderCard('Users', users.length.toString(), <PeopleIcon fontSize="large" />, '#7b61ff')}</Grid>
          <Grid item xs={12}>{renderCard('Pets', pets.length.toString(), <PetsIcon fontSize="large" />, '#2196f3')}</Grid>
          <Grid item xs={12}>{renderCard('Posts', posts.length.toString(), <ArticleIcon fontSize="large" />, '#ff9800')}</Grid>
        </Grid>
      </Box>

      {/* Switch Buttons */}
      <Box className="top-buttons">
        <Button variant={view === 'Users' ? 'contained' : 'outlined'} onClick={() => setView('Users')}>
          Users
        </Button>
        <Button variant={view === 'Requests' ? 'contained' : 'outlined'} onClick={() => setView('Requests')}>
          Vet Requests
        </Button>
      </Box>

      {/* View Area */}
      <Box className="view-area">
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        ) : view === 'Users' ? (
          <EntityTable
            title="Users"
            type="Users"
            rows={users}
            columns={[{ label: 'Username', key: 'username' }, { label: 'Email', key: 'email' }]}
            onRowClick={(user) => navigate(`/admin/users/${user.userId}`)}
            onDelete={deleteUser}
          />
        ) : (
          <EntityTable
            title="Vet Requests"
            type="Vets"
            rows={vetRequests}
            columns={[
              { label: 'First Name', key: 'firstName' },
              { label: 'Last Name', key: 'lastName' },
              { label: 'Email', key: 'email' },
              { label: 'Phone Number', key: 'phoneNumber' },
              { label: 'Sex', key: 'sex' },
              { label: 'Location', key: 'location' },
              { label: 'Experience Years', key: 'exp_years' },
              { label: 'Profile Picture', key: 'profilePicture' }
            ]}
            onApprove={approveVet}
          />
        )}
      </Box>
    </Container>
  );
}
