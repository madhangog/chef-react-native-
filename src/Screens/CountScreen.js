import React from 'react'
import { Button, Platform, Image, View, Text } from 'react-native';
import Header from '../Components/Header'
import Barcode from 'react-native-barcode-builder';

export default class Count extends React.Component{
    render(){
        const { params } = this.props.navigation.state;

        
        return(
            <View style={ {flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Header/>
                <View >
                    {/* onPress={(navigation)=>this.props.navigation.navigate('Home')} > */}
                    {/* <Button 
                        onPress={()=> this.props.navigation.navigate('Home')} title='YES'></Button> 
                        <Text>
                     or </Text>
                     <Button
                        onPress={()=> this.props.navigation.navigate('Login')} title='NO'></Button> 
                         */}
 
                        <Barcode value={params.rollno} text="Scan this to Eat" format="CODE128" />
                </View>
            </View>
        )
    }
}