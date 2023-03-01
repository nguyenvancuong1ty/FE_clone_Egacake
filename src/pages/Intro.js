import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '~/components/Header';

function Intro() {
    const [intro, setIntro] = useState({
        data: '',
    });
    useEffect(() => {
        axios({
            method: 'get',
            url: '/v1/api/intro',
        }).then((res) => {
            setIntro(res.data.data[0]);
        });
    }, []);
    return (
        <>
        <Header/>
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
                        {intro.address} - {Date.parse(intro.founding)}
                    </b>
                </div>
            </div>
        </>
    );
}

export default Intro;
