import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ImageBackground
} from "react-native";

import * as firebase from 'firebase'
import { TouchableOpacity } from "react-native-gesture-handler";

class SignUpScreen extends Component {
  
  state = { name:'', email: '', password: '', errorMessage: null }

    handleName = () => {
      const {  email, password } = this.state
        if(this.state.name.length < 4) {
          alert("Please enter atleast 4 characters")
          return;
        }
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Main'))
        .catch ((error) => this.setState({ errorMessage: error.message }))
      }


    render() {
        return (
        <View style={styles.container}>
          <View style={{alignItems:'center',marginRight:10}}>
          <Text style={{fontWeight:'bold',fontSize:20}}>SignUp</Text>
          </View>
        {this.state.errorMessage &&
        <View style={{alignItems:'center'}}>
          <Text style={{ color: 'red'  }}>
            {this.state.errorMessage}
          </Text>
          </View>}
          <TextInput
          placeholder="Username"
          placeholderTextColor='grey'
          style={styles.textInput}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />  
        <TextInput
          placeholder="Email"
          placeholderTextColor='grey'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor='grey'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={{paddingHorizontal:20,marginTop:15}}>
        <TouchableOpacity onPress={this.handleName} style={{backgroundColor:'dodgerblue',padding:14,alignItems:'center',borderRadius:5}}>
            <Text style={{color:"white"}}>
                Sign Up
            </Text>
        </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal:20,marginTop:15}}>
        <TouchableOpacity
          style={{backgroundColor:'dodgerblue',padding:14,alignItems:'center',borderRadius:5}}  
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
        backgroundColor: 'white',
        paddingHorizontal:10
    },
    textInput: {
        height: 50,
        width: '90%',
        borderColor: 'lightgray',
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