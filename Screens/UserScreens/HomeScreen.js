//Home Screen
/* 
JS Changes
  - Search bar reads input
*/
import React, { Component } from "react";
import Search from "react-native-search-box";
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
import { Header, Left, Right, Icon } from "native-base";
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import { SearchBar, ListItem } from "react-native-elements";
const win = Dimensions.get("window");
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// - - - IMAGES - - - //
import notFocusLocationIcon from "../../assets/Images/NotCurrentLocationIcon_Opacity80.png";
import focusLocationIcon from "../../assets/Images/CurrentLocationIcon_Opacity80.png";
import hamburgerMenuIcon from "../../assets/Images/HamburgerMenuIcon.png";
import popsicleIcon from "../../assets/Images/popsicleLocator.png";
import userIcon from "../../assets/Images/defaultUserIcon.png";
import pinkMarker from "../../assets/Images/PinkMarker.png";

global.vendorID = "w5IDMgq00pYaaGWucHnCBkx8zUy1";
function getDistanceInMiles(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  var e = Math.round(d * 0.62137 * 100) / 100;
  return e;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

/* - - - ADD NEW VARIABLES SEARCH LOCATION - - - */
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      searchLatitude: 118,
      searchLongitude: 64,
      error: null,
      name: " ",
      vendorList: {}
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

  // - - - GOTO SEARCH LOCATION - - - //
  _gotoSearchLocation(e){
    this.map.animateToRegion({
      latitude: this.state.searchLatitude,
      longitude: this.state.searchLongitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374,
    });
  }

  componentDidMount() {
    this._isMounted = true;
    navigator.geolocation.getCurrentPosition(position => {
      var lat = parseFloat(position.coords.latitude);
      var long = parseFloat(position.coords.longitude);
      this.setState({ latitude: lat });
      this.setState({ longitude: long });
      this._gotoCurrentLocation();
      /*
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      );*/
    });

    const { currentUser } = firebase.auth();
    this.setState({ currentUser });

    //get values from firebase database
    let db = firebase.database();

    //only works for specific user name when /users/UID/name
    //can get all user information by: /users/uid
    let ref = db.ref(`/users/${currentUser.uid}/name`);

    //get user info and display in alert box
    ref.on("value", function(snapshot) {
      const messageText = JSON.stringify(snapshot.val());
      //alert(messageText + "Logged In");
    });

    //this sets name to name
    ref.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        name: JSON.stringify(snapshot.val()).replace(/[^a-zA-Z ]/g, "")
      });
    });

    let vendorRef = db.ref(`/vendors`).orderByChild("location/vendorLatitude");
    //this sets name to name
    vendorRef.once("value").then(snapshot => {
      this.setState({
        //.replace removes special characters like " " or '
        vendorList: snapshot.val()
      });
    });
  }
  /*
  
  static navigationOptions = {
    header: null,
    drawerIcon: ({})=>(
      <Icon name="md-home" style={styles.drawerIcon}/>
    )
  }*/

  // Search bar setup
  state = { search: "" };

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { name } = this.state;
    const { currentUser } = this.state;
    const { search } = this.state;
    const { vendorList } = this.state;
    var newVendorList = [];
    Object.keys(vendorList).forEach(function(key) {
      if (vendorList[key].location !== undefined) {
        if (
          vendorList[key].location.vendorLatitude !== null &&
          vendorList[key].location.vendorLongitude !== null
        ) {
          //var distance =  Math.sqrt((vendorList[key].location.vendorLatitude-this.state.latitude)*2+(vendorList[key].location.vendorLongitude-this.state.longitude)*2);
          var tempObj = {
            id: key,
            //name:       vendorList[key].name,
            company: vendorList[key].company,
            //email:      vendorList[key].email,
            //phone:      vendorList[key].phone,
            city: vendorList[key].city,
            typeVendor: vendorList[key].typeVendor,
            //daysOfOp:   vendorList[key].daysOfOp,
            //hoursOfOp:  vendorList[key].hoursOfOp,
            location: {
              vendorLatitude: vendorList[key].location.vendorLatitude,
              vendorLongitude: vendorList[key].location.vendorLongitude
            }
            //distance: distance
          };
          newVendorList.push(tempObj);
        }
      }
      console.log(newVendorList);
    });
    return (
      //SearchBar
      //Map
      //FoodIconSlider
      //ShopTables

      //add hamburger menu to page, used to style
      <View style={styles.container2}>
        <View style={styles.menuOptionsStyle}>
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
            showsCompass={true}
            compassStyle={styles.compassPosition}
            showsUserLocation
            onRegionChangeComplete={region => {}}
            style={{ flex: 1 }}
            provider="google"
            region={this.props.coordinate}
            showsUserLocation={true}
            followsUserLocation={true}
          >
  
            {/*Drop markers on map */}
            {newVendorList.map((l, i) => (
              <MapView.Marker
                coordinate={{
                  latitude: l.location.vendorLatitude,
                  longitude: l.location.vendorLongitude
                }}
                key={i}
              >
                {/*global.vendorID= l.id */}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("ViewVendorProfile")
                  }
                >
                  <View style={styles.mapIconStyle}>
                    <Image
                      source={popsicleIcon}
                      style={styles.locationIconSize}
                    />
                  </View>
                </TouchableOpacity>
              </MapView.Marker>
            ))}
           
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
          {/* - - - END MAP VIEW - - - */}


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


          {/* - - - ICONS: GoToLocation - - - */}
          <View style={styles.locationIconPosition}>
            <TouchableOpacity onPress={() => this._gotoCurrentLocation()}>
              <Image
                source={
                  this.state.moveToUserLocation ? 
                    focusLocationIcon : notFocusLocationIcon
                }
                style={styles.mapIconStyle}
              />
            </TouchableOpacity>`
          </View>

          {/* - - - SLIDING PANEL - - - */}
          <SlidingPanel
            //allowDragging = {false}
            headerLayoutHeight={60}
            headerLayout={() => (
              <View style={styles.slidingPanelLayoutStyle}>
                <Text style={styles.medBoldRedFont}>Tap for vendors near you</Text>
              </View>
            )}

            slidingPanelLayout = {() =>
          <View style={styles.slidingPanelLayout2Style}> 
            {/*
            <Text
              style ={{fontSize: 26, fontWeight: "bold", alignSelf: "center"}}>
              {"\n\t"} YOUR AD HERE! $500 {currentUser && currentUser.name}
            </Text>
            */}
              {
            
                newVendorList.map((l, i) => (
                  <ListItem
                    key={i}
                    title={
                      <Text style={styles.titleText}>{l.company}</Text>
                    }
                    subtitle={
                      <View style={styles.subtitleView}>
                        <Text style={styles.subtitleText}>{l.typeVendor}</Text>
                        <Text style={styles.distanceText}>{getDistanceInMiles(this.state.latitude,this.state.longitude,l.location.vendorLatitude,l.location.vendorLongitude)}mi</Text>
                      </View>
                    }
                    avatar={
                      <Image 
                        source={userIcon}
                        style={styles.mapIconStyle}
                      />}
                    onPress={()=> this.props.navigation.navigate("ViewVendorProfile")}
                  >
                  {/*global.vendorID= l.id*/}
                  </ListItem>
                  
                ))
              }

          </View>
          } 

          />
        </View>
      </View>
    );
  }
}
/*
              id:         key,
              name:       vendorList[key].name,
              company:    vendorList[key].company,
              email:      vendorList[key].email,
              phone:      vendorList[key].phone,
              city:       vendorList[key].city,
              typeVendor: vendorList[key].typeVendor,
              daysOfOp:   vendorList[key].daysOfOp,
              hoursOfOp:  vendorList[key].hoursOfOp,
            */

/*
    - - - API KEYS - - - 
    NEW KEY: AIzaSyDMi41MlaJhmn2WG8LjG5DRlUdESHxoC9U
    API KEY: AIzaSyBhppPuHy1Q9bqR0pUYO1n2PRpMLskZgAY
    GEOCODING API: AIzaSyBhppPuHy1Q9bqR0pUYO1n2PRpMLskZgAY 

*/

/*

*/
