import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage,
  ScrollView,
  SafeAreaView
} from 'react-native';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      mobile:'',
      rollno:'',
      name:''
    }
    this.onClickListener = this.onClickListener.bind(this)
  }

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
    title:'  SIGNUP',
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor ,
      },
  
      headerTintColor:navigationOptions.headerTintColor,
    };
  };
  onClickListener = async (viewId) => {

  await axios.post('http://192.168.43.63:8000/student', {username: this.state.username, password: this.state.password, name:this.state.name, rollno :this.state.rollno, mobile :this.state.mobile})
  .then(res => {
    // console.log(res);
    // console.log(res.data);
    if(res.data.status==="done"){
      this.props.navigation.navigate('Login')
    }
})
}

  render() {
    return (
    
      <View style={styles.container}>
        <Image style={styles.bgImage} source={ require("./bg.jpg") }/>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Username"
              underlineColorAndroid='transparent'
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="name"
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/name.png'}}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="rollno"
              underlineColorAndroid='transparent'
              onChangeText={(rollno) => this.setState({rollno})}
              value={this.state.rollno}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/email.png'}}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="mobile"
              underlineColorAndroid='transparent'
              onChangeText={(mobile) => this.setState({mobile})}
              value={this.state.mobile}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/64/000000/phone.png'}}/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>

     

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableOpacity>


      </View> 
  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    width : '100%',
    height : "100%"
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center',

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginRight:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor:'transparent'
  },
  btnForgotPassword: {
    height:15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom:10,
    width:300,
    backgroundColor:'transparent',
  },
  loginButton: {
    backgroundColor: "#00b5ec",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    width:200,
    elevation: 19,
  },
  loginText: {
    color: 'white',
  },
  bgImage:{
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
  }
}); 
