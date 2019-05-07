//Vendor Profile Screen
import React, { Component } from "react";
import * as firebase from "firebase";
import GradientButton from 'react-native-gradient-buttons';
import gradientBG from '../../assets/Images/gradientBG.png';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

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

export default class VendorProfile extends Component {


  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      companyName: " ",
      Type: " ",
      daysOfOp: " ",
      hours: " ",
      city: " ",
      phone: " ",
      email: " ",
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
    let phoneRef = db.ref(`/vendors/${currentUser.uid}/phone`);
    //set phone number from database to the phone variable
    phoneRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        phone: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
      });
    });
    
   //get NAme
    let nameRef = db.ref(`/vendors/${currentUser.uid}/name`);
    //this sets name to name
    nameRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });
  
    //get company
    let ref = db.ref(`/vendors/${currentUser.uid}/company`);
    //this sets name to name
    ref.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        companyName: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

     //get type
     let typeRef = db.ref(`/vendors/${currentUser.uid}/typeVendor`);
     //this sets name to name
     typeRef.once("value").then(snapshot => {
       this.setState({
         //.replace removes special characters like " " or '
         Type: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
       });
     });

 //get daysofop
 let daysRef = db.ref(`/vendors/${currentUser.uid}/daysOfOp`);
 //this sets name to name
 daysRef.once("value").then(snapshot => {
   this.setState({
     //.replace removes special characters like " " or '
     daysOfOp: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
   });
 });

 //get hours of operation
 let hoursRef = db.ref(`/vendors/${currentUser.uid}/hoursOfOp`);
 //this sets name to name
 hoursRef.once("value").then(snapshot => {
   this.setState({
     //.replace removes special characters like " " or '
     hours: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
   });
 });

  //get city
  let cityRef = db.ref(`/vendors/${currentUser.uid}/city`);
  //this sets name to name
  cityRef.once("value").then(snapshot => {
    this.setState({
      //.replace removes special characters like " " or '
      city: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
    });
  });
  }

 

  render() {
    const {name} = this.state
    const {companyName} = this.state
    const {Type} = this.state
    const {daysOfOp} = this.state
    const {hours} = this.state
    const {city} = this.state
    const {phone} = this.state
    
    return (
      //<ImageBackground source={gradientBG} style={styles.backgroundContainer}>

        <Form style={{backgroundColor: "#FFF", flex: 1}}>
        <View>

          <Text style={styles.bigBoldRedFont}>
            VENDOR PROFILE
          </Text>

          <FormLabel> Name </FormLabel>
          <FormInput 
            placeholder = {name}
            disabled = {true}
            editable = {false}
          />

          <FormLabel>Company Name</FormLabel>
          <FormInput 
            placeholder = {companyName}
            disabled = {true}
            editable = {false}
          />

          <FormLabel>Type Of Vendor</FormLabel>
          <FormInput 
             placeholder = {Type}
             disabled = {true}
             editable = {false}
          />

          <FormLabel>Days Of Operation</FormLabel>
          <FormInput 
            placeholder = {daysOfOp}
            disabled = {true}
            editable = {false}
          />

          <FormLabel>Hours Of Operation</FormLabel>
          <FormInput 
            placeholder = {hours}
            disabled = {true}
            editable = {false}
            />

          <FormLabel>City</FormLabel>
          <FormInput
           placeholder = {city}
           disabled = {true}
           editable = {false}
           />

          <FormLabel>Phone</FormLabel>
          <FormInput 
            placeholder = {phone}
            disabled = {true}
            editable = {false}
            />

        
        

          {/*}
          <Item 
                rounded
                style={styles.formInput}>
            <Input 
              placeholder = "Company Name"
              onChangeText={name => this.setState({ name })} />
          </Item>

          <Item 
                rounded
                style={styles.formInput}>
            <Input 
              placeholder = "Days Open"
              onChangeText={name => this.setState({ days })} />
          </Item>

          <Item 
                rounded
                style={styles.formInput}>
            <Input 
              placeholder = "Hours Of Operation"
              onChangeText={name => this.setState({ hours })} />
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

          <View style = {styles.buttonContainer}>
          <GradientButton
            style={{ marginVertical: 8, marginTop: 10}}
            text="Edit Profile"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
                this.props.navigation.navigate("VendorEditProfile")
            }
          />

            <GradientButton
            style={{ marginVertical: 8, marginTop: 10}}
            text="Back"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
               this.props.navigation.navigate("HomeScreenVendor")
            }
          />
          </View>


          </View>
          
        </Form>

      //</ImageBackground>
    );
  }
}