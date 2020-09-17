import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button,
    Image
} from "react-native";

import firebase from "firebase"

import Fire from '../Fire1'

class ProfileScreen extends Component {

    state ={
        user: {

        }
    }


    unsubscribe = null;

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() })
        })
    }

    componentWillUnmount() {
        this.unsubscribe();
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: 'center'}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar}
                                source={
                                    this.state.user.avatar
                                    ? {uri : this.state.user.avatar}
                                    : require("../assets/me.jpg")
                                }/>
                    </View>
                            <Text style={styles.name}>{this.state.user.name}</Text>
                </View>
                <View style={{padding:100}}>
                <Button onPress={() => {Fire.shared.signOut()}} title="Logout" />
                </View>
            </View>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "bold"
    }
});