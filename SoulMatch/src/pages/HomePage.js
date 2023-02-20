import React from "react";
import {connect} from "react-redux";
import {setLoggedIn} from "../redux/reducers/UserReducer";
import './../styles/HomePage.css';

class HomePage extends React.Component {

    componentDidMount() {
        if (this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }
    }

    render() {
        return (
            <div>
                {/*<style>*/}
                {/*    */}
                {/*    body {*/}
                {/*    background - color: #15d6a0;*/}
                {/*    margin: 0 10%;*/}
                {/*    font-family: sans-serif;*/}
                {/*	}*/}
                {/*    h1 {*/}
                {/*        text - align: center;*/}
                {/*    font-family: serif;*/}
                {/*    font-weight: normal;*/}
                {/*    text-transform: uppercase;*/}
                {/*    border-bottom: 1px solid #57b1dc;*/}
                {/*    margin-top: 30px;*/}
                {/*    }*/}
                {/*    h2 {*/}
                {/*        color: #c7610e;*/}
                {/*    font-size: 1em;*/}
                {/*    }*/}
                {/*    }*/}
                {/*</style>*/}

                
                <img src="logo-color.png" alt="Soulmatch logo">
               

                <h1>
                    <a href="/login">Log In</a> <br></br>
                    <a href="/login">Create Account</a>
                </h1>

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

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps, {
    setLoggedIn
})(HomePage);
