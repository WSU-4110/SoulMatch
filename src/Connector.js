//STILL FIGURING OUT HOW TO USE THE DATABASE CONNECTOR WITH JAVASCRIPT AND FIREBASE.
//WE NEED TO CONNECT THE REGISTRATION PAGE TO THE DATABASE TO CREATE NEW USERS.
//GOAL IS TO HAVE 2 USERS ABLE TO INTERACT/SEE EACH OTHER ON THE WEBSITE.


import React from 'react'
import './App'
import firebase from "firebase/app"
import 'firebase/database'
import config from './config'

class Connector extends React.Component{
    constructor (props) {
        super(props)
        this.state  = {
            isConnected: false,
            database: null,
            //userID: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            gender: ''
        }
    }
}


componentDidMount = async () => {
    firebase.initializeApp(config);

    this.setState({
        database: firebase.database()
    })
}

shouldComponentUpdate (nextProps, nextState){
    if (this.state.database !== nextState.database) {
      return false;
    }
    return true
}

connect = async () => {
    try{

    } catch(e){
        console.error(e)
    }  
}