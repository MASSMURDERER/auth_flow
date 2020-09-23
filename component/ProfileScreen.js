import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from "react-native";


import Fire from '../Fire1'
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import UserPermissions from '../UserPermissions'

import * as ImagePicker from 'expo-image-picker'

class ProfileScreen extends Component {

    state ={
        user: {},
        images: [],
        userDetails:{},
        updatedUser:{
            avatar:null
        }
    }

    unsubscribe = null;

    componentDidMount() {

        this.fetchUserDetails()

        this.fetchPosts()

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

    fetchPosts = async () => {
        try {
          const posts = await Fire.shared.getUserPosts()
          let images = posts.map(item => {
            return item.image
          })
      
          this.setState({ images })
        } catch (error) {
          console.log(error)
        }
      }

      fetchUserDetails = async () => {
        try {
          const userDetails = await Fire.shared.getUserDetails()
          this.setState({ userDetails })
        } catch (error) {
          console.log(error)
        }
      }

      handlePickAvatar = async () => {
        UserPermissions.getCameraPermission();
       
       let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
       });
       
       if (!result.cancelled) {
          this.setState({ updatedUser: { ...this.state.updatedUser, avatar: result.uri } });
       }
       Fire.shared.updateProfile(this.state.updatedUser);
       };


    render() {
        const { images, userDetails } = this.state
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: 'center'}}>
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                        <Image style={styles.avatar}
                                source={{uri:this.state.user.avatar}
                                }/>
                                <MaterialIcons 
                     name="photo-camera" 
                     size={40} color="grey" 
                     style={{ marginTop: 6, marginLeft: 2 }} 
                     />
                    </TouchableOpacity>
                </View>
                
                <View style={{padding:110,top:-50,left:10,flexDirection:'row',justifyContent:"center",marginVertical:10}}>
                <View style={{marginRight:30}}>
                <Button onPress={() => {Fire.shared.signOut()}} title="Logout" />
                </View>            
                </View>
                <View style={{justifyContent: 'center',alignItems:'center', top:-250}}>
                    <Text style={styles.name}>{userDetails.displayName}</Text>
                </View>
                <View style={{alignItems:'center',top:-150}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyGallery') }>
                    <Text style={{color:'#33B0FF',fontWeight:'bold',fontSize:17}}>My Gallery</Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    avatarContainer: {
        shadowColor: '#151734',
        shadowRadius: 15,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color:'white'
    },
    border: {
        width: 200,
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
      },
});