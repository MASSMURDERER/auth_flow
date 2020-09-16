import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from "react-native";

import {Container, Content, Icon, Thumbnail} from 'native-base'

import * as firebase from "firebase"

import CardComponent from '../screens/CardComponent'

class ExploreScreen extends Component {

    state = { currentUser: null }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
    
        this.setState({ currentUser })
      }



    render() {
        const { currentUser } = this.state
        return (
            <Container style={styles.container}>
                <Content>

                    <View style={{height:100}}>
                        <View style={{flex:1, flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:7}}>
                        <Text style={{fontWeight:'bold'}}>Stories</Text>
                       <View style={{flexDirection:'row',alignItems:'center'}}>
                           <Icon name='md-play' style={{fontSize:14,paddingRight:5}}></Icon>
                        <Text style={{fontWeight:'bold'}}>Watch All</Text>
                        </View>
                        </View>
                        <View style={{flex:3}}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    alignItems:'center',
                                    paddingStart: 5,
                                    paddingEnd: 5
                                }}
                            >
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                                <Thumbnail style={{marginHorizontal:5,borderColor:'pink',borderWidth:2}} source={(require('../assets/me.jpg'))} />
                            </ScrollView>
                        </View>
                    </View>

                    <CardComponent imageSource="1" likes="89 likes"/>
                    <CardComponent imageSource="2" likes="59 likes"/>
                    <CardComponent imageSource="3" likes="49 likes"/>
                </Content>
            </Container>
        );
    }
}
export default ExploreScreen;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    }
});