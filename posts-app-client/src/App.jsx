import { useState } from 'react';

import { Container } from '@material-ui/core';

// Import React Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Views
import Navbar from './components/Navbar/Navbar';
import HomeView from './views/HomeView/HomeView';
import AuthView from './views/AuthView/AuthView';
import PostDetails from './components/Posts/PostDetails/PostDetails';

function App() {
  // Obtain user from local storage
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <>
      <Container maxWidth="xl">
        <header>
          <Navbar />
        </header>

        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<HomeView />} />
          <Route path="/posts/search" element={<HomeView />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <AuthView /> : <Navigate to="/posts" replace />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
