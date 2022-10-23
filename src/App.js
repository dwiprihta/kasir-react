import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { NavbarComponent } from "./components";
import { Home, Sukses } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          {/* <Route path="/sukses" component={Sukses} exact /> */}
        </Switch>
      </main>
    </BrowserRouter>
  );
}
