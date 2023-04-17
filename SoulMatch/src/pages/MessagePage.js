import React, { useEffect, useState } from "react";
import {initialUserState, setLoggedIn, setUser} from "../redux/reducers/UserReducer";
import {connect} from "react-redux";
import './../styles/MessagePage.css';
import NavbarComponent from "../components/NavbarComponent";
import {FaPaperPlane} from "react-icons/fa";
import {over} from 'stompjs'
import SockJS from 'sockjs-client'
import {reactLocalStorage} from "reactjs-localstorage";
import {sendApiRequest} from "../utils/ServerUtils";

let stompClient = null;

class MessagePage extends React.Component {

    state = {
        loaded: false,
        selectedUser: null,
        textAreaMessage: '',
        conversations: [],
        loadedMatchedUsers: false,
        matchedUsers: []
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    selectUser = (user) => {
        this.setState({selectedUser: user.id});
        let Sock=new SockJS("http://localhost:8080/messages");
        stompClient=over(Sock);
        stompClient.connect({}, () => this.onConnected(user), console.error);
    };

    onConnected = (user) => {
        stompClient.subscribe('/user/' + user.id + '/private', this.onMessageReceived);
        this.userJoin(user);
    }

    userJoin = (user) => {
        let chatMessage={
            senderName: user.id,
            status:'JOIN'
        }
        stompClient.send('/app/message',{},JSON.stringify(chatMessage));
    }

    onMessageReceived = (payload) => {
        const user = this.props.userState.user;
        const currentDate = new Date();
        let conversations = this.state.conversations;
        let payloadData=JSON.parse(payload.body);

        if (payloadData.senderName === user) {
            conversations.push(
                {
                    text: payloadData.message,
                    time: currentDate.getHours() + ':' + currentDate.getMinutes(),
                    sender: 'me'
                }
            );

            this.setState({conversations});
        } else {
            conversations.push(
                {
                    text: payloadData.message,
                    time: currentDate.getHours() + ':' + currentDate.getMinutes(),
                    sender: 'them'
                }
            );
            this.setState({conversations});
        }
    };

    sendMessage = (message) => {
        const user = this.props.userState.user;
        let selectedUser = this.state.selectedUser;
        let conversations = this.state.conversations;
        const currentDate = new Date();

        if (stompClient) {
            conversations.push({
                text: message,
                time: currentDate.getHours() + ':' + currentDate.getMinutes(),
                sender: 'me'
            });

            const serverMessage = {
                senderName: user.id,
                receivername: selectedUser.id,
                message: message,
                status: 'MESSAGE'
            };

            stompClient.send('/app/private-message',{},JSON.stringify(serverMessage));
            this.setState({conversations});
        }
    };

    logout = () => {
        this.props.setUser(initialUserState);
        this.props.setLoggedIn(false);
        reactLocalStorage.remove("user");
        reactLocalStorage.remove("loggedIn");
    };

    render() {
        const {selectedUser, textAreaMessage, conversations, matchedUsers} = this.state;
        const user = this.props.userState.user;
        if (this.state.loaded && !this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/');
        }
        if (!this.state.loadedMatchedUsers) {
           sendApiRequest("/matchedusers", user).then(data => {
           this.setState({matchedUsers: data, loadedMatchedUsers: true})
            });
        }

        return (
            <div className='message-background'>
                <NavbarComponent onLogout={this.logout}/>

                <div className='message-container'>

                    <div className='message-users'>
                        {matchedUsers.map(user => <UserMessageProfile key={user.id} user={user}
                                                                   selectUser={this.selectUser}
                                                                   selected={selectedUser && selectedUser === user.id}/>)}
                    </div>

                    <div className='message-area'>
                        <div className='message-content'>
                            {conversations.map(message => <UserMessage key={message.text} message={message}/>)}
                        </div>

                        <div className='message-box'>
                            <form className='message-box-form' onSubmit={e => {
                                e.preventDefault();

                                if (textAreaMessage) {
                                    this.sendMessage(textAreaMessage);
                                    this.setState({textAreaMessage: ''});
                                }
                            }}>

                                <textarea className='message-form-textarea'
                                          name="report"
                                          cols="150"
                                          rows="4"
                                          placeholder="Message"
                                          value={textAreaMessage}
                                          onChange={e => this.setState({textAreaMessage: e.target.value})}>
                                </textarea>
                                <button className='send-message-button'><FaPaperPlane/></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UserMessage = ({message}) => {
    const {text, time, sender} = message;

    return (
        <div className={sender === 'them' ? 'user-message-left-container' : 'user-message-right-container'}>
            <div className={sender === 'them' ? 'user-message-left' : 'user-message-right'}>
                <p className='user-message'>{text}</p>
                <p className='user-message-time'>{time}</p>
            </div>
        </div>
    );
};

const UserMessageProfile = ({user, selected, selectUser}) => {

    return (
        <div className={selected ? 'message-user-profile-selected' : 'message-user-profile'} onClick={e => {
            selectUser(user);
        }}>
            <div className='message-user-profile-image' style={{backgroundImage: `url(${user.profile.picture})`}}/>
            <h3 className='message-user-profile-name'>{user.firstName + ' ' + user.lastName}</h3>
        </div>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);