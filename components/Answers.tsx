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
            {loading && <ActivityIndicator size="large" color="#808080" />}
            <Modal animationType="slide" visible={modalVisible}>
                <WebView
                    source={{ uri: link }}
                    onLoad={() => setLoading(false)}
                    style={{ marginTop: 20 }} />
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

});
export default Answers;