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
import Favoritos from "./Screens/Favoritos/Favoritos";


function App() {
  return (
    <div className="container">
      <h1>UdeSA Movies</h1>
      <Navbar />
      <div className="contenido-principal">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movies" component={Movies} />
          <Route path="/detail/:tipo/:id" component={Detail} />
          <Route path="/series" component={Series} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/results/:busqueda/:tipo" component={Results} />
          <Route path="/results/:busqueda" component={Results} />
          <Route path="/favoritos" component={Favoritos} />
          <Route component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
