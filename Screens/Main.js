import React from "react";
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, Platform, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
//fixes yellow warning in expo 'setting a timer for a long period...'
import { YellowBox } from 'react-native';
import _ from 'lodash';
// Jack ADDS
import styles from "./Styles";
import GradientButton from 'react-native-gradient-buttons';
import sunsetBG from '../assets/Images/sunsetBG3.png';
import PasswordInputText from 'react-native-hide-show-password-input';

//fixes yellow warning for expo..
YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCdRrAkOeud4rODubGM7ZMs8HqJE7204RM",
  authDomain: "repapp-8255c.firebaseapp.com",
  databaseURL: "https://repapp-8255c.firebaseio.com",
  projectId: "repapp-8255c",
  storageBucket: "repapp-8255c.appspot.com",
  messagingSenderId: "487056809078"
};
firebase.initializeApp(config);

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";
global.isVendor = false;
export default class App extends React.Component {
  // Show / Hide Password
  
  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

//sets values
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      currentUser: null,
      email: "",
      password: "",
      error: "",
      loading: false,
      hidePassword: true,
    };
  }

  //for clickable text user 'padding: #' to increase sensitivity and touchable areas
  signUpUser = (email, password) => {
    this.props.navigation.navigate("VendorUser");
  };

  //check if user is logging in
  loginUser = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });

        //get values from firebase database
        let db = firebase.database();

        //only works for specific user name when /users/UID/name
        //can get all user information by: /users/uid
        let ref = db.ref(`/users/${this.state.currentUser.uid}/name`);

        //this sets name to name
        ref.once("value").then(snapshot => {
          this.setState({
            //.replace removes special characters like " " or '
            name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
          });
        
          //check if user was found
          if (this.state.name != "null" && this.state.name != null) {
            global.isVendor = false;//starts using vendor ham menu
            this.props.navigation.navigate("HomeScreen");
            this.setState({ error: "", loading: false});
          } else {
            this.setState({
              error: "\nAre you a vendor? try signing in as vendor"
            });
          }
        });
      })
      .catch(() => {
        this.setState({ error: "\nInvalid Email or Password", loading: false });
      });
  };
 
  //check if vendor
  loginVendor = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });

        //get values from firebase database
        let db = firebase.database();

        //only works for specific user name when /users/UID/name
        //can get all user information by: /users/uid
        let ref = db.ref(`/vendors/${this.state.currentUser.uid}/name`);

        //this sets name to name
        ref.once("value").then(snapshot => {
          this.setState({
            //.replace removes special characters like " " or '
            name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
          });

          if (this.state.name != "null" && this.state.name != null) {
            global.isVendor = true; //starts using vendor ham menu
            this.props.navigation.navigate("HomeScreenVendor");
            this.setState({ error: "", loading: false});
          } else {
            this.setState({
              error: "\nAre you a user? try signing in as user"
            });
          }
        });
      })
      .catch(() => {
        this.setState({ error: "\nInvalid Email or Password", loading: false });
      });
  };

  // Screen View Login Page
  render() {
    return (
      
       <ImageBackground source={sunsetBG} style={styles.backgroundContainer}>
          <View
            style={styles.form}>
            <Form>
              <Text style={{  color: 'red', fontWeight: "bold", alignSelf: 'center'}}>{this.state.error}</Text>
              <Item 
                rounded
                style={styles.formInput}>
                <Input placeholder = "Email"
                       onChangeText={email => this.setState({ email })}
                />
              </Item>

              <Item 
                rounded
                style={styles.formInput}>
                <Input     
                  placeholder = "Password"
                  underlineColorAndroid = "transparent" 
                  secureTextEntry = { this.state.hidePassword } 
                  style = { styles.textBox }
                  onChangeText={password => this.setState({ password })}
                />
                <TouchableOpacity 
                  activeOpacity = { 0.8 } 
                  style = { styles.visibilityBtn } 
                  onPress = { this.managePasswordVisibility }>
                  <Image 
                    source = { ( this.state.hidePassword ) ? require('../assets/Images/hide.png') : require('../assets/Images/view.png') } 
                    style = { styles.btnImage } />
                </TouchableOpacity>
              </Item>
              
              <View style = {styles.buttonContainer}>
              <GradientButton
                style={{ marginVertical: 8, marginTop: 15}}
                text="User Login"
                textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
                gradientBegin="#FFF"
                gradientEnd="#FFF"           
                gradientDirection="diagonal"
                height={50}
                width={150}
                radius={50}
                success
                onPressAction={() => this.loginUser(this.state.email, this.state.password)}
              />
              <GradientButton
                style={{ marginVertical: 8, marginTop: 15}}
                text="Vendor Login"
                textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
                gradientBegin="#FFF"
                gradientEnd="#FFF"           
                gradientDirection="diagonal"
                height={50}
                width={150}
                radius={50}
                success
                onPressAction={() => this.loginVendor(this.state.email, this.state.password)}
              />
              </View>

            </Form>
          </View>

          <View style={styles.bottom}>
            <Text
              style={styles.smallFont}
              onPress={() =>this.signUpUser(this.state.email, this.state.password)}
            >
              Don't have an account? Sign up{" "}
              <Text style={{ textDecorationLine: "underline" }}>here</Text>
            </Text>
          </View>
        </ImageBackground>
    );
  }
}
