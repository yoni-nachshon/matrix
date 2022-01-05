import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';

interface Props {
    darkMode: boolean
    loading: boolean
    notFound: boolean
    user: any
    userId: string
}

const Card: React.FC<Props> = (props) => {
    return (
        <>
        {props.loading && (
                <View>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
      {(props.notFound && !props.userId) && (
            <Text style={[{ textAlign: "center" }, props.darkMode ? styles.textLight : styles.textDark]}>user not found</Text>
        )}
    
        {props.user && (
            <>
                <View style={styles.profileRow}>
                    <Image
                        style={{ width: 100, height: 100 }}
                        source={{ uri: props.user.items[0].owner.profile_image }}
                    />
                    <View style={styles.profileDetails}>
                        <Text style={props.darkMode ? styles.textLight : styles.textDark}>
                            User Name: {props.user.items[0].owner.display_name}
                        </Text>
                        <Text style={props.darkMode ? styles.textLight : styles.textDark}>
                            Reputation: {props.user.items[0].owner.reputation}
                        </Text>
                        <Text style={props.darkMode ? styles.textLight : styles.textDark}>
                            Accept Rate: {props.user.items[0].owner.accept_rate}
                        </Text>
                    </View>
                </View>
            </>
        )}
    </>
  )
}
const styles = StyleSheet.create({
    textLight: {
        backgroundColor: "#fff",
        color: "#000",
      },
      textDark: {
        backgroundColor: "#000",
        color: "#fff",
      },
      profileRow: {
        flexDirection: "row-reverse",
        marginTop: 20,
        justifyContent: "space-between",
      },
      profileDetails: {
        margin: 10,
        justifyContent: "center",
      },
});
export default Card;