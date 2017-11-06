import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

var foursquare = require('react-foursquare')({
    clientID: 'WTTC3AA3JUSCYVI2K3P4JLU04RBSRAVC4RL0KVNQIVUCHTWZ',
    clientSecret: 'UBA21K3XTF3Q3MCQPZBK1ZYZ0HTUV4OUWEVZ0YYLOCGS41E1'
});

var params = {
    "near": "Bordeaux",
    "categoryId": "4bf58dd8d48988d116941735"
};

class BarMap extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            lat: 44.837912,
            lng: -0.579541,
            zoom: 13,
        };
    }

    componentDidMount() {
        foursquare.venues.getVenues(params)
            .then(res => {
                console.log(res)
                this.setState({ items: res.response.venues });
            });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return(
            <div>
                <h1>Carte des bars</h1>
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.state.items.map(item => {
                        const positionMarker = [item.location.lat, item.location.lng];
                        console.log(item.name + ' ' + positionMarker);
                        return(
                            <Marker key={item.id} ref={item.id} position={positionMarker}>
                            <Popup>
                                <span>{item.name}</span>
                            </Popup>
                        </Marker>
                    )})}
                </Map>
            </div>
        )
    }
}

export default BarMap;