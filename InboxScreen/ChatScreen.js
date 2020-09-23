import React, { Component } from "react";
import {
    TextInput, 
    StyleSheet,
    View,
    Text,
    Dimensions
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import * as firebase from 'firebase'
import Fire from '../Fire1'

import User from '../User'

class ChatScreen extends Component {


    constructor(props){
        super(props);
        this.state = {
            person: {
                name: this.props.route.params.user.displayName,
                phone: this.props.route.params.user.phoneNumber,
            },
            messageList:[],
            textMessage: '',
            user: {}
        }
    }

    unsubscribe = null

    componentDidMount(){
        
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        })

        firebase.database().ref('messages').child(User.phone).child(this.state.person.phone)
        .on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })

    }


    componentWillUnmount() {
        this.unsubscribe();
    }


    handleChange = key => val => {
        this.setState({ [key]: val })
    }

    sendMessage = async() => {
        if(this.state.textMessage.length > 0){
            let msgId = firebase.database().ref('messages').child(this.state.user.phoneNumber).child(this.state.person.phone).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: this.state.user.phoneNumber
            }
            updates['messages/' + this.state.user.phoneNumber + '/' + this.state.person.phone + '/'+ msgId] = message
            updates['messages/'+ this.state.person.phone + '/' + this.state.user.phoneNumber + '/' + msgId] = message
            firebase.database().ref().update(updates);
            this.setState({textMessage: ''});
        }
    }





    renderRow = ({item}) => {
        return(
            <View style={{
                flexDirection:'row',
                width:'60%',
                alignSelf: item.from == this.state.user.phoneNumber ? 'flex-end' : 'flex-start',
                backgroundColor: item.from == this.state.user.phoneNumber ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
        <Text style={{color:'#eee', padding:3, fontSize:12}}>{item.time}</Text>
            </View>
        )
    }


   render() {
       let {height, width} = Dimensions.get('window')
        return (
            <SafeAreaView>
                <FlatList
                style={{padding:10, height: height * 0.8}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                />
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                <TextInput
                style={styles.input}
                value={this.state.textMessage}
                placeholder="Type Message..."
                onChangeText={this.handleChange('textMessage')}
                />
                <View style={{top:-50}}>
                <TouchableOpacity onPress={this.sendMessage}>
                    <Text style={styles.btnText}> Send </Text>
                </TouchableOpacity>
                </View>
                </View>
            </SafeAreaView>
        );
    }
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      width: '80%',
      marginBottom: 10,
      borderRadius: 5,
      top:-50  
    },
    btnText: {
        color: 'darkblue',
        fontSize: 20,
    }
});