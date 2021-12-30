import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, Switch, StyleSheet, Text, View, Button, ActivityIndicator, Image, FlatList } from 'react-native';

export default function App() {

  const [darkMode, setDarkMode] = useState(true)
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(1264804);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 1000)
  }, []);

  const getUserId = async () => {
    const res = await fetch(`https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`)
    const data = await res.json();
    console.log(data.items);
    setUser(data);

  }


  return loading ? (
    <View style={styles.light}>
      <ActivityIndicator size="large" color="#808080" />
    </View>
  ) : (
    <View style={darkMode ? styles.light : styles.dark}>
      <View style={styles.toggle}>
        <Switch
          onValueChange={() => setDarkMode(!darkMode)}
          value={darkMode}
        />
      </View>
      <View style={styles.container}>
        <View>
          <Text style={darkMode ? styles.textLight : styles.textDark}>
            get Stack-Overflow posts
          </Text>
        </View>
        <View>

          <TextInput
            style={[styles.input, darkMode ? styles.textLight : styles.textDark]}
            placeholder="Search user Id"
            onChangeText={num => setUserId(num)}
            value={userId}
          />
          <Button title="Search" onPress={() => getUserId()}></Button>
        </View>
        {user && (

          <View style={styles.profileRow}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: user.items[0].owner.profile_image }}
            />
            <View style={styles.profileDetails}>
              <Text style={darkMode ? styles.textLight : styles.textDark}>User Name: {user.items[0].owner.display_name}</Text>
              <Text style={darkMode ? styles.textLight : styles.textDark}>Reputation: {user.items[0].owner.reputation}</Text>
              <Text style={darkMode ? styles.textLight : styles.textDark}>Accept Rate: {user.items[0].owner.accept_rate}</Text>
            </View>
          </View>

        )}


        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'

  },
  toggle: {
    margin: 20,
    alignItems: 'end'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {

  },
  dark: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center'

  },
  textLight: {
    backgroundColor: '#fff',
    color: '#000',
    flex: 1
  },
  textDark: {
    backgroundColor: '#000',
    color: '#fff',
    flex: 1
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  profileRow: {
    flexDirection: 'row',
    marginTop: 20,

  },
  profileDetails: {
    marginLeft: 15,
    justifyContent: 'center'
  }

});
