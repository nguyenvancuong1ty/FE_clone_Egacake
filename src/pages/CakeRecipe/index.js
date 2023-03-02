import BlogItem from '~/components/BlogItem';
import Header from '~/components/Header';
import { useFetch } from '~/hooks/useFetch';

function CakeRecipe() {
    const recipe = useFetch('get', 'v1/api/recipe');
    return (
        <>
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                    <div className="blog__news--title">
                        <a href="/" className="blog__news--link">
                            <img src="./img/conthuc.webp" alt="" className="blog__news--img" />
                            <span className="blog__news--text">CÔNG THỨC LÀM BÁNH</span>
                        </a>
                    </div>
                    {recipe.map((item) => {
                        return <BlogItem item={item} key={item.id} textLimit={item.detail.length} />;
                    })}
            </div>
        </>
    );
}

export default CakeRecipe;
