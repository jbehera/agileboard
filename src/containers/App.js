import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Switch, Route, } from 'react-router-dom';
import './App.css';
import Header from '../components/Header';
import DashboardContainer from './Dashboard';
import Lists from './Lists';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <main className="App-main">
            <Switch>
              <Route exact path="/" component={DashboardContainer} />
              <Route path="/board/:id" component={Lists} />
            </Switch>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
