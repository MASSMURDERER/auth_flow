import React, { Component } from "react";
import { 
    View,
    Text,
    Image,
    StyleSheet,
} from "react-native";
import User from '../User'

class NotificationsScreen extends Component {


    render() {
        return (
            <View style={styles.container}>
               <Text>Notifications</Text>
            </View>
        );
    }
}
export default NotificationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    }
});