import React from "react";

class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h1>This is the home page</h1>
                <br/>
                <h2>We need to make this a proper page, for now it will be a placeholder</h2>
                <br/>
                <a href='/login'>Go to login page</a>
            </div>
        );
    }
}

export default HomePage;