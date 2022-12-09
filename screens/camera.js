import * as react from 'react';
import { Button,Image,View,Platform, } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from "expo-media-library";

export default class Camera extends react.Component{
state={image:null}

getpermissionasync=async()=>{
    if(Platform.OS!=="web"){
        const permission = await MediaLibrary.requestPermissionsAsync();
        if(permission!=="granted"){
            alert("Permission denied")
        };
    }
}
componentDidMount(){
    this.getpermissionasync()
}
pickimage=async()=>{
    try{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!result.cancelled){
            this.setState({image:result.data})
            console.log(result.uri)
            this.uploadImage(result.uri)
        }
    }
    catch(e){
        console.log(e)
    }
}
uploadImage=async(uri)=>{
const data=new FormData()
console.log(uri)
let filename=uri.split("/")[uri.split("/").length-1]
console.log(filename)
let type=`image/${uri.split(".")[uri.split(".").length-1]}`
console.log(type)
const filetoupload={uri:uri,name:filename,type:type}
data.append("digit",filetoupload)
fetch("https://d38b-49-206-123-101.ngrok.io/predict-digit",{method:"POST",body:data,headers:{"content-type":"multipart/form-data"}})
.then((response)=>response.json())
.then((result)=>{
    console.log("Success",result)
})
.catch((error)=>{console.error(error)})
}
render(){
    return(
        <View>
            <Button title="Pick image" onPress={this.pickImage}/>
        </View>
    )
}
}
