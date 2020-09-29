import React, { Component } from "react";
import {
    TextInput, 
    StyleSheet,
    View,
    Text,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import * as firebase from 'firebase'
import Fire from '../Fire1'

import User from '../User'

import moment from "moment"

const isIOS = Platform.OS === 'ios'

class ChatScreen extends Component {


    constructor(props){
        super(props);
        this.state = {
            person: {
                name: this.props.route.params.user.name,
            },
            messageList:[],
            textMessage: '',
            userDetails: {},
            dbRef: firebase.database().ref('messages')
        }
        this.keyboardHeight = new Animated.Value(0)
        this.bottomPadding = new Animated.Value(0)
    }

    unsubscribe = null

    componentDidMount(){

        this.fetchUserDetails()
        
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true))
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e, false))    
        this.state.dbRef.child(User.name).child(this.state.person.name)
        .on('child_added', (value) => {
            this.setState((prevState) => {
                return {
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
    }


    componentWillUnmount() {
        this.state.dbRef.off()
    }

    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 60 : 80
        let bottomOS = isIOS ? 120 : 140
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                toValue: isShow ? heightOS : 0
            }),
            Animated.timing(this.bottomPadding, {
                duration: event.duration,
                toValue: isShow ? bottomOS : 60
            })
        ]).start();
    }

    handleChange = key => val => {
        this.setState({ [key]: val })
    }
    

    sendMessage = async() => {
        if(this.state.textMessage.length > 0){
            let msgId = this.state.dbRef.child(User.name).child(this.state.person.name).push().key;
            let updates = {};
            let message = {
                message: this.state.textMessage,
                time: firebase.database.ServerValue.TIMESTAMP,
                from: User.name
            }
            updates[User.name + '/' + this.state.person.name + '/'+ msgId] = message
            updates[this.state.person.name + '/' + User.name + '/' + msgId] = message
            this.state.dbRef.update(updates);
            this.setState({textMessage: ''});
        }
    }

    fetchUserDetails = async () => {
        try {
          const userDetails = await Fire.shared.getUserDetails()
          this.setState({ userDetails })
        } catch (error) {
          console.log(error)
        }
        User.name = this.state.userDetails.name
      }





    renderRow = ({item}) => {
        return(
            <View style={{
                flexDirection:'row',
                maxWidth:'60%',
                alignSelf: item.from == User.name ? 'flex-end' : 'flex-start',
                backgroundColor: item.from == User.name ? '#00897b' : '#7cb342',
                borderRadius: 5,
                marginBottom: 10
            }}>
                <Text style={{color:'#fff', padding:7, fontSize:16}}>
                    {item.message}
                </Text>
        <Text style={{color:'#eee', padding:3, fontSize:12}}>{moment(item.time).fromNow()}</Text>
            </View>
        )
    }


   render() {
       let {height} = Dimensions.get('window')
        return (
            <KeyboardAvoidingView behavior="height" style={{flex: 1,backgroundColor:"white"}}>
                <Animated.View style={[styles.bottomBar,{bottom: this.keyboardHeight}]}>
                <TextInput
                style={styles.inputMessage}
                value={this.state.textMessage}
                placeholder="Type Message..."
                onChangeText={this.handleChange('textMessage')}
                />
                <TouchableOpacity onPress={this.sendMessage} style={{paddingBottom:10, marginLeft:5}}>
                    <Text style={styles.btnText}> Send </Text>
                </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ref={ref => this.flatList = ref}
                    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                    onLayout={() => this.flatList.scrollToEnd({animated: true})}
                    style={{paddingTop:5, paddingHorizontal: 5, height}}
                    data={this.state.messageList}
                    renderItem={this.renderRow}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<Animated.View style={{height: this.bottomPadding}} />}
                />                
            </KeyboardAvoidingView>
        );
    }
}
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      width: '85%',
      marginBottom: 10,
      borderRadius: 5,
    },
    inputMessage: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 20,
      },
    btnText: {
        color: 'darkblue',
        fontSize: 20,
    },
    bottomBar: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems:'center',
        padding:5,
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        zIndex:2,
        height:60
    },
    sendButton :{
        marginBottom:10,
        marginLeft: 10,
        height: 40,
        width: 40,
        paddingTop: 10,
        paddingLeft: 5,
    } 
});