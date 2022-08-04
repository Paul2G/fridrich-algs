import { HashRouter,Routes, Route } from 'react-router-dom';

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./components/Home"
import AlgsOll from "./components/AlgsOll";
import AlgsPll from "./components/AlgsPll"

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        
        <main className="mainContent">
          <Routes>
            <Route exact path="/" element={<Home/>} />

            <Route exact path="/oll" element={<AlgsOll />} />
            <Route exact path="/pll" element={<AlgsPll />} />
          </Routes>
        </main>
        
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
