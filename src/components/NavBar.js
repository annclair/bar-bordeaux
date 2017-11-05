import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    }
});

function SimpleAppBar(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            <Link to='/'>Les bars de Bordeaux</Link>
                        </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);