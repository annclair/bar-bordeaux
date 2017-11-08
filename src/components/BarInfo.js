import React, { Component } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Card, { CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Hidden from 'material-ui/Hidden';

const styles = theme => ({
    root: {
        marginTop: 30,
        height : "auto"
    },
    card: {
        margin: 10,
        minHeight : 500
    },
    pos: {
        marginTop: 30,
        color: theme.palette.text.secondary
    },
    body:{
        margin: 10,
    },
    map: {
        height : 240
    },
    titles: {
        paddingTop : 10
    },
    noImage: {
        margin: 10,
        height : 500
    },
    image: {
        margin: 10
    }
});

var foursquare = require('@haroenv/react-foursquare')({
    clientID: 'WTTC3AA3JUSCYVI2K3P4JLU04RBSRAVC4RL0KVNQIVUCHTWZ',
    clientSecret: 'UBA21K3XTF3Q3MCQPZBK1ZYZ0HTUV4OUWEVZ0YYLOCGS41E1'
});

class BarInfo extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            bar: [],
            address: [],
            contact: [],
            likes: [],
            price: [],
            picture: [],
            attributes: [],
            zoom: 18
        };
    }
    
    componentDidMount() {
        let params = {"venue_id" : this.props.match.params.id}
        foursquare.venues.getVenue(params)
            .then(res => {
                this.setState({
                    bar: res.response.venue ,
                    address: res.response.venue.location,
                    contact: res.response.venue.contact,
                    likes: res.response.venue.likes,
                    price: res.response.venue.price,
                    picture: res.response.venue.bestPhoto,
                    attributes: res.response.venue.attributes.groups,
                    position : [res.response.venue.location.lat, res.response.venue.location.lng] 
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className="blocPage">
                <div>
                    <Grid container className={classes.root}>
                        <Hidden xsDown>
                            <Grid item xs={12} sm={5}>
                                {this.state.picture ? <img src={this.state.picture.prefix + '300x500' + this.state.picture.suffix} alt={"Best Image of " + this.state.bar.name} className={classes.image}/> : <p className={classes.noImage}>Image non disponible</p>}
                            </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={6}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography type="headline" component="h1">
                                        Infos sur : {this.state.bar.name} <br/>
                                    </Typography>
                                    <Typography type="body1" className={classes.pos}>
                                        {this.state.bar.description}
                                    </Typography>
                                    <Divider light />
                                    <Typography type="body1" component="p" className={classes.body}>
                                        Prix : {this.state.price ? this.state.price.message : "Non renseigné"} <br/>
                                        {this.state.likes ? this.state.likes.count + " recommandation" + (this.state.likes.count > 1 ? "s" : "") : "Aucune recommandation"}
                                    </Typography>
                                    <Typography type="headline" component="h3" className={classes.titles}>
                                        Ses caractéristiques :
                                    </Typography>
                                    {this.state.attributes.map(attribute => {
                                        return (
                                            <Typography component="p" key={attribute.summary}> {attribute.summary}</Typography>
                                        )
                                    })}
                                    <Divider light />
                                    <Typography type="body1" className={classes.pos}>
                                        Adresse : {this.state.address.address || 'Non renseignée'} <br />
                                        Téléphone : {this.state.contact.formattedPhone || 'Non renseigné'} <br /> 
                                        {this.state.bar.url ? ("Son site internet : " + this.state.bar.url) : ''}
                                    </Typography>
                                    <Map center={this.state.position} zoom={this.state.zoom} className={classes.map}>
                                        <TileLayer
                                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker position={this.state.position}></Marker>
                                    </Map>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>

        )
    }
}


export default withStyles(styles)(BarInfo);