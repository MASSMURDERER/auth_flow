import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image,
    TextInput
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from "expo-constants"
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Fire from '../Fire1'

import Ionicons from 'react-native-vector-icons/Ionicons'

const firebase = require("firebase");
require("firebase/firestore")

class PostScreen extends Component {
    state={
        text: "",
        image: null
    }


    componentDidMount(){
        this.getPhotoPermission();
    }

    getPhotoPermission = async () => {
        if (Constants.platform.android) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL)


            if (status != "granted" ){
                alert("We need permisson to access your camera roll")
            }
        }
    }

    handlePost = () => {
        Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image}).then(ref => {
            this.setState({text:'', image: null})
        }).catch(error => {
            alert(error)
        })
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1]
        })

        if (!result.cancelled) {
            this.setState({image: result.uri})
        }
    }

    render() {
        return (
          <SafeAreaView style={styles.container}>
              <View style={styles.header}>
                  <TouchableOpacity>
                      <Ionicons name='md-arrow-back' size={24} color="#D8D9DB"></Ionicons>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.handlePost}>
                      <Text style={{ fontWeight:'bold' }}>Post</Text>
                  </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                  <Image source={require('../assets/me.jpg')} style={styles.avatar}></Image>
                  <TextInput autoFocus={true} multiline={true} numberOfLines={4} style={{flex:1}} placeholder="Anything on your mind?" placeholderTextColor='black' onChangeText={text => this.setState({text})} value={this.state.text}></TextInput>
              </View>

              <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                <Ionicons name='md-camera' size={32} color='black'></Ionicons>
              </TouchableOpacity>

              <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                <Image source={{uri: this.state.image}} style={{width: "100%",height:'100%'}}></Image>
              </View>
          </SafeAreaView>  
        );
    }
}
export default PostScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor:'#D8D9DB'
    },
    inputContainer: {
        margin: 32,
        flexDirection: 'row'
    },
    avatar:{
        width:48,
        height:48,
        borderRadius:24,
        marginRight:16,
    },
    photo: {
        alignItems:'flex-end',
        marginHorizontal:32
    }
});