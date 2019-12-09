import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ScrollView,
    Modal,
    Button
  } from 'react-native';
  import axios from 'axios';

  
  export default class Home extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        modalVisible:false,
        userSelected:[],
        data: [
          {id:1,  name: "BREAKFAST",   image:"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",           count:""},
          {id:2,  name: "LUNCH",    image:"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",       count:""},
          {id:3,  name: "DINNER",       image:"https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/articles/health_tools/best_and_worst_foods_for_your_liver_slideshow/493ss_thinkstock_rf_photo_of_berry_nut_oatmeal.jpg", count:""} ,
        ],
        curTime:null,
        active: '',
        ordered: '',
        token:''
      };
      this.onOrder = this.onOrder.bind(this)
      this.onAccept = this.onAccept.bind(this)
      this.onReject = this.onReject.bind(this)
    }
    async componentDidMount() {
       await setImmediate( () => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
            let time = this.state.curTime.split(' ')[4]
            let hour = time.split(':')[0]
            let minutes = time.split(':')[1]
           
              if(hour >= 19 && hour <= 23) {
                this.setState({active : 'BREAKFAST'})
              }else if(hour >=7 && hour <= 11){
                //change 11 to 9
                this.setState({ active: 'LUNCH'})
              }else if(hour >= 12 && hour <=17 ){
                
                this.setState({active :'DINNER'})
              } 
              else{
                this.setState({active : ''})
              }
              if(hour === 23 && minutes >= 2){
                axios.get('http://192.168.43.63:8000/clearCounter')
              }else if (hour ===11 && minutes >= 2){
                axios.get('http://192.168.43.63:8000/clearCounter')
              }else if (hour ===17 && minutes >= 2){
                axios.get('http://192.168.43.63:8000/clearCounter')
              }else{
                null
              }
      },10000)    
       console.log(minutes)
      await axios.get('http://192.168.43.63:8000/todayMenu')
      .then(res =>{
        let day = this.state.curTime.split(' ')[0]
        // console.log(day)
        // console.log(res.data[day])
        for ( i=0; i<=2; i++){
          var stateCopy = Object.assign({}, this.state);
          stateCopy.data = stateCopy.data.slice();
          stateCopy.data[i] = Object.assign({}, stateCopy.data[i]);
          if(i===0){
            stateCopy.data[i].count = res.data[day].breakfast;
          }if(i===1){
            stateCopy.data[i].count = res.data[day].lunch;
          }else{
            stateCopy.data[i].count = res.data[day].dinner;
          }
          
          this.setState(stateCopy);
        }
       
      })
    }

