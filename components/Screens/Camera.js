//importing Dependencies
import { View, Text, Alert,alert, Pressable , Platform} from 'react-native'
import {useState, useEffect} from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { cameraStyle } from './ScreenStyles';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen() {

  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [imagePermission, setImagePermission] = useState(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);


  //function for permission
  const permissionFunction = async ()=>{

    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setCameraPermission(cameraPermission.status === 'granted');

    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    setImagePermission(imagePermission.status === 'granted');

    const mediaLibraryPermission = await  MediaLibrary.requestPermissionsAsync();
    setMediaLibraryPermission(mediaLibraryPermission.status === 'granted')
  

  if (
    imagePermission.status !== "granted" &&
    cameraPermission.status !== "granted" &&
    mediaLibraryPermission.status !== "granted"
  ) {
    Alert.alert("Permission for media access needed!!");
  }
}

  useEffect(()=>{
        permissionFunction();
  },[]);

  //Capture and save picture
  const captutePicture = async ()=>{
    if (camera){
        const data = await camera.takePictureAsync();
        await savePicToGallery(data.uri);
      }
  }

  const savePicToGallery = async (uri)=>{

    if(mediaLibraryPermission){
        try{
  
          const asset = await MediaLibrary.createAssetAsync(uri) ;
          if(Platform.OS==='android'){
            MediaLibrary.createAlbumAsync("ExpoImages", asset, false)
            .then(()=>{
              Alert.alert('file savedd!!')
            })
            .catch((e)=>{
              Alert.alert('Error file saving', e);
            });
          }
          else{
            MediaLibrary.createAlbumAsync("ExpoImages", [asset], false)
            .then(()=>{
              Alert.alert('file saved!!')
            })
            .catch(()=>{
              Alert.alert('error file saving', e)
            })
          }
        }
        catch(error){
          Alert.alert(error)
        }
      }
      else{
        Alert.alert('needed permission');
      }

  }

  const cameraSwitchHandler = ()=>{
    if(type==Camera.Constants.Type.back){
         setType(Camera.Constants.Type.front)
    }else{
        setType(Camera.Constants.Type.back)
    }
  }

  const openGallery = async ()=>{
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        presentationStyle: 0,
      });
    
      if (!result.canceled) {
        navigation.navigate("ImagePicker", { uri: result.assets[0].uri });
      }
  }

  return (
    <View style={cameraStyle.cameraContainer}>
         <Camera
            ref={(ref)=>setCamera(ref)}
            style={cameraStyle.cameraRation}
            type={type}
            ratio={'1:1'}
            />

            <View style={cameraStyle.CameraButtons}>

                <Pressable style={cameraStyle.cameraPressables} onPress={openGallery}>
                <MaterialIcons name="collections" size={24} color="#b31240" />
                </Pressable>

                <Pressable style={cameraStyle.cameraPressables} onPress={captutePicture}>
                <Ionicons name="camera-sharp" size={50} color="#b31240" />
                </Pressable>

                <Pressable style={cameraStyle.cameraPressables} onPress={cameraSwitchHandler}>
                <Ionicons name="camera-reverse-sharp" size={24} color="#b31240" />
                </Pressable>

            </View>
     </View>
  )
}