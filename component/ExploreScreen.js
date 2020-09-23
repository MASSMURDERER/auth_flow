import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

import Fire from '../Fire1'

import * as firebase from 'firebase'

import Ionicons from "react-native-vector-icons/Ionicons"
import moment from "moment"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Icon,Button} from 'native-base'


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

        onPostLike = (postId) => {
            // Create a reference to the post
            const postReference = firebase.firestore().doc(`posts/${"sEcy25LtIzon6jinyfJY"}`);
          
            return firebase.firestore().runTransaction(async transaction => {
              // Get post data first
              const postSnapshot = await transaction.get(postReference);
          
              if (!postSnapshot.exists) {
                throw 'Post does not exist!';
              }
          
              await transaction.update(postReference, {
                likes: postSnapshot.data().likes + 1
              });
            });
          }
          

     
      
    renderLatestPost = (post) => {
        return(
            <View style={styles.feedItem}>
                
               <View style={{flex:1}}>  
                    <View style={{flexDirection: 'row'}}>    
                    <Image source={{uri:post.avatar}} style={styles.avatar}></Image>
                        <Text style={styles.name}>{post.displayName}</Text>
                    </View>
                        
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>

                <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/>
                
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <Button onPress={this.onPostLike} transparent>
                    <MaterialCommunityIcons name="alien" size={32} color="white" style={{marginRight: 16,marginTop:1}} />
                    </Button>
                    <Ionicons name="ios-chatboxes" size={30} color="white" style={{marginRight: 16,marginTop:10}} />
                    <Ionicons name="ios-more" size={30} color="white" style={{marginTop:10}}/>
                    </View>
                    <Text style={{color:'white'}}>{post.likes}</Text>
                    <Text style={{marginLeft:10,fontWeight:'bold',color:'white'}}>{post.displayName}</Text>
                <View style={{marginLeft:10,marginBottom:30}}>
                <Text style={{color:'white'}}>{post.text}</Text>
                </View>
                </View>
            </View>
               
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.feed} data={this.state.posts} renderItem={({post, index}) => this.renderLatestPost(post, index)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                </FlatList>
            </View>            
        );
    }
}
export default ExploreScreen;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'black'
    },
    feed: {
        marginTop:10
    },
    feedItem:{
      backgroundColor: 'black',
      flexDirection: 'row',
    },
    avatar: {
       width: 38,
       height: 38,
       borderRadius: 18,
       marginRight: 16,
       marginLeft:10 
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'white',
        flexDirection:'row',
    },
    timestamp: {
        fontSize: 11,
        color: 'white',
        marginLeft:65,
        top:-14
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 360,
        justifyContent:'center',
    }
});