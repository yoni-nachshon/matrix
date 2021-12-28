import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Switch, StyleSheet, Text, View, Button, ActivityIndicator, Image } from 'react-native';
import { data } from './data';

export default function App() {

  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 1000)
  }, []);

  const getUserName = async () => {
    const res = await fetch(`https://api.github.com/users/${userName}`)
    const data = await res.json();
    console.log(data);
    setUser(data);
  }


  return loading ? (
    <View style={styles.light}>
      <ActivityIndicator size="large" color="#808080" />
    </View>
  ) : (
    <View style={darkMode ? styles.light : styles.dark}>
      <Switch
        onValueChange={() => setDarkMode(!darkMode)}
        value={darkMode}
      />
      <View>
        <Text style={darkMode ? styles.textLight : styles.textDark}>
          get Stack-Overflow posts
        </Text>
      </View>
      <View>

        <TextInput
          style={[styles.input, darkMode ? styles.textLight : styles.textDark]}
          placeholder="Search user Name"
          onChangeText={text => setUserName(text)}
          value={userName}
        />
        <Button title="Search" onPress={() => getUserName()}></Button>
      </View>
      {user && (

        <View>
          <Text>{user.name}</Text>
          <Text>{user.location}</Text>
          <Image
            style={{ width: 150, height: 150 }}
            source={{ uri: user.avatar_url }}
          />
        </View>
      )}


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  dark: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',

  },
  textLight: {
    backgroundColor: '#fff',
    color: '#000'

  },
  textDark: {
    backgroundColor: '#000',
    color: '#fff'

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },


});
