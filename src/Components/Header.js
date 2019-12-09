import React from 'react';
import { Button, Platform, Image, View, Text } from 'react-native';

export default class Header extends React.Component{
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
    
        return {
          // headerTitle: () =>'hgfhtgh',
          // headerLeft: () => (
          //   <Button
          //     color={Platform.OS === 'ios' ? '#fff' : '#fff'}
          //   />
          // ),
        //   headerRight: () => (
        //     <Button onPress={params.increaseCount} title="+1" color={Platform.OS === 'ios' ? "#fff" : null} />
        //   ),
        };
      };

    render(){
        return(
          <View >
            
          </View>
          
        )
    }
}