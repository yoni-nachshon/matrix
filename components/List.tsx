import React from 'react';
import { View, Text, Button, FlatList, Modal, StyleSheet } from 'react-native';
import WebView from "react-native-webview";

interface Props {
    darkMode: boolean
    user?: (any | null)
    questions: any[]
    setQuestions: (questions) => void
    modalVisible: boolean
    setModalVisible: (modalVisibl) => void
    link: string
    setLink: (link) => void

}
const List: React.FC<Props> = (props) => {

    const { user, darkMode, questions, setQuestions, modalVisible, setModalVisible, link, setLink } = props

    const sortByDate = () => {
        const sorted = user.items.sort((a: { creation_date: number; }, b: { creation_date: number; }) => b.creation_date - a.creation_date);
        setQuestions([...sorted]);
    };
    const sortByAnswers = () => {
        const sorted = user.items.sort((a: { answer_count: number; }, b: { answer_count: number; }) => b.answer_count - a.answer_count);
        setQuestions([...sorted]);
    };
    const sortByViews = () => {
        const sorted = user.items.sort((a: { view_count: number; }, b: { view_count: number; }) => b.view_count - a.view_count);
        setQuestions([...sorted]);
    };

    const openModal = link => {
        setLink(link)
        setModalVisible(!modalVisible)
    }

    return (
        <>
            <View style={{ flexDirection: 'row-reverse', marginTop: 10 }}>
                <Text style={{ marginVertical: 10, marginRight: 5 }}>
                    sort by
                </Text>
                
                <Button title="Date" onPress={() => sortByDate()} />
                <Button title="Answers" onPress={() => sortByAnswers()} />
                <Button title="Views" onPress={() => sortByViews()} />
            </View>
            <View style={{ marginTop: 10 }}>
                <Text style={{ left: 10, fontSize: 16, fontWeight: "bold" }}>
                    total questions: {user && user.items.length}
                </Text>
                <FlatList
                    ItemSeparatorComponent={() => {
                        return (
                            <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE" }} />
                        );
                    }}
                    data={user && user.items}
                    extraData={questions}
                    renderItem={({ item }) => (

                        <View style={styles.item}>
                            <Text style={[styles.question, darkMode ? styles.textLight : styles.textDark]}>
                                question:
                            </Text>
                            <Text
                                onPress={() => openModal(item.link)}
                                style={[styles.titleText, darkMode ? styles.textLight : styles.textDark]}
                            >
                                {item.title}
                            </Text>
                            <View
                                style={{ flexDirection: "row-reverse", marginTop: 10 }}
                            >
                                <Text style={darkMode ? styles.textLight : styles.textDark}>
                                    {item.answer_count > 0 ? `${item.answer_count} answer` : `no answer`}
                                </Text>
                                <Text style={{ marginLeft: 10 }}>
                                    {item.view_count} views
                                </Text>
                                <Text style={{ marginLeft: 10 }}>
                                    {new Date(item.creation_date * 1000).toUTCString().slice(0, -13)}
                                </Text>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item) => item.question_id}
                />
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    question: {
        fontSize: 16,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        marginHorizontal: 4,
    },
    textLight: {
        backgroundColor: "#fff",
        color: "#000",
    },
    textDark: {
        backgroundColor: "#000",
        color: "#fff",
    },
    titleText: {
        marginTop: 5,
    },
});
export default List;