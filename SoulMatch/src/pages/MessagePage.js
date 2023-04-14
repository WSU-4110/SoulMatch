import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import './../styles/MessagePage.css';
import NavbarComponent from "../components/NavbarComponent";
import {FaPaperPlane} from "react-icons/fa";
import {over} from 'stompjs'
import SockJS from 'sockjs-client'

var stompClient =null;

const tempUsers = [
    {
        id: 'CCN64fMPjBYm3Wp6LRhI',
        firstName: 'Selena',
        lastName: 'Gomez',
        profile: {
            picture: 'https://www.billboard.com/wp-content/uploads/2023/03/Selena-Gomez-a-2022-billboard-1548.jpg'
        }
    },
    {
        id: 'CCN64fMPjBYm3Wp6LRhIA',
        firstName: 'Ariana',
        lastName: 'Grande',
        profile: {
            picture: 'https://www.peta.org/wp-content/uploads/2013/11/Ariana-Grande-Starmaxinc.com.jpg'
        }
    },
    {
        id: 'CCN64fMPjBYm3Wp6LRhIb',
        firstName: 'Katy',
        lastName: 'Perry',
        profile: {
            picture: 'https://m.media-amazon.com/images/M/MV5BMjE4MDI3NDI2Nl5BMl5BanBnXkFtZTcwNjE5OTQwOA@@._V1_.jpg'
        }
    },
    {
        id: 'CCN64fMPjBYm3Wp6LRhIc',
        firstName: 'Steve',
        lastName: 'Jobs',
        profile: {
            picture: 'https://images.macrumors.com/t/vsVhYQdMRhd1k49b6ZEw9zWNa4E=/1600x1200/smart/article-new/2020/06/steve-jobs-holding-iphone-4-feature-teal.jpg'
        }
    }
];

class MessagePage extends React.Component {

