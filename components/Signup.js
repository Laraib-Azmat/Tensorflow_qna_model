import React, { useState } from "react";
import {
  View,Text,TextInput,KeyboardAvoidingView,TouchableOpacity, ActivityIndicator,} from "react-native";
import { Feather } from "@expo/vector-icons"; 
import loginStyles from "./LoginStyles";
import LoginBtns from "./LoginBtns";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth as firebaseAuth, db } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc,  } from "firebase/firestore";

export default function Signup() {
  const navigation = useNavigation();

  const auth = firebaseAuth;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [Cpass, setCPass] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const [loading, setLoading] = useState(false);

  const SignupHandler = async () => {
    setLoading(true);
    // checking conditions for inputs
    if (email === "" || pass === "" || name === "" || Cpass === "") {
      setError("Inputs can't null");
      setLoading(false);
      return;
    }
    if (pass !== Cpass) {
      setError("Password does't match!");
      setCPass("");
      setLoading(false);
      return;
    }
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[A-Z]).{8,}$/;
    const isValidPassword = passwordRegex.test(pass);

    if (!isValidPassword) {
      setError(
        "Password must be of 8 characters,with alteast one special character and on capital letter"
      );
      setPass("");
      setLoading(false);
      return;
    } else {
      console.log("hii");

      try {
        //creating user in firebase database 
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          pass
        );
        console.log(response);

        // storing the name of user in firestore
        await setDoc(doc(db, "user",auth.currentUser.uid ), {
          name
        });

        navigation.navigate("First", {userName:name});
        setEmail("");
        setPass("");
        setName("");
        setCPass("");
        setLoading(false);
      } catch (error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setError("email already exist");
          setEmail("");
          setLoading(false);
          return;
        }
        if (error.message === "Firebase: Error (auth/invalid-email).") {
          setError("email not valid");
          setEmail("");
          setLoading(false);
          return;
        }
        setError(error.message);
        console.log(error);
        setEmail("");
        setPass("");
        setName("");
        setCPass("");
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
          {error && (
            <View style={loginStyles.errorView}>
              <Text style={{ color: "#fff", fontSize: 14, fontWeight: "600" }}>
                {error}
              </Text>
            </View>
          )}
          <Text
            style={{
              color: "#b31240",
              fontSize: 30,
              fontWeight: "700",
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            Signup
          </Text>

          <TextInput
            placeholder="Your name"
            value={name}
            onChangeText={(text) => setName(text)}
            onFocus={() => setError("")}
            style={loginStyles.inputs}
          />

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

          <View style={loginStyles.passwordInput}>
            <TextInput
              placeholder="Confirm password"
              secureTextEntry={!showPassword} 
              value={Cpass}
              onChangeText={(text) => setCPass(text)}
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
        </View>

        {loading && <ActivityIndicator style={{zIndex:1000}} color={"#000"} size={40} />}

        <LoginBtns onPress={SignupHandler} switchText="Signin" />
      </View>
    </KeyboardAvoidingView>
  );
}
