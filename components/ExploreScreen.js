import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";


import * as firebase from "firebase"


class ExploreScreen extends Component {

    state = { currentUser: null }
    
    componentDidMount() {
        const { currentUser } = firebase.auth()
    
        this.setState({ currentUser })
      }



    render() {
        const { currentUser } = this.state
        return (
            <View style={styles.container}>
                <Text style={{color:'red'}}>ExploreScreen</Text>
                <Text style={{color:'red',marginBottom:10}}>{currentUser && currentUser.email}</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Details')} style={{backgroundColor:'red',padding:5}}>
                    <Text style={ { color:'white' }}>
                        Details
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
export default ExploreScreen;






const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    }
});