import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FlashSaleItem from '~/components/FlashSaleItem';
import Header from '~/components/Header';
import Loading from '~/components/Loading';
import Nav from '~/components/Nav';
import { useFetch } from '~/hooks/useFetch';

function Cakes() {
    const { categorycake } = useParams();
    const res = useFetch('get', 'v1/api/cakedetail');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
    }, [categorycake]);
    useEffect(() => {
        setTimeout(() => {
            if (Array.isArray(res)) {
                if (categorycake) {
                    setData(
                        res.filter((item) => {
                            return item.categoryCake.toString() === categorycake;
                        }),
                    );
                } else {
                    setData(res);
                }

                setLoading(false);
            }
        }, 300);
    }, [categorycake, res]);

    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <div className="container df">
                <div className="body__left">
                    <Nav></Nav>
                </div>
                <div className="body__right">
                    <div className="body__right--flashsale">
                        <div className="flashsale__content">
                            <table>
                                <thead>{loading && <Loading />}</thead>
                            </table>
                            <div className="grids">
                                {data &&
                                    data.map((item, index) => {
                                        return loading === false && <FlashSaleItem item={item} key={index} col={4} />;
                                    })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cakes;
