//User Vendor edit Profile Screen
import React, { Component } from "react";
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

export default class VendorEditProfile extends Component {

  static navigationOptions = {
    title: "Edit Profile"
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
    };
  }

  //Not Working
  getUserInfo = () => {
      //get values from firebase database
      let db = firebase.database();

      //this.state.name = db.ref(`/users/${currentUser.uid}/name`);
      this.state.name = "Kevin";
  }  
  

  editUser = (email, name, phone) => {
     try {
     if (this.state.password.length < 6) {
       alert("Enter a password that is 6 characters or longer");
       return;
      }

         //Update email name and phone in firebase
         firebase
           .database()
           .ref("users/" + res.user.uid)
           .set({
             email: email,
             name: name,
             phone: phone
           });

      } catch (error) {
     console.log(error.toString());
      }
   };

  render() {
    return (
      //this.getUserInfo();

      <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
        <Form>
        <View style={styles.formEdit}>

          <Text style={styles.bigBoldWhiteFont}>
            EDIT PROFILE
          </Text>

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

          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'right' }}
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
              this.state.email,
              this.state.name,
              this.state.phone
            )}
          />

          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'left' }}
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
          
        </Form>

      </ImageBackground>
    );
  }
}