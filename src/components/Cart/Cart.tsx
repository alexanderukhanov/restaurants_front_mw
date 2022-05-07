import React, { useContext, useMemo, useState } from 'react';
import Badge from '@mui/material/Badge';
import { AddShoppingCart } from "@mui/icons-material";
import { Fab, Grid, IconButton, Typography } from "@mui/material";
import { Context } from '../../App';
import { createStyles, Drawer, Divider, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { centsToDollars } from '../../helpers/centsToDollars';
import { DishData } from '../../redux/modules/restaurants/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile } from '../../redux/modules/users/selectors';
import { useHistory } from 'react-router-dom';
import { selectIsNewOrderCreated, selectRestaurantsData } from '../../redux/modules/restaurants/selectors';
import { createOrderRequest, createOrderSuccess } from '../../redux/modules/restaurants/actions';
import SuccessModal from '../../modals/SuccessModal';

const style = createStyles({
    drawer: {
        width: '60%',
    },
    divider: {
        width: '95%',
        height: 3,
        margin: '20px 0px',
        backgroundColor: '#362bc1',
        borderRadius: '50%',
    }
});
const madeStyles = makeStyles(style);

const Cart = () => {
    const userProfile = useSelector(selectUserProfile);
    const restaurantsData = useSelector(selectRestaurantsData);
    const isNewOrderCreated = useSelector(selectIsNewOrderCreated);
    const [context, setContext] = useContext(Context);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const styles = madeStyles();

    const handleClose = () => {
        setIsDrawerOpened(false);
    };

    const changeDishAmount = (dishId: DishData['id'], isIncrease: boolean) => {
        setContext(prevState => {
            return prevState.map(dishInCart => ({
                ...dishInCart,
                amount: dishInCart.id === dishId
                    ? dishInCart.amount + (isIncrease ? +1 : -1)
                    : dishInCart.amount
            })).filter(dish => dish.amount !== 0);
        });
    };

    const handleIncreaseDishAmount = (dishId: DishData['id']) => changeDishAmount(dishId, true);
    const handleDecreaseDishAmount = (dishId: DishData['id']) => changeDishAmount(dishId, false);

    const restaurantName = useMemo(() => {
        const [firstRecord] = context;
        return restaurantsData.find(restaurant => restaurant.id === firstRecord?.restaurantId)?.name;
    }, [context, restaurantsData]);

    const totalCost = useMemo(() => context
        .reduce((acc, {cost, amount}) => acc + Number(cost) * amount, 0), [context]);

    const handleBuy = () => {
        if (!userProfile.id) {
            history.push('/login');
            return;
        }
        const [firstRecord] = context;
        if (!firstRecord || !firstRecord.restaurantId) return;

        setIsDisabled(true);
        dispatch(createOrderRequest({
            totalCost: totalCost.toString(),
            restaurantId: firstRecord.restaurantId,
            dishes: context.map(({id, amount, name}) => ({id, amount, name}))
        }));

    };

    const successModalCloseHandler = () => {
        dispatch(createOrderSuccess(false));
        setIsDisabled(false);
        setContext([]);
    };

    return (
        <Grid>
            <IconButton
                id="button-open-cart"
                onClick={() => setIsDrawerOpened(true)}
                sx={{position: 'fixed', zIndex: 1, top: '70px', right: '20px', backgroundColor: 'darkgrey'}}>
                <Badge id="cart-content-amount" badgeContent={context.length} color="error">
                    <AddShoppingCart/>
                </Badge>
            </IconButton>
            <Drawer
                anchor="right"
                open={isDrawerOpened}
                onClose={handleClose}
                classes={{paper: styles.drawer}}
            >
                <Typography sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>
                    Your Cart
                </Typography>
                {!!totalCost &&
                    <>
                        <Typography sx={{textAlign: 'center', fontSize: '20px'}}>
                            Restaurant:
                        </Typography>
                        <Typography id="cart-restaurant-name" sx={{
                            textAlign: 'center',
                            textDecoration: 'underline',
                            fontSize: '20px',
                            letterSpacing: '1px'
                        }}>
                            {restaurantName}
                        </Typography>
                    </>
                }

                {context.map(({id, name, amount, previewLink, cost}, index) => (
                    <Grid key={`${name}${id}`} container direction='column' alignItems='center'>
                        <CardHeader id={`cart-dish-name${index}`} sx={{textAlign: 'center'}} title={name}/>
                        <CardMedia
                            component="img"
                            id={`cart-dish-image${index}`}
                            image={`${process.env.REACT_APP_BACKEND_URL}/images/${previewLink}`}
                            alt="Paella dish"
                            sx={{maxHeight: 150, maxWidth: 150}}
                        />
                        <Typography
                            id={`cart-dish-cost${index}`}
                            sx={{margin: '10px 0px'}}
                        >
                            {`Price: ${centsToDollars(cost)}`}
                        </Typography>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button id={`cart-button-minus${index}`} onClick={() => handleDecreaseDishAmount(id)}>-</Button>
                            <Button id={`cart-dish-amount${index}`} disabled style={{color: 'black'}}>{amount}</Button>
                            <Button id={`cart-button-plus${index}`} onClick={() => handleIncreaseDishAmount(id)}>+</Button>
                        </ButtonGroup>
                        <Divider className={styles.divider}/>
                    </Grid>
                ))}
                {!!totalCost &&
                    <>
                        <Typography id="cart-total-cost" sx={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px'}}>
                            {`Total: ${centsToDollars(totalCost)}`}
                        </Typography>
                        <Grid container direction='column' alignItems='center' sx={{margin: '30px 0px'}}>
                            <Fab size='small'
                                 id="cart-button-buy"
                                 variant="extended"
                                 sx={{width: '90%'}}
                                 onClick={handleBuy}
                                 disabled={isDisabled}
                            >
                                {`Buy`}
                            </Fab>
                        </Grid>
                    </>
                }
            </Drawer>
            <SuccessModal
                isNewEntityCreated={isNewOrderCreated}
                successModalCloseHandler={successModalCloseHandler}
                text="Order successfully created!"
            />
        </Grid>
    );
};

export default Cart;
