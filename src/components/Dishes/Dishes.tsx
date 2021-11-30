import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Fab, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { selectRestaurantsData } from '../../redux/modules/restaurants/selectors';
import { centsToDollars } from '../../helpers/centsToDollars';

type Props = {
    restaurantId: number
}

const Dishes: React.FC<Props> = ({restaurantId}) => {
    const restaurantsData = useSelector(selectRestaurantsData);
    const dishes = useMemo(() => {
        const currentRestaurant = restaurantsData.find(restaurant => restaurant.id === restaurantId);

        return currentRestaurant ? currentRestaurant.Dishes : [];
    }, [restaurantsData, restaurantId]);

    return (
        <Grid sx={{padding: 1}}>
            {dishes.map(({id, description, name, cost, previewLink}) => (
                <Card key={`${name}${id}`} sx={{
                    marginBottom: '15px', borderRadius: '20px', boxShadow: '0px 0px 6px 2px rgba(34, 60, 80, 0.25)'
                }}>
                    <CardHeader sx={{textAlign: 'center'}} title={name}/>
                    <CardMedia
                        component="img"
                        image={`${process.env.REACT_APP_BACKEND_URL}/images/${previewLink}`}
                        alt="Paella dish"
                        sx={{maxHeight: 265}}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{justifyContent: 'right'}}>
                        <Fab size='small' variant="extended">
                            {`Add ${centsToDollars(cost)}`}
                        </Fab>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );
};

export default Dishes;
