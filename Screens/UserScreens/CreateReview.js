//Sign up Vendor Screen
import React, { Component } from "react";
import GradientButton from 'react-native-gradient-buttons';
import gradientBG from '../../assets/Images/gradientBG.png';
import * as firebase from "firebase";
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

export default class CreateReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      title: "",
      description: "",
      vendorID: "",
      userID: "",
      error: "",
      loading: false,
    };
  }

  signUpUser = (stars, title, description, vendorID, userID) => {
    try {
      

      //add user and user ID
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          firebase
            .database()
            .ref("vendors/" + res.user.uid)
            .set({
              email: email,
              name: name,
              phone: phone,
              company: company//added this
            });
        });
        
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
        <Form>
          <View style={styles.form}>

          <Text style={styles.bigBoldWhiteFont}>
            Create Review
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
            style={styles.formInput}>
            <Input 
              placeholder = "Company Name"
              onChangeText={company => this.setState({ company })} />
          </Item>

          <Item 
            rounded
            style={styles.formInput}>
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
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center'}}
            text="Create Vendor Account"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={260}
            radius={50}             
            onPressAction={() =>
              this.signUpUser(
              this.state.email,
              this.state.password,
              this.state.name,
              this.state.phone,
              this.state.company
            )}
            />
          </View>
        </Form>
      </ImageBackground>
    );
  }
}