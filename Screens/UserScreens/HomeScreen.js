//Home Screen
import React, { Component } from "react";
import MapView, { Overlay } from "react-native-maps";

import {
  View,
  Text,
  Button,
  Asyncstorage,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image
} from "react-native";
import {Header, Left, Right, Icon} from 'native-base';
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
const win = Dimensions.get("window");

export default class Home extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " "
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

  componentDidMount() {
    this._isMounted =true;
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
    let ref = db.ref(`/users/${currentUser.uid}/name`);

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

  componentWillUnmount()
  {
    this._isMounted = false;
  }

  static navigationOptions = {
    header: null,
    drawerIcon: ({})=>(
      <Icon name="md-home" style={styles.drawerIcon}/>
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
      

      //add hamburger menu to page, used to style
      <View style={styles.container2}>
        <Header style = {{backgroundColor: '#f9e0d6'}}>
			    <Left>
				    <Icon name="md-menu" onPress={()=> this.props.navigation.openDrawer()}/>
			    </Left>
		    </Header>
		  <View style = {styles.menuOptionsStyle}>


      <Button
          title="Focus Location"
          onPress={() => this._gotoCurrentLocation()}
          style={styles.spot}
        >
                  location
        </Button>
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
          onRegionChangeComplete={region => {}}
          style={{ flex: 1 }}
          region={this.props.coordinate}
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider = "google"
        >

          {/*FAKE PERSON*/}
          <MapView.Marker
            coordinate={{
              latitude: 37.78825,
              longitude: -122.4324
            }}
          >
            {/* 
            <View style={styles.radius}>
              <View style={styles.marker} />
            </View>
            */}
            
            <View style={{ width: 50, height: 50 }}>
            <Image source = {require('../../assets/Images/ice-cream.png')} style={{ width: 50, height: 50 }}/>
            </View>
          </MapView.Marker>

        </MapView>


        <SlidingPanel
          headerLayoutHeight = {win.height - 550}
          headerLayout = {() =>
          <View style={styles.slidingPanelLayout2Style}> 
            <Text
              style ={{fontSize: 18, fontWeight: "bold"}}>
              {"\n\t"} Find a vendor near you {currentUser && currentUser.name}
            </Text>
            
            <SearchBar
              placeholder = "Seach Location"
              lightTheme
              round
              backgroundColor = "white"
            />

            <Text
              style ={{fontSize: 26, fontWeight: "bold", alignSelf: "center"}}>
              {"\n\t"} YOUR AD HERE! {currentUser && currentUser.name}
            </Text>
          
          </View>
          } 
          /*
          slidingPanelLayout = {() =>
            <View style={{backgroundColor: 'white', width: win.width, height: win.height}}>
              <Text>Email  </Text>
              <Text>User Id </Text>
            </View>
          }*/
        />
        
		  </View>
      </View>
    );
  }
};