import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Drawer, MenuItem} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {
    const classes = useStyles();

    const [isDrawerOpened, setIsDrawerOpened] = useState(false)

    const handleClose = () => setIsDrawerOpened(false);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        className={classes.menuButton}
                        onClick={() => setIsDrawerOpened(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Drawer
                        anchor="left"
                        open={isDrawerOpened}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Admin Dashboard</MenuItem>
                    </Drawer>
                    <Typography variant="h6" className={classes.title}>
                        Restaurants
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
