import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";

import Fire from '../Fire1'

import * as firebase from "firebase"

import Ionicons from "react-native-vector-icons/Ionicons"
import moment from "moment"

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Icon,Button} from 'native-base'


class ExploreScreen extends Component {

    state = {
        latestPost: [],
        }
     
     displayLatestPost = (latestPost) => {
         this.setState({latestPost: latestPost});
         console.log("latest Post " + this.state.latestPost);
     }
     
     componentDidMount(){
        Fire.shared.getPosts(this.displayLatestPost);
        console.log("This is the displayLatestPost " + this.state.latestPost);
        
     }
      

    renderLatestPost = (post) => {
        return(
            <View style={styles.feedItem}>
                
               <View style={{flex:1}}>
                       
                    <View style={{flexDirection: 'row'}}>    
                    <Image source={post.avatar ? {uri: post.avatar} : require('../assets/alien.jpg')} style={styles.avatar}></Image>
                        <Text style={styles.name}>{post.name}</Text>
                    </View>
                        
                <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>

                <Image source={{uri:post.image}} style={styles.postImage} resizeMode='cover'/>
                
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <Button onPress={this.onPostLike} transparent>
                    <FontAwesome name="thumbs-o-up" size={28} color="dodgerblue" style={{marginRight: 16,marginTop:1}} />
                    </Button>
                    <Ionicons name="ios-chatbubbles" size={30} color="dodgerblue" style={{marginRight: 16,marginTop:10}} />
                    <Ionicons name="ios-more" size={30} color="dodgerblue" style={{marginTop:10}}/>
                    </View>
                    <Text style={{marginLeft:10,fontWeight:'bold'}}>{post.name}</Text>
                <View style={{marginLeft:10,marginBottom:30}}>
                <Text style={styles.posts}>{post.text}</Text>
                </View>
                </View>
            </View>
               
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.feed} data={this.state.latestPost} renderItem={({item, index}) => this.renderLatestPost(item, index)} keyExtractor={item => item.id} showsVerticalScrollIndicator={false}>
                <View >
                        <Button transparent >
                            <Icon name='ios-search' size={24} />
                        </Button>
                       </View>
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
      borderRadius:5,
      padding: 8,
      flexDirection: 'row',
    },
    avatar: {
       width: 38,
       height: 38,
       borderRadius: 18,
       marginRight: 16, 
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
        flexDirection:'row',
    },
    timestamp: {
        fontSize: 11,
        color: '#C4C6CE',
        marginLeft:55,
        top:-14
    },
    post: {
        marginTop: 16,
        fontSize: 14,
        color: '#838899'
    },
    postImage: {
        width: undefined,
        height: 350,
        borderRadius:20,
        marginVertical: 1,
        justifyContent:'center',
    }
});