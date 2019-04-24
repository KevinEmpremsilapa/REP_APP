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
import {Header, Left, Right, Icon} from 'native-base';
import styles from "../Styles";
import * as firebase from "firebase";
import SlidingPanel from "react-native-sliding-up-down-panels";
import {SearchBar, ListItem} from "react-native-elements";
import geolib from "geolib";
const win = Dimensions.get("window");

// Images
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';
import popsicleIcon from '../../assets/Images/popsicleLocator.png';
import userIcon from '../../assets/Images/defaultUserIcon.png';
global.vendorID = "w5IDMgq00pYaaGWucHnCBkx8zUy1";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " ",
      vendorList: {},
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
  /*
  getDistance(vLat, vLong)
  {
    console.log("in getdistance");
    var meterDistance = geolib.getDistance(
      {latitude: vLat, longitude: vLong},
      {latitude: this.state.latitude, longitude: this.state.longitude}
    );
    console.log(meterDistance);
    var mileDistance = geolib.convertUnit('mi',meterDistance,2);
    console.log(mileDistance);
    return mileDistance;
  }*/

  componentDidMount() {
    this._isMounted =true;
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

    let vendorRef = db.ref(`/vendors`);
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
  state = {search: '',};

  updateSearch = search => {
    this.setState({ search });
  };

  render() {

    const { name } = this.state;
    const { currentUser } = this.state;
    const { search } = this.state;
    const {vendorList} = this.state;
    var newVendorList = [];
    Object.keys(vendorList).forEach(function(key){
      if(vendorList[key].location!== undefined)
      {
        if(vendorList[key].location.vendorLatitude!== null&&vendorList[key].location.vendorLongitude!== null)
        {
            //var distance =  Math.sqrt((vendorList[key].location.vendorLatitude-this.state.latitude)*2+(vendorList[key].location.vendorLongitude-this.state.longitude)*2);
            var tempObj = {
              id:         key,
              //name:       vendorList[key].name,
              company:    vendorList[key].company,
              //email:      vendorList[key].email,
              //phone:      vendorList[key].phone,
              city:       vendorList[key].city,
              typeVendor: vendorList[key].typeVendor,
              //daysOfOp:   vendorList[key].daysOfOp,
              //hoursOfOp:  vendorList[key].hoursOfOp,
              location:   {
                vendorLatitude: vendorList[key].location.vendorLatitude,
                vendorLongitude: vendorList[key].location.vendorLongitude
              },
              //distance: distance
            };
            newVendorList.push(tempObj);
        }
      }
      console.log(newVendorList);
    })
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
         {/*Drop markers on map*/}
         {
            newVendorList.map((l, i) => (
              
              <MapView.Marker
                  coordinate={{
                    latitude: l.location.vendorLatitude,
                    longitude: l.location.vendorLongitude
                  }}
                  key={i}
              >
              {/*global.vendorID= l.id*/}
                <TouchableOpacity 
                onPress={()=> this.props.navigation.navigate("ViewVendorProfile")}
                >
                <View style={styles.mapIconStyle}>
                  <Image source = {popsicleIcon} style={styles.locationIconSize} />
                </View>
                </TouchableOpacity>
                
              </MapView.Marker>
            ))
         }
          
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
          //allowDragging = {false}
          headerLayoutHeight = {100}
          headerLayout = {() =>
          <View style={styles.slidingPanelLayoutStyle}> 

            {/*}
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
          */}

          <Search 
           backgroundColor = "rgba(255,109,111, .8)"
           placeholderTextColor = "rgba(255,109,111, .8)"
           //placeholder = "Search"
          /> 
            </View>
          } 
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
                        <Text style={styles.subtitleText}>{}</Text>
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
};
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