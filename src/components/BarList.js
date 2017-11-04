import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import List, {
    ListItem,
    ListItemIcon,
    ListItemText,
} from 'material-ui/List';

const styles = theme => ({
    demo: {
        background: theme.palette.background.paper,
    }
});

var foursquare = require('react-foursquare')({
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
            items: [],
        };
    }

    componentDidMount() {
        foursquare.venues.getVenues(params)
            .then(res => {
                console.log(res.response)
                this.setState({ items: res.response.venues });
            });
    }

    render() {
        const { classes } = this.props;
        const { dense, secondary } = this.state;

        return (
            <div>
                <h1>Les bars de Bordeaux :</h1>
                <Grid container>
                    {this.state.items.map(item => {
                        return (
                            <Grid key={item.id} item xs={12} md={6}>
                                <div className={classes.demo}>
                                    <List dense={dense}>
                                            <ListItem button>
                                                <ListItemText
                                                primary={item.name}
                                                />
                                            </ListItem>
                                    </List>
                                </div>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    }
}

BarList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BarList);