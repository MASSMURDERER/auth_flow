import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

import * as firebase from "firebase"

import Ionicons from "react-native-vector-icons/Ionicons"
import moment from "moment"

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Icon,Button} from 'native-base'

posts= [
    {
        id: "1",
        name: "__v.j__",
        text:"Great job! I am a designer and I'm learning a lot with your tutorials. Thank you :) I am very excited to see the app getting the feed from Firebase.",
        timestamp: 1600319825909,
        avatar: require("../assets/me.jpg"),
        image: 'https://firebasestorage.googleapis.com/v0/b/auth-flow-ccd4a.appspot.com/o/photos%2FtR0rk4oD8BM1sKLX6t4va1IDtkj1%2F1600281315917.jpg?alt=media&token=4d2378fa-5002-48fd-9409-5bf6efc6fef3'
    },
]

class ExploreScreen extends Component {

    state = {
        posts: []
    }

    constructor(props) {
        super (props);
        this.subscriber = firebase.firestore().collection('posts')
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => {
                posts.push(doc.data())
            })
            this.setState({ posts })
        })
    }

    onPostLike= (postId) => {
        // Create a reference to the post
        const postReference = firebase.firestore().doc(`posts/${'37KDcwID0cejvy3lWwTb'}`);
      
        return firebase.firestore().runTransaction(async transaction => {
          // Get post data first
          const postSnapshot = await transaction.get(postReference);
      
          if (!postSnapshot.exists) {
            throw 'Post does not exist!';
          }
      
          await transaction.update(postReference, {
            likes: postSnapshot.data().likes + 1,
          });
        });
      }
      

    renderPost = post => {
        return(
            <View style={styles.feedItem}>
               <View style={{flex:1}}>
                   <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
                       <View>
                       </View>

                       
                   </View>


                    {this.state.posts.map((post,index) => <View key={index}>
                        
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>

                <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/>
                
                <Text style={styles.posts}>{post.text}</Text>
                <View style={{flexDirection:'row'}}>
                    <Button onPress={this.onPostLike} transparent>
                    <FontAwesome name="thumbs-o-up" size={24} color="dodgerblue" style={{marginRight: 16,marginTop:3}} />
                    </Button>
                    <Ionicons name="ios-chatbubbles" size={24} color="dodgerblue" style={{marginRight: 16,marginTop:10}} />
                    <Ionicons name="ios-more" size={24} color="dodgerblue" style={{marginTop:10}}/>
                    </View>
                <Text style={{marginTop:5}}>{post.likes} likes</Text>
                </View>)}

                <View style={{flexDirection: 'row'}}>
                    
                </View>
                </View>
            </View>
               
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.feed} data={posts} renderItem={({item}) => this.renderPost(item)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false} />
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
        marginHorizontal: 16
    },
    feedItem:{
      backgroundColor: 'white',
      borderRadius:5,
      padding: 8,
      flexDirection: 'row',
      marginVertical: 8  
    },
    avatar: {
       width: 36,
       height: 36,
       borderRadius: 18,
       marginRight: 16 
    },
    name: {
        fontSize: 15,
        fontWeight: "500",
        color: 'black'
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginTop:4
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 350,
        borderRadius: 10,
        marginVertical: 16
    }
});