import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  TextInput,
  Switch,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
} from "react-native";

import Search from "./components/Search";
import Card from "./components/Card";
import List from "./components/List";
import Answers from "./components/Answers";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("1264804");
  const [user, setUser] = useState<any>({});
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
      setUser({});
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
        <View style={styles.header}>
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
    marginTop: 40,
  },
  dark: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    marginTop: 40,
  },
  toggle: {
    flexDirection: "row",
    marginRight: 5,
  },
  header: {
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