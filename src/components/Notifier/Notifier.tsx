import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import { selectUserErrors } from '../../redux/modules/users/selectors';
import { selectRestaurantsErrors } from '../../redux/modules/restaurants/selectors';
import { clearRestaurantsErrors } from '../../redux/modules/restaurants/actions';
import { clearUsersErrors } from '../../redux/modules/users/actions';

type TransitionProps = Omit<SlideProps, 'direction'>;

function TransitionLeft(props: TransitionProps) {
    return <Slide {...props} direction="left"/>;
}

const Notifier = () => {
    const userErrors = useSelector(selectUserErrors);
    const restaurantsErrors = useSelector(selectRestaurantsErrors);
    const errors = userErrors.concat(restaurantsErrors);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    useEffect(() => setOpen(true), [errors.length]);

    useEffect(() => {
        if (!open && errors.length) {
            dispatch(clearRestaurantsErrors());
            dispatch(clearUsersErrors());
        }
    }, [dispatch, open, errors.length]);

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason !== 'clickaway') {
            setOpen(false);
        }
    };

    return (
        <>
            {errors.map((error, index) => (
                <Snackbar
                    key={index + error + index}
                    open={open}
                    autoHideDuration={5000}
                    onClose={handleClose}
                    anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                    TransitionComponent={TransitionLeft}
                    sx={{marginTop: `${60 * index}px`}}
                >
                    <MuiAlert
                        elevation={6}
                        onClose={handleClose}
                        variant="filled"
                        severity="error"
                        sx={{minWidth: '50%'}}
                    >
                        {error}
                    </MuiAlert>
                </Snackbar>
            ))}
        </>
    );
};

export default Notifier;
