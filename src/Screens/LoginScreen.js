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
  AsyncStorage
} from 'react-native';
import axios from 'axios';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token:''
    }
    this.onClickListener = this.onClickListener.bind(this)
    this._storeData = this._storeData.bind(this);
    this._retrieveData = this._retrieveData.bind(this)
    this.onRegister =this.onRegister.bind(this)
    this.onAdmin = this.onAdmin.bind(this)
  }
  componentDidUpdate() {
    this._retrieveData()
  }
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
    return {
    title:'  LOGIN',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerStyle.backgroundColor ,
      },
      // headerLeft: () => (
      // <Button
      //   onPress={() => navigation.navigate('MyModal')}
      //   title="Info"
      //   color={Platform.OS === 'ios' ? '#fff' : null}
      // />
      // ),  
      headerTintColor:navigationOptions.headerTintColor,
    };
  };
  onClickListener = async (viewId) => {
  //   await this.setState({
  //     username:'',
  //     password: ''});
  //     this.props.navigation.navigate('Home')
  // }
  await axios.post('http://192.168.43.63:8000/studentLogin', {username: this.state.username, password: this.state.password})
  .then(res => {
    // console.log(res);
    // console.log(res.data);
    if(res.data.status==="done"){
      this.setState({token :res.data.token})
      this._storeData('token', res.data.token)
      this.props.navigation.navigate('Home', {
        "token":res.data.token
      })
    }
})
// console.log(this.state.token)
}

onRegister(){
  this.props.navigation.navigate('Signup')
}
onAdmin(){
  this.props.navigation.navigate('AdminLogin')
}

_storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};
_retrieveData = async () => {
  try {
    // console.log("coming inside")
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // We have data!!
      // console.log("thisis from retreival ",value);
    }
  } catch (error) {
    // Error retrieving data
    // console.log(error)
  }
};
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
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/nolan/40/000000/key.png'}}/>
        </View>

        <TouchableOpacity style={styles.btnForgotPassword} onPress={() => this.onClickListener('restore_password')}>
            <Text style={styles.btnText}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onRegister()}>
            <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onAdmin()}>
            <Text style={styles.btnText}>Admin Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// const resizeMode = 'center';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
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
    fontSize :20,
  },
  bgImage:{
    flex: 1,
    // resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText:{
    color:"white",
  }
}); 
