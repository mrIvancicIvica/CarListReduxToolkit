import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  makeStyles,
  Container,
  TextField,
  InputAdornment,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Button,
  Dialog,
  TablePagination,
} from '@material-ui/core';
import { Search, Delete, Edit, Details } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { carSelectors, removeCar } from '../redux/carsSlice';
import EditCar from './EditCar';


//! Styles MaterilUI

const useStyles = makeStyles({
  table: {
    marginTop: 50,
  },
  header: {
    flexGrow: 1,
  },
  decor: {
    color:'white'
  }
});

//! Functions 

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

//! Component

const Carlist = () => {
  const allCars = useSelector(carSelectors.selectAll);
  const dispatch = useDispatch();

  const classes = useStyles();
  const [valueToOrderBy, setValueToOrderBy] = useState('name');
  const [orederDirection, setOrederDirection] = useState('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [filterCars, setFilterCars] = useState(allCars);
  const [editCar, setEditCar] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setFilterCars(
      allCars.filter((car) =>
        car.brand.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, allCars]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAscending =
      valueToOrderBy === property && orederDirection === 'asc';
    setValueToOrderBy(property);
    setOrederDirection(isAscending ? 'desc' : 'asc');
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleEditCar = (car) => {
    setEditCar(car);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <Container>
      <h1>List of Cars</h1>
      <TextField
        className={classes.margin}
        placeholder='Search car...'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Search />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Container component={Paper} className={classes.table}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell key='brand'>
                <TableSortLabel
                  active={valueToOrderBy === 'brand'}
                  direction={
                    valueToOrderBy === 'brand' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('brand')}
                >
                  Manufacturer
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='model'>
                <TableSortLabel
                  active={valueToOrderBy === 'model'}
                  direction={
                    valueToOrderBy === 'model' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('model')}
                >
                  Model
                </TableSortLabel>
              </TableCell>

              <TableCell align='right' key='color'>
                <TableSortLabel
                  active={valueToOrderBy === 'color'}
                  direction={
                    valueToOrderBy === 'color' ? orederDirection : 'asc'
                  }
                  onClick={createSortHandler('color')}
                >
                  Color
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(
              filterCars,
              getComparator(orederDirection, valueToOrderBy)
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((car) => (
                <TableRow key={car.id}>
                  <TableCell component='th' scope='row'>
                    {car.brand}
                  </TableCell>

                  <TableCell align='right'>{car.model}</TableCell>

                  <TableCell align='right'>{car.color}</TableCell>
                  <TableCell align='right'>
                    <Button
                      onClick={() => {
                        handleEditCar(car);
                      }}
                    >
                      <Edit fontSize='small' />
                    </Button>
                    <Button>
                      <Link to={`/${car.id}`} className={classes.decor}>
                        <Details fontSize='small' />
                      </Link>
                    </Button>
                    <Button onClick={() => dispatch(removeCar(car.id))}>
                      <Delete fontSize='small' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={allCars.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Container>
      <Dialog open={openDialog} onClose={handleClose}>
        <EditCar editCar={editCar} setOpenDialog={setOpenDialog} />
      </Dialog>
    </Container>
  );
};

export default Carlist;
