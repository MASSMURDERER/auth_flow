import React from 'react';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'



import * as firebase from 'firebase'


import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import LoadingScreen from './screens/LoadingScreen'

var firebaseConfig = {
    apiKey: "AIzaSyBJxqrv78rF0gDZjxWNTFIcuQvsHaTkUoQ",
    authDomain: "auth-flow-ccd4a.firebaseapp.com",
    databaseURL: "https://auth-flow-ccd4a.firebaseio.com",
    projectId: "auth-flow-ccd4a",
    storageBucket: "auth-flow-ccd4a.appspot.com",
    messagingSenderId: "1063722450044",
    appId: "1:1063722450044:web:97d13d318f2ba704795df9",
    measurementId: "G-CY5R577N8N"
};
// Initialize Firebase
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="SignUp" component={AuthStackNavigator} options={{headerShown:false}} />
        <Stack.Screen name="Main" component={MainScreen} options={({ route }) => ({title: getHeaderTitle(route),headerShown:shouldHeaderBeShown(route)})} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const AuthStackNavigator = () => {
  return(
    <AuthStack.Navigator initialRouteName="Loading">
     <AuthStack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}} /> 
      <AuthStack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      <AuthStack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}} />
    </AuthStack.Navigator>
  )
}



function getHeaderTitle(route) {
  const routeName = route.state? route.state.routes[route.state.index].name:'Explore'

  switch (routeName) {
    case 'Explore':
      return 'Explore';
    case 'Inbox':
      return 'Inbox';
    case 'Notifications':
      return 'Notifications';
    case 'Profile':
      return 'Profile';
  }
}

function shouldHeaderBeShown(route){

  const routeName = route.state? route.state.routes[route.state.index].name:'Explore'

  switch(routeName){
    case 'Explore':
      return false
    case 'Notifications':
      return false
    case 'Inbox':
      return false
    case 'Profile':
      return false  
  }
}


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();



