//Sign up Vendor Screen
//import Rater from 'react-rater'
//import 'react-rater/lib/react-rater.css'

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
  Dimensions
} from "react-native";

import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Label,
  Textarea
} from "native-base";
import {Rating} from "react-native-elements";
export default class CreateReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      title: "",
      description: "",
      //vendorID: "",
      //userID: "",
      error: "",
      loading: false,
      numOfStars: 0,
      numOfReviews: 0
     // rating: 1
    };
  }
  //addReview = (stars, title, description, vendorID, userID) => {
  addReview = (title, description, rating) => {
    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    let db = firebase.database();
    //let ref = db.ref.child("reviews");
    let vendorRef = db.ref(`/vendors/${vendorID}/`);
    let ref = db.ref(`/reviews/`);
    try {
      //Update email name and phone in firebase
      ref.push({
        "title": title,
        "description": description,
        "rating": rating,
        "vendorID": vendorID,
        "userID": currentUser.uid
        })
          
      vendorRef.update({
        "numOfReviews": this.state.numOfReviews +1,
        "numOfStars": this.state.numOfStars +rating,
      });

      this.props.navigation.navigate("ViewVendorProfile");

   } catch (error) {
  console.log(error.toString());
   }
  };

  //fetchVendorInfo(){
  componentDidMount() {
    let db = firebase.database();
    let numOfReviews = db.ref(`/vendors/${vendorID}/numOfReviews`);
    //set phone number from database to the phone variable
    numOfReviews.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        numOfReviews: snapshot.val()
      });
    });
    let numOfStars = db.ref(`/vendors/${vendorID}/numOfStars`);
    //set phone number from database to the phone variable
    numOfStars.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        numOfStars: snapshot.val()
      });
    });
  }

  render() {
    //this.fetchVendorInfo;
    return (
      <View style = {styles.reviewForm}>
     
        {/*<Form>*/}
          {/*<View style={styles.reviewForm}>*/}

          <Text style={styles.bigBoldRedFont}>
            Create Review
          </Text>
          <Rating style={styles.ratings}
                          startingValue = {0}
                          type = 'star'
                          startingValue = {0}
                          imageSize={40}
                          ratingCount={5}
                          //minValue ={0}
                          onFinishRating = {stars => this.setState({stars})}
          />
        
          {/*<Item>*/}
            <TextInput 
              style = {{width:300, height:50}}
              placeholder = "Title"
              onChangeText={title => this.setState({ title })}
               />
          {/*</Item>*/}

          
          {/*<Item stackedLabel>Textarea*/}
            <TextInput
              //style = {{height: 50}}
              //rowSpan={10} 
              style = {{width:300, height:150}}
              placeholder = "Description"
              multiline={true}
              onChangeText={description => this.setState({ description })} 
              />
          {/*<View style = {styles.buttonContainer}>*/}
          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center'}}
            text="Submit"
            textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
            gradientBegin="#FFF"
            gradientEnd="#FFF"           
            gradientDirection="diagonal"
            height={50}
            width={260}
            radius={50}             
            onPressAction={() =>
              this.addReview(
              this.state.title,
              this.state.description,
              this.state.stars
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
        {/*</Form>*/}
      </View>
    );
  }
}