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

  static navigationOptions = {
    title: "Edit Profile"
  };

 
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      gender: "",
      age: "",
      bio: "",
    };
  }


  componentDidMount() {

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
        phone: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
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

    //GET EMAIL
    let emailRef = db.ref(`/users/${currentUser.uid}/email`);
    //this sets name to name
    emailRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        email: JSON.stringify(snapshot.val())
      });
    });

    //GET GENDER
    let genderRef = db.ref(`/users/${currentUser.uid}/gender`);
    //this sets name to name
    genderRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        gender: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

    
    //GET AGE
    let ageRef = db.ref(`/users/${currentUser.uid}/age`);
    //this sets name to name
    ageRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        age: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
      });
    });

    
    //GET BIO
    let bioRef = db.ref(`/users/${currentUser.uid}/bio`);
    //this sets name to name
    bioRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        bio: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z0-9 ]/g, "")
      });
    });
  }


  editUser = (email, name, phone, gender, age, bio) => {
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
           phone: phone,
           gender: gender,
           age: age,
           bio: bio
         });

    } catch (error) {
   console.log(error.toString());
    }
   };

  render() {

    const {phone} = this.state
    const {name} = this.state
    const {email} = this.state
    const {gender} = this.state
    const {age} = this.state
    const {bio} = this.state

    return (
      //this.getUserInfo();

     // <ImageBackground source={gradientBG} style={styles.backgroundContainer}>
          <Form style={{backgroundColor: "#FFF", flex: 1}}>
             <View>


          <Text style={styles.bigBoldRedFont}>
            EDIT PROFILE
          </Text>

          <FormLabel>Name</FormLabel>
          <FormInput
          placeholder = {name}
          onChangeText={name => this.setState({ name })}/>
          />

          <FormLabel>Phone</FormLabel>
          <FormInput
          placeholder = {phone}
          onChangeText={phone => this.setState({ phone })}/>
          />

          <FormLabel>Gender</FormLabel>
          <FormInput
          placeholder = {gender}
          onChangeText={gender => this.setState({ gender })}/>
          />

          <FormLabel>Age</FormLabel>
          <FormInput
          placeholder = {age}
          onChangeText={age => this.setState({ age })}/>
          />

          <FormLabel>Bio</FormLabel>
          <FormInput
          placeholder = {bio}
          onChangeText={bio => this.setState({ bio })}/>
          />

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
            style={{ marginVertical: 8, marginTop: 10 }}
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
              this.state.phone,
              this.state.gender,
              this.state.age,
              this.state.bio,
              this.props.navigation.navigate("HomeScreen")
            )}
          />

          <GradientButton
            style={{ marginVertical: 8, marginTop: 10 }}
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