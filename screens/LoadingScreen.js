import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from "react-native";

import * as firebase from "firebase"

import Fire from '../Fire1'

class LoadingScreen extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
      }

    render() {
        return (
            <View style={styles.container}>
                <Text>LoadingScreen</Text>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    }
});