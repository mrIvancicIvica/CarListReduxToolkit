import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
} from '@material-ui/core';
import { carSelectors } from '../redux/carsSlice';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
});

const CarDetails = () => {
  const classes = useStyles();
  const { cardetail } = useParams();
  const car = useSelector((state) => carSelectors.selectById(state, cardetail));

  return (
    <Container>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant='h5' component='h2' className={classes.pos}>
            {car.brand}
          </Typography>
          <Typography variant='h5' component='h2' className={classes.pos}>
            {car.model}
          </Typography>
          <Typography variant='body2' component='p'>
            {car.color}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small'> ID: {car.id}</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default CarDetails;
