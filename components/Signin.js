import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icon set from @expo/vector-icons
import loginStyles from "./LoginStyles";
import LoginBtns from "./LoginBtns";
import { auth as firebaseAuth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc,getDoc,setDoc } from "firebase/firestore";

export default function Signin({ navigation }) {
  const auth = firebaseAuth;

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const SigninHandler = async () => {
    setLoading(true);
    if (email === "" || pass === "") {
      setError("Invalid Credentials");
      setLoading(false);
      return;
    } else {
      try {

        // checking firebase authentication
        const response = await signInWithEmailAndPassword(auth, email, pass);
        console.log(response)

        //getting user name from firestore
        const userDocRef = doc(db, 'user', response.user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userName = userData.name; // 'name' is the field containing the user's name
          console.log(userName)
          navigation.navigate("First", {userName});// Passing userName as a route parameter
        }
        setLoading(false);
        setEmail("");
        setPass("");
      } catch (error) {
        setError("Invalid credentials");
        setEmail("");
        setPass("");
        setLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={loginStyles.SigninView}>
        <View style={loginStyles.loginHeader}>
          <Text style={{ color: "white", fontSize: 18, fontWeight: "600" }}>
            Welcome to the app
          </Text>
        </View>

        <View style={loginStyles.InputFields}>
          <Text
            style={{
              color: "#b31240",
              fontSize: 30,
              fontWeight: "700",
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            Signin
          </Text>

          <TextInput
            placeholder="Your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            onFocus={() => setError("")}
            style={loginStyles.inputs}
          />

          <View style={loginStyles.passwordInput}>
            <TextInput
              placeholder="Your password"
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              value={pass}
              onChangeText={(text) => setPass(text)}
              onFocus={() => setError("")}
              style={loginStyles.inputs}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={loginStyles.eyeIcon}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="black"
              />
            </TouchableOpacity>
          </View>

          {error && (
            <View style={loginStyles.errorView}>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                {error}
              </Text>
            </View>
          )}
        </View>

        {loading && <ActivityIndicator style={{zIndex:1000}} color={"#000"} size={40} />}
        <LoginBtns onPress={SigninHandler} switchText="Signup" />
      </View>
    </KeyboardAvoidingView>
  );
}
