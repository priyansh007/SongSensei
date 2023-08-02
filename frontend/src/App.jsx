// App.tsx

import { Route, Switch } from 'wouter';
import About from './pages/about';
import Home from './pages/home';
import Navbar from './components/navbar';
import Team from './pages/team';
import Search from './pages/search';
import './App.css';

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' component={Home} />
                <Route path='/about' component={About} />
								{/* Set page to route */}
                <Route path='/team' component={Team} />
                <Route path='/search' component={Search} />
            </Switch>
        </>
    );
}

export default App;