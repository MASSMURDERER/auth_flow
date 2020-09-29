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
import UserPermissions from '../UserPermissions'
import * as ImagePicker from 'expo-image-picker';
import Fire from '../Fire1'

import Ionicons from 'react-native-vector-icons/Ionicons'

const firebase = require("firebase");
require("firebase/firestore")

class PostScreen extends Component {
    state={
        user: {},
        text: "",
        image: null
    }

    unsubscribe = null

    componentDidMount(){
        UserPermissions.getCameraPermission()

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


    handlePost = () => {
        Fire.shared.addPost({text: this.state.text.trim(), localUri: this.state.image, name: this.state.user.name, avatar: this.state.user.avatar}).then(ref => {
            this.setState({text:'', image: null, name: this.state.user.name, avatar: this.state.user.avatar})
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
                      <Text style={{ fontWeight:'bold', fontSize:17, color:'black' }}>Post</Text>
                  </TouchableOpacity>
              </View>
                
              <View style={styles.inputContainer}>
                  <Image source={this.state.user.avatar
                                ? {uri: this.state.user.avatar}
                                : require('../assets/alien.jpg')} style={styles.avatar}></Image>
                  <TextInput autoFocus={true} multiline={true} numberOfLines={4} style={{flex:1,color:'black'}} placeholder="Share your Moments..." placeholderTextColor='black' onChangeText={text => this.setState({text})} value={this.state.text}></TextInput>
              </View>
              <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                <Ionicons name='ios-camera' size={36} color='black'></Ionicons>
              </TouchableOpacity>
              <View style={{marginHorizontal: 32, marginTop: 32, height: 150}}>
                <Image source={{uri: this.state.image}} style={{width: 300,height:300}}></Image>
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
        marginHorizontal:32,
        top:-10
    }
});