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

export default class Signup extends Component {
  static navigationOptions = {
    title: "SignUpVendor"
  };

  managePasswordVisibility = () =>
  {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      password: "",
      error: "",
      loading: false,
      hidePassword: true,
    };
  }

  signUpUser = (email, password, name, phone) => {
    try {
      if (this.state.password.length < 6) {
        alert("Enter a password that is 6 characters or longer");
        return;
      }

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
              phone: phone
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
                source = { ( this.state.hidePassword ) ? require('../../assets/Images/hide.png') : require('../../assets/Images/view.png') } 
                style = { styles.btnImage } />
            </TouchableOpacity>
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
              this.state.phone
            )}
            />
          </View>

          <View style={styles.bottom}>
          <Text
            style={styles.smallFont}
            onPress={() => this.props.navigation.navigate("MainScreen")}
          >
            Already have an account? Login{" "}
            <Text style={{ textDecorationLine: "underline" }}>here</Text>
          </Text>
          <Text
            style={styles.smallFont}
            onPress={() => this.props.navigation.navigate("SignupScreen")}
          >
            Are you a new user? Sign up{" "}
            <Text style={{ textDecorationLine: "underline" }}>here</Text>
          </Text>
          </View>
        </Form>
      </ImageBackground>
    );
  }
}