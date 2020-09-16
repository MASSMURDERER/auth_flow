import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import FontAwesome from 'react-native-vector-icons/FontAwesome'


import {Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon} from 'native-base'

class CardComponent extends Component {
    render() {

        const images = {
            "1": require('../assets/feed_images/1.jpg'),
            "2": require('../assets/me.jpg'),
            "3": require('../assets/feed_images/3.jpg')
        }
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={require('../assets/me.jpg')} />
                        <Body>
                            <Text>__v.j__</Text>
                            <Text note>Sep 16,2020</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={images[this.props.imageSource]} style={{height:200,width:null,flex:1}}/>
                </CardItem>
                <CardItem style={{height: 45}}>
                    <Left>
                        <Button transparent>
                            <FontAwesome name='thumbs-o-up' style={{color:'black',fontSize:25}} />
                        </Button>
                        <Button transparent>
                            <Icon name='ios-chatbubbles' style={{color:'black',fontSize:25}} />
                        </Button>
                        <Button transparent>
                            <Icon name='ios-send' style={{color:'black',fontSize:25}} />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent>
                            <FontAwesome5 name='bookmark' style={{color:'black',fontSize:22}} />
                        </Button>
                    </Right>
                </CardItem>

                <CardItem style={{height:20}}>
                <Text>{this.props.likes}</Text> 
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>
                            <Text style={{fontWeight:"bold"}}>__v.j__</Text>
                           There's nothin more beautiful than the way the ocean refuses to stop kissin the shoreline, no matter how many times its sent away 
                        </Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}
export default CardComponent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});