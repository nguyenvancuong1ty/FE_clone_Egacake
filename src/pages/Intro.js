import { useEffect, useState } from 'react';
import Header from '~/components/Header';
import { useFetch } from '~/hooks/useFetch';

function Intro() {
    const [intro, setIntro] = useState({
        data: '',
    });
    const res = useFetch('get', 'v1/api/intro');
    useEffect(() => {
        setIntro(res[0]);
    }, [res]);
    return (
        <>
            <Header />
            <div className="mt-120"></div>
            <div className="container h-body">
                <b>
                    {intro && intro.name} shop - {intro && intro.owner}
                </b>
                <p className="introduce" style={{ textAlign: 'justify', marginTop: 32 }}>
                    {intro && intro.detail}
                </p>
                <div style={{ marginTop: 200, textAlign: 'right' }}>
                    <b>
                    {intro && `${intro.address} - ${Date.parse(intro.founding)}`}
                    </b>
                </div>
            </div>
        </>
    );
}

export default Intro;
