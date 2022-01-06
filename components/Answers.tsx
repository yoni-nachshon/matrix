import React from 'react';
import { View, Text, Button, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import WebView from "react-native-webview";

interface Props {
    loading: boolean
    setLoading: (loading: boolean) => void
    link: string
    modalVisible: boolean
    setModalVisible: (modalVisible: boolean) => void

}

const Answers: React.FC<Props> = (props) => {

    const { link, loading, setLoading, modalVisible, setModalVisible } = props

    return (
        <>
            <Modal animationType="slide" visible={modalVisible} >
                {loading && <ActivityIndicator size="large" color="#808080" style={styles.loading} />}
                <WebView
                    source={{ uri: link }}
                    onLoad={() => setLoading(false)}
                />
                <Button
                    title="go back"
                    onPress={() => setModalVisible(!modalVisible)}
                />
            </Modal>
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
    loading: {
        justifyContent: 'center',
    }

});
export default Answers;