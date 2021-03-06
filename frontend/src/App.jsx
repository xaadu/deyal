import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import 'animate.css/animate.min.css';

import Header from './components/Header';
import About from './pages/About';
import Home from './pages/Home'
import Rules from './pages/Rules';

const base_name = process.env.REACT_APP_BASENAME || '/'

function App() {
    return (
        <div className="App">
            <Router basename={base_name}>
                <Header />
                <ReactNotification />
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
