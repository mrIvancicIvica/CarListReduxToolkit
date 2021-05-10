import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import {
  Button,
  Container,
  TextField,
  makeStyles,
  Grid,
} from '@material-ui/core';
import * as yup from 'yup'
import { updateCar } from '../redux/carsSlice';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const validationSchema = yup.object({
  brand: yup.string('Enter brand name').required('Required brand insert'),
  model: yup.string('Enter model name').required('Required model insert'),
  color: yup.string('Enter color').required('Required color insert')

})

const EditCar = ({ editCar, setOpenDialog }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      brand: editCar.brand,
      model: editCar.model,
      color: editCar.color,
    },
    validationSchema,
    onSubmit: ({ brand, model, color }) => {
      setOpenDialog(false);
      dispatch(updateCar({ id: editCar.id, changes: { brand, model, color } }));
    },
  });

  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Edit Car</h2>
        <form onSubmit={formik.handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                id='brand'
                name='brand'
                label='Brand'
                value={formik.values.brand}
                onChange={formik.handleChange}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
                variant='outlined'
                color='secondary'
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                id='model'
                name='model'
                label='Vehicle Model'
                value={formik.values.model}
                onChange={formik.handleChange}
                error={formik.touched.model && Boolean(formik.errors.model)}
                helperText={formik.touched.model && formik.errors.model}
                variant='outlined'
                color='secondary'
                fullWidth
              />
              <TextField
                className={classes.form}
                id='color'
                name='color'
                label='Vehicle Color'
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
                variant='outlined'
                color='secondary'
                fullWidth
              />
            </Grid>
          </Grid>
          <Button
            className={classes.submit}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default EditCar;
