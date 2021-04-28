import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './pages/About/About';
import Home from './pages/Home/Home'

const base_name = process.env.REACT_APP_BASENAME || '/'

function App() {
    return (
        <div className="App">
            <Router basename={base_name}>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/about' component={About} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
