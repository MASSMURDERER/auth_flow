import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import * as firebase from "firebase"

class LoginScreen extends Component {

    state = { email: '', password: '', errorMessage: null }

    handleLogin = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }


    render() {
        return (
        <View style={styles.container}>
          <View style={{alignItems:'center',marginRight:10}}>
          <Text style={{fontWeight:'bold',fontSize:20}}>Login</Text>
          </View>
        {this.state.errorMessage &&
          <View style={{alignItems: 'center'}}>  
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
          </View>}
          
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          placeholderTextColor='grey'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor='grey'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{paddingHorizontal:20,marginTop:15}}>
        <TouchableOpacity onPress={this.handleLogin} style={{backgroundColor:'dodgerblue',padding:14,alignItems:'center',borderRadius:5}}>
            <Text style={{color:"white",fontSize:15}}>
                Login
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:20,marginTop:15}}>
        <TouchableOpacity
          style={{backgroundColor:'dodgerblue',padding:14,alignItems:'center',borderRadius:5}}  
          onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color:'white',fontSize:15}}>
              Dont have an account? Sign Up
              </Text>
          </TouchableOpacity>
          </View>
      </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        justifyContent: 'center',
        paddingHorizontal:10
    },
    textInput: {
      height: 50,
      width: '90%',
      borderColor: 'lightgrey',
      borderRadius:5,
      borderWidth: 1,
      marginTop: 15,
      paddingLeft:10,
      marginHorizontal:22,
      marginLeft:18,
      justifyContent:'center',
      backgroundColor:'whitesmoke'
    }
});