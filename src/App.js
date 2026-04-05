import React from "react"
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar";
import Home from "./Screens/Home/Home";

function App() {
  return (     
    <div className="container">
      <h1>UdeSA Movies</h1>
      <Home />
      <Navbar />
      <p> react</p>
      <Footer />
    </div>
  );
}

export default App;
