import React from "react";
import {connect} from "react-redux";
import './../styles/HomePage.css';

class HomePage extends React.Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    render() {
        if (this.state.loaded && this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/home');
        }

        return (
            <div className="background">
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

                <div className = "content1">
                    <img className = "content2" src="/assets/images/logo-color.png" alt="Soulmatch logo"/>
                    <br/>

                    <div>
                        <div className = 'form-button'>
                            <a href="/login">Login</a>
                        </div>

                        <div className = 'form-button'>
                            <a href="/login">Create Account</a>
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

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};
export default connect(mapStateToProps)(HomePage);
