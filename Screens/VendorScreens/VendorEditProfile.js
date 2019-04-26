//User Vendor edit Profile Screen
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

export default class VendorEditProfile extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      name: " ",
      company: " ",
      typeVendor: " ",
      daysOfOp: " ",
      hoursOfOp: " ",
      city: " ",
      phone: " ",
      email: " ",
    };
  }
  
//GETS INFO FROM DATABASE ONCE SCREEN LOAD
componentDidMount() {
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
        company: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

     //get type
     let typeRef = db.ref(`/vendors/${currentUser.uid}/typeVendor`);
     //this sets name to name
     typeRef.once("value").then(snapshot => {
       this.setState({
         //.replace removes special characters like " " or '
         typeVendor: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
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
     hoursOfOp: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
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
  
  
  //SAVES EDIT  CHANGES TO DATA BASE
  editVendor = (company, name, typeVendor,daysOfOp,hoursOfOp,city,phone) => {
    const { currentUser } = firebase.auth();
      this.setState({ currentUser });

  
      //get values from firebase database
      let db = firebase.database();

      db.ref(`/vendors/${currentUser.uid}`).update({company: company});
      db.ref(`/vendors/${currentUser.uid}`).update({name: name});
      db.ref(`/vendors/${currentUser.uid}`).update({typeVendor: typeVendor});
      db.ref(`/vendors/${currentUser.uid}`).update({daysOfOp: daysOfOp});
      db.ref(`/vendors/${currentUser.uid}`).update({hoursOfOp: hoursOfOp});
      db.ref(`/vendors/${currentUser.uid}`).update({city: city});
      db.ref(`/vendors/${currentUser.uid}`).update({phone: phone});

   };

  render() {

    const {name} = this.state
    const {company} = this.state
    const {typeVendor} = this.state
    const {daysOfOp} = this.state
    const {hoursOfOp} = this.state
    const {city} = this.state
    const {phone} = this.state
    
    return (
      //this.getUserInfo();

      //<ImageBackground source={gradientBG} style={styles.backgroundContainer}>
      <Form style={{backgroundColor: "#FFF", flex: 1}}>
      <View>

        <Text style={styles.bigBoldRedFont}>
          VENDOR EDIT PROFILE
        </Text>

        <FormLabel>Name</FormLabel>
        <FormInput placeholder = {name}
        onChangeText={name => this.setState({ name })}/>

        <FormLabel>Company Name</FormLabel>
        <FormInput placeholder = {company}
        onChangeText={company => this.setState({ company })}/>

        <FormLabel>Type Of Vendor</FormLabel>
        <FormInput placeholder = {typeVendor}
         onChangeText={typeVendor => this.setState({ typeVendor })}/>

        <FormLabel>Days Of Operation</FormLabel>
        <FormInput placeholder = {daysOfOp}
         onChangeText={daysOfOp => this.setState({ daysOfOp })}/>

        <FormLabel>Hours Of Operation</FormLabel>
        <FormInput placeholder = {hoursOfOp}
         onChangeText={hoursOfOp => this.setState({ hoursOfOp })}/>

        <FormLabel>City</FormLabel>
        <FormInput placeholder = {city}
         onChangeText={city => this.setState({ city })}/>

        <FormLabel>Phone</FormLabel>
        <FormInput placeholder = {phone}
         onChangeText={phone => this.setState({ phone })}/>

      

          {/*}
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


          <View style = {styles.buttonContainer}> 
          <GradientButton
            style={{ marginVertical: 8, marginTop: 10}}
            text="Save Changes"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
              this.editVendor(
              this.state.company,
              this.state.name,
              this.state.typeVendor,
              this.state.daysOfOp,
              this.state.hoursOfOp,
              this.state.city,
              this.state.phone,
              this.props.navigation.navigate("HomeScreenVendor") //Returns to main screen 
            )}
          />

          <GradientButton
            style={{ marginVertical: 8, marginTop: 10}}
            text="Cancel"
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
     // </ImageBackground>
    );
  }
}