import { useState } from 'react';

// Import React Router
import { Routes, Route } from 'react-router-dom';

// Import Views
import HomeView from './views/HomeView/HomeView';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeView />} />
      </Routes>
    </>
  )
}

export default App
