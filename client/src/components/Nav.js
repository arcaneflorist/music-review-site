import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Nav() {

    return(
        <nav className="dt w-100 mw8 center pa3"> 
              <div className="dtc v-mid tr pa3">
                <NavLink
                    className="f6 fw4 hover-blue no-underline black-70 dn dib-ns pv2 ph3"
                    activeClassName="blue"
                    exact={true}
                    to="/"
                    title="home">
                    Feed
                </NavLink>
                <NavLink
                    className="nav-button prime curvy-light"
                    activeClassName="blue"
                    exact={true}
                    to="/login"
                    title="login">
                    Sign in
                </NavLink>
              </div>
            </nav>
    )
}