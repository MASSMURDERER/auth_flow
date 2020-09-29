import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";

import Fire from '../Fire1'

import UserPermissions from '../UserPermissions'

import * as ImagePicker from 'expo-image-picker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

class EditAvatarScreen extends Component {
    state = {
        user:{},
        updatedUser:{
          avatar: null,
        }
      }

      unsubscribe = null;

    componentDidMount() {
    const user = this.props.uid || Fire.shared.uid;

    this.unsubscribe = Fire.shared.firestore
        .collection("users")
        .doc(user)
        .onSnapshot(doc => {
            this.setState({ user: doc.data() });
        });
}

componentWillUnmount() {
    this.unsubscribe();
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
   this.props.navigation.navigate('Profile')
}
Fire.shared.updateProfile(this.state.updatedUser);
};
    
      render() {
        return (
          <View style={styles.container}>
            <View style={{marginTop: 64, alignItems: 'center'}}>
                    <TouchableOpacity style={styles.avatarContainer} onPress={this.handlePickAvatar}>
                        <Image style={styles.avatar}
                                source={this.state.user.avatar ? {uri:this.state.user.avatar} : require('../assets/alien.jpg')}/>
                                <MaterialIcons 
                     name="photo-camera" 
                     size={40} color="grey" 
                     style={{ marginTop: 6, marginLeft: 2 }} 
                     />  
                    </TouchableOpacity>
                </View>
          </View>
        )
      }
    }
export default EditAvatarScreen;

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
  border: {
    width: 200,
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
    color:'white'
  }
});