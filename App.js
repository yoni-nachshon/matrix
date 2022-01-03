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
  Linking,
} from "react-native";

export default function App() {

  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("1264804");
  const [user, setUser] = useState();
  const [questions, setQuestions] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const getUserId = async () => {
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
      setUser();
    }
  };

  const sortByDate = () => {
    const sorted = user.items.sort((a, b) => b.creation_date - a.creation_date);
    setQuestions([...sorted]);
  };
  const sortByAnswers = () => {
    const sorted = user.items.sort((a, b) => b.answer_count - a.answer_count);
    setQuestions([...sorted]);
  };
  const sortByViews = () => {
    const sorted = user.items.sort((a, b) => b.view_count - a.view_count);
    setQuestions([...sorted]);
  };

  return (
    <>
      <StatusBar style="#808080" />

      <View style={darkMode ? styles.light : styles.dark}>
        <View style={styles.toggle}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#6495ed" : "#f0f8ff"}
            onValueChange={() => setDarkMode(!darkMode)}
            value={darkMode}
          />
        </View>
        <View style={styles.header}>
          <Text style={darkMode ? styles.textLight : styles.textDark}>
            get Stack-Overflow posts
          </Text>

          <View style={styles.inputRow}>
            <TextInput
              style={[
                styles.input,
                darkMode ? styles.textLight : styles.textDark,
              ]}
              placeholder="user Id"
              onChangeText={(num) => setUserId(num)}
              value={userId}
            />
            <View style={styles.btn}>
              <Button title="Search" onPress={() => getUserId()} />
            </View>
          </View>
          {loading && (
            <View>
              <ActivityIndicator size="large" color="#808080" />
            </View>
          )}
          {notFound && (
            <Text style={{ textAlign: "center" }}>user not found</Text>
          )}
          {user && (
            <>
              <View style={styles.profileRow}>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: user.items[0].owner.profile_image }}
                />
                <View style={styles.profileDetails}>
                  <Text style={darkMode ? styles.textLight : styles.textDark}>
                    User Name: {user.items[0].owner.display_name}
                  </Text>
                  <Text style={darkMode ? styles.textLight : styles.textDark}>
                    Reputation: {user.items[0].owner.reputation}
                  </Text>
                  <Text style={darkMode ? styles.textLight : styles.textDark}>
                    Accept Rate: {user.items[0].owner.accept_rate}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={{marginVertical:10, marginRight:5}}>sort by</Text>
                <Button title="Date" onPress={() => sortByDate()} />
                <Button title="Answers" onPress={() => sortByAnswers()} />
                <Button title="Views" onPress={() => sortByViews()} />
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={{ left: 10, fontSize: 16, fontWeight: "bold", }}>
                  total questions: {user.items.length}
                </Text>
                <FlatList
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          height: 1,
                          width: "100%",
                          backgroundColor: "#CED0CE",
                        }}
                      />
                    );
                  }}
                  data={user.items}
                  extraData={questions}
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text
                        style={[
                          styles.question,
                          darkMode ? styles.textLight : styles.textDark,
                        ]}
                      >
                        question:
                      </Text>

                      <Text
                        onPress={() => Linking.openURL(item.link)}
                        style={[
                          styles.titleText,
                          darkMode ? styles.textLight : styles.textDark,
                        ]}
                      >
                        {item.title}
                      </Text>
                      <View style={{ flexDirection: "row", marginTop:10 }}>
                        <Text
                          style={ darkMode ? styles.textLight : styles.textDark}
                        >
                          {item.answer_count > 0
                            ? `${item.answer_count} answer`
                            : `no answer`}
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                          {item.view_count} views
                        </Text>
                        <Text style={{ marginLeft: 10 }}>
                          {new Date(item.creation_date * 1000).toUTCString().slice(0, -13)}
                        </Text>
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.question_id}
                />
              </View>
            </>
          )}
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
    flexDirection: "row-reverse",
    right: 5,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
  },
  titleText: {
    marginTop:5,
  },
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginHorizontal: 4,
  },
  inputRow: {
    flexDirection: "row",
  },
  textLight: {
    backgroundColor: "#fff",
    color: "#000",
  },
  textDark: {
    backgroundColor: "#000",
    color: "#fff",
  },
  btn: {
    justifyContent: "center",
  },
  input: {
    width: "50%",
    alignItems: "center",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  profileRow: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  profileDetails: {
    marginLeft: 15,
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "white",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
