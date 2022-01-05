import React from 'react';
import {View, Text,TextInput,Button, StyleSheet} from 'react-native';

interface Props {
    darkMode:boolean 
    userId:string
    setUserId: (userId: string) => void 
    getUser: () => void
}

const Search: React.FC<Props> = (props) => {
  return (
    <View style={styles.inputRow}>
            <TextInput
              style={[
               {borderColor: props.darkMode ? '#000' : '#fff' },
                styles.input,
                props.darkMode ? styles.textLight : styles.textDark,
                
              ]}
              placeholder="Search user Id"
              onChangeText={(num) => props.setUserId(num)}
              value={props.userId}
            />
            <View style={styles.btn}>
              <Button title="Search" onPress={() => props.getUser()} />
            </View>
          </View>
  );
};
const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row-reverse",
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
});
export default Search;