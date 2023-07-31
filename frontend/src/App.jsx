// App.tsx

import { Route, Switch } from 'wouter';
import About from './pages/about';
import Home from './pages/home';
import Navbar from './components/navbar';
import Summarize from './pages/summarize'; // import page
import './App.css';

function App () {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path='/' component={Home} />
                <Route path='/about' component={About} />
								{/* Set page to route */}
                <Route path='/summarize' component={Summarize} />
            </Switch>
        </>
    );
}

export default App;