import { View, Text, Pressable } from 'react-native'
import {useNavigation} from "@react-navigation/native";
import React from 'react';


export default function LoginBtns(props) {
    const navigation = useNavigation();

    const switchAccount =()=>{
        navigation.navigate(props.switchText)
    }
   
  return (
    <View style={{
        width:420,
        height:400,
        backgroundColor:'#b31240',
        borderRadius:260,
        bottom:-200,
        alignItems:'center',
        gap:30,
        marginTop:20

    }}>
     <Pressable onPress={props.onPress} style={{
        backgroundColor:'white',
        width:'20%',
        padding:10,
        borderRadius:20,
        alignItems:'center',
        marginTop:40
     }}>
        <Text style={{
            fontSize:16,
            fontWeight:700,
            letterSpacing:1
        }}>{props.switchText==='Signin' ? 'Signup' : 'Signin'}</Text>
     </Pressable>

    <View style={{flexDirection:'row', alignItems:'center', gap:20}}> 
        <Text style={{
            color:'white',
            fontWeight:600,
            fontSize:16
        }}>Don't have an account?</Text>
        <Pressable onPress={switchAccount} style={{
            backgroundColor:'#fff',
            padding:5,
            borderRadius:10
        }}>
            <Text style={{fontWeight:500}}>{props.switchText}</Text>
        </Pressable>
    </View>

    </View>
  )
}