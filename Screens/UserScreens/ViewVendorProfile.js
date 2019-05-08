//Home Screen
/* 
JS Changes
  - Search bar reads input
*/
import React, { Component } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import Search from 'react-native-search-box';
import MapView from "react-native-maps";
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
import {Thumbnail, List, Separator,Header, Left, Right, Icon,Form,} from 'native-base';
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {Rating, SearchBar, ListItem,FormLabel, FormInput, FormValidationMessage} from "react-native-elements";
import GradientButton from 'react-native-gradient-buttons';
const win = Dimensions.get("window");

// Images
import homeIcon from '../../assets/Images/homeIconGray.png';
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';
import popsicleIcon from '../../assets/Images/popsicleLocator.png';
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: " ",
        company: " ",
        type: " ",
        daysOfOp: " ",
        hours: " ",
        city: " ",
        phone: " ",
        email: " ",
        vendorLat: 34.230,
        vendorLong: -118.392,
        numOfReviews: 0,
        numOfStars: 0,
        ratingNum:0,
        reviewList: {},
        page:'first'
    };
    this._isMounted = false;
  }
  
  state = { currentUser: null };

  state = { moveToUserLocation: true };

  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }
  _gotoVendorsLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.vendorLat,
      longitude: this.state.vendorLong,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }

  componentDidMount() {
    console.log("passed rating"+ratingValue);
    this._isMounted =true;
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
      //this._gotoCurrentLocation();
    });

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    //get values from firebase database
    let db = firebase.database();

    //only works for specific user name when /users/UID/name
    //can get all user information by: /users/uid
    //get phone
    let phoneRef = db.ref(`/vendors/${vendorID}/phone`);
    //set phone number from database to the phone variable
    phoneRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        phone: snapshot.val()
      });
    });
    
   //get NAme
    let nameRef = db.ref(`/vendors/${vendorID}/name`);
    //this sets name to name
    nameRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });
  
    //get company
    let companyRef = db.ref(`/vendors/${vendorID}/company`);
    //this sets name to name
    companyRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        company: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

     //get type
     let typeRef = db.ref(`/vendors/${vendorID}/typeVendor`);
     //this sets name to name
     typeRef.once("value").then(snapshot => {
       this.setState({
         //.replace removes special characters like " " or '
         type: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
       });
     });

    //get daysofop
    let daysRef = db.ref(`/vendors/${vendorID}/daysOfOp`);
    //this sets name to name
    daysRef.once("value").then(snapshot => {
    this.setState({
        //.replace removes special characters like " " or '
        daysOfOp: (snapshot.val())
    });
    });

    //get hours of operation
    let hoursRef = db.ref(`/vendors/${vendorID}/hoursOfOp`);
    //this sets name to name
    hoursRef.once("value").then(snapshot => {
    this.setState({
        //.replace removes special characters like " " or '
        hours: (snapshot.val())
    });
    });

    //get city
    let cityRef = db.ref(`/vendors/${vendorID}/city`);
    //this sets name to name
    cityRef.once("value").then(snapshot => {
        this.setState({
        //.replace removes special characters like " " or '
        city: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
        });
    });

    //get latitude
    let latRef = db.ref(`/vendors/${vendorID}/latitude`);
    //this sets name to name
    latRef.once("value").then(snapshot => {
      if(snapshot.val()!==null&&snapshot.val()!=="null"){
        this.setState({
        //.replace removes special characters like " " or '
        vendorLat: snapshot.val()
        });
      }
    });

    //get longitude
    let longRef = db.ref(`/vendors/${vendorID}/longitude`);
    //this sets name to name
    longRef.once("value").then(snapshot => {
      if(snapshot.val()!==null&&snapshot.val()!=="null"){
        this.setState({
        //.replace removes special characters like " " or '
        vendorLong: snapshot.val()
        });
      }
    });

    let reviewsRef = db.ref(`/vendors/${vendorID}/numOfReviews`);
    //this sets name to name
    reviewsRef.once("value").then(snapshot => {
      //console.log(snapshot.val());
      if(snapshot.val()!==null&&snapshot.val()!=="null"){
        this.setState({
        //.replace removes special characters like " " or '
        numOfReviews: snapshot.val()
        });
      }
    });

    let allReviewsRef = db.ref(`/reviews`).orderByChild("vendorID").equalTo(vendorID);
    //this sets name to name
    allReviewsRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        reviewList: snapshot.val()
        
      });
    });

    }

  render() {
    const {name} = this.state
    const {company} = this.state
    const {type} = this.state
    const {daysOfOp} = this.state
    const {hours} = this.state
    const {city} = this.state
    const {phone} = this.state
    const {vendorLat} = this.state
    const {vendorLong} = this.state
    const {numOfReviews} = this.state
    /*const {numOfStars} = this.state
    const {ratingNum} = this.state*/
    const { currentUser } = this.state;
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

      <View style={styles.container2}>
       
		  <View style = {styles.menuOptionsStyle}>
    
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          onMapReady={() => {
            this._gotoVendorsLocation();
          }}
          showsCompass={true}
          compassStyle={styles.compassPosition}
          onRegionChangeComplete={region => {}}
          style={{ flex: 1 }}
          region={this.props.coordinate}
          showsUserLocation={true}
        >
         {/*Drop markers on map*/}
         {
              <MapView.Marker
                  coordinate={{
                    latitude: vendorLat,
                    longitude: vendorLong
                  }}
              >
              
                <View style={styles.mapIconStyle}>
                  <Image source = {popsicleIcon} style={styles.locationIconSize} />
                </View>
              </MapView.Marker>
         }
          
        </MapView>
        
        {/* - - - ICONS: Hamburger, GoToLocation - - - */}
        
            <View style={styles.hamburgerIconPosition}>
              <TouchableOpacity
                onPress={()=> this.props.navigation.navigate("HomeScreen")}
              >
                <Image 
                  source={homeIcon}
                  style={styles.mapIconStyle}
                  />
              </TouchableOpacity>
          </View>

          <View style={styles.locationIconPosition}>
              <TouchableOpacity
                onPress={() => this._gotoCurrentLocation()}
              >
                <Image 
                  source={this.state.moveToUserLocation ? 
                    focusLocationIcon : notFocusLocationIcon}
                  style={styles.mapIconStyle}
                  />
              </TouchableOpacity>
          </View>

        {/* - - - SLIDING PANEL - - - */}
        <SlidingPanel
          allowDragging = {false}
          headerLayoutHeight = {180}
          headerLayout = {() =>
          <View style={styles.slidingPanelLayout3Style}> 
                <Text style={styles.bigBoldRedFont}>
                    {company}
                </Text>
                <Rating style = {styles.ratings}
            
                  startingValue = {ratingValue}
                  readonly = {true}
                  type = 'star'
                  imageSize={40}
                />
                <Text style={styles.reviewFont}>
                    {numOfReviews} Reviews
                </Text>
          </View>
          }
         
          slidingPanelLayout = {() =>
            <View style={styles.viewVendorPanel}> 
              <Collapse>
                <CollapseHeader style={{ 
                        backgroundColor: 'rgba(229, 149, 149, .8)'
                      }}>
                  <Text style={{ 
                        paddingTop: 10,
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        color: 'white',
                        paddingBottom: 10,
                        //paddingTop: 10
                      }}>
                          Vendor Info
                  </Text>
                </CollapseHeader>
                <CollapseBody>
                    <View style ={styles.formView}>
                      <Form style={{backgroundColor: "#FFF", flex: 2}}>
                      <FormLabel>Type Of Vendor</FormLabel>
                      <FormInput 
                          placeholder = {type}
                          editable={false}
                      />

                      <FormLabel>Days Of Operation</FormLabel>
                      <FormInput 
                          placeholder = {daysOfOp}
                          //disabled = {true}
                          editable={false}
                      />

                      <FormLabel>Hours Of Operation</FormLabel>
                      <FormInput 
                          placeholder = {hours}
                          editable={false}
                          //disabled = {true}
                          />

                      <FormLabel>City</FormLabel>
                      <FormInput
                      placeholder = {city}
                      editable={false}
                      //disabled = {true}
                      />

                      <FormLabel>Phone</FormLabel>
                      <FormInput 
                          placeholder = {phone}
                          editable={false}
                          //disabled = {true}
                          />
                      </Form>
                    </View>
                </CollapseBody>
              </Collapse>
              <Collapse>
                <CollapseHeader style={{ 
                        //paddingTop: 10,
                        backgroundColor: 'rgba(229, 169, 169, .8)',
                        //paddingTop: 10 rgb(255, 109, 127)
                      }}>
                  <Text style={{ 
                        //paddingTop: 10,
                        fontWeight: 'bold',
                        fontSize: 20,
                        textAlign: 'center',
                        color: 'white',
                        paddingBottom: 10,
                        paddingTop: 10
                      }}>
                          Reviews
                  </Text>
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.listReviewView}>
                      
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
                      style={{ marginVertical: 8, marginTop: 15, alignSelf: 'center' }}
                      text="Add Review"
                      textStyle={{ fontSize: 20, color: '#FF6D6F'}}      
                      gradientBegin="#FFF"
                      gradientEnd="#FFF"           
                      gradientDirection="diagonal"
                      height={50}
                      width={150}
                      radius={50}             
                      onPressAction={() =>
                          this.props.navigation.navigate("CreateReview")
                      }
                    />
                    </View>
                </CollapseBody>
              </Collapse>

          </View>
          } 
        />
		  </View>
      </View>
    );     
  }
};