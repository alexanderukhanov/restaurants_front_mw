import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

import { Grid, IconButton, Fab } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { getRestaurantsData, updateRestaurantData } from '../../redux/modules/restaurants/actions';
import { selectRestaurantsData } from '../../redux/modules/restaurants/selectors';
import { selectUserProfile } from '../../redux/modules/users/selectors';

import { RestaurantData } from '../../redux/modules/restaurants/types';

const likesList = new Map();

const MainContent = () => {
    const dispatch = useDispatch();
    const restaurantsData = useSelector(selectRestaurantsData);
    const userProfile = useSelector(selectUserProfile);
    const [data, setData] = useState<RestaurantData[]>([]);

    const handleLike = async (id: RestaurantData['likes']) => {
        if (!userProfile.id) return;

        const like = likesList.get(id);
        if (!like) {
            likesList.set(id, true);
        } else if (like) {
            likesList.set(id, !like);
        }

        const isLikeApplied = await dispatch(updateRestaurantData({id}));

        typeof isLikeApplied === 'boolean' && isLikeApplied && setData(prevState => {
            return prevState.map((restaurantsData) => {
                if (restaurantsData.id === id) {
                    return {
                        ...restaurantsData,
                        likes: restaurantsData.likes + (likesList.get(id) ? 1 : -1),
                    };
                }

                return restaurantsData;
            });
        });
    };

    useEffect(() => {
        restaurantsData.forEach(({id, isLiked}) => {
            if (isLiked) likesList.set(id, true);
        });
    }, [restaurantsData]);

    useEffect(() => {
        setData(restaurantsData);
    }, [restaurantsData]);

    useEffect(() => {
        dispatch(getRestaurantsData());
    }, [dispatch]);

    return (
        <Grid sx={{padding: 1}}>
            {data.map(({
                           id,
                           name,
                           address,
                           type,
                           previewLink,
                           likes,
                       }) => (
                <Card key={`${name}${id}`} sx={{
                    marginBottom: '15px', borderRadius: '20px', boxShadow: '0px 0px 6px 2px rgba(34, 60, 80, 0.25)'
                }}>
                    <CardHeader sx={{textAlign: 'center'}} title={name}/>
                    <CardMedia
                        component="img"
                        image={`${process.env.REACT_APP_BACKEND_URL}/images/${previewLink}`}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {`Kitchen: ${type}`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{marginTop: 2}}>
                            {`Address: ${address}`}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{justifyContent: 'space-between'}}>
                        <IconButton aria-label="add to favorites" sx={{fontSize: 22}} onClick={() => handleLike(id)}>
                            <FavoriteIcon sx={{color: likesList.get(id) ? '#020202' : '#d7cfcf'}}/> {likes}
                        </IconButton>
                        <Fab size='small' variant="extended" onClick={() => dispatch(push(`/restaurant/${id}`))}>
                            Choose dishes
                        </Fab>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );
};

export default MainContent;
