import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";

import firebase from "firebase"

class ProfileScreen extends Component {

    signOut =() => {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('SignUp'))
            .catch(error =>  this.setState({ errorMessage: error.message }))
    }




    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.signOut} style={{backgroundColor:'dodgerblue',padding:7}}>
                    <Text style={{color:'white'}}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    }
});