import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Switch, StyleSheet, Text, View } from "react-native";

import Search from "./components/Search";
import Card from "./components/Card";
import List from "./components/List";
import Answers from "./components/Answers";

const App = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (userId === "") {
      setUser(null);
      setQuestions([]);
    }
    setMessage("");
  }, [userId]);

  const getUserById = async () => {
    try {
      if (userId === "") {
        setLoading(false);
        setMessage("Please enter a valid id");
        return;
      }
      setUser(null);
      setQuestions([]);
      setMessage("");
      setLoading(true);
      const res = await fetch(
        `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`
      );
      const data = await res.json();
      if (data.items[0].owner) {
        console.log(data.items);
        setUser(data);
      }
      setLoading(false);
      setMessage("");
    } catch (error) {
      setLoading(false);
      console.log(error);
      setMessage("user not found");
      setUser(null);
    }
  };

  return (
    <>
      <StatusBar style={darkMode ? "dark" : "light"} />
      <View style={styles(darkMode).app}>
        <View style={styles().toggle}>
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

        <View style={styles().container}>
          <Text style={styles(darkMode).text}>Stack Overflow App</Text>

          <Search
            darkMode={darkMode}
            user={user}
            userId={userId}
            setUserId={setUserId}
            getUser={getUserById}
          />

          <Card
            darkMode={darkMode}
            loading={loading}
            user={user}
            message={message}
            modalVisible={modalVisible}
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
};

const styles = (darkMode?: boolean) => StyleSheet.create({
    app: {
      flex: 1,
      backgroundColor: darkMode ? "#fff" : "#000",
      justifyContent: "center",
    },
    toggle: {
      flexDirection: "row",
      marginTop: 30,
    },
    container: {
      flex: 1,
      alignItems: "center",
      marginTop: 20,
    },
    text: {
      backgroundColor: darkMode ? "#fff" : "#000",
      color: darkMode ? "#000" : "#fff",
    },
  });
export default App;
