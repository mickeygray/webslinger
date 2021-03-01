import React, { Fragment, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li>
        {" "}
        <Link to='/verticals'>
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Verticals
          </button>
        </Link>
      </li>
      <li>
        {" "}
        <Link to='/blogs'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Blogs
          </button>
        </Link>
      </li>
      <li>
        {" "}
        <Link to='/firms'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Firms
          </button>
        </Link>
      </li>
      <li>
        <Link to='/reviews'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Reviews
          </button>
        </Link>
      </li>
      <li>
        <Link to='/articles'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Articles
          </button>
        </Link>
      </li>
      <li>
        <Link to='/quizzes'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Quizzes
          </button>
        </Link>
      </li>
      <li>
        <Link to='/emails'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Emails
          </button>
        </Link>
      </li>
      <li>
        <Link to='/images'>
          {" "}
          <button
            className='btn btn-sm btn-dark'
            style={{ borderRadius: "12px" }}>
            {" "}
            Images
          </button>
        </Link>
      </li>
      <li>
        <a className='text-danger lead' onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <div>
        <Link to='/'>
          <h1 className='text-danger'>
            {" "}
            <i className={icon} />
            {title}
          </h1>
        </Link>

        {isAuthenticated ? <h5>{user && `Welcome ${user.name}`}</h5> : ""}
      </div>

      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "WebSlinger",
  icon: "fas fa-hand-sparkles",
};

export default Navbar;
