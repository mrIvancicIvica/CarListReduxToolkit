import { useState } from 'react';
import { useFormik } from 'formik';
import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import {
  makeStyles,
  TextField,
  Button,
  Container,
  Grid,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { addCar } from '../redux/carsSlice';

//! Styles from MaterialUI

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

//! Component

const AddNewCar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  //! Formik
  const formik = useFormik({
    initialValues: { brand: '', model: '', color: '' },
    onSubmit: ({ brand, model, color }) => {
      dispatch(addCar({ id: nanoid(), brand, model, color }));
      setOpen(true);
      formik.resetForm({ values: { brand: '', model: '', color: '' } });
    },
  });

  //! Functions

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container maxWidth='md' component='main'>
      <div className={classes.paper}>
        <h2>Add New Car</h2>
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message='You added successfully new car'
        action={
          <>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={handleClose}
            >
              <CloseIcon fontSize='small' />
            </IconButton>
          </>
        }
      />
    </Container>
  );
};

export default AddNewCar;
