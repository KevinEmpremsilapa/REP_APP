
/*
 Navigation Page
*/
import React from 'react';
import {createDrawerNavigator, DrawerItems, createStackNavigator,StackNavigator,DrawerNavigator} from 'react-navigation';
import { StyleSheet, Text, View, Button,SafeAreaView, ScrollView, Dimensions, Image,Asyncstorage} from 'react-native';

import Main from './Screens/Main';
import HomeScreen from './Screens/UserScreens/HomeScreen';
import Signup from './Screens/UserScreens/Signup';
import SignupVendor from './Screens/VendorScreens/SignupVendor';
import HomeScreenVendor from './Screens/VendorScreens/HomeScreenVendor';
import UserEditProfile from './Screens/UserScreens/UserEditProfile';
import styles from "./Screens/Styles";
import VendorUser from './Screens/VendorUser';


export default class App extends React.Component{
    render(){
        return(
            <RootNavigator/> 
        );
     }
}

const CustomDrawerComponent = (props) => ( //customize the hamburger here //Medium well, no pickels 
    <SafeAreaView style = {{flex:1}}>

        <View style = {styles.safeAreaStyle}>
            <Image source = {require('./assets/Images/personIcon.png')} style={styles.menuImage}/>
        </View>

        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>

    </SafeAreaView>
)

const Stack = {
    MainScreen: {screen: Main},
    HomeScreen: {screen: HomeScreen},
    SignupScreen: {screen: Signup},
    SignupVendor: {screen: SignupVendor},
    HomeScreenVendor: {screen: HomeScreenVendor},
    UserEditProfile: {screen: UserEditProfile},
    VendorUser: {screen: VendorUser}
};

const drawerRoutes = {
   'Logout': {
        name: 'Logout',
        screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'})
    },
    'Home': {
        name: 'Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreen'})
    },
    'Vendor Home': {
        name: 'Vendor Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreenVendor'})
    },
    'Edit Profile': {
        name: 'Edit Profile',
        screen: createStackNavigator(Stack, {initialRouteName: 'UserEditProfile'})
    }

};//creates paths for the drawer navigator using the stack navigation

const RootNavigator = createStackNavigator({
    Drawer: {
        name: 'Drawer',
        screen: createDrawerNavigator( 
           drawerRoutes,
            {
                contentComponent: CustomDrawerComponent,
                navigationOptions:{
                    drawerLockMode:'locked-closed' //should disable opening the drawer navigator by swiping right
                 }
            }
        )
    },
    ...Stack
},

{
    headerMode: 'none' //this removes the header for the stack navigator since we already have one for the drawer navigator
});