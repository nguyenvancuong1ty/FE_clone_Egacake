function BlogItem({item, textLimit}) {
    return (
        <div className="blog__news--item">
            <img src={item.images} alt="" className="blog__item--img" />
            <div className="blog__item--text">
                <b className="blog__item--title">{item.title}</b>
                <p className="blog__item--time">{item.dateCreate}</p>
                <p className="blog__item--deps">{item.detail.slice(0, textLimit)}...</p>
            </div>
        </div>
    );
}

export default BlogItem;
