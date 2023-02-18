import Home from '~/pages/Home';
import Intro from '~/pages/Intro';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
const router = [
    {
        path: '/',
        component: <Home />,
        layout: '',
    },
    {
        path: '/intro',
        component: <Intro />,
        layout: '',
    },
    {
        path: '/login',
        component: <Login />,
        layout: '',
    },
    {
        path: '/register',
        component: <Register />,
        layout: '',
    },
];

export default router;
