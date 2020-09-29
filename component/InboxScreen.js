import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from "react-native";

import * as firebase from 'firebase'
import { SafeAreaView } from "react-native-safe-area-context";


class InboxScreen extends Component {

    state = {
        users: []
    }

    constructor(props) {
        super(props);
        this.subscriber = firebase.firestore().collection("users")
        .onSnapshot(docs => {
            let users= []
            docs.forEach(doc => {
                users.push(doc.data())
            })
            this.setState({ users })
        })
    }

    renderRow = (user) => {
        return(
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Chat', {user})} 
            style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1,flexDirection:'row'}}>
                <Image style={styles.avatar} source={{uri:user.avatar}}/>
                <Text style={{color:'black',fontWeight:'bold',fontSize:17,marginTop:20,marginLeft:10}}>{user.name}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <SafeAreaView style={{backgroundColor:'white',flex:1}}>
                <FlatList
                data={this.state.users}
                renderItem={({item, index}) => this.renderRow(item, index)}
                keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
        );
    }
}
export default InboxScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    avatar: {
        width: 66,
        height: 66,
        borderRadius: 68
    }
});