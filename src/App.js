import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ModalContextProvider } from './behaviour/ModalContext.js';

import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import Home from "./pages/Home.js";
import AlgsPage from "./pages/AlgsPage.js";
import Error404 from "./pages/Error404.js";

function App() {
  return (
    <div className="App">
      <Router>
        <ModalContextProvider>
        <Navbar />

        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/oll" element={<AlgsPage lastLayerStep="oll" />}/>
            <Route path="/pll" element={<AlgsPage lastLayerStep="pll" />}/>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>

        <Footer />
        </ModalContextProvider>
      </Router>
    </div>
  );
}

export default App;
