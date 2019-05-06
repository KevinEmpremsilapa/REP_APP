//Home Screen Vendor
import React, { Component } from "react";
import MapView, { AnimatedRegion } from "react-native-maps";
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
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Import GUI
import styles from "../Styles";
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
      searchLatitude: null,
      searchLongitude: null,
      error: null,
      name: " ",
      isVendorLocationOn: true, 
      isLocationFocused: true,
    };
  }

  // Vendor Location Button
    // Default is OFF
  _handleVendorLocation = () =>{
    const { isVendorLocationOn } = this.state;

    //Getting DB info
    let currentUser = firebase.auth().currentUser;
    let db = firebase.database();

    // If vendor location is ON
    if(isVendorLocationOn){
      db.ref(`/vendors/${currentUser.uid}`).update({isVendorLocationOn: isVendorLocationOn});
      this.setState({ isVendorLocationOn: false });
    }
    // If vendor location is OFF
    else{
      db.ref(`/vendors/${currentUser.uid}`).update({isVendorLocationOn: isVendorLocationOn});
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

    //CALLS SAVE LOCATION
    this.SaveLocation(this.state.latitude,this.state.longitude);
  }
  
  // - - - GOTO SEARCH BAR LOCATION
  _gotoSearchLocation(e){
    this.map.animateToRegion({
      latitude: this.state.searchLatitude,
      longitude: this.state.searchLongitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }

  //---------SAVES VENDOR LOCATION TO DATABASE---------//
  SaveLocation (latitude, longitude){

      let currentUser = firebase.auth().currentUser; //Gets Current UserID
      let db = firebase.database();

      //Update values from firebase database
      db.ref(`/vendors/${currentUser.uid}`).update({latitude: latitude});
      db.ref(`/vendors/${currentUser.uid}`).update({longitude: longitude});
   };

  //---------SET CURRENT LOCATION TO LOCAL COORDS ---------//
  GetLocation(e)
  {
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
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

    //--- WATCHES FOR CHANGE IN POSITION THEN UPDATES COORDS ---//
    navigator.geolocation.watchPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
      this.SaveLocation(this.state.latitude,this.state.longitude);
    });
  

    // get values from firebase database
    let db = firebase.database();

    // only works for specific user name when /users/UID/name
    // can get all user information by: /users/uid
    let ref = db.ref(`/vendors/${currentUser.uid}/name`);


    //-------- Gets isVendorLocationOn From DB -------------//
    db.ref(`/vendors/${currentUser.uid}`).update({isVendorLocationOn: this.state.isVendorLocationOn});
    this._handleVendorLocation();
   
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
              //this._gotoCurrentLocation();
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

          {/* - - - SEARCH BAR MARKER - - - */}
          <MapView.Marker
              coordinate={{
                latitude: this.state.searchLatitude,
                longitude: this.state.searchLongitude,
              }}
            >
              <View style={styles.mapIconStyle}>
                    <Image
                      source={pinkMarker}
                      style={styles.locationIconSize}
                    />
                  </View>
            </MapView.Marker>

         </MapView>

         {/* - - - TOP NAVIGATION BAR - - - */}
         <View style={styles.mapTopNavBar}>
            
            {/* - - - HAMBURGER MENU - - - */}
            <TouchableOpacity
              style={styles.hamburgerIconPosition}
              name="md-menu"
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Image source={hamburgerMenuIcon} style={styles.mapIconStyle} />
            </TouchableOpacity>

            {/* - - - SEARCH BAR - - - */}
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              listViewDisplayed="false" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                this.setState({
                  searchLatitude: details.geometry.location.lat,
                  searchLongitude: details.geometry.location.lng,
                  moveToUserLocation: true
                });

                this._gotoSearchLocation();
                console.log(data, details);
              }}
              getDefaultValue={() => ""}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: "AIzaSyDMi41MlaJhmn2WG8LjG5DRlUdESHxoC9U",
                language: "en", // language of the results
                types: "" // default: 'geocode' (cities) - Putting nothing will search for everything
              }}

              styles={{
                textInputContainer: {
                  height: "100%",
                  width: 280,
                  backgroundColor: 'rgba(0,0,0, 0)',
                  borderTopWidth: 0,
                  borderBottomWidth:0,
                },
                textInput: {
                  width: '100%',
                  height: '100%',
                  height: 40,
                  width: 280,
                  color: '#5d5d5d',
                  fontSize: 16,
                },
                description: {
                  fontWeight: "bold"
                },
                predefinedPlacesDescription: {
                  color: "#1faadb"
                },
                listView: {
                  top: 40,
                  position: 'absolute',
                  width: 270,
                  backgroundColor: 'white',
                  marginBottom: 10,
                },
                row: {
                  backgroundColor: 'white'
                },
              }}
              //currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
              //currentLocationLabel="Current location"
              nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={
                {
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }
              }
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: "distance",
                types: "food"
              }}
              filterReverseGeocodingByTypes={[
                "locality",
                "administrative_area_level_3"
              ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              //predefinedPlaces={[homePlace, workPlace]}
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
              //renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
              //renderRightButton={() => ()}
              />

          </View>
        {/* - - - END TOP NAVIGATION BAR - - - */}


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
                     "Turn Off Location" : "Turn On Location" }
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
