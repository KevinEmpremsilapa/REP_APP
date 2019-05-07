//Home Screen
/* 
JS Changes
  - Search bar reads input
*/
import React, { Component } from "react";
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
  SectionList
 } from "react-native";
import {Header, Left, Right, Icon,Form,} from 'native-base';
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar, ListItem,FormLabel, FormInput, FormValidationMessage} from "react-native-elements";
import GradientButton from 'react-native-gradient-buttons';
const win = Dimensions.get("window");
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// Images
import homeIcon from '../../assets/Images/homeIconGray.png';
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';
import popsicleIcon from '../../assets/Images/popsicleLocator.png';

global.vendorID = "w5IDMgq00pYaaGWucHnCBkx8zUy1";
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
        vendorLat: 34.23041,
        vendorLong: -118.39283
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
        daysOfOp: JSON.stringify(snapshot.val())
    });
    });

    //get hours of operation
    let hoursRef = db.ref(`/vendors/${vendorID}/hoursOfOp`);
    //this sets name to name
    hoursRef.once("value").then(snapshot => {
    this.setState({
        //.replace removes special characters like " " or '
        hours: JSON.stringify(snapshot.val())
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
    let latRef = db.ref(`/vendors/${vendorID}/location/vendorLatitude`);
    //this sets name to name
    latRef.once("value").then(snapshot => {
        this.setState({
        //.replace removes special characters like " " or '
        vendorLat: snapshot.val()
        });
    });

    //get longitude
    let longRef = db.ref(`/vendors/${vendorID}/location/vendorLongitude`);
    //this sets name to name
    longRef.once("value").then(snapshot => {
        this.setState({
        //.replace removes special characters like " " or '
        vendorLong: snapshot.val()
        });
    });
    }

    /*
  */

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
    
    const { currentUser } = this.state;

    return (
      //SearchBar
      //Map
      //FoodIconSlider
      //ShopTables
      
      //add hamburger menu to page, used to style
      <View style={styles.container2}>
       
		  <View style = {styles.menuOptionsStyle}>
    
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          onMapReady={() => {
            this._gotoVendorsLocation();
            /*
            if (
              this.state.moveToUserLocation &&
              this.props.userLocation.data.coords &&
              this.props.userLocation.data.coords.latitude
            ) {
              this._gotoVendorsLocation();
              this.state.moveToUserLocation = false;
            }*/
          }}
          showsCompass={true}
          compassStyle={styles.compassPosition}
          //showsUserLocation
          onRegionChangeComplete={region => {}}
          style={{ flex: 1 }}
          region={this.props.coordinate}
          showsUserLocation={true}
        >
         {/*Drop markers on map*/
        console.log(vendorLat)}
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
              listViewDisplayed="auto" // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
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

        {/* - - - SLIDING PANEL - - - */}
        <SlidingPanel
          allowDragging = {false}
          headerLayoutHeight = {200}
          headerLayout = {() =>
          <View style={styles.slidingPanelLayout3Style}> 
                <Text style={styles.bigBoldRedFont}>
                    {company}
                </Text>
          </View>
          }
         
          slidingPanelLayout = {() =>
            <View style={styles.slidingPanelLayout2Style}> 
                <Form style={{backgroundColor: "#FFF", flex: 2}}>
                <View>

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
                </View>
                </Form>

          <View style ={styles.buttonContainer}>
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
                this.props.navigation.navigate("UserEditProfile")
            }
          />
          </View>
          </View>
          
          } 
         
        />
        
		  </View>
      </View>
    );
  }
};