import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
    Button,
    CardMedia,
    Collapse,
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    TextField,
    Typography,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SendIcon from '@material-ui/icons/Send';
import Alert from '@mui/material/Alert';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { addRestaurant } from '../../redux/modules/restaurants/types';
import useStyles from './styles';
import { createRestaurantRequest } from '../../redux/modules/restaurants/actions';

const initialDishState = {
    cost: '',
    description: '',
    name: '',
    previewLink: '',
};

const initialRestaurantState = {
    restaurant: {
        name: '',
        type: '',
        address: '',
        previewLink: '',
    },
    dishes: [{...initialDishState}],
};

const Dashboard = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [restaurantData, setRestaurantData] = useState<addRestaurant>(initialRestaurantState);
    const [open, setOpen] = useState<boolean[]>([true]);
    const [isUploadClicked, setIsUploadClicked] = useState(false);
    const formRef = useRef<null | HTMLFormElement>(null);

    const fileHandler = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const {name} = e.target;
        const files = e.target.files ?? [];
        const file = files[0];
        const reader = new FileReader();

        reader.onload = () => {
            if (name === 'restaurant') {
                setRestaurantData(prevState => ({
                        ...prevState,
                        restaurant: {
                            ...prevState.restaurant,
                            previewLink: reader.result as string
                        }
                    })
                );
            } else if (name === 'dish' && index !== undefined) {
                setRestaurantData((prevState => {
                    const dishes = [...prevState.dishes];
                    dishes.splice(index, 1, {
                        ...dishes[index],
                        previewLink: reader.result as string
                    });

                    return {
                        ...prevState,
                        dishes,
                    };
                }));
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const restaurantDataHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setRestaurantData(prevState => ({
            ...prevState,
            restaurant: {
                ...prevState.restaurant,
                [name]: value,
            }
        }));
    };

    const addDishHandler = () => {
        setRestaurantData(prevState => {
            const dishes = [...prevState.dishes];
            dishes.push(initialDishState);

            return {
                ...prevState,
                dishes
            };
        });

        setOpen(prevState => ([...prevState, true]));
    };

    const dishDataHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const {name, value} = e.target;
        setRestaurantData(prevState => {
                const dishes = [...prevState.dishes];
                dishes[index] = {...prevState.dishes[index], [name]: value};

                return {
                    ...prevState,
                    dishes,
                };
            }
        );
    };

    const collapseHandler = (index: number) => (
        setOpen(prevState => {
            const arr = [...prevState];
            arr[index] = !arr[index];
            return arr;
        })
    );

    const isImageToSend = useMemo(() => {
        const restaurant = !restaurantData.restaurant.previewLink;
        const dishes = restaurantData.dishes.map(dish => !dish.previewLink);

        return {
            restaurant,
            dishes,
            isErrors: restaurant || dishes.find(dish => dish)
        };
    }, [restaurantData]);

    const handleDeleteDish = (index: number) => {
        setRestaurantData(prevState => {
            const dishes = [...prevState.dishes];
            dishes.splice(index, 1);

            return {
                ...prevState,
                dishes,
            };
        });

        setOpen(prevState => {
            const arr = [...prevState];
            arr.splice(index, 1);

            return arr;
        });
    };

    const handleInputCost = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toString();
        const [firstPart, secondPart] = value.split('.');

        if (secondPart && secondPart.length > 2) {
            e.target.value = firstPart + '.' + secondPart.slice(0, 2);
        } else if (firstPart.length > 3) {
            e.target.value = secondPart
                ? firstPart.slice(0, 3) + '.' + secondPart
                : firstPart.slice(0, 3);
        }
    };

    const handleUpload = () => {
        setIsUploadClicked(true);
        if (formRef.current?.reportValidity() && !isImageToSend.isErrors) {
            const restaurantDataToSend = {
                ...restaurantData, dishes: restaurantData.dishes.map(dish => ({
                    ...dish,
                    cost: (parseFloat(dish.cost) * 100).toString()
                }))
            };

            dispatch(createRestaurantRequest(restaurantDataToSend));
        }
    };

    useEffect(() => {
        formRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [restaurantData.dishes]);

    useEffect(() => {
        console.log({restaurantData});
        const cents = 2300;
        const dollars = cents / 100;
        const dollarsToShow = dollars.toLocaleString("en-US", {style: "currency", currency: "USD"});
        console.log({finalDollars: dollarsToShow});
    }, [restaurantData]);

    return (
        <FormControl component='form' innerRef={formRef} style={{width: '100%'}}>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
                spacing={1}
                style={{width: '100%', padding: '10px 0px'}}
            >
                <Typography variant="h6">Restaurant</Typography>

                <Grid className={classes.fieldsWrapper}>
                    <TextField label="Name" variant="standard" name='name' required onChange={restaurantDataHandler}/>
                    <TextField label="Type" variant="standard" name='type' required onChange={restaurantDataHandler}/>
                    <TextField
                        label="Address"
                        variant="standard"
                        onChange={restaurantDataHandler}
                        name='address'
                        required
                    />
                </Grid>
                <label htmlFor="contained-button-file">
                    <input
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        onChange={fileHandler}
                        name='restaurant'
                        accept='image/*'
                    />
                    <Button variant="contained" color="primary" component="span">
                        Upload Preview
                    </Button>
                </label>
                {isImageToSend.restaurant && isUploadClicked &&
                <Alert severity="warning" style={{width: '52%'}}>Please select a file</Alert>}

                <CardMedia
                    component="img"
                    className={classes.media}
                    image={restaurantData.restaurant.previewLink}
                />

                {restaurantData.dishes.map((dish, index) => (
                    <React.Fragment key={String(index)}>
                        <Divider className={classes.divider}/>
                        <Grid container justifyContent='space-evenly'>
                            <Grid item style={{display: 'flex', alignItems: 'center'}}
                                  onClick={() => collapseHandler(index)}>
                                <Typography variant="h6">{`Dish - ${index + 1}`}</Typography>
                                {open[index] ? <ExpandLess/> : <ExpandMore/>}
                            </Grid>
                            <Grid item style={{alignSelf: 'center'}}>
                                <DeleteOutlineIcon onClick={() => handleDeleteDish(index)}/>
                            </Grid>
                        </Grid>

                        <Collapse in={open[index]} timeout="auto" unmountOnExit style={{textAlign: 'center'}}>
                            <Grid className={classes.fieldsWrapper}>
                                <TextField
                                    label="Name"
                                    variant="standard"
                                    name='name'
                                    required
                                    onChange={(e) => dishDataHandler(e, index)}/>
                                <TextField
                                    label="Description"
                                    variant="standard"
                                    name='description'
                                    required
                                    onChange={(e) => dishDataHandler(e, index)}
                                />
                                <TextField
                                    label="Cost"
                                    variant="standard"
                                    type='number'
                                    onInput={handleInputCost}
                                    name='cost'
                                    required
                                    inputProps={{step: 'any'}}
                                    onChange={(e) => dishDataHandler(e, index)}
                                    InputProps={{
                                        startAdornment:
                                            <InputAdornment
                                                style={{margin: '0px 10px 0px 0px'}}
                                                position="end"
                                            >
                                                $
                                            </InputAdornment>
                                    }}
                                />
                            </Grid>
                            <label htmlFor={`contained-button-file${index}`}>
                                <input
                                    style={{display: "none"}}
                                    id={`contained-button-file${index}`}
                                    type="file"
                                    onChange={(e) => fileHandler(e, index)}
                                    name='dish'
                                    accept='image/*'
                                />
                                <Button variant="contained" color="primary" component="span">
                                    Upload Preview
                                </Button>
                            </label>
                            {isImageToSend.dishes[index] && isUploadClicked &&
                            <Alert severity="warning">Please select a file</Alert>}

                            <CardMedia
                                component="img"
                                className={classes.media}
                                image={dish.previewLink}
                            />
                        </Collapse>
                    </React.Fragment>
                ))
                }

                <Grid className={classes.addDishBlock} onClick={addDishHandler}>
                    <AddCircleIcon color='action'/>
                    <Typography style={{marginTop: 3}}>
                        Add Dish
                    </Typography>
                </Grid>

                <Button
                    variant="contained"
                    endIcon={<SendIcon/>}
                    style={{marginTop: 10}}
                    onClick={handleUpload}
                >
                    Upload
                </Button>
            </Grid>
        </FormControl>
    );
};

export default Dashboard;
