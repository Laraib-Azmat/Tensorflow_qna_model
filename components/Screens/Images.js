import  {useState, useEffect } from 'react'
import { Text , View, Image, ScrollView, ActivityIndicator} from 'react-native'
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { useIsFocused } from '@react-navigation/native';
import { homeStyle } from './ScreenStyles';

export default function Images() {

    const [imageUrls, setImageUrls] = useState([]);
    const [loading,setLoading] = useState(false);
    const isFocused = useIsFocused(); 

    useEffect(() => {
        const fetchImageUrls = async () => {
          const storage = getStorage();
          const storageRef = ref(storage, 'images'); // Reference to your images folder in Firebase Storage     
          try {
            // List all images in the 'images' folder
            const listResult = await listAll(storageRef);
            // Get download URL for each image
            const urlsPromises = listResult.items.map(async (itemRef) => {
              const url = await getDownloadURL(itemRef);
              console.log(url)
              return url;
            });
    
            // Resolve all promises to get array of image URLs
            const urls = await Promise.all(urlsPromises);
            setImageUrls(urls);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching image URLs:', error);
            setLoading(false);
            console.log(imageUrls)
          }
        };    
        fetchImageUrls();
      },[isFocused]);
    
  return (
    <View style={homeStyle.homeView}>
        <Text style={{fontSize:20, fontWeight:700, color:'#b31240'}}>Your Firebase Images</Text>
        <ScrollView >
        <View style={homeStyle.imgView}>
        {loading ? <ActivityIndicator color={'#000'} size={80} /> :
        imageUrls.map((url, index) => (
        <Image key={index} source={{ uri: url }} style={{width:150, height:150, objectFit:'cover'}}  />
      ))}
        </View>
        </ScrollView>
    </View>
  )
}
