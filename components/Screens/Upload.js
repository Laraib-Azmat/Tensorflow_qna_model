//All dependecies here
import { View, Text, Pressable, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import { uploadStyle } from './ScreenStyles';
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';
import { ActivityIndicator } from 'react-native';

export default function Upload() {
    
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading , setUploading] = useState(false);

  const selectImageHandler = async ()=>{

    try{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            quality: 1,
            aspect: [4, 3],
          })

          if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
         
          }
    }catch(error){
        Alert.alert("Error in selecting image");
    }
  }

  const uploadFirebaseHandler = async ()=>{    
    setUploading(true);
    try{
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const filename = selectedImage.split("/").pop();
        const refrence = ref(storage, `images/${filename}`);
        const  result = await uploadBytes(refrence, blob);
        const url = await getDownloadURL(result.ref);
        setSelectedImage(null);
        setUploading(false);
        Alert.alert("File uploaded to firebase");
       
    }
    catch(error){
        setUploading(false);
       console.log(error);
       alert("error in uploading file")
    }
  }

  return (
    <View  style={uploadStyle.uploadView} > 

      <Text style={{
        fontSize:20, fontWeight:600, color:'#b31240'
      }}>Select Image and Upload to Firebase</Text>

      {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
        )}

     {!selectedImage &&(
         <Pressable onPress={selectImageHandler} style={uploadStyle.uploadPressable} >
         <Text style={{color:'#fff', fontWeight:600, fontSize:18}} >Select Image</Text>
       </Pressable>
     )}

     {selectedImage && (
         <Pressable onPress={uploadFirebaseHandler} style={uploadStyle.uploadPressable} >
          {uploading ? <ActivityIndicator  /> : <Text style={{color:'#fff', fontWeight:600, fontSize:18}}>Upload to Firebase</Text>}
       </Pressable>
     )}

    </View>
  )
}