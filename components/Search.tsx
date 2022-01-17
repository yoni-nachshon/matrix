import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

interface Props {
  darkMode: boolean
  user?: (any | null)
  userId: string
  setUserId: (userId: string) => void
  getUser: () => void
}

const Search: React.FC<Props> = (props) => {

  const { darkMode, user, userId, setUserId, getUser } = props

  const onPress = () => {
    if (user === null || user.items[0].owner.user_id !== +userId) {
      getUser()
      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles().inputRow}>
      <TextInput
        style={[
          styles(darkMode).input,
          styles(darkMode).text
        ]}
        placeholder="Search user Id"
        onChangeText={(num) => setUserId(num)}
        value={userId}
        keyboardType='numeric'
      />
      <View style={styles().btn}  >
        <Button title="Search" onPress={onPress} />
      </View>
    </View>
  );
};
const styles = (darkMode?: boolean) => StyleSheet.create({
  text: {
    backgroundColor: darkMode ? "#fff" : "#000",
    color: darkMode ? "#000" : "#fff"
  },
  inputRow: {
    flexDirection: "row-reverse",
    marginTop: 20
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
    borderColor: darkMode ? '#000' : '#fff',
    width: "50%",
    alignItems: "center",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default Search;