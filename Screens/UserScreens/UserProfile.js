//User Edit Profile Screen
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

export default class UserProfile extends Component {

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
      <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
        <Form>
        <View style={styles.formEdit}>

          <Text style={styles.bigBoldWhiteFont}>
            MY PROFILE
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
            text="Edit"
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
          </View>
          
        </Form>

      </ImageBackground>
    );
  }
}