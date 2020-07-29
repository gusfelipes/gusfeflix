import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./pages/Home";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import CadastroVideo from "./pages/Cadastro/Video";
import CadastroCategoria from "./pages/Cadastro/Categoria";

const page404 = () => <div> página 404 </div>;

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/cadastro/video" component={CadastroVideo} />
      <Route path="/cadastro/categoria" component={CadastroCategoria} />
      <Route component={page404} />
    </Switch>
  </BrowserRouter>,

  document.getElementById("root")
);
