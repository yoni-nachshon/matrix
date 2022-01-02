import React, { useState, useEffect } from "react";
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
  Pressable,
  Modal,
} from "react-native";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("1264804");
  const [user, setUser] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {}, []);

  const getUserId = async () => {
    setLoading(true);
    const res = await fetch(
      `https://api.stackexchange.com/2.3/users/${userId}/questions?order=desc&sort=activity&site=stackoverflow`
    );
    const data = await res.json();
    console.log(data);
    setUser(data);
    setLoading(false);
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
              <View>
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
                  renderItem={({ item }) => (
                    <View style={styles.item}>
                      <Text
                        onPress={() => setModalVisible(!modalVisible)}
                        style={[
                          styles.title,
                          darkMode ? styles.textLight : styles.textDark,
                        ]}
                      >
                        {item.title}
                      </Text>
                    </View>
                  )}
                  keyExtractor={(item) => item.question_id}
                />
                <View style={styles.centeredView}>
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Text style={styles.modalText}></Text>
                        <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}
                        >
                          <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                      </View>
                    </View>
                  </Modal>
                </View>
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
