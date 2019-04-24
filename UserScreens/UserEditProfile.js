//User Edit Profile Screen
import React, { Component } from "react";
import * as firebase from "firebase";
import GradientButton from 'react-native-gradient-buttons';
import gradientBG from '../../assets/Images/gradientBG.png';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
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

export default class UserEditProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
    };
  }



  editUser = (email, name, phone) => {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });


    //get values from firebase database
    let db = firebase.database();
    let ref = db.ref(`/users/${currentUser.uid}/`);

   try {
 
       //Update email name and phone in firebase
       ref.set({
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

     // <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
          <Form style={{backgroundColor: "#FFF", flex: 1}}>
             <View>


          <Text style={styles.bigBoldRedFont}>
            EDIT PROFILE
          </Text>

          <FormLabel>Name</FormLabel>
          <FormInput placeholder = " "
        onChangeText={name => this.setState({ name })}/>

          <FormLabel>Phone</FormLabel>
          <FormInput placeholder = " "
        onChangeText={phone => this.setState({ phone })}/>

          <FormLabel>Email</FormLabel>
          <FormInput placeholder = " "
        onChangeText={email => this.setState({ email })}/>

          {/*}
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
              this.state.email,
              this.state.name,
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
               this.props.navigation.navigate("HomeScreen")
            }
          />
          </View>
          
          </View>
          
        </Form>

      //</ImageBackground>
    );
  }
}