import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import PortfolioPage from "./pages/portfolioPage";
import './index.css';

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/portfolios/:id" component={PortfolioPage} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
