import React from 'react'
import { Button, Platform, Image, View, Text,StyleSheet } from 'react-native';
import Header from '../Components/Header'
import Barcode from 'react-native-barcode-builder';
import axios from 'axios'
export default class Count extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            total_count:null,
            ordered_persons:[]
        };
      }
      async componentDidMount() {    
        axios.get('http://192.168.43.63:8000/totalCount')
        .then(res =>{
            //console.log(res.data)
            let datas = res.data
            let total_counts = datas.length
            this.setState({
                total_count: total_counts
            })
           this.setState({
               ordered_persons : res.data.slice()
           })
        })
        //   for ( i=0; i<=2; i++){
        //     var stateCopy = Object.assign({}, this.state);
        //     stateCopy.data = stateCopy.data.slice();
        //     stateCopy.data[i] = Object.assign({}, stateCopy.data[i]);
        //     if(i===0){
        //       stateCopy.data[i].count = res.data[day].breakfast;
        //     }if(i===1){
        //       stateCopy.data[i].count = res.data[day].lunch;
        //     }else{
        //       stateCopy.data[i].count = res.data[day].dinner;
        //     }
            
        //     this.setState(stateCopy);
        //   }
         
      }
  

      
      static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
        return {
          
        title:'  ADMIN HOME',
          /* These values are used instead of the shared configuration! */
          headerStyle: {
            backgroundColor: navigationOptions.headerStyle.backgroundColor ,
          },
          // headerRight: () => (
          //   <Button onPress={() => navigation.navigate('AdminLogin')} title="Logout" color={Platform.OS === 'ios' ? "#fff" : null} />
          // ), 
          headerTintColor:navigationOptions.headerTintColor,
        };
      };
    
    render(){
        const { params } = this.props.navigation.state;

        // //console.log(this.state.ordered_persons)
        return(
            <View style={styles.container}>
                <View >
                      <Text style={styles.text}>Total count = {this.state.total_count} </Text>
                </View>
                <View>
                    {this.state.ordered_persons.map(person=>{
                    return <Text>{person.name}</Text>
                    })}
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
      },
    text:{
        fontSize : 30,
        paddingTop: 0
    },
})