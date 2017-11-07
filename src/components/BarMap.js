import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';

import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import SearchIcon from 'material-ui-icons/Search';
import Typography from 'material-ui/Typography';

var foursquare = require('@haroenv/react-foursquare')({
    clientID: 'WTTC3AA3JUSCYVI2K3P4JLU04RBSRAVC4RL0KVNQIVUCHTWZ',
    clientSecret: 'UBA21K3XTF3Q3MCQPZBK1ZYZ0HTUV4OUWEVZ0YYLOCGS41E1'
});

var params = {
    "near": "Bordeaux",
    "categoryId": "4bf58dd8d48988d116941735"
};

const styles = theme => ({
    pos: {
        marginTop: 30,
        color: theme.palette.text.secondary
    }
});

class BarMap extends Component {

    constructor() {
        super();
        this.state = {
            bars: [],
            lat: 44.837912,
            lng: -0.579541,
            zoom: 13,
            search: ''
        };
    }

    componentDidMount() {
        foursquare.venues.getVenues(params)
            .then(res => {
                this.setState({ bars: res.response.venues });
            });
    }

    searchList(event) {
        this.setState({ search: event.target.value });
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const { classes } = this.props;

        let filteredBars = this.state.bars.filter(
            (bar) => {
                return bar.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );

        return(
            <div>
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <h1>Carte des bars</h1>
                    </Grid>
                    <Grid item xs={12} sm={4}>
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
                    </Grid>
                </Grid>

                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {filteredBars.map(bar => {
                        const positionMarker = [bar.location.lat, bar.location.lng];
                        return(
                            <div key={bar.id}>
                                <Marker ref={bar.id} position={positionMarker}>
                                    <Tooltip>
                                            <span>{bar.name}</span>
                                    </Tooltip>
                                    <Popup>
                                        <div>
                                            <Typography type="headline" component="h1">
                                                {bar.name}
                                            </Typography>
                                            {bar.categories.map(category => {
                                                return (
                                                    <Typography key={category.id} type="body1" component="p" className={classes.pos}>{category.name}</Typography>
                                                )
                                            })}
                                            <Typography type="body1" component="p">
                                                Adresse : {bar.location.address || 'Non renseignée'} <br />
                                                Téléphone : {bar.contact.formattedPhone || "Non renseigné"}
                                            </Typography>
                                        </div>
                                    </Popup>
                                </Marker>
                            </div>
                        )
                    })}
                </Map>
            </div>
        )
    }
}

export default withStyles(styles)(BarMap);