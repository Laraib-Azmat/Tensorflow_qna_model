//importing dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import * as qna from '@tensorflow-models/qna';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow/tfjs-react-native';
import { QnAStyle } from './ScreenStyles';
import { MaterialIcons } from '@expo/vector-icons';

export default function QnA() {

  //All the states
  const [model, setModel] = useState(null);
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQnAModel = async () => {
      try {
        //loading the tensorflow model when enter the screen
        await tf.ready();
        const qnaModel = await qna.load();
        setModel(qnaModel);
      } catch (error) {
        console.error('Failed to load QnA model:', error);
      }
    };

    loadQnAModel();

    //cleanup function
    return () => {
      if (model) {
        model.dispose().then(() => {
          console.log('QnA model disposed');
        }).catch((error) => {
          console.error('Error disposing QnA model:', error);
        });
      }
    };
  }, []);

  // function to handle get answer pressable
  const handleQuestionSubmit = async () => {
    setLoading(true);
    // if inputs are empty
    if (question.trim() === '' || context.trim() === '') {
      alert('Please enter a valid question and context.');
      setLoading(false);
      return;
    }

    try {
      if (model) {
        const result = await model.findAnswers(question, context);
        // storing only secific answer and its probability
        const formattedAnswers = result.slice(0, 4).map(answer => ({
          text: answer.text,
          score: Number(answer.score.toFixed(2)) // Fix score to 2 decimal places
        }));
        setAnswers(formattedAnswers);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error finding answers:', error);
      setAnswers([]);
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={QnAStyle.qnaView}>
      <Text style={QnAStyle.title}>Question and Answer Tensorflow model</Text>
      <View style={QnAStyle.subtitle}>
        <Text >No need to study whole paragraphs</Text>
        <MaterialIcons name="emoji-emotions" size={30} color="#b31240" />
      </View>
      <Text style={QnAStyle.description}>Write your essay here and find answers to your questions</Text>
      <Text style={QnAStyle.qnaText}>Ask a question:</Text>
      <TextInput
        style={QnAStyle.inputs}
        value={question}
        onChangeText={(text) => setQuestion(text)}
      />
      <Text style={QnAStyle.qnaText}>Context:</Text>
      <TextInput
        style={[QnAStyle.inputs, { height: 100 }]}
        value={context}
        onChangeText={(text) => setContext(text)}
        multiline
        numberOfLines={5}
      />
      <Pressable style={QnAStyle.qnaBtn} onPress={handleQuestionSubmit}>
       {loading ? <ActivityIndicator color={'white'}  /> :  <Text style={{ fontWeight: '600', color: '#fff', fontSize: 16 }}>Get Answer</Text>}
      </Pressable>

        {/* printing the answer */}
      
      {answers.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={QnAStyle.answerTitle}>Answers:</Text>
          {answers.map((answer, index) => (
            <View key={index} style={{ marginVertical: 10 }}>
              <Text style={QnAStyle.answerText}>{answer.text}</Text>
              <Text style={QnAStyle.answerScore}>Score: {answer.score}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
