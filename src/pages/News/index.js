import BlogItem from '~/components/BlogItem';
import Header from '~/components/Header';
import { useFetch } from '~/hooks/useFetch';

function News() {
    const news = useFetch('get', 'v1/api/news');
    return (
        <>
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <div className="blog__news--title">
                    <a href="/" className="blog__news--link">
                        <img src="./img/tintuc.webp" alt="" className="blog__news--img" />
                        <span className="blog__news--text">TIN TỨC</span>
                    </a>
                </div>
                {news.map((item) => {
                    return <BlogItem item={item} key={item.id} textLimit={item.detail.length} />;
                })}
            </div>
        </>
    );
}

export default News;
