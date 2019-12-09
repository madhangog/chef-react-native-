import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from '../Screens/HomeScreen'
import Login from '../Screens/LoginScreen'
import Count from '../Screens/CountScreen'
import Signup from '../Screens/SighupScreen'
import AdminLogin from '../Screens/AdminloginScreen'
import AdminHome from '../Screens/AdminHome'

const MainStack = createStackNavigator(
    {
        Home : {
            screen:Home,
        },
        Login : {
            screen: Login
        },
        Count:{
          screen : Count
        },
        Signup :{
          screen : Signup
        },
        AdminLogin : {
          screen : AdminLogin
        },
        AdminHome : {
          screen : AdminHome
        }
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
      }
)
const RootStack = createStackNavigator(
    {
      Main: {
        screen: MainStack,
      },
    },
    {
      headerMode: 'none',
    }
  );

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
