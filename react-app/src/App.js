import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Splash from './components/Splash';
import Footer from './components/Footer';
import ServicePage from './components/ServicePage';
import { authenticate } from './store/session';
import CollectionsPage from './components/CollectionsPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>

        <Route path='/' exact={true}>
          <Splash />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>

        <ProtectedRoute path='/mycollections' exact={true} >
          <CollectionsPage />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <ProtectedRoute path='/' exact={true} >
          <CollectionsPage />
        </ProtectedRoute>

        <ProtectedRoute exact path='/services/:id'>
          <ServicePage />
        </ProtectedRoute>

      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
