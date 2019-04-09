//Home Screen Vendor
import React, { Component } from "react";
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
} from "react-native";

// Import GUI
import styles from "./Styles";
import gradientBG from '../../assets/Images/gradientBG.png';
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';

import * as firebase from "firebase";
import {Header, Left, Right, Icon} from 'native-base';
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
import GradientButton from 'react-native-gradient-buttons';
const win = Dimensions.get("window");


export default class HomeVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " ",
      isVendorLocationOn: false,
      isLocationFocused: true,
    };
  }

  // Vendor Location Button
    // Default is OFF
  _handleVendorLocation = () =>{
    const { isVendorLocationOn } = this.state;

    // If vendor location is ON
    if(isVendorLocationOn){
      this.setState({ isVendorLocationOn: false });
    }
    // If vendor location is OFF
    else{
      this.setState({ isVendorLocationOn: true });
    }
  }

  _handleFocusLocation = () =>{
    const {isLocationFocused} = this.state;

    // IF location is focused
    if(isVendorLocationOn){
      this.setState({ isVendorLocationOn: false });
    }
    // IF location is NOT focused
    else{
      this.setState({ isVendorLocationOn: true });
    }
  }

  state = { currentUser: null };
  state = { moveToUserLocation: true };
  // will animate zoom in on location on press
  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374,
    });
  }
// find position of user using geolocation: longitute and lattitude
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
    let ref = db.ref(`/vendors/${currentUser.uid}/name`);

    //get user info and display in alert box
    ref.on("value", function(snapshot) {
      const messageText = JSON.stringify(snapshot.val());
      alert(messageText + "Logged In");
    });

    //this sets name to name
    ref.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({})=>(
      <Icon name="md-home" style={{fontSize:24, color:'#4C2250'}}/>
    )
  }

  render() {
    const { name } = this.state;
    const { currentUser } = this.state;

    return (
      // Hamburger Menu bar
      // Map
      // Turn ON/OFF vendor location
      <View style={styles.vendorMapContainer}>

        {/*
        TEST DATA
        <Text>Welcome {name} ! </Text>
        <Text>Email {currentUser && currentUser.email} </Text>
        <Text>User Id {currentUser && currentUser.uid} ! </Text>     
        */}  
        
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          onMapReady={() => {
            if (
              this.state.moveToUserLocation &&
              this.props.userLocation.data.coords &&
              this.props.userLocation.data.coords.latitude 
            ) {
              this._gotoCurrentLocation();
              this.state.moveToUserLocation = false;
            }
          }}

          //showsUserLocation
          showsCompass={true}
          compassStyle={styles.compassPosition}
          onRegionChangeComplete={region => {}}
          style={{ flex: 1}}
          provider="google"
          region={this.props.coordinate}
          showsUserLocation={this.state.isVendorLocationOn ? true : false}
          followsUserLocation={this.state.isVendorLocationOn ? true : false}
        >
       
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}
          >
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
          </MapView.Marker>
         </MapView>

         <View style={styles.hamburgerIconPosition}>
              <TouchableOpacity
                name="md-menu" 
                onPress={()=> this.props.navigation.openDrawer()}
              >
                <Image 
                  source={hamburgerMenuIcon}
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

          <View style={styles.vendorLocationButtonAlign}>
              <GradientButton
                  // VENDOR LOCATION BUTTON
                  styles={{alignSelf: 'center'}}
                  text={this.state.isVendorLocationOn ? 
                    "Turn Off Location" : "Turn On Location"}
                  textStyle={{ fontSize: 20, color: '#FFF'}}     
                  gradientBegin={this.state.isVendorLocationOn ? 
                    'rgba(199,199,199, .8)' : 'rgba(255,109,111, .8)'}
                  gradientEnd={this.state.isVendorLocationOn ? 
                    'rgba(199,199,199, .8)' : 'rgba(255,109,111, .8)'}          
                  gradientDirection="diagonal"
                  height={50}
                  width={250} 
                  radius={50}
                  success
                  onPressAction={() => this._handleVendorLocation()}
                /> 
            </View>  
        </View>
   
    );
  }
};
