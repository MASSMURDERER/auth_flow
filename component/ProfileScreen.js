import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
    Image
} from "react-native";

import User from '../User'
import Fire from '../Fire1'
import { TouchableOpacity } from "react-native-gesture-handler";

class ProfileScreen extends Component {

    state ={
        user: {},
        images: [],
        userDetails:{},
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
        User.name = this.state.userDetails.name
      }


    render() {
        const { images } = this.state
        return (
            <View style={styles.container}>
                <View style={{marginTop: 64, alignItems: 'center'}}>
                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar}
                                source={this.state.user.avatar
                                    ? {uri:this.state.user.avatar}
                                    : require('../assets/alien.jpg')
                                }/>
                    </View>
                </View>
                
                <View style={{padding:110,top:-50,left:10,flexDirection:'row',justifyContent:"center",marginVertical:10}}>
                <View style={{marginRight:30}}>
                <Button onPress={() => {Fire.shared.signOut()}} title="Logout" />
                </View>
                <View>
                <Button title="Edit Profile" onPress={() => this.props.navigation.navigate('EditAvatar')} />
                </View>
                </View>
                <View style={{justifyContent: 'center',alignItems:'center', top:-250}}>
                    <Text style={styles.name}>{User.name}</Text>
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
        backgroundColor:'white'
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
        color:'black'
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