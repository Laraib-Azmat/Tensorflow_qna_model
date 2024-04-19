import { StyleSheet } from "react-native";


const loginStyles = StyleSheet.create({
    SigninView:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',

    },
    loginHeader:{
            backgroundColor:'#b31240',
            height:230,
            alignItems:'center',
            justifyContent:'center',
            width:'65%',
            borderRadius:120,
            left:-90,
            top:-20
        
    },
    InputFields:{
        width:'70%',
        gap:10,
        height:'20%',
       bottom:-60,
       zIndex:10
    },
    inputs:{
        width:'100%',
        height:40,
        backgroundColor:'#ffc6d6',
        padding:10
    },
    errorView:{
        width:300,
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.7)',
        borderRadius:20,
        justifyContent:'center',
        zIndex:10,
        padding:5,
        alignSelf:'center',
        marginHorizontal:10
    },
    passwordInput:{
        flexDirection:'row',
        alignItems:'center'
    },
    eyeIcon:{
        position:'absolute',
        right:0,
        marginRight:10
    }

});

export default loginStyles;