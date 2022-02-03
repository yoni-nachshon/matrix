import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Keyboard,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

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
    <View style={styles().search}>
      <ScrollView>
        <TextInput
          autoFocus
          style={[styles(darkMode).input, styles(darkMode).text]}
          placeholder={"Search user Id"}
          placeholderTextColor={darkMode ? "gray" : "white"}
          onChangeText={(value) => setUserId(value)}
          value={userId}
          keyboardType="numeric"
          onSubmitEditing={onPress}
        />
        {userId.length ?
          <AntDesign
            style={styles().icon}
            name="close"
            size={20}
            color={darkMode ? "black" : "white"}
            onPress={() => setUserId("")}
          /> : null
        }
  </ScrollView>
    </View>
  );
};
const styles = (darkMode?: boolean) =>
  StyleSheet.create({
    text: {
      backgroundColor: darkMode ? "#fff" : "#000",
      color: darkMode ? "#000" : "#fff",
    },
    search: {
      justifyContent: 'center',
      width: 240,
      height: 40,
      marginTop: 30,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: darkMode ? "#000" : "#fff",
      height: 40,
      fontSize:16,
    },
    icon: {
      position: 'absolute',
      top: 10,

    },
  });
export default Search;
