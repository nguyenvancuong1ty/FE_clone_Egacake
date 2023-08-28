import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Footer from './components/footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import router from './routers';
import Message from './components/Facebook/Fb.message';
function App() {
    const [isShow, setShow] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.pageYOffset > 140) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {router.map((item, index) => {
                    return <Route path={item.path} element={item.component} key={index}></Route>;
                })}
            </Routes>
            <button
                className={!isShow ? 'bbbutton' : 'bbbutton show'}
                onClick={() => {
                    window.scrollTo(0, 0);
                }}
            >
                <img
                    style={{ width: 40, cursor: 'pointer' }}
                    src="https://media.istockphoto.com/id/1144366180/vi/vec-to/m%C5%A9i-t%C3%AAn-m%C3%A0u-%C4%91%E1%BB%8F-ch%E1%BB%89-l%C3%AAn-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-h%C6%B0%E1%BB%9Bng-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng-d%E1%BA%A5u-m%C5%A9i-t%C3%AAn-%C4%91%E1%BB%8Bnh-h%C6%B0%E1%BB%9Bng-m%C3%A0u-%C4%91%E1%BB%8F-bi%E1%BB%83u-t%C6%B0%E1%BB%A3ng.jpg?s=612x612&w=0&k=20&c=OrWF9Q92GDyLhKFqdS668DOvmgLSdwpALgFZ_7_Ny90="
                    alt=""
                />
            </button>
            <Footer />
            <Message />
        </Router>
    );
}

export default App;
