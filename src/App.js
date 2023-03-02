import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import router from './routers';
function App() {
    const [isShow, setShow] = useState(true);
    useEffect(() => {
        document.documentElement.ScrollToTop > 70 && setShow(false);
    }, []);
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {router.map((item, index) => {
                    return <Route path={item.path} element={item.component} key={index}></Route>;
                })}
            </Routes>
            {isShow && (
                <button
                    className="bbbutton"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    On Top
                </button>
            )}
            <Footer />
        </Router>
    );
}

export default App;
