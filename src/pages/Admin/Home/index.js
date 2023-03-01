import { NavLink, Route, Routes } from 'react-router-dom';
import CakeManager from '../CakeManager';
import NewsManager from '../NewsManager';
import RecipeManager from '../RecipeManager';
import TypeCakeManager from '../TypeCakeManager';
import UsersManager from '../UsersManager';
import '../Admin.scss';
function AdmHome() {
    return (
        <>
            <div className="container">
                {/* <div className="wrap__list--group"> */}
                <ul className="list-group" style={{ width: '200px' }}>
                    <NavLink to={'manager/users'} className="list-group-item">
                        Users Manager
                    </NavLink>
                    <NavLink to={'manager/cakes'} className="list-group-item">
                        Type of cake Manager
                    </NavLink>
                    <NavLink to={'manager/cake-detail'} className="list-group-item">
                        Cake Manager
                    </NavLink>
                    <NavLink to={'manager/news'} className="list-group-item">
                        News Manager
                    </NavLink>
                    <NavLink to={'manager/cake-recipe'} className="list-group-item">
                        Cake Recipe Manager
                    </NavLink>
                </ul>
                <Routes>
                    <Route path="manager/users" element={<UsersManager />}></Route>
                    <Route path="manager/cakes" element={<TypeCakeManager />}></Route>
                    <Route path="manager/news" element={<NewsManager />}></Route>
                    <Route path="manager/cake-recipe" element={<RecipeManager />}></Route>
                    <Route path="manager/cake-detail" element={<CakeManager />}></Route>
                </Routes>
            </div>
        </>
    );
}

export default AdmHome;
