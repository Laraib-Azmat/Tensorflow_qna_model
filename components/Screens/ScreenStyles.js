import { StyleSheet } from "react-native";


const cameraStyle = StyleSheet.create({
    cameraContainer:{
        width:'100%',
        height:'100%',
    },
    cameraRation:{
        flex:1,
        aspectRatio:1
    },
    CameraButtons:{
   flexDirection:'row',
   alignItems:'center',
   position:'absolute',
   bottom:50,
   height:50,
   width:'100%',
   justifyContent:'space-between',
   paddingHorizontal:30
    },
    cameraPressables:{
        backgroundColor:'#fff',
        width:60,
        height:60,
        padding:5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:100
    }

});

  const uploadStyle = StyleSheet.create({
    uploadView:{
        justifyContent:'center',
        alignItems:'center',
        height:'100%',
        width:'100%',
        gap:30,
      
    },
    uploadPressable:{
        backgroundColor:'#b31240',
        padding:10,
        borderRadius:10
    }

  });

  const QnAStyle = StyleSheet.create({
    qnaView:{
      alignItems:'center',
      justifyContent:'center',
      width:'90%',
      height:'100%',
      gap:20,
      marginLeft:15,
      marginBottom:20

    },
    inputs:{
  width:'80%',
  borderWidth:2,
  borderColor:'#b31240',
borderRadius:10,
padding:5,
alignItems:'flex-start'
    },
    qnaBtn:{
      backgroundColor:'#b31240',
      padding:10,
      borderRadius:10
    },
    qnaText:{
      fontSize:18,
      color:'#b31240'
    },
    title:{
      fontSize:18,
      color:'#b31240',

    },
    subtitle:{
      justifyContent:'center',
      alignItems:'center'
    }

  });

  const homeStyle = StyleSheet.create({
    homeView:{
        alignItems:'center',
        gap:40,
        margin:10,
      marginBottom:100
    },
    imgView:{
        flexDirection:'row',
        flexWrap:'wrap',
        alignItems:'center',
      gap:10,
      justifyContent:'center'

    }
  })

export {cameraStyle, uploadStyle, QnAStyle, homeStyle};