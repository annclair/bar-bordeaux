import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom'

import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import SearchIcon from 'material-ui-icons/Search';

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
            search: ''
        };
    }

    componentDidMount() {
        foursquare.venues.getVenues(params)
            .then(res => {
                console.log(res)
                this.setState({ items: res.response.venues });
            });
    }

    searchList(event) {
        this.setState({ search: event.target.value });
    }

    render() {
        const position = [this.state.lat, this.state.lng];

        let filteredBars = this.state.items.filter(
            (bar) => {
                return bar.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return(
            <div>
                <form noValidate>
                    <TextField
                        id="search"
                        label="Rechercher un bar"
                        type="search"
                        margin="normal"
                        onChange={this.searchList.bind(this)}
                    />
                    <Icon color="primary"
                        aria-label="Search">
                        <SearchIcon />
                    </Icon>
                </form>
                <h1>Carte des bars</h1>
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredBars.map(item => {
                        const positionMarker = [item.location.lat, item.location.lng];
                        return(
                            <Marker key={item.id} ref={item.id} position={positionMarker}>
                                <Popup>
                                    <h2>{item.name}</h2>
                                </Popup>
                            </Marker>
                        )
                    })}
                </Map>
            </div>
        )
    }
}

export default BarMap;