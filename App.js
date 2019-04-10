/*
 Navigation Page
*/
import React from 'react';
import {createDrawerNavigator, DrawerItems, createStackNavigator,StackNavigator,DrawerNavigator} from 'react-navigation';
import { Icon, StyleSheet, Text, View, Button,SafeAreaView, ScrollView, Dimensions, Image,Asyncstorage} from 'react-native';

// Icons
import defaultUserIcon from './assets/Images/defaultUserIcon.png';
import homeIcon from './assets/Images/homeIconGray.png';
import logoutIcon from './assets/Images/logoutIcon.png';

import Main from './Screens/Main';
import HomeScreen from './Screens/UserScreens/HomeScreen';
import Signup from './Screens/UserScreens/Signup';
import SignupVendor from './Screens/VendorScreens/SignupVendor';
import HomeScreenVendor from './Screens/VendorScreens/HomeScreenVendor';
import styles from "./Screens/Styles";
import UserProfile from './Screens/UserScreens/UserProfile';
import UserEditProfile from './Screens/UserScreens/UserEditProfile';
import VendorProfile from './Screens/VendorScreens/VendorProfile';
import VendorEditProfile from './Screens/VendorScreens/VendorEditProfile';
import VendorUser from './Screens/VendorUser';

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
    UserProfile: {screen: UserProfile},
    UserEditProfile: {screen: UserEditProfile},
    HomeScreenVendor: {screen: HomeScreenVendor},
    SignupVendor: {screen: SignupVendor},
    VendorProfile: {screen: VendorProfile},
    VendorEditProfile: {screen: VendorEditProfile},
    VendorUser: {screen: VendorUser},
};


const drawerRoutes = {
    'Logout': {
        name: 'Logout',
        screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'}),
        navigationOptions:{
            drawerIcon: <Image source={logoutIcon} style={[styles.drawerIconSize, styles.logoutIconSize]} />,
        },
    },
    'User Home': {
        name: 'Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreen'}),
        navigationOptions:{
            drawerIcon: <Image source={homeIcon} style={styles.drawerIconSize}/>,
        },
    },
    'User Profile': {
        name: 'User Profile',
        screen: createStackNavigator(Stack, {initialRouteName: 'UserProfile'}),
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
    'Vendor Profile': {
        name: 'Vendor Profile',
        screen: createStackNavigator(Stack, {initialRouteName: 'VendorProfile'}),
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