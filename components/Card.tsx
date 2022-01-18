import React from "react";
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";

interface Props {
    darkMode: boolean;
    loading: boolean;
    user: any;
    message: string
    modalVisible: boolean
}

const Card: React.FC<Props> = (props) => {
    const { darkMode, loading, user, message, modalVisible } = props;
    return (
        <>
            {(loading && !modalVisible) && (
                <View>
                    <ActivityIndicator size="large" color="#808080" />
                </View>
            )}
            {message ? (
                <Text
                    style={[
                        styles().message,
                        styles(darkMode).text
                    ]}
                >
                    {message}
                </Text>
            ) : null}


            {user && (
                <>
                    <View style={styles().profileRow}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: user.items[0].owner.profile_image }}
                        />
                        <View style={styles().profileDetails}>
                            <Text style={styles(darkMode).text}>
                                User Name: {user.items[0].owner.display_name}
                            </Text>
                            <Text style={styles(darkMode).text}>
                                Reputation: {user.items[0].owner.reputation}
                            </Text>
                            <Text style={styles(darkMode).text}>
                                Accept Rate: {user.items[0].owner.accept_rate}
                            </Text>
                        </View>
                    </View>
                </>
            )}
        </>
    );
};
const styles = (darkMode?: boolean) => StyleSheet.create({
    text: {
        backgroundColor: darkMode ? "#fff" : "#000",
        color: darkMode ? "#000" : "#fff"
    },
    message: {
        marginTop: 20,        
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
