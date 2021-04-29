import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';
import About from './pages/About/About';
import Home from './pages/Home/Home'
import Rules from './pages/Rules/Rules';

const base_name = process.env.REACT_APP_BASENAME || '/'

function App() {
    return (
        <div className="App">
            <Router basename={base_name}>
                <Header />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/rules' component={Rules} />
                    <Route path='/about' component={About} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
