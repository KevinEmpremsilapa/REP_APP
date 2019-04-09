
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
import UserProfile from './Screens/UserScreens/UserProfile';
import VendorEditProfile from './Screens/VendorScreens/VendorEditProfile';
import VendorProfile from './Screens/VendorScreens/VendorProfile';

var isVendor;
//const drawerRoutes;


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
    VendorUser: {screen: VendorUser},
    UserProfile: {screen: UserProfile},
    VendorProfile: {screen: VendorProfile},
    VendorEditProfile: {screen: VendorEditProfile}
};

//User Profile
 const drawerRoutes = {
   'Logout': {
        name: 'Logout',
        screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'})
    },
    'Home': {
        name: 'Home',
        screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreen'})
    },
    'My Profile': {
        name: 'My Profile',
        screen: createStackNavigator(Stack, {initialRouteName: 'UserProfile'})
    }

};//creates paths for the drawer navigator using the stack navigation

//Vendor Profile
 VendordrawerRoutes = {
    'Logout': {
         name: 'Logout',
         screen: createStackNavigator(Stack, {initialRouteName: 'MainScreen'})
     },
     'Vendor Home': {
         name: 'Vendor Home',
         screen: createStackNavigator(Stack, {initialRouteName: 'HomeScreenVendor'})
     },
     'My Profile': {
         name: 'My Profile',
         screen: createStackNavigator(Stack, {initialRouteName: 'VendorProfile'})
     }
 };

//Initial Stack Nav Needed to fix red screen
var RootNavigator = createStackNavigator({
    Drawer: {
        name: 'Drawer',
        screen: createDrawerNavigator( 
           VendordrawerRoutes,
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



/*
//Uses diff Ham Menu depending if Vendor or User
if(isVendor == true)
{
     RootNavigator = createStackNavigator({

        Drawer: {
            name: 'Drawer',
            screen: createDrawerNavigator( 
               VendordrawerRoutes,
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

}
else if(isVendor == false){
    
 RootNavigator = createStackNavigator({

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

}
else
{
     RootNavigator = createStackNavigator({
        ...Stack
    });
}
*/
