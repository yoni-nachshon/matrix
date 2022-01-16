import React from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";

interface Props {
    darkMode: boolean;
    loading: boolean;
    // notFound: boolean;
    user: any;
    message: string


}

const Card: React.FC<Props> = (props) => {
    const { darkMode, loading, user, message } = props;
    return (
        <>
            {loading && (
                <View>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
            {message ? (
                <Text
                    style={[
                        { textAlign: "center", marginTop: 1 },
                        darkMode ? styles.textLight : styles.textDark,
                    ]}
                >
                    {message}
                </Text>
            ) : null}


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
                </>
            )}
        </>
    );
};
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
