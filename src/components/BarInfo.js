import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

var foursquare = require('react-foursquare')({
    clientID: 'WTTC3AA3JUSCYVI2K3P4JLU04RBSRAVC4RL0KVNQIVUCHTWZ',
    clientSecret: 'UBA21K3XTF3Q3MCQPZBK1ZYZ0HTUV4OUWEVZ0YYLOCGS41E1'
});

class BarInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            address: [],
            contact: [],
            likes: [],
            price: [],
            picture: [],
            attributes: []
        };
    }
    
    componentDidMount() {
        let params = {"venue_id" : this.props.match.params.id}
        foursquare.venues.getVenue(params)
            .then(res => {
                console.log(res)
                this.setState({
                    item: res.response.venue ,
                    address: res.response.venue.location,
                    contact: res.response.venue.contact,
                    likes: res.response.venue.likes,
                    price: res.response.venue.price,
                    picture: res.response.venue.bestPhoto,
                    attributes: res.response.venue.attributes.groups
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Infos sur le bar choisi</h1>
                <p>{this.state.item.name}</p>
                <p>{this.state.address.address}</p>
                <p>{this.state.contact.formattedPhone}</p>
                <p>Recommandations : {this.state.likes.count}</p>
                <p>{this.state.price.message} {this.state.price.tier}</p>
                <img src={this.state.picture.prefix + '300x500' + this.state.picture.suffix} alt=""/>
                {/* <ul> {this.state.attributes.map(el => {
                    return (
                        <li key={el.count}>{el.count} {el.name}</li>
                    )
                })
                }</ul> */}
            </div>

        )
    }
}

export default BarInfo