import React from "react";
import './../styles/NavbarComponent.css';
import {useHistory} from "react-router-dom";

const NavbarComponent = ({onLogout}) => {
    const history = useHistory();

    return (
        <div className='navbar'>
            <div className='navbar-left'>
                <img src='/assets/images/soul-match-logo-updated.png' className='navbar-logo' alt='' />
                <h1 className='navbar-logo-text'>SoulMatch</h1>
            </div>

            <div className='navbar-right'>
                <div className='navbar-link' onClick={e => history.push("/home")}>
                    <h3>Matching</h3>
                </div>

                <div className='navbar-link' onClick={e => history.push("/message")}>
                    <h3>Messages</h3>
                </div>

                <div className='navbar-link' onClick={e => history.push("/profile")}>
                    <h3>Profile</h3>
                </div>

                <div className='navbar-link' onClick={e => onLogout()}>
                    <h3>Logout</h3>
                </div>
            </div>
        </div>
    );
};

export default NavbarComponent;
