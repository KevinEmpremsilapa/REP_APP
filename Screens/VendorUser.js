//Vendor or User Screen
import React, { Component } from "react";
import * as firebase from "firebase";
import GradientButton from 'react-native-gradient-buttons';
import gradientBG from '../assets/Images/gradientBG.png';
import styles from "./Styles";

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
    title: "Vendor or User"
  };

  render() {
    return (
      <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
        <Form>
        <View>

          <Text style = {styles.bigBoldWhiteFont}> WHICH ARE YOU? </Text>

          {/* - - - VENDOR BUTTON - - - */}
          <GradientButton
            style={{ marginTop: 15, alignSelf: 'center' }}
            text="Vendor"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={200}
            radius={50}             
            onPressAction={() =>
             this.props.navigation.navigate("SignupVendor")
            }
          />

          {/* - - - USER BUTTON - - - */}
          <GradientButton
            style={{ marginTop: 10, alignSelf: 'center' }}
            text="User"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={200}
            radius={50}             
            onPressAction={() =>
                this.props.navigation.navigate("SignupScreen")
            }
          />
        </View>

        </Form>
      </ImageBackground>
    );
  }
}