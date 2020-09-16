import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    Image,
} from "react-native";

import {Button,Icon} from 'native-base'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome5'
import Icon3 from 'react-native-vector-icons/Entypo'


import ExploreScreen from '../component/ExploreScreen'
import Details from "../ExploreScreen/Details";
import InboxScreen from '../component/InboxScreen'
import SearchScreen from '../component/SearchScreen'
import NotificationsScreen from '../component/NotificationsScreen'
import Notify from "../NotificationsScreen/Notify"
import NewsScreen from '../component/NewsScreen'
import ProfileScreen from '../component/ProfileScreen'

const ExploreStackScreen = ({navigation}) => {
    return(
    <ExploreStack.Navigator screenOptions={{headerTitleStyle: {
        paddingLeft:85
    }}}>
        <ExploreStack.Screen name="Home" component={ExploreScreen} options={{
            headerRight: () => (
                <Button onPress={() => navigation.navigate('Inbox')} transparent>
                <Icon style={{color:'black',fontSize:30}} name="ios-chatboxes" />
                </Button>
            ),
            headerTitle: "App",
            headerLeft: () => (
                <Icon style={{paddingLeft:10,fontSize:36}} name='ios-camera' />
            )
        }}/>
        <ExploreStack.Screen name="Inbox" component={InboxScreen} />
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
    <NewsStack.Navigator>
        <NotificationsStack.Screen name="News" component={NewsScreen}/>
    </NewsStack.Navigator>
    )
}

const SearchStackScreen = () => {
    return(
    <SearchStack.Navigator>
        <SearchStack.Screen name="Search" component={SearchScreen} />
    </SearchStack.Navigator>
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
            <Tab.Navigator initialRouteName='Home' backBehavior='none' tabBarOptions={{activeTintColor:'dodgerblue', inactiveTintColor:'grey'}}>

                <Tab.Screen name='Home' 
                component={ExploreStackScreen}
                options={{
                    tabBarColor: 'red',
                    tabBarIcon:({color,size}) => (
                       <Icon3 name = "home" color={color} size={24} />
                    )
                }} />
                <Tab.Screen name='Search' 
                component={SearchStackScreen}
                options={{
                    tabBarColor:'blue',
                    tabBarIcon:({color,size}) => (
                       <Icon1 name = "ios-eye" color={color} size={30} />
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
                         <Icon1 name = "ios-heart" color={color} size={24} />
                     )
                 }} />
                <Tab.Screen name='Profile' 
                component={ProfileStackScreen}
                options={{
                    tabBarColor: 'black',
                    tabBarIcon:({color,size}) => (
                       <Icon1 name= "ios-person" color={color} size={24} />
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
const SearchStack = createStackNavigator();
const ProfileStack = createStackNavigator();


export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
