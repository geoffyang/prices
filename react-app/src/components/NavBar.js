
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DemoButton from './auth/DemoButton';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {

  const user = useSelector(state => state.session.user);

  return (
    <nav id="nav__container">
      <div id="nav__inner-container">


        <div id="nav__left">

          <Link to='/' >
            Hospital Prices
          </Link>

        </div>


        <div id="nav__right">
          {(user != null) &&
            (
              <>
                <div className="nav__button">
                  <Link to='/mycollections' >
                    Collections
                  </Link>
                </div>
                {/* <div className="nav__button">
                  <Link to='/services/1/' >
                    Service 1
                  </Link>
                </div>
                <div className="nav__button">
                  <Link to='/services/3/' >
                    Service 3
                  </Link>
                </div> */}
              </>)
          }


          {(user === null) &&
            (<><div className="nav__button">
              <Link to='/login' >
                Login
              </Link>
            </div>
              <div className="nav__button">
                <Link to='/sign-up' >
                  Sign Up
                </Link>
              </div></>)}


          {(user != null) && (
            <div className="nav__button">
              <LogoutButton />
            </div>)}


          {(user === null) &&
            <div className="nav__button">
              <DemoButton />
            </div>
          }
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

