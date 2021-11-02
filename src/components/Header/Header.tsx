import React, { useEffect, useMemo, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Drawer, MenuItem } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfileRequest, handleLogout } from '../../redux/modules/users/actions';
import { selectUserProfile } from '../../redux/modules/users/selectors';

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
        if (!document.cookie) {
            return;
        }

        dispatch(getUserProfileRequest());
    }, [dispatch]);

    const dashboardHandler = () => {
        history.push('/dashboard');
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
                        {isAdmin && <MenuItem onClick={dashboardHandler}>Admin Dashboard</MenuItem>}
                        <MenuItem onClick={handleClose}>About Site</MenuItem>
                    </Drawer>
                    <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                        Restaurants
                    </Typography>
                    {!document.cookie && <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>}
                    {!!document.cookie && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;
