import React from "react";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <body>
                <picture>
                    <source media="(min-width: 480px)"
                        srcset="logo-color.png 1200w, logo-color.png 800w"
                        sizes="80vw">
                    </source>
                    <img src="logo-color.png" alt="Soulmatch logo">
                    </img>
                </picture>
                           
                        <h1>
                <a href="../App.js">Log In</a> <br></br>
                        <a href="">Create Account</a>
                </h1>
                </body>
            </div>
        );
    }
}

export default HomePage;