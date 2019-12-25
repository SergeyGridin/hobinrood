import React from "react";
import { NavLink } from "react-router-dom";
import StockSearchBar from "./stock_search_bar_container";

const NavBar = ({ currentUser, logout, demoLogin }) => {
  const logoNav = (
    <div className="main-nav">
      <NavLink to="/">
        <svg className="svg-logo" width="20" height="27" viewBox="0 0 20 27">
          <path d="M8.0826 20.8073L7.89891 20.8808C6.79674 21.2482 5.14348 21.7993 3.71066 22.4973C3.63718 22.5341 3.56371 22.6443 3.56371 22.6443C3.52697 22.7178 3.49023 22.7912 3.45349 22.8647C3.30653 23.2321 3.04936 23.7832 2.97588 24.0404L2.9024 24.2241C2.9024 24.2608 2.9024 24.2975 2.9024 24.2975L2.93914 24.3343H2.97588L3.15958 24.2608C3.56371 24.0771 4.07805 23.7832 4.5924 23.526H4.62914C5.65783 23.0484 6.79674 22.4973 7.45804 22.1667C7.45804 22.1667 7.56826 22.0932 7.64173 21.983L8.15608 20.9543C8.15608 20.9175 8.15608 20.8808 8.15608 20.8808C8.15608 20.8073 8.11934 20.7706 8.0826 20.8073Z"></path>
          <path d="M3.96781 19.191C4.04129 19.044 4.37194 18.4195 4.44542 18.2725V18.2358C6.68649 14.0108 9.40518 10.043 12.528 6.40581L12.6015 6.2956C12.6382 6.25886 12.6382 6.22212 12.6015 6.18538C12.5647 6.14864 12.528 6.1119 12.4913 6.14864H12.3443C10.2869 6.44255 8.19279 6.80994 6.13541 7.32429C5.91498 7.39777 5.80476 7.50798 5.76802 7.54472C4.22498 9.38167 2.79216 11.3288 1.43282 13.3127C1.46956 13.423 1.46956 13.6434 1.46956 13.6434C1.46956 13.6434 1.80021 16.2151 2.27782 18.1256C1.10217 21.6158 0 26.2449 0 26.2449C0 26.2816 0 26.3183 0 26.3183C0 26.3551 0.036739 26.3551 0.073478 26.3551H0.771518C0.808257 26.3551 0.844997 26.3183 0.881736 26.2816L0.918474 26.1346C1.61651 24.2242 2.42477 22.3138 3.30651 20.4768C3.52694 20.0727 3.96781 19.191 3.96781 19.191Z"></path>
          <path d="M13.5934 7.1774V7.03045C13.5934 6.99371 13.5567 6.95697 13.5199 6.92023C13.4832 6.92023 13.4464 6.92023 13.4097 6.95697L13.3362 7.06719C9.66233 11.2922 6.613 15.9948 4.18822 21.028L4.11475 21.1382C4.11475 21.175 4.11475 21.2117 4.11475 21.2484C4.15149 21.2852 4.15149 21.2852 4.18822 21.2852H4.22496L4.33518 21.2484C6.39256 20.4034 8.48668 19.6687 10.5808 19.0441C10.691 19.0074 10.8012 18.9339 10.8747 18.8237C11.7932 17.0602 13.9241 13.6067 13.9241 13.6067C13.9975 13.4965 13.9608 13.3863 13.9608 13.3863C13.9608 13.3863 13.5934 9.27153 13.5934 7.1774Z"></path>
          <path d="M18.296 1.22542C17.7817 0.784553 17.0101 0.564119 15.8345 0.52738C14.8058 0.490641 13.5567 0.747814 12.1239 1.18868C11.9034 1.26216 11.7565 1.37238 11.5728 1.51933C10.1032 2.87867 8.70714 4.34823 7.38454 5.81779L7.27432 5.92801C7.23758 5.96475 7.23758 6.00149 7.27432 6.03823C7.31106 6.07497 7.3478 6.1117 7.38454 6.07497L7.53149 6.03823C9.69909 5.56062 11.8667 5.22997 13.9976 5.00954C14.1445 5.00954 14.2915 5.04627 14.4017 5.11975C14.5119 5.22997 14.5486 5.34019 14.5486 5.48714C14.5119 7.618 14.5854 9.74886 14.7691 11.8062V11.9532C14.7691 11.9899 14.8058 12.0267 14.8426 12.0267C14.8426 12.0267 14.8425 12.0267 14.8793 12.0267C14.916 12.0267 14.9528 12.0267 14.9528 11.9899L15.0262 11.8797C16.2386 10.153 17.5245 8.49974 18.9206 6.91996C19.0675 6.73627 19.1043 6.62605 19.141 6.47909C19.5819 3.79715 18.9206 1.73977 18.296 1.22542Z"></path>
        </svg>
      </NavLink>
      {currentUser ? "" : <span className="svg-text">hobinrood</span>}
    </div>
  );
  const display = currentUser ? (
    <nav className="loggedin-nav-bar">
      {logoNav}
      <section className="site-nav">
        <StockSearchBar />
        <section className="nav-links">
          <NavLink to="/" className="nav-bar-home">
            Home
          </NavLink>
          <NavLink onClick={logout} to="/" className="logout">
            Log Out
          </NavLink>
        </section>
      </section>
    </nav>
  ) : (
    <nav className="nav-bar">
      {logoNav}
      <section className="nav-links">
        <NavLink onClick={demoLogin} to="/login" className="login">
          Demo
        </NavLink>
        <NavLink to="/login" className="login">
          Log In
        </NavLink>
        <NavLink to="/signup" className="signup">
          Sign Up
        </NavLink>
      </section>
    </nav>
  );
  return display;
};

export default NavBar;
