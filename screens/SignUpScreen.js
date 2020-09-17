import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    Image
} from "react-native";

import Fire from '../Fire1'

import Ionicons from "react-native-vector-icons/Ionicons"

import * as firebase from 'firebase'
import { TouchableOpacity } from "react-native-gesture-handler";

import UserPermissions from '../UserPermissions'

import * as ImagePicker from 'expo-image-picker'

class SignUpScreen extends Component {
  
  state = {
    user: {
     name:'',
     email: '',
     password: '',
     avatar: null
    },
    errorMessage: null 
  };

    handlePickAvatar = async () => {
      UserPermissions.getCameraPermission()

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3]
      })

      if(!result.cancelled){
        this.setState({ user: { ...this.state.user, avatar: result.uri } })
      }
    }

    handleName = () => {
      Fire.shared.createUser(this.state.user)
      }


    render() {
        return (
          <View style={styles.container}>
          <View style={{position: "absolute", top:64, alignItems:'center', width:'100%'}}>
          <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
            <Image source={{uri:this.state.user.avatar}} style={styles.avatar} />
            <Ionicons
              name='ios-add'
              size={40}
              color={'black'}
              style={{marginBottom:1, marginLeft:1}}
              ></Ionicons>
          </TouchableOpacity>
          </View>
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
          onChangeText={name => this.setState({ user: { ...this.state.user, name } })}
          value={this.state.name}
        />  
        <TextInput
          placeholder="Email"
          placeholderTextColor='grey'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ user: { ...this.state.user, email } })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor='grey'
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ user: { ...this.state.user, password } })}
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
      },
      avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor:'whitesmoke',
        borderRadius:50,
        marginTop:20,
        marginLeft:13,
        justifyContent:'center',
        alignItems: 'center'
      },
      avatar: {
        width: 100,
        height:100,
        borderRadius: 50,
        marginTop:42
      }
});