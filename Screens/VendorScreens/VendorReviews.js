import React, { Component } from "react";
import * as firebase from "firebase";
import GradientButton from 'react-native-gradient-buttons';
import styles from "../Styles";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Label
} from "native-base";
import {
  Image,
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Asyncstorage,
  ImageBackground,
  SectionList,
  ScrollView
 } from "react-native";
import {Rating, SearchBar, ListItem,FormLabel, FormInput, FormValidationMessage} from "react-native-elements";
const win = Dimensions.get("window");

export default class VendorReviews extends Component {


  constructor(props) {
    super(props);
    this.state = {
        reviewList: {},
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
      this._gotoCurrentLocation();
    });

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    // get values from firebase database
    let db = firebase.database();

    // only works for specific user name when /users/UID/name
    // can get all user information by: /users/uid
    let allReviewsRef = db.ref(`/reviews`).orderByChild("vendorID").equalTo(currentUser.uid);
    //this sets name to name
    allReviewsRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        reviewList: snapshot.val()
        
      });
    });
    
  }


  render() {
    
    const {reviewList} = this.state;
    var newReviewList = [];
    Object.keys(reviewList).forEach(function(key){
      if(reviewList[key].description!== null&&reviewList[key].rating!== null&&reviewList[key].title!== null&&reviewList[key].userID!== null&&
        reviewList[key].vendorID!== null&&reviewList[key].date!== null&&reviewList[key].description!== undefined&&reviewList[key].rating!== undefined&&reviewList[key].title!== undefined&&
        reviewList[key].userID!== undefined&&reviewList[key].vendorID!== undefined&&reviewList[key].date!== undefined)
        {
            var tempObj = {
              id:           key,
              description:  reviewList[key].description,
              rating:       reviewList[key].rating,
              title:        reviewList[key].title,
              userID:       reviewList[key].userID,
              vendorID:     reviewList[key].vendorID,
              date:         reviewList[key].date
            };
            newReviewList.push(tempObj);
        }
      console.log(newReviewList);
    })

    return (
        <View style={styles.reviewsPanel}> 

                <Text style={{ 
                  paddingTop: 50,
                  fontWeight: 'bold',
                  fontSize: 30,
                  textAlign: 'center',
                  color: 'rgba(255,109,111, .8)'
                }}>
                    My Reviews
                </Text>
                <ScrollView>
                {
                newReviewList.map((l, i) => (
                  <ListItem
                    key={i}
                    title={
                      <Text style={styles.titleText}>{l.title}</Text>
                    }
                    subtitle={
                      <View style={styles.subtitleView}>
                                <View style={styles.reviewDate}>
                                <Rating 
                                  startingValue = {l.rating}
                                  readonly = {true}
                                  type = 'star'
                                  imageSize={20}
                                />
                                <Text style={styles.reviewHomeFont}>  {l.date}</Text>
                                </View>
                                <Text style={styles.reviewHomeFont}>{l.description}</Text>
                      </View>
                    }
                    chevronColor="white"
                  >
                  
                  </ListItem>
                ))
              }
              </ScrollView>
           
          <GradientButton
            style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center', paddingBottom: 20 }}
            text="Return Home"
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
    );
  }
}