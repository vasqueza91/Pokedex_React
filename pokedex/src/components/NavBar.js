import React from 'react';
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    AppBar: {
        backgroundColor: 'black'
    },
    link: {
        textDecoration: 'none'
    },
    title: {
        cursor: 'pointer',
        color: 'white'
    }
}))

function NavBar() {
    const classes = useStyles()

    return (
        <AppBar className={classes.AppBar} position="fixed">
            <Toolbar>
                <Link to='/' className={classes.link}>
                    <Typography className={classes.title} variant="h6">Pokedex</Typography>
                </Link>
                <Link to="/favorites" className={classes.link}>
                    <Typography className={classes.title} variant="h6" style={{ marginLeft: 15 }}>Favorites</Typography>
                </Link>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar