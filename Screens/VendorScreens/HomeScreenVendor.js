//Home Screen Vendor
import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  View,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Asyncstorage
} from "react-native";
import styles from "../Styles";
import * as firebase from "firebase";
import {Header, Left, Right, Icon} from 'native-base';
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
import GradientButton from 'react-native-gradient-buttons';
const win = Dimensions.get("window");
var isVendorLocationOn = false;

// JS adds
  // Turn Vendor Location Button ON
  turnVendorLocationOn = () =>{
    this.style=[styles.turnOnVendorLocationButton, styles.vendorLocationButton];
  }
  // Turn Vendor Location Button OFF
  turnVendorLocationOff = () =>{
    this.style=[styles.turnOffVendorLocationButton, styles.vendorLocationButton];
  }

export default class HomeVendor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " ",
    };
    isVendorLocationOn = false;
  }

  // JS - Vendor Location Button Status
  _vendorLocationOn() {
    this.setState({ vendorLocationOn: turn });
  }

  _vendorLocationOff() {
    this.setState({ vendorLocationOn: false });
  }

  vendorLocationButtonPressed(){
    
    // Turn on vendor Location
    if(isVendorLocationOn == false){
      isVendorLocationOn = true;
      return <GradientButton
      style={styles.turnOnVendorLocationButton}
      text={"Turn Off Location"}
      textStyle={{ fontSize: 20, color: '#FFF'}}
      height={50}
      width={250} 
      alignSelf="center"     
      gradientBegin={'rgba(199,199,199, .8)'}
      gradientEnd={'rgba(199,199,199, .8)'}          
      gradientDirection="diagonal"
      success
      onPressAction={() => this.vendorLocationButtonPressed()}
    />
    }
    // Turn off vendor location
    else if (isVendorLocationOn == true){
      isVendorLocationOn = false;
      return <GradientButton
      style={styles.turnOnVendorLocationButton}
      text={"Turn On Location"}
      textStyle={{ fontSize: 20, color: '#FFF'}}
      height={50}
      width={250} 
      alignSelf="center"     
      gradientBegin={'rgba(255,109,111, .8)'}
      gradientEnd={'rgba(255,109,111, .8)'}          
      gradientDirection="diagonal"
      success
      onPressAction={() => this.vendorLocationButtonPressed()}
    />
    }
  }
  
  state = { currentUser: null };
  state = { moveToUserLocation: true };
  //will animate zoom in on location on press
  _gotoCurrentLocation(e) {
    this.map.animateToRegion({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374
    });
  }
//find position of user using geolocation: longitute and lattitude
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

    //get values from firebase database
    let db = firebase.database();

    //only works for specific user name when /users/UID/name
    //can get all user information by: /users/uid
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
      //SearchBar
      //Map
      //FoodIconSlider
      //ShopTables
      <View style={styles.container2}>
        <Header style = {{backgroundColor: '#f9e0d6'}}>
          <Left>
            <Icon name="md-menu" onPress={()=> this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
        <View style = {styles.menuOptionsStyle}>
        <Text>Welcome {name} ! </Text>
        <Text>Email {currentUser && currentUser.email} </Text>
        <Text>User Id {currentUser && currentUser.uid} ! </Text>
        <View>
        <Button
          title="Focus Location"
          onPress={() => this._gotoCurrentLocation()}
          style={styles.spot}
        />
        </View>

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
          showsUserLocation
          onRegionChangeComplete={region => {}}
          style={{ flex: 1}}
          region={this.props.coordinate}
          showsUserLocation={true}
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
      </View>

      <View style={styles.vendorLocationButtonAlign}>
            {this.vendorLocationButtonPressed()}
            <Text>{String(isVendorLocationOn)}</Text>
      </View>
    
      </View>
    );
  }
};