async componentDidUpdate(){
  setInterval(()=>{
    axios.get('http://192.168.43.63:8000/checkorder', {headers: {
      'Authorization': 'Bearer ' + this.props.navigation.state.params.token
    }})
    .then(res => {
      // console.log(res.data);
      if(res.data.status==="ordered"){
          let active = this.state.active
          this.setState({
            ordered: active
        })
      }
   
  })
  // console.log("this is params     ",this.props.navigation.state.params.token)
  // console.log(this.state.data[0].count)
  // console.log(this.state.active)
// console.log(this.state.ordered)
  },10000)

}
    
    static navigationOptions = ({ navigation, navigationOptions }) => {
      const { params } = navigation.state;
      console.log("this is params     ",params.token)
      return {
        
      title:'  HOME',
        /* These values are used instead of the shared configuration! */
        headerStyle: {
          backgroundColor: navigationOptions.headerStyle.backgroundColor ,
        },
        // headerRight: () => (
        //   <Button onPress={() => this.props.navigation.navigate('Home')} title="Logout" color={Platform.OS === 'ios' ? "#fff" : null} backgroundColor={'#f4511e'}/>
        // ), 
        headerTintColor:navigationOptions.headerTintColor,
      };
    };
  
    onOrder =  (item) => {
    //   Alert.alert('Message', 'Item clicked. '+item.name);
    if(this.state.ordered === '' ){
      this.setState({userSelected: item}, () =>{
        this.setState({modalVisible: true});
      });
    }
    else {

      // this.props.navigation.navigate('Count',{
      //   rollno: '17CS26'}
      //   );
    }
       
    }
    onAccept(){
      axios.get('http://192.168.43.63:8000/order', {headers: {
        'Authorization': 'Bearer ' + this.props.navigation.state.params.token
      }})
      .then(res => {
        // console.log(res.data);
        if(res.data.status==="taken"){
          // this.props.navigation.navigate('Count',{
          //   rollno: '17CS26'}
          //   );
            this.setState({modalVisible: false});
            let active = this.state.active
            this.setState({
              ordered: active
            })
        }
    })
    // console.log(this.state.ordered)       
    }
     onReject(visible) {
         this.setState({modalVisible: visible});
        //  this.props.navigation.navigate('Count',{
        //   rollno: '17CS26'}
        //   );
      }
    
    render() {
     
      return (
        <View style={styles.container}>
          <Image style={styles.bgImage} source={{ uri: "https://previews.123rf.com/images/boarding1now/boarding1now1711/boarding1now171100066/90409331-vegetables-collection-tomatoes-carrots-cooking-ingredients-portrait-format-background-top-view-from-.jpg" }}/>
            <Text style={styles.title }>Today's speacial</Text>
            
          <FlatList 
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={this.state.data}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => {
    
            return (
             
              <View pointerEvents={ (item.name === this.state.active) ? null : "none" } style={(item.name === this.state.active)? styles.card : styles.overlay} >
                {/* <Image style={styles.image} source={{uri: item.image}}/> */}
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.count}>{item.count}</Text>
                  <TouchableOpacity style={styles.followButton} onPress={()=> this.onOrder(item)}>
                  {item.name === this.state.ordered ? <Text style={styles.followButtonText}>ORDERED</Text>  : <Text style={styles.followButtonText}>ORDER</Text>   }  
                  </TouchableOpacity>
                </View>
              </View>
            )}}/>
          <Modal
            animationType={'fade'}
            transparent={true}
            // onRequestClose={() => this.setModalVisible(false)
            //                       }
            visible={this.state.modalVisible}>

            <View style={styles.popupOverlay}>
              <View style={styles.popup}>
                <View style={styles.popupContent}>
                  <ScrollView contentContainerStyle={styles.modalInfo}>
                      {/* <Image style={styles.image} source={{uri: this.state.userSelected.image}}/> */}
                      <Text style={styles.name}>{this.state.userSelected.name}</Text>
                      <Text style={styles.position}>{this.state.userSelected.count}</Text>
                      {/* <Text style={styles.about}>{this.state.userSelected.about}</Text> */}
                  </ScrollView>
                </View>
                <View style={styles.popupButtons}>
                  <TouchableOpacity onPress={() => {this.onAccept() }} style={styles.btnClose}>
                    <Text style={styles.txtClose}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {this.onReject(false) }} style={styles.btnClose}>
                    <Text style={styles.txtClose}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:"#ebf0f7"
    },
    contentList:{
      flex:1,
      zIndex:3
    },
    overlay: {
      flex: 1,
      left: 0,
      top: 0,
      opacity: 0.9,
      backgroundColor: 'black',
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,
      marginBottom:10,
      marginTop:20,
      backgroundColor:"#00000021",
      padding: 10,
      flexDirection:'row',
      borderRadius:10,
    },
    cardContent: {
      marginLeft:20,
      marginTop:10,
    },
    image:{
      width:90,
      height:90,
      borderRadius:25,
      borderWidth:2,
      borderColor:"#ebf0f7",
    
    },
    
    title:{
        shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      textAlign:'center',
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,
      marginBottom:10,
      marginTop:20,
      backgroundColor:"white",
      padding: 10,
      borderRadius:10,
      color:'#3399ff',
      fontWeight:'bold',
      fontSize:20

    },
      bgImage:{
    flex: 1,
    // resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  
    card:{
      shadowColor: '#00000021',
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,
      marginBottom:10,
      marginTop:20,
      backgroundColor:"white",
      padding: 10,
      flexDirection:'row',
      borderRadius:10,
    },
  
    name:{
      fontSize:17,
      flex:1,
      alignSelf:'center',
      color:"#3399ff",
      fontWeight:'bold'
    },
    count:{
      fontSize:14,
      flex:1,
      alignSelf:'center',
      color:"#6666ff"
    },
    followButton: {
      marginTop:10,
      height:35,
      width:100,
      padding:10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "white",
      borderWidth:1,
      borderColor:"#f4511e",
    },
    followButtonText:{
      color: "#f4511e",
      fontSize:12,
    },
    /************ modals ************/
    popup: {
        backgroundColor: 'white',
        marginTop: 80,
        marginHorizontal: 20,
        borderRadius: 7,
      },
      popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        marginTop: 30
      },
      popupContent: {
        //alignItems: 'center',
        margin: 5,
        height:200,
      },
      popupHeader: {
        marginBottom: 45
      },
      popupButtons: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: "#eee",
        justifyContent:'center',
        marginBottom:20
      },
      popupButton: {
        flex: 1,
        marginVertical: 16,
      },
      btnClose:{
        height:20,
        backgroundColor:'#20b2aa',
        padding:20,
        justifyContent:'center',
        marginRight:20,
        borderRadius:10
      },
      position:{
        margin:49
      },
      modalInfo:{
        alignItems:'center',
        justifyContent:'center',
      },
      txtClose:{
        color: "white",
        fontSize:18,
      }
  });  
// export default class Home extends React.Component{
//     render(){
//         const { params } = this.props.navigation.state;
//         const itemId = params ? params.itemId : null;
//         const otherParam = params ? params.otherParam : null;
        
//         return(
//             <View style={ {flex: 1, alignItems: 'center', justifyContent:'center'}}>
//                 <Text 
//                     onPress={()=>this.props.navigation.navigate('Count')} > 
//                     THIS is  food menu. touch to give count
//                 </Text>
//             </View>
//         )
//     }
// }