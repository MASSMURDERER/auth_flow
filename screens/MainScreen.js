import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
    Button
} from "react-native";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'


import ExploreScreen from '../component/ExploreScreen'
import Details from "../ExploreScreen/Details";
import InboxScreen from '../component/InboxScreen'
import NotificationsScreen from '../component/NotificationsScreen'
import Notify from "../NotificationsScreen/Notify"
import NewsScreen from '../component/NewsScreen'
import ProfileScreen from '../component/ProfileScreen'

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

const NewsStackScreen = () => {
    return(
    <NotificationsStack.Navigator>
        <NotificationsStack.Screen name="News" component={NewsScreen}/>
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
            <Tab.Navigator initialRouteName='Explore' tabBarOptions={{activeTintColor:'black'}}>

                <Tab.Screen name='Home' 
                component={ExploreStackScreen}
                options={{
                    tabBarColor: 'red',
                    tabBarIcon:({color,size}) => (
                       <Icon3 name = "home" color={color} size={24} />
                    )
                }} />
                <Tab.Screen name='Search' 
                component={InboxStackScreen}
                options={{
                    tabBarColor:'blue',
                    tabBarIcon:({color,size}) => (
                       <Icon name = "ios-eye" color={color} size={30} />
                    )
                }} />
                <Tab.Screen name='News' 
                component={NewsStackScreen}
                options={{
                    tabBarColor: 'black',
                    tabBarIcon:({color,size}) => (
                       <Icon2 name= "newspaper" color={color} size={24} />
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


const Tab = createBottomTabNavigator();
const ExploreStack = createStackNavigator();
const NotificationsStack = createStackNavigator();
const NewsStack = createStackNavigator();
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
