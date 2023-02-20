import React from "react";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <style>
                    
                    body {
                    background - color: #15d6a0;
                    margin: 0 10%;
                    font-family: sans-serif;
	            	}
                    h1 {
                        text - align: center;
                    font-family: serif;
                    font-weight: normal;
                    text-transform: uppercase;
                    border-bottom: 1px solid #57b1dc;
                    margin-top: 30px;
		            }
                    h2 {
                        color: #c7610e;
                    font-size: 1em;
		            }
                    }
                </style>

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