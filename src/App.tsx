import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Router from './components/Router';

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
