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

  static navigationOptions = {
    title: "Edit Profile"
  };

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



  

  

  editUser = (company, name, typeVendor,daysOfOp,hoursOfOp,city,phone) => {
    const { currentUser } = firebase.auth();
      this.setState({ currentUser });

  
      //get values from firebase database
      let db = firebase.database();
      let ref = db.ref(`/vendors/${currentUser.uid}/`);

     try {
   
         //Update email name and phone in firebase
         ref.set({
             company: company,
             name: name,
             typeVendor: typeVendor,
             daysOfOp: daysOfOp,
             hoursOfOp: hoursOfOp,
             city : city,
             phone: phone,
            
           });

      } catch (error) {
     console.log(error.toString());
      }
   };

  render() {
    return (
      //this.getUserInfo();

      //<ImageBackground source={gradientBG} style={styles.backgroundContainer}>
      <Form style={{backgroundColor: "#FFF", flex: 1}}>
      <View>

        <Text style={styles.bigBoldRedFont}>
          VENDOR EDIT PROFILE
        </Text>

        <FormLabel>Name</FormLabel>
        <FormInput placeholder = " "
        onChangeText={name => this.setState({ name })}/>

        <FormLabel>Company Name</FormLabel>
        <FormInput placeholder = " "
        onChangeText={company => this.setState({ company })}/>

        <FormLabel>Type Of Vendor</FormLabel>
        <FormInput placeholder = " "
         onChangeText={typeVendor => this.setState({ typeVendor })}/>

        <FormLabel>Days Of Operation</FormLabel>
        <FormInput placeholder = " "
         onChangeText={daysOfOp => this.setState({ daysOfOp })}/>

        <FormLabel>Hours Of Operation</FormLabel>
        <FormInput placeholder = " "
         onChangeText={hoursOfOp => this.setState({ hoursOfOp })}/>

        <FormLabel>City</FormLabel>
        <FormInput placeholder = " "
         onChangeText={city => this.setState({ city })}/>

        <FormLabel>Phone</FormLabel>
        <FormInput placeholder = " "
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
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center' }}
            text="Save Changes"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={150}
            radius={50}             
            onPressAction={() =>
              this.editUser(
              this.state.company,
              this.state.name,
              this.state.typeVendor,
              this.state.daysOfOp,
              this.state.hoursOfOp,
              this.state.city,
              this.state.phone

              
            )}
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