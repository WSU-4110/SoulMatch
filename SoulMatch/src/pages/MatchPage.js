import React from "react";
import {setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {connect} from "react-redux";

class MatchPage extends React.Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    render() {
        console.log(this.props.userState)
        if (this.state.loaded) {
            const history = this.props.history;
            if (!this.props.userState.loggedIn) {
                history.push('/login');
            }

            if (this.props.userState.user.newUser) {
                history.push('/traits');
            }
        }

        return (
            <div>
                <h1>Hello Matching Page</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userState: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setUser: (user) => dispatch(setUser(user)),
        setLoggedIn: (loggedIn) => dispatch(setLoggedIn(loggedIn))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchPage);