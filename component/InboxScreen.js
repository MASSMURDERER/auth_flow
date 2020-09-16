import React, { Component } from "react";
import { 
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    SafeAreaView
} from "react-native";
import {GiftedChat} from 'react-native-gifted-chat'
import Fire from "../Fire"


class InboxScreen extends Component {

    state = {
        messages: []
    }

    get user() {
        return {
            _id: Fire.uid
        }
    }

    componentDidMount() {
        Fire.get(message => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        })))
    }

    componentWillUnmount() {
        Fire.off();
    }


    render() {
        const chat = <GiftedChat renderUsernameOnMessage={true} messages={this.state.messages} onSend={Fire.send} user={this.user}/>

        if(Platform.OS == 'android') {
        return (
            <KeyboardAvoidingView style={{flex:1}}  keyboardVerticalOffset={30} enabled>
                    {chat}                    
            </KeyboardAvoidingView>
        );
    }
    return <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>
  }
}
export default InboxScreen;
