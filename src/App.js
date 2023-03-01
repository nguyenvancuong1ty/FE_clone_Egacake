import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import Footer from './components/footer/Footer';
import router from './routers';
function App() {
    return (
        <Router>
            <Routes>
                {router.map((item, index) => {
                    return <Route path={item.path} element={item.component} key={index}></Route>;
                })}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
