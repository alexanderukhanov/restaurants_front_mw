import React, { useEffect, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, MenuItem } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import { getUserProfileRequest, handleLogout } from '../../redux/modules/users/actions';
import { selectUserProfile } from '../../redux/modules/users/selectors';
import { isCookiePresent } from "../../constants";

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const userProfile = useSelector(selectUserProfile);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const handleClose = () => {
        setIsDrawerOpened(false);
    };

    const logoutHandler = () => {
        dispatch(handleLogout);
        history.go(0);
    };

    useEffect(() => {
        if (!isCookiePresent()) {
            return;
        }

        dispatch(getUserProfileRequest());
    }, [dispatch]);

    const dashboardHandler = () => {
        history.push('/dashboard');
        handleClose();
    };

    const aboutSiteHandler = () => {
        history.push('/about');
        handleClose();
    };

    const isAdmin = useMemo(() => (
        userProfile.role === 'admin'
    ), [userProfile]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        id="hamburger-menu"
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
                        {isAdmin && <MenuItem id="menu-item-dashboard" onClick={dashboardHandler}>Admin Dashboard</MenuItem>}
                        <MenuItem id="menu-item-about" onClick={aboutSiteHandler}>About Site</MenuItem>
                    </Drawer>
                    <Typography id="header-title" variant="h6" className={classes.title} onClick={() => history.push('/')}>
                        Restaurants
                    </Typography>
                    {!isCookiePresent() && <Button id="button-login" color="inherit" onClick={() => history.push('/login')}>Login</Button>}
                    {!!isCookiePresent() && <Button id="button-logout" color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
