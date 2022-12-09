import react from 'react'
import Camera from "./screens/camera"
import { Button,Image,View,Platform, } from 'react-native';
export default class App extends react.Component{
  render(){
    return(
      <View style={{marginTop:50}}>
      <Camera/>
      </View>
    )
  }
}