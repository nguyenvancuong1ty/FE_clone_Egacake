import GoogleMapReact from 'google-map-react';
import Header from '~/components/Header';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
function Map() {
    const defaultProps = {
        center: {
            lat: 21.02154,
            lng: 105.77489,
        },
        zoom: 50,
    };

    return (
        <>
        <Header/>
            <div className="mt-120"></div>
            <div className="container">
                <div style={{ height: 'calc(100vh - 100px)', width: '100%', margin: '0 auto 40px auto' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: '' }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >
                        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
                    </GoogleMapReact>
                </div>
            </div>
        </>
    );
}

export default Map;
