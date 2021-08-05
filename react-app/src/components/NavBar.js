
import React from 'react';
import { NavLink } from 'react-router-dom';
import DemoButton from './auth/DemoButton';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  return (
    <nav id="nav__container">
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/mycollections' exact={true} activeClassName='active'>
            My Collections
          </NavLink>
        </li>
        <li>
          <NavLink to='/services/1/' exact={true} activeClassName='active'>
            Service 1
          </NavLink>
        </li>
        <li>
          <NavLink to='/services/3/' exact={true} activeClassName='active'>
            Service 3 no comments
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li>
          <DemoButton />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
