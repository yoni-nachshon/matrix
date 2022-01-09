import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Switch, StyleSheet, Text, View } from "react-native";

import Search from "./components/Search";
import Card from "./components/Card";
import List from "./components/List";
import Answers from "./components/Answers";

const App = () => {

  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [userId, setUserId] = useState<string>('');
  const [user, setUser] = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [link, setLink] = useState<string>('')

  const getUserById = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`
      );
      const data = await res.json();
      if (data.items[0].owner) {
        console.log(data.items);
        setUser(data);
      }
      setLoading(false);
      setNotFound(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      setNotFound(true);
      setUser(null);
    }
  };



  return (
    <>
      <StatusBar style={darkMode ? "dark" : "light"} />
      <View style={darkMode ? styles.light : styles.dark}>
        <View style={styles.toggle}>

          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#6495ed" : "#f0f8ff"}
            onValueChange={() => setDarkMode(!darkMode)}
            value={darkMode}
          />

        </View>

        <Answers
          loading={loading}
          setLoading={setLoading}
          link={link}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />

        <View style={styles.container}>
          <Text style={darkMode ? styles.textLight : styles.textDark}>
            get Stack-Overflow posts
          </Text>

          <Search
            darkMode={darkMode}
            userId={userId}
            setUserId={setUserId}
            getUser={getUserById}
          />

          <Card
            darkMode={darkMode}
            loading={loading}
            notFound={notFound}
            user={user}
          />

          <List
            darkMode={darkMode}
            setLoading={setLoading}
            user={user}
            questions={questions}
            setQuestions={setQuestions}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            link={link}
            setLink={setLink}
          />

        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  light: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",   
  },
  dark: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  toggle: {
    flexDirection: "row",
    marginTop:30,
    marginRight: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  textLight: {
    backgroundColor: "#fff",
    color: "#000",
  },
  textDark: {
    backgroundColor: "#000",
    color: "#fff",
  },
});
export default App;
