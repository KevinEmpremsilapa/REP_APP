//Home Screen
/* 
JS Changes
  - Search bar reads input
*/
import React, { Component } from "react";
import MapView from "react-native-maps";
import {
  Image,
  View,
  Text,
  Button,
  Asyncstorage,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StyleSheet
} from "react-native";
import {Header, Left, Right, Icon} from 'native-base';
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar} from "react-native-elements";
const win = Dimensions.get("window");

// Images
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '.../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " ",
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

  // Search bar setup
  state = {search: '',};

  updateSearch = search => {
    this.setState({ search });
  };

  render() {

    const { name } = this.state;
    const { currentUser } = this.state;
    const { search } = this.state;

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
        
        {/* - - - ICONS: Hamburger, GoToLocation - - - */}
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

        {/* - - - SLIDING PANEL - - - */}
        <SlidingPanel
          headerLayoutHeight = {win.height - 550}
          headerLayout = {() =>
          <View style={styles.slidingPanelLayout2Style}> 
            <Text
              style ={styles.h2}>
              {"\n\t"} Find a Vendor Near You! {currentUser && currentUser.name}
            </Text>
            
            <SearchBar
              platform = "default"
              placeholder = "Search Location"
              round
              lightTheme
              //showLoading
              containerStyle={styles.searchBarContainer}
              cancelButtonTitle
              
              onChangeText = {this.updateSearch }
              value = {search}
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
