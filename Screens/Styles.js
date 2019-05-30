import {StyleSheet, Dimensions} from 'react-native';

const Colors = {
  lightGrey: '#c9c9c9',
  midGrey: '#5d5d5d',
  darkGrey: '#363636',
}

export default StyleSheet.create({
  //new
  reviewDate:{
    flex: 1,
    flexDirection: 'row',
  },
  bigBoldRedTitle:{
    paddingTop: 90,
    paddingBottom:10,
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: 'rgba(255,109,111, .8)'
  },
  buttonContainerReview: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36
  },
  viewVendorPanel: {
    height: Dimensions.get('window').height-100,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  reviewsPanel: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    flex:1
  },
  tabView: { 
    width:  550, 
    height:  500, 
    backgroundColor:  'white' 
  },
  formView:
  {
    height: Dimensions.get('window').height-200,
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  listReviewView: {   
    height: Dimensions.get('window').height-275,
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  reviewView: {
    flexDirection: 'row',
    height: 25,
  },
  reviewHomeFont:{
    fontSize: 15,
    color: 'gray'
  },
  reviewFont:{
    fontSize: 15,
    paddingTop: 10,
    paddingBottom:10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(255,109,111, .8)'
  },
  ratings:{
    alignSelf: "center",
    paddingTop: 15,
    paddingBottom: 10
  },
  reviewForm:{
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF", 
    alignSelf: "stretch"
  },
  subtitleView: {
    //height: 60,
    paddingLeft: 15,
    paddingTop: 5
  },
  titleText: {
    fontWeight: 'bold',
    fontSize:20, 
    paddingLeft: 15,
    color: '#380e82'
  },
  distanceText: {
    fontSize:15, 
    color: 'black'
  },
  subtitleText: {
    fontSize:15, 
    color: 'black'
  },
  // Sliding Drawer
  safeAreaStyle:{
    height:100,
    backgroundColor: 'white', 
    alignItems:'center', 
    justifyContent: 'center'},
  userIconImage:{
    height:60, 
    width:60, 
  },
  drawerIconSize:{
    height: 20,
    width: 20,
    //color: '#FF6D6F',
  },
  logoutIconSize:{
    height: 14,
    width: 18,
  },
  drawerIcon:{
    fontSize:24, 
    color:'#4C2250'
  },
  menuOptionsStyle: {flex:1},
  headerLayoutStyle: { 
    height: 100,
    width: Dimensions.get('window').width, 
    backgroundColor: '#FBBC82', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  slidingPanelLayoutStyle: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#CD9BCC', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  slidingPanelLayout2Style: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: 'white'
  },
  slidingPanelLayout3Style: {
    height: 200,
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    alignItems:'center',
    paddingTop:25
  },
  commonTextStyle: {
    color: 'white', 
    fontSize: 18
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },

  // Containers / Defaults
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
    },
  container2: {
    flex: 1,
    backgroundColor: '#fff'
    },
  padding: {
    paddingTop: 23
  },
  ButtonText:{
    color: 'white',
    textAlign: 'center',
  },
  bottomText:{
  textAlign: 'center'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,112,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: 'white', 
  },
  
  // Style Background
  backgroundContainer:{
    flex: 1,
    resizeMode: 'cover',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },

  // Alignment
  centerView: {
    marginTop: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 36
  },
  form:{
    flex: 1,
    justifyContent: 'flex-end',
    paddingTop: 240,
    alignSelf: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20
  },
  logoMain:{
    alignSelf: 'center',
    
  },


  // Style Form
  formInput:{
    marginTop: 10, 
    paddingHorizontal: 15,
    width: 310, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderColor: 'rgba(255, 255, 255, 0.85)'
  },
  smallFont: {
    color: '#FFF',
    padding: 5, 
    textAlign: "center",
    fontWeight: 'bold'
  },
  searchBarContainer:{
    backgroundColor: '#FFF',
  },
   bigBoldWhiteFont:{
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: '#FFF'
  },
  bigBoldRedFont:{
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    color: 'rgba(255,109,111, .8)'
  },

  // Buttons
  CreateButton:{
    backgroundColor: '#FFF',
        padding: 10,
        margin: 15,
        height: 40,
        width: 200,
        alignSelf: 'center'
  },
  visibilityBtn: {
    position: 'absolute',
    right: 3,
    height: 40,
    width: 35,
    padding: 5
  },
  btnImage: {
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  
  // Vendor 
  vendorThumbnail:{
    height: 50,
    width: 50,
  },
  vendorName:{
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.darkGrey,
  },
  vendorLocationButtonAlign:{
   position: 'absolute',
   justifyContent: 'center', 
   alignItems: 'center',
   alignSelf: 'center',
   //alignSelf: 'center',
   bottom: 20,
  },
  vendorMapContainer:{
    flex:1,
  },
  vendorHeaderStyle:{
    backgroundColor: 'rgba(255,109,111, .8)',
    position: 'absolute',
    top: 0,
  },

  // Map 
  mapSize:{
    flex: 1,
  },
  compassPosition:{
    position: 'absolute',
    alignSelf: 'center',
    top: 10,
  },
  hamburgerIconPosition:{
    position: 'absolute',
    left: 10,
    top: 22,
  },
  mapIconStyle:{
    height: 40,
    width: 40,
  },
  locationIconPosition:{
    position: 'absolute',
    right: 10,
    bottom: 90,
  },
  mapTopNavBar:{
    position: 'absolute',
    //alignSelf: 'center',
    top: 20,
    height: 50,
    width: 300,
    //left: 30,
  },
  searchBarPos:{
    position: 'absolute',
    alignSelf: 'center',
    top: 14,
    height: 50,
    width: 350,
    left: 50,
  },
  locationIconSize:{
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
  },

  // Text Styles
  h1:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#363636',
  },
  h2:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#363636',
  },
  p1:{
    fontSize: 12,
  },

  logo:{
    flex: 1,
    maxWidth: 200,
    maxHeight: 200,
    resizeMode: 'contain',
    position: 'absolute',
    alignSelf: 'center',
    top: 8,
  },


})

/*
Colors:
 // Original Image Colors (Currently in use)
  #FBBC82
  #FB8B74   
  #FF6D6F rgba(255,109,111, .8)
  #8F425F
  #87456F
  #4C2250
  // Faded Image Colors
  #FAB7AF
  #F7B8B1
  #CF9FC7
  #CD9BCC
  #F8B195
  #F67280
  #C06C84
  #6C5B7B
  #355C7D

  // Font Colors
  #363636

  // Grey
  #C7C7C7 rgba(199,199,199, .8)
 */