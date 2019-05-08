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
import {Rating, SearchBar, ListItem} from "react-native-elements";
const win = Dimensions.get("window");

// Images
import notFocusLocationIcon from '../../assets/Images/NotCurrentLocationIcon_Opacity80.png';
import focusLocationIcon from '../../assets/Images/CurrentLocationIcon_Opacity80.png';
import hamburgerMenuIcon from '../../assets/Images/HamburgerMenuIcon.png';
import popsicleIcon from '../../assets/Images/popsicleLocator.png';
import userIcon from '../../assets/Images/defaultUserIcon.png';
global.vendorID = "1rBfk986QLbSmwtN5nmvxo1uj522";
global.ratingValue = 0;
function getDistanceInMiles(lat1,lon1,lat2,lon2) { 
  var R = 6371; // Radius of the earth in km 
  var dLat = deg2rad(lat2-lat1); // deg2rad below 
  var dLon = deg2rad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2) ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km 
  var e = Math.round(d*0.62137*100)/100;
  return e; 
} 
function deg2rad(deg) { 
  return deg * (Math.PI/180) 
}
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      error: null,
      name: " ",
      vendorList: {},
      //vendorSelected: ""
    };
    this._isMounted = false;
  }
  
  state = { currentUser: null };

  state = { moveToUserLocation: true };

  onPush = (key, totalReviews, totalStars) =>
{
  global.vendorID = key;
  global.ratingValue = totalStars/ totalReviews;
  console.log("global rating"+ratingValue);
  this.props.navigation.navigate("ViewVendorProfile");
}
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

    //let vendorRef = db.ref(`/vendors`).orderByChild("latitude").startAt(0);
    let vendorRef = db.ref(`/vendors`).orderByChild("isVendorLocationOn").equalTo(true);
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
        if(vendorList[key].latitude!== null&&vendorList[key].longitude!== null&&vendorList[key].company!== null&&vendorList[key].city!== null&&vendorList[key].name!== null&&
          vendorList[key].typeVendor!== null&&vendorList[key].phone!== null&&vendorList[key].daysOfOp!== null&&vendorList[key].hoursOfOp!== null&&
          vendorList[key].latitude!== undefined&&vendorList[key].longitude!== undefined&&vendorList[key].company!== undefined&&vendorList[key].city!== undefined&&vendorList[key].name!== undefined&&
          vendorList[key].typeVendor!== undefined&&vendorList[key].phone!== undefined&&vendorList[key].daysOfOp!== undefined&&vendorList[key].hoursOfOp!== undefined)
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
              latitude: vendorList[key].latitude,
              longitude: vendorList[key].longitude,
              numOfReviews: vendorList[key].numOfReviews,
              numOfStars: vendorList[key].numOfStars
              //distance: distance
            };
            newVendorList.push(tempObj);
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
                    latitude: l.latitude,
                    longitude: l.longitude
                  }}
                  key={i}
              >
              {/*global.vendorID= l.id*/}
                <TouchableOpacity 
                onPress={
                  //()=> this.props.navigation.navigate("ViewVendorProfile")
                  () => this.onPush(l.id, l.numOfReviews, l.numOfStars)
                }
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

              {/*<TouchableOpacity
                name="md-menu" 
                onPress={()=> this.filter(newVendorList,"Elotes")}
              >
                <Image 
                  source={popsicleIcon}
                  style={styles.mapIconStyle}
                  />
              </TouchableOpacity>*/}
              <Text style={{ 
                  paddingTop: 50,
                  fontWeight: 'bold',
                  fontSize: 30,
                  textAlign: 'center',
                  color: 'rgba(255,109,111, .8)'
                }}>
                   Vendors Near You
                </Text>

            </View>
          } 
          slidingPanelLayout = {() =>
          <View style={styles.slidingPanelLayout2Style}> 
              {
                newVendorList.map((l, i) => (
                  <ListItem
                    key={i}
                    title={
                      <Text style={styles.titleText}>{l.company}</Text>
                    }
                    subtitle={
                      <View style={styles.subtitleView}>
                        <View style={styles.reviewView}>
                          <Rating 
                            startingValue = {l.numOfStars/l.numOfReviews}
                            readonly = {true}
                            type = 'star'
                            imageSize={20}
                          />
                          <Text style={styles.reviewHomeFont}>  {l.numOfReviews} Reviews</Text>
                        </View>
                        <Text style={styles.subtitleText}>{l.typeVendor}</Text>
                        <Text style={{ fontSize:12,color: 'grey'}}>{getDistanceInMiles(this.state.latitude,this.state.longitude,l.latitude,l.longitude)} mi</Text>
                      </View>
                    }
                    avatar={
                      <Image 
                        source={userIcon}
                        style={styles.mapIconStyle}
                      />}
                    onPress={() => this.onPush(l.id, l.numOfReviews, l.numOfStars)}
                  >
                  
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