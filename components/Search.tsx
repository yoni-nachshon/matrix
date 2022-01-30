import React from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  ScrollView
} from "react-native";

interface Props {
  darkMode: boolean;
  user?: any | null;
  userId: string;
  setUserId: (userId: string) => void;
  getUser: () => void;
}

const Search: React.FC<Props> = (props) => {

  const { darkMode, user, userId, setUserId, getUser } = props;

  const onPress = () => {
    if (user === null || user.items[0].owner.user_id !== +userId) {
      getUser();
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles().inputRow}>
      <ScrollView>
        <TextInput
          style={[styles(darkMode).input, styles(darkMode).text]}
          placeholder={"Search user Id"}
          placeholderTextColor={darkMode ? "gray" : "white"}
          onChangeText={(num) => setUserId(num)}
          value={userId}
          keyboardType="numeric"
        />
      </ScrollView>
      <View style={styles().btn}>
        <Button
          title="Search"
          onPress={onPress}
          disabled={user && user.items[0].owner.user_id === +userId ? true : false}
        />
      </View>
    </View>
  );
};
const styles = (darkMode?: boolean) => StyleSheet.create({
  text: {
    backgroundColor: darkMode ? "#fff" : "#000",
    color: darkMode ? "#000" : "#fff",
  },
  inputRow: {
    flexDirection: "row-reverse",
    marginTop: 20,
    marginRight:70
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
    borderColor: darkMode ? "#000" : "#fff",
    width: "70%",
    alignItems: "center",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Search;
