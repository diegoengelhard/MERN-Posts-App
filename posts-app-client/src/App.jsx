import { useState } from 'react';

// Import React Router
import { Routes, Route } from 'react-router-dom';

// Import Views
import Navbar from './components/Navbar/Navbar';
import HomeView from './views/HomeView/HomeView';
import AuthView from './views/AuthView/AuthView';

function App() {

  return (
    <>
    <header>
      <Navbar />
    </header>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/auth" element={<AuthView />} />
      </Routes>
    </>
  )
}

export default App
