import Home from '../pages/Home';
import Intro from '../pages/Intro';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Map from '../pages/Map';
import Cakes from '../pages/Cakes';
import Sales from '../pages/Sales';
import CakeRecipe from '../pages/CakeRecipe';
import News from '../pages/News';
import Contact from '../pages/Contact';
import CakeDetail from '../pages/Detail/Cakedetail';
import AdmHome from '../pages/Admin/Home';
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
    {
        path: '/shop',
        component: <Map />,
        layout: '',
    },
    {
        path: '/cakes/:categorycake',
        component: <Cakes />,
        layout: '',
    },
    {
        path: '/cakes',
        component: <Cakes />,
        layout: '',
    },
    {
        path: '/sale',
        component: <Sales />,
        layout: '',
    },
    {
        path: '/recipe',
        component: <CakeRecipe />,
        layout: '',
    },
    {
        path: '/news',
        component: <News />,
        layout: '',
    },
    {
        path: '/contact',
        component: <Contact />,
        layout: '',
    },

    {
        path: '/detail/:id',
        component: <CakeDetail />,
        layout: '',
    },
    //Admin router
    {
        path: '/Admin/*',
        component: <AdmHome />,
        layout: '',
    },
];

export default router;
