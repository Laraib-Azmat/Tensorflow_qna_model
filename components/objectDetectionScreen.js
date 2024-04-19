import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, Platform } from "react-native";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-react-native";
import * as ImagePicker from "expo-image-picker";

const ImageClassifier = () => {
  const [predictions, setPredictions] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
      await tf.ready(); // Initialize TensorFlow.js
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
        aspect: [4, 3],
      });

      if (!result.cancelled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const classifyImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    try {
      const model = await cocoSsd.load();
      console.log("Model loaded successfully");

      const response = await fetch(selectedImage);
      const blob = await response.blob();

      const fileReader = new FileReader();
      fileReader.onloadend = async () => {
        const imageTensor = tf.node.decodeImage(new Uint8Array(fileReader.result), 3);
        
        if (imageTensor) {
          const predictions = await model.detect(imageTensor);
          setPredictions(predictions);
          console.log("Predictions:", predictions);
        } else {
          console.error("Error decoding image to tensor.");
        }
      };

      fileReader.readAsArrayBuffer(blob);
    } catch (error) {
      console.error("Error classifying image:", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 300, height: 300, marginBottom: 20 }}
        />
      )}
      <Button title="Select Image" onPress={selectImage} />
      <Button
        title="Classify Image"
        onPress={classifyImage}
        disabled={!selectedImage}
      />
      {predictions.map((prediction, index) => (
        <Text key={index}>
          {prediction.class}: {prediction.score.toFixed(3)}
        </Text>
      ))}
    </View>
  );
};

export default ImageClassifier;
