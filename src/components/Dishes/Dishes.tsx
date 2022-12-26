import React, { useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { Fab, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { selectRestaurantsData } from '../../redux/modules/restaurants/selectors';
import { centsToDollars } from '../../helpers/centsToDollars';
import { Context } from '../../App';
import { DishData } from '../../redux/modules/restaurants/types';

type Props = {
    restaurantId: number
}

const Dishes: React.FC<Props> = ({restaurantId}) => {
    const dispatch = useDispatch();
    const [, setContext] = useContext(Context);
    const restaurantsData = useSelector(selectRestaurantsData);
    const dishes = useMemo(() => {
        const currentRestaurant = restaurantsData.find(restaurant => restaurant.id === restaurantId);

        return currentRestaurant ? currentRestaurant.Dishes : [];
    }, [restaurantsData, restaurantId]);

    const handleAddDish = (dish: DishData) => {
        setContext(prevState => {
            const currentDishPresentInCart = prevState.find(dishInCart => dishInCart.id === dish.id);
            const [firstRecord] = prevState;
            if (!prevState.length || !currentDishPresentInCart) {
                if (firstRecord && firstRecord.restaurantId !== dish.restaurantId) return prevState;

                return [...prevState, {
                    ...dish,
                    amount: 1
                }];
            }

            return prevState.map(dishInCart => ({
                ...dishInCart,
                amount: dishInCart.id === currentDishPresentInCart.id
                    ? dishInCart.amount + 1
                    : dishInCart.amount
            }));
        });
    };

    useEffect(() => {
       !restaurantsData.length && dispatch(push('/'));
    }, [dispatch, restaurantsData]);

    return (
        <Grid sx={{padding: 1}}>
            {dishes.map((dish, index) => {
                const {id, description, name, cost, previewLink} = dish;

                return (
                    <Card key={`${name}${id}`} sx={{
                        marginBottom: '15px', borderRadius: '20px', boxShadow: '0px 0px 6px 2px rgba(34, 60, 80, 0.25)'
                    }}>
                        <CardHeader id={`dish-name${index}`} sx={{textAlign: 'center'}} title={name}/>
                        <CardMedia
                            component="img"
                            id={`image-dish${index}`}
                            image={`${previewLink.match('https://')
                                ? previewLink
                                : process.env.REACT_APP_BACKEND_URL + '/images/' + previewLink}`
                            }
                            alt="Paella dish"
                            sx={{maxHeight: 265}}
                        />
                        <CardContent>
                            <Typography id={`dish-description${index}`}  variant="body2" color="text.secondary" align="center">
                                {description}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing sx={{justifyContent: 'right'}}>
                            <Fab id={`dish-cost${index}`}  size='small' variant="extended" style={{zIndex: 'auto'}}  onClick={() => handleAddDish(dish)}>
                                {`Add ${centsToDollars(cost)}`}
                            </Fab>
                        </CardActions>
                    </Card>
                );
            })}
        </Grid>
    );
};

export default Dishes;
