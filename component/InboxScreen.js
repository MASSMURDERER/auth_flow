
import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from "react-native";

import * as firebase from 'firebase'


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
            style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                <Text style={{color:'black',fontWeight:'bold'}}>{user.displayName}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                data={this.state.users}
                renderItem={({item, index}) => this.renderRow(item, index)}
                keyExtractor={(item) => item.id}
                />
            </View>
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
    }
});