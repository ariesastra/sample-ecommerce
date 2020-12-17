import React from 'react';

// Dependencies
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Component
import Header from './components/Headers';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceorderScreen from './screens/PlaceorderScreen';

// Style

function App() {
  return (
    // Fragment (is empty element)
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path='/placeorder' component={PlaceorderScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/' component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  )
}

export default App;
