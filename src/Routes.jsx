import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Carlist from './Components/CarList';
import Header from './Components/Header';
import AddNewCar from './Components/AddNewCar';
import CarDetails from './Components/CarDetails';

const Routes = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route path='/' component={Carlist} exact />
      <Route path='/addnewcar' component={AddNewCar} />
      <Route path='/:cardetail' component={CarDetails} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
