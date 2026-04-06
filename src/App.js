import React from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import Movies from "./Screens/Movies/Movies";
import Detail from "./Screens/Detail/Detail";
import Series from "./Screens/Series/Series";
import Register from "./Screens/Register/Register";
import Login from "./Screens/Login/Login";
import Results from "./Screens/Results/Results";
import NotFound from "./Screens/NotFound/NotFound";

function App() {
  return (
    <div className="container">
      <h1>UdeSA Movies</h1>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route path="/movies/:category" component={Movies} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/series" component={Series} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/results/:busqueda" component={Results} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
