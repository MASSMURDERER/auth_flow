import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    Image
} from "react-native";

import User from '../User'
import Fire from '../Fire1'
import * as firebase from 'firebase'

class LoadingScreen extends Component {

    state = {
        userDetails:{}
    }
    
    componentDidMount() {
        this.fetchUserDetails()
        firebase.auth().onAuthStateChanged(user => {
          this.props.navigation.navigate(user ? 'Main' : 'SignUp')
        })
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


    render() {
        return (
            <View style={styles.container}>
                 <Image source={require('../assets/Moments.png')} style={{width:200,height:220}}/>
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