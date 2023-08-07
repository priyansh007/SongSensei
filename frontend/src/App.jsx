import { Route, Switch } from 'wouter';
import About from './pages/about';
import Home from './pages/home';
import Navbar from './components/navbar';
import Team from './pages/team';
import SpotifySearch from './pages/search'; // Provide the correct path to your SpotifySearch component
import Input from './pages/file_input';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/team" component={Team} />
        <Route path="/search" component={SpotifySearch} /> {/* Use the SpotifySearch component here */}
        <Route path="/" component={Home} />
        <Route path="/input" component={Input}/>
      </Switch>
    </>
  );
}

export default App;
