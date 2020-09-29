import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

import * as firebase from 'firebase'

import Ionicons from "react-native-vector-icons/Ionicons"
import moment from "moment"
import Fire from '../Fire1'
import User from '../User'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Button} from 'native-base'


class ExploreScreen extends Component {

    state = {
        posts: [],
        }

        constructor(props) {
            super(props);
            this.subscriber = firebase.firestore().collection("posts").orderBy('timestamp', 'desc')
            .onSnapshot(docs => {
                let posts= []
                docs.forEach(doc => {
                    posts.push(doc.data())
                })
                this.setState({ posts })
            })
        }

        componentDidMount() {
            this.fetchUserDetails()
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
     
    renderLatestPost = (post) => {
        return(
            <View style={styles.feedItem}>
                
               <View style={{flex:1}}>  
                    <View style={{flexDirection: 'row'}}>    
                    <Image source={post.avatar ? {uri:post.avatar} : require('../assets/alien.jpg')} style={styles.avatar}></Image>
                        <Text style={styles.name}>{post.name}</Text>
                    </View>
                        
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>

                <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/>
                
                <View style={{flexDirection:'row',marginLeft:15}}>
                
                    <MaterialCommunityIcons name="alien" size={30} color="black" style={{marginRight: 16,marginTop:7}} />
                    
                    <Ionicons name="ios-chatboxes" size={30} color="black" style={{marginRight: 16,marginTop:10}} />
                    <Ionicons name="ios-more" size={30} color="black" style={{marginTop:10}}/>
                    </View>
                    <Text style={{marginLeft:19,fontWeight:'bold',color:'black'}}>{post.name}</Text>
                <View style={{ marginLeft:19,marginBottom:30 }}>
                <Text style={{color:'black',fontWeight:'900'}}>{post.text}</Text>
                </View>
                </View>
            </View>
               
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.feed} data={this.state.posts} renderItem={({item, index}) => this.renderLatestPost(item, index)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                </FlatList>
            </View>            
        );
    }
}
export default ExploreScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    feed: {
        marginTop:10
    },
    feedItem:{
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    avatar: {
       width: 38,
       height: 38,
       borderRadius:18,
       marginRight:7,
       marginLeft:10 
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        flexDirection:'row',
    },
    timestamp: {
        fontSize: 11,
        color: 'black',
        marginLeft:55,
        top:-14
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: 350,
        height: 350,
        borderRadius:20,
        marginLeft:5,
        alignItems:'center',
        justifyContent:'center'
    }
});