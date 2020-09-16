import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'




import * as firebase from 'firebase'


import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import LoadingScreen from './screens/LoadingScreen'

var firebaseConfig = {
  apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
  const routeName = route.state? route.state.routes[route.state.index].name:'Home'

  switch (routeName) {
    case 'Home':
      return 'Explore';
    case 'Inbox':
      return 'Inbox';
    case 'News':
      return 'News';  
    case 'Notifications':
      return 'Notifications';
    case 'Profile':
      return 'Profile';
  }
}

function shouldHeaderBeShown(route){

  const routeName = route.state? route.state.routes[route.state.index].name:'Home'

  switch(routeName){
    case 'Home':
      return false
    case 'Notifications':
      return false
    case 'News':
      return false  
    case 'Inbox':
      return false
    case 'Profile':
      return false  
  }
}


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

 

