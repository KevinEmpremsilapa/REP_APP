/*
 Navigation Page
*/
import React from 'react';
import {createDrawerNavigator, DrawerItems, createStackNavigator,StackNavigator,DrawerNavigator} from 'react-navigation';
import { Icon, StyleSheet, Text, View, Button,SafeAreaView, ScrollView, Dimensions, Image,Asyncstorage} from 'react-native';

// Icons
import defaultUserIcon from './Screens/Images/defaultUserIcon.png';
import homeIcon from './Screens/Images/homeIconGray.png';
import logoutIcon from './Screens/Images/logoutIcon.png';

import Main from './Screens/Main';
import HomeScreen from './Screens/HomeScreen';
import Signup from './Screens/Signup';
import SignupVendor from './Screens/SignupVendor';
import HomeScreenVendor from './Screens/HomeScreenVendor';
import styles from "./Screens/Styles";

const repRed = '#FF6D6F';
const repGray = '363636';


export default class App extends React.Component{
    render(){
        return(
            <RootNavigator/> 
        );
     }
}

const CustomDrawerComponent = (props) => ( 
    //customize the hamburger here
    <SafeAreaView style = {{flex:1}}>
        <View style = {styles.safeAreaStyle}>
            <Image source = {defaultUserIcon} style={styles.userIconImage}/>
        </View>

        <ScrollView >
            <DrawerItems style={styles.contentOptions} {...props}/>
        </ScrollView>
    </SafeAreaView>
)

const Stack = {
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
    SignupVendor: {screen: SignupVendor},
    HomeScreenVendor: {screen: HomeScreenVendor}
};


const drawerRoutes = {
    'Logout': {
        name: 'Logout',
        screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'}),
        navigationOptions:{
            drawerIcon: <Image source={logoutIcon} style={[styles.drawerIconSize, styles.logoutIconSize]} />,
        },
    },
    'Home': {
        name: 'Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreen'}),
        navigationOptions:{
            drawerIcon: <Image source={homeIcon} style={styles.drawerIconSize}/>,
        },
    },
    'Vendor Home': {
        name: 'Vendor Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreenVendor'}),
        navigationOptions:{
            drawerIcon: <Image source={homeIcon} style={styles.drawerIconSize}/>,
        },
    },
    
   
};//creates paths for the drawer navigator using the stack navigation
const RootNavigator = createStackNavigator({
    Drawer: {
        name: 'Drawer',
        screen: createDrawerNavigator(
           drawerRoutes,
            {
                contentComponent: CustomDrawerComponent,
                // Changed "navigationOpions" to "navigationOptions"
                navigationOptions:{
                    drawerLockMode:'locked-closed' //should disable opening the drawer navigator by swiping right
                 },
                 contentOptions:{
                    activeTintColor :'#FF6D6F',
                 }
            }
        )
    },
    ...Stack
},
{
    headerMode: 'none' //this removes the header for the stack navigator since we already have one for the drawer navigator
});