    ChatRoom = ()=>{
        const [publicChat, setPublicChat] = useState([]); 
        const [privateChat, setPrivateChat] = useState(new Map());
        const [tab, setTab] = useState("CHATROOM");
        const [userData, setUserData] = useState({
            username: '',
            receivername: '',
            connected: false,
            message: ''
        });
    
        const handleValue = (event)=>{
            const {value}=event.target;
            setUserData({...userData,"username":value});
        }
    
        const handleMessage = (event)=>{
            const {value, name}=event.target;
            setUserData({...userData,[name]:value});
        }
    
        const registerUser = ()=>{
            let Sock=new SockJS("http://localhost:3000/messages");
            stompClient=over(Sock);
            stompClient.connect({}, onConnected, onError);
        }
    
        const onConnected = ()=>{
            setUserData({...userData, "connected": true});
            stompClient.subscribe('/chatroom/public', onPublicMessageRecieved);
            stompClient.subscribe('/user/' +userData.username+'/private', onPrivateMessageRecieved);
            userJoin();
        }
    
        const userJoin = ()=>{
            let chatMessage={
                senderName:userData.username,
                status:'JOIN'
            }
            stompClient.send('/app/message',{},JSON.stringify(chatMessage));
        }
    
        const onError = (err)=>{
            console.log(err);
        }
    
        const onPublicMessageRecieved = (payload)=>{
            let payloadData=JSON.parse(payload);
            switch(payloadData.status){
                case "JOIN" :
                    if(!privateChat.get(payloadData.senderName)){
                        privateChat.set(payloadData.senderName, []);
                        setPrivateChat(new Map(privateChat));
                    }
                    break;
                case "MESSAGE" :
                    publicChat.push(payloadData);
                    setPublicChat([...publicChat]);
                    break;
            }
        }
    
        const onPrivateMessageRecieved = (payload) => {
            let payloadData=JSON.parse(payload.body);
            if(privateChat.get(payloadData.senderName)){
                privateChat.get(payloadData.senderName).push(payloadData);
                setPrivateChat(new Map(privateChat));
            }else{
                let list =[];
                list.push(payloadData);
                privateChat.set(payloadData.senderName, list);
                setPrivateChat(new Map(privateChat));
            }
        }
    
        const sendPublicMessage = ()=>{
            if(stompClient){
                let chatMessage={
                    senderName:userData.username,
                    message:userData.message,
                    status:'MESSAGE'
                }
                stompClient.send('/app/message',{},JSON.stringify(chatMessage));
                setUserData({...userData,"message":""});
            }
        }
    
        const sendPrivateMessage = ()=>{
            if(stompClient){
                let chatMessage={
                    senderName:userData.username,
                    receivername:tab,
                    message:userData.message,
                    status:'MESSAGE'
                }
                if(userData.username != tab){
                    privateChat.get(tab).push(chatMessage);
                    setPrivateChat(new Map(privateChat));
                }
                stompClient.send('/app/private-message',{},JSON.stringify(chatMessage));
                setUserData({...userData,"message":""});
            }
        }
    
        return(
            <div className="container">
                {userData.connected?
                <div className="chat-box">
                    <div className="member-list">
                        <ul>
                            <li onClick={()=>{setTab("CHATROOM")}} className={`member ${tab==='CHATROOM' && 'active'}`}>chatroom</li>
                            {[...privateChat.keys].Map((name, index)=>(
                                <li onClick={()=>{setTab(name)}} className={`member ${tab===name && 'active'}`} key={index}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {tab==="CHATROOM" && <div className='chat-content'>
                        <ul className='chat-messages'>
                            {publicChat.Map((chat, index)=>(
                                <li className='member' key={index}>
                                    {chat.senderName !==userData.username && <div className="avatar">{chat.senderName}</div>}
                                    <div className="message-data">{chat.message}</div>
                                    {chat.senderName ===userData.username && <div className="avatar">{chat.senderName}</div>}
                                </li>
                            ))}
                        </ul>
                        <div className='send-messgage'>
                            <input type='text' className='input-message' placeholder='enter public message' value={userData.message}
                                onChange={handleValue}/>
                            <button type='send' className='send-button' onClick={sendPublicMessage}>    
                                send
                            </button>
                        </div>
                    </div>}
                    {tab!=="CHATROOM" && <div className='chat-content'>
                    <ul className="chat-messages">
                    {[...privateChat.get(tab)].ap((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar">{chat.senderName}</div>}
                        </li>
                        ))}
                    </ul>
                    
                    <div className='send-messgage'>
                        <input type='text' className='input-message' placeholder={`enter private message for ${tab}`} value={userData.message}
                            onChange={handleValue}/>
                        <button type='send' className='send-button' onClick={sendPrivateMessage}>    
                            send
                        </button>
                        </div>
                    </div>}
                </div>
                :
                <div className='register'>
                    <input
                    id='username'
                    name='userName'
                    placeholder="Enter user name"
                    value={userData.username}
                    onChange={handleValue}
                    />
                    <button type='button' onClick={registerUser}>
                        connect
                    </button>
                </div>}
            </div>
        )
    }

    state = {
        loaded: false,
        selectedUser: tempUsers[0].id,
        textAreaMessage: '',
        tempConversation: [
            {
                text: 'Hell o World message 1!',
                time: '1:15pm',
                sender: 'them'
            },
            {
                text: 'Hell o World fkjgn fdjkg jkdfjkgk dfngfdj fjn jkdfngdfng jdfkg kdfng fdngkjfdjkg jkfgknjkg 1! 😊',
                time: '1:15pm',
                sender: 'me'
            },
            {
                text: 'Fjng dfjnkgjfdg fgjkndfg dfkjgn dfgur uhhins! 🙂',
                time: '1:20pm',
                sender: 'them'
            },
            {
                text: 'DFG kfjdng kjdfgjdfgr u!',
                time: '1:22pm',
                sender: 'me'
            }
        ]
    }

    componentDidMount() {
        this.setState({loaded: true});
    }

    selectUser = (user) => {
        this.setState({selectedUser: user.id});
    };

    render() {
        const {selectedUser, textAreaMessage, tempConversation} = this.state;
        if (this.state.loaded && !this.props.userState.loggedIn) {
            const history = this.props.history;
            history.push('/');
        }

        return (
            <div className='message-background'>
                <NavbarComponent onLogout={this.logout}/>

                <div className='message-container'>

                    <div className='message-users'>
                        {tempUsers.map(user => <UserMessageProfile key={user.id} user={user}
                                                                   selectUser={this.selectUser}
                                                                   selected={selectedUser && selectedUser === user.id}/>)}
                    </div>

                    <div className='message-area'>
                        <div className='message-content'>
                            {tempConversation.map(message => <UserMessage key={message.text} message={message}/>)}
                        </div>

                        <div className='message-box'>
                            <form className='message-box-form' onSubmit={e => {
                                e.preventDefault();

                                if (textAreaMessage) {
                                    tempConversation.push({
                                        text: textAreaMessage,
                                        time: '1:00pm',
                                        sender: Math.random() < 0.5 ? 'me' : 'them'
                                    });

                                    this.setState({textAreaMessage: '', tempConversation});
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
export default connect(mapStateToProps)(MessagePage);