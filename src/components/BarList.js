import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import TextField from 'material-ui/TextField';
import Icon from 'material-ui/Icon';
import SearchIcon from 'material-ui-icons/Search';


const styles = theme => ({
    root: {
        marginTop: 30
    },
    card: {
        minWidth: 275,
        margin : 10
    },
    pos: {
        marginTop: 30,
        color: theme.palette.text.secondary
    }
});

var foursquare = require('@haroenv/react-foursquare')({
    clientID: 'WTTC3AA3JUSCYVI2K3P4JLU04RBSRAVC4RL0KVNQIVUCHTWZ',
    clientSecret: 'UBA21K3XTF3Q3MCQPZBK1ZYZ0HTUV4OUWEVZ0YYLOCGS41E1'
});

var params = {
    "near": "Bordeaux",
    "categoryId": "4bf58dd8d48988d116941735"
};

class BarList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bars: [],
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
        this.setState({search: event.target.value});
    }

    render() {
        const { classes } = this.props;
        
        let filteredBars = this.state.bars.filter(
            (bar) => {
                return bar.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            }
        );
        
        return (
            <div className="blocPage">
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <h1>Les bars de Bordeaux :</h1>
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
                
                <Grid container className={classes.root}>
                    {filteredBars.map(bar => {
                        return (
                            <Grid key={bar.id} item xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography type="headline" component="h1">
                                            {bar.name}
                                        </Typography>
                                        <Typography type="body1" className={classes.pos}>
                                            Adresse : {bar.location.address ? bar.location.address : 'non renseignée'}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link to={`/${bar.id}`}>
                                            <Button dense>Learn More</Button>
                                        </Link>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(BarList);