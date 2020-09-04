import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Platform } from 'react-native';

import * as Font from 'expo-font'

export default function App() {

  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [imc, setIMC] = useState<number>(0)
  const [classification, setClassification] = useState<string>()

  const [loaded, error] = Font.useFonts({
    Roboto: require('./fonts/Roboto-Regular.ttf')
  })

  function calcIMC() {

    if (height === 0 || weight === 0) {
      alert('Preencha os campos corretamente')
      return
    }
    const newImc = weight / (height ** 2)
    setIMC(newImc)

    if (newImc < 16) {
      setClassification('Subpeso Severo')
    } else if (newImc < 20) {
      setClassification('Subpeso')
    } else if (newImc < 25) {
      setClassification('Normal')
    } else if (newImc < 30) {
      setClassification('Sobrepeso')
    } else if (newImc < 40) {
      setClassification('Obeso')
    } else {
      setClassification('Obesidade mórbida')
    }
  }

  return (
    <KeyboardAvoidingView style={styles.appContainer}
      behavior={Platform.OS == "ios" ? "padding" : "position"}
    >

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"}>
        <View style={styles.imcContainer}>
          <Text style={styles.textView}>IMC</Text>
          <Text style={styles.textView}>{imc.toFixed(1)}</Text>
        </View>

        <View style={styles.classContainer}>
          <Text style={styles.textView}>Classificação</Text>
          <Text style={styles.textView}>{classification}</Text>
        </View>
      </KeyboardAvoidingView>

      <KeyboardAvoidingView style={styles.inputContainer}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Text style={styles.inputLabel}>Peso</Text>
        <TextInput
          style={styles.inputView}
          onChangeText={(text) => setWeight(Number(text.replace(',', '.')))}
          keyboardType='decimal-pad'
        ></TextInput>

        <Text style={styles.inputLabel}>Altura</Text>
        <TextInput
          style={styles.inputView}
          onChangeText={(text) => setHeight(Number(text.replace(',', '.')))}
          keyboardType='decimal-pad'
        ></TextInput>


      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          title='Calcular'
          onPress={calcIMC}
          color='green'
          accessibilityLabel="Calcular IMC"

        >
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  resultBox: {
    backgroundColor: '#1e824c',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 250,
    fontFamily: 'Roboto',
    marginTop: 15,
    borderRadius: 10,
  },
  textView: {
    fontSize: 30,
    color: '#eee',
  },
  inputView: {
    borderWidth: 1,
    borderRadius: 5,
    width: 250,
    fontSize: 22,
    textAlign: 'center'
  },
  inputLabel: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto'
  },
  buttonContainer: {
    marginTop: 15,
    width: 300,
    bottom: 0
  },
  imcContainer: {
    width: 300,
    height: 130,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2abb9b',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  classContainer: {
    width: 300,
    height: 130,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a085',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    marginBottom: 20
  }
});
