import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation } from 'wouter';
import About from './pages/about';
import Home from './pages/home';
import Navbar from './components/navbar';
import Team from './pages/team';
import SpotifySearch from './pages/search'; // Provide the correct path to your SpotifySearch component
import Input from './pages/file_input';
import './App.css';
import SelectedSongPage from './pages/details';
import { AccessTokenProvider } from './AccessTokenContext'; // Import the provider


const App = () => {

  return (
    <AccessTokenProvider>
      <>
        <Navbar />
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/team" component={Team} />
          <Route path="/search" component={SpotifySearch} />
          <Route path="/" component={Home} />
          <Route path="/input" component={Input}/>
          <Route path="/details/" component={SelectedSongPage}/>
        </Switch>
      </>
    </AccessTokenProvider>
  );
}

export default App;
