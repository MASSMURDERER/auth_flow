import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    Button
} from "react-native";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'


import ExploreScreen from '../components/ExploreScreen'
import Details from "../ExploreScreen/Details";
import InboxScreen from '../components/InboxScreen'
import NotificationsScreen from '../components/NotificationsScreen'
import Notify from "../NotificationsScreen/Notify"
import ProfileScreen from '../components/ProfileScreen'

const ExploreStackScreen = () => {
    return(
    <ExploreStack.Navigator>
        <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{headerShown:false}}/>
        <ExploreStack.Screen name="Details" component={Details} />
    </ExploreStack.Navigator>
    )
}

const NotificationsStackScreen = () => {
    return(
    <NotificationsStack.Navigator>
        <NotificationsStack.Screen name="Notifications" component={NotificationsScreen} options={{headerShown:false}}/>
        <NotificationsStack.Screen name="Notify" component={Notify} options={({route}) => ({title: route.params.name})}/>
    </NotificationsStack.Navigator>
    )
}

const InboxStackScreen = () => {
    return(
    <InboxStack.Navigator>
        <InboxStack.Screen name="Inbox" component={InboxScreen} options={{headerShown:false}}/>
    </InboxStack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return(
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
    </ProfileStack.Navigator>
    )
}




class MainScreen extends Component {
    render() {
        return (
            <Tab.Navigator initialRouteName='Explore'>

                <Tab.Screen name='Explore' 
                component={ExploreStackScreen}
                options={{
                    tabBarColor: 'red',
                    tabBarIcon:({color,size}) => (
                       <Icon name = "ios-search" color={color} size={24} />
                    )
                }} />
                <Tab.Screen name='Inbox' 
                component={InboxStackScreen}
                options={{
                    tabBarColor:'blue',
                    tabBarIcon:({color,size}) => (
                       <Icon name = "ios-send" color={color} size={24} />
                    )
                }} />
                <Tab.Screen name='Notifications'
                 component={NotificationsStackScreen}
                 options={{
                    tabBarColor: 'purple',
                     tabBarIcon:({color,size}) => (
                         <Icon name = "ios-heart" color={color} size={24} />
                     )
                 }} />
                <Tab.Screen name='Profile' 
                component={ProfileStackScreen}
                options={{
                    tabBarColor: 'black',
                    tabBarIcon:({color,size}) => (
                       <Icon name= "ios-person" color={color} size={24} />
                    )
                }} />
            </Tab.Navigator>
        );
    }
}


const Tab = createMaterialBottomTabNavigator();
const ExploreStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const InboxStack = createStackNavigator();
const ProfileStack = createStackNavigator();


export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
