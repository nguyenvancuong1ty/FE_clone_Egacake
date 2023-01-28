import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './App.scss';
import router from './routers';

function App() {
    return (
        <Router>
            <div className="topnav">
                <NavLink to="/" exact={true}>
                    Home
                </NavLink>
                <NavLink to="/intro">Intro</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/about">About</NavLink>
            </div>

            <Routes>
                {router.map((item) => {
                    return (
                            <Route path= {item.path} element={item.component}></Route>
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
