//necessary
import React from "react";
import {connect} from "react-redux";
//style sheet
import './../styles/HomePage.css';

class HomePage extends React.Component {

    //checks if you're logged in or not
    state = {
        loaded: false
    }

    //
    componentDidMount() {
        this.setState({loaded: true});
    }

    //copy paste this onto any page
    render() {
        if (this.state.loaded && this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }

        return (
            <div className="backgroundHome">
                

                <div className = "homeHeader">
                    <a href="/"><img className = "homeLogo" src="/assets/images/soul-match-logo-updated.png" 
                    alt="SoulMatch Logo"/></a>
                    <nav>
                        <ul>

                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </nav>

                
                    <div>
                        <div className = 'home-form-button'>
                            <a href="/login">Login</a>
                        </div>
                    </div>
                </div>

                <div className="row">
                        <div className="col">
                            <h1>SoulMatch</h1>
                            <p>SoulMatch, a better way to find matches. No matter who you are or
                                where you're from, come find your <em>SoulMatch</em>.</p>
                        </div>

                        <div className="col">
                            <div className="card">

                            </div>
                        </div>
                </div>
            
                {/*<form onSubmit={e => {*/}
                {/*    e.preventDefault();*/}
                {/*    const {testFile} = this.state;*/}
                {/*    let formData = new FormData();*/}
                {/*    formData.append('file', testFile);*/}

                {/*    let options = {*/}
                {/*        method: 'POST',*/}
                {/*        body: formData*/}
                {/*    };*/}

                {/*    fetch("http://localhost:8080/upload", options);*/}
                {/*}*/}
                {/*}>*/}
                {/*    <input type='file' id='contained-button-file' accept='image/*' onChange={event => this.setState({testFile: event.target.files[0]})} />*/}
                {/*    <input type="submit"/>*/}
                {/*</form>*/}
            </div>
        );
    }
}

//copy paste code into every page
const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
//necessary for exporting to app.js
export default connect(mapStateToProps)(HomePage);
