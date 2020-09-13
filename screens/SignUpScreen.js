import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Button
} from "react-native";

import * as firebase from 'firebase'
import { TouchableOpacity } from "react-native-gesture-handler";

class SignUpScreen extends Component {

    state = { email: '', password: '', errorMessage: null }

    handleSignUp = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => this.props.navigation.navigate('Main'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
        return (
        <View style={styles.container}>
        {this.state.errorMessage &&
        <View style={{alignItems:'center'}}>
          <Text style={{ color: 'red'  }}>
            {this.state.errorMessage}
          </Text>
          </View>}
        <TextInput
          placeholder="Email"
          placeholderTextColor='black'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor='black'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{paddingHorizontal:20,marginTop:10}}>
        <TouchableOpacity onPress={this.handleSignUp} style={{backgroundColor:'black',padding:10,alignItems:'center'}}>
            <Text style={{color:"white"}}>
                Sign Up
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:20,marginTop:10}}>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:10,alignItems:'center'}}  
          onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{color:'white'}}>
              Already have an account? Login
              </Text>
          </TouchableOpacity>
          </View>
      </View>
        );
    }
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
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