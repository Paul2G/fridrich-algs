import AlgsOll from "./components/AlgsOll";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="mainContent">
        <AlgsOll />
      </main>
      <Footer />
    </div>
  );
}

export default App;
