import React, { Component } from 'react';
import { Link } from 'react-router-dom' ;

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

const styles = theme => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    }
});

class NavBar extends Component {

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" >
                    <Toolbar>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                <Link to='/'>Les bars de Bordeaux</Link>
                            </Typography>
                            <Button color="contrast"><Link to='/'>Liste</Link></Button>
                            <Button color="contrast"><Link to='/map'>Carte</Link></Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar);