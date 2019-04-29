//User Edit Profile Screen
import React, { Component } from "react";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import * as firebase from "firebase";
import GradientButton from 'react-native-gradient-buttons';
import gradientBG from '../../assets/Images/gradientBG.png';
import styles from "../Styles";

import {
  View,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image, 
  Platform,
} from "react-native";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Label
} from "native-base";

export default class UserProfile extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
      this._gotoCurrentLocation();
    });

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    // get values from firebase database
    let db = firebase.database();

    // only works for specific user name when /users/UID/name
    // can get all user information by: /users/uid
    
    //get phone
    let phoneRef = db.ref(`/users/${currentUser.uid}/phone`);
    //set phone number from database to the phone variable
    phoneRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        phone: snapshot.val()
      });
    });
    
   //get NAme
    let nameRef = db.ref(`/users/${currentUser.uid}/name`);
    //this sets name to name
    nameRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

    let emailRef = db.ref(`/users/${currentUser.uid}/email`);
    //this sets name to name
    emailRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        email: snapshot.val()
      });
    });
  }


  render() {
    
    const {phone} = this.state
    const {name} = this.state
    const {email} = this.state

    return (
        <Form style={{backgroundColor: "#FFF", flex: 1}}>
        <View>

          <Text style={styles.bigBoldRedFont}>
            MY PROFILE
          </Text>

          <FormLabel>Name</FormLabel>
          <FormInput
          placeholder = {name}
          disabled = {true}
          />

          <FormLabel>Phone</FormLabel>
          <FormInput
          placeholder = {phone}
          disabled = {true}
          />

          <FormLabel>Email</FormLabel>
          <FormInput
          placeholder = {email}
          disabled = {true}
          />


          {/*
          <Item
                rounded
                style={styles.formInput}>
            <Input 
              placeholder = "Full Name"
              onChangeText={name => this.setState({ name })} />
          </Item>

          <Item 
              rounded
              style={styles.formInput} >
            <Input
              placeholder = "Phone" 
              onChangeText={phone => this.setState({ phone })} />
          </Item>

          <Item 
            rounded
            style={styles.formInput}>
            <Input
              placeholder = "Email" 
              onChangeText={email => this.setState({ email })} />
          </Item>
          */}

          <View style ={styles.buttonContainer}>
          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center' }}
            text="Edit Profile"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
                this.props.navigation.navigate("UserEditProfile")
            }
          />
          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center' }}
            text="Cancel"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
               this.props.navigation.navigate("HomeScreen")
            }
          />
          </View>


          </View> 
        </Form>
    );
  }
}