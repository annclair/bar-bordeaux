import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

class BarMap extends Component {

    constructor() {
        super();
        this.state = {
            lat: 44.837912,
            lng: -0.579541,
            zoom: 13,
        };
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
                    <Marker position={position}>
                        {/* <Popup>
                            <span>A pretty CSS3 popup.
                                <br />
                                Easily customizable.
                            </span>
                        </Popup> */}
                    </Marker>
                </Map>
            </div>
        )
    }
}

export default BarMap;