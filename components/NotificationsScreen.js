import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class NotificationsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color:'purple',fontWeight:'bold'}}>NotificationsScreen</Text>
                <Button title='Notifications' onPress={() => this.props.navigation.navigate('Notify', {name: 'Notifications'})} />
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