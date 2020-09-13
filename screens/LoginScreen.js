import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
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
          placeholderTextColor='black'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          placeholderTextColor='black'
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{paddingHorizontal:20,marginTop:10}}>
        <TouchableOpacity onPress={this.handleLogin} style={{backgroundColor:'black',padding:10,alignItems:'center'}}>
            <Text style={{color:"white"}}>
                Login
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:20,marginTop:10}}>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:10,alignItems:'center'}}  
          onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text style={{color:'white'}}>
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
        justifyContent: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 2,
        marginTop: 10,
        paddingLeft:7,
        marginHorizontal:22,
        marginLeft:18,
        justifyContent:'center'
      }
});