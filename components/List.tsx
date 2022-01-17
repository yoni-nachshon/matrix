import React from 'react';
import { View, Text, Button, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';

interface Props {
    darkMode: boolean
    user?: (any | null)
    questions: any[]
    setQuestions: (questions: any[]) => void
    modalVisible: boolean
    setModalVisible: (modalVisibl: boolean) => void
    link: string
    setLink: (link: string) => void
    setLoading: (loading: boolean) => void


}
const List: React.FC<Props> = (props) => {

    const { user, darkMode, questions, setQuestions, modalVisible, setModalVisible, setLink, setLoading } = props

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

    const openModal = (link: string) => {
        setLink(link)
        setLoading(true)
        setModalVisible(!modalVisible)
    }

    return (
        <>
            {user && (
                <>
                    <View style={styles().sorting}>
                        <View style={{ margin: 5 }}>
                            <Button title="Date" onPress={() => sortByDate()} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button title="Answers" onPress={() => sortByAnswers()} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button title="Views" onPress={() => sortByViews()} />
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={[
                            styles().total,
                            styles(darkMode).text
                        ]}>
                            total questions: {user && user.items.length}
                        </Text>
                    </View>
                </>
            )}
            <FlatList
                ItemSeparatorComponent={() => {
                    return (
                        <View style={styles().Separator} />
                    );
                }}
                data={user && user.items}
                extraData={questions}
                renderItem={({ item }) => (

                    <TouchableWithoutFeedback onPress={() => openModal(item.link)}>
                        <View style={styles().item} >

                            <Text style={[styles().question, styles(darkMode).text]}>
                                question:
                            </Text>
                            <Text
                                onPress={() => openModal(item.link)}
                                style={[styles().titleText, styles(darkMode).text]}
                            >
                                {item.title}
                            </Text>
                            <View style={styles().sorting}>
                                <View style={{ margin: 5 }}>
                                    <Text style={styles(darkMode).text}>
                                        {item.answer_count > 0 ? `${item.answer_count} answer` : `no answer`}
                                    </Text>
                                </View>
                                <View style={{ margin: 5 }}>
                                    <Text style={[{ marginLeft: 10 }, styles(darkMode).text]}>
                                        {item.view_count} views
                                    </Text>
                                </View>
                                <View style={{ margin: 5 }}>
                                    <Text style={[{ marginLeft: 10 }, styles(darkMode).text]}>
                                        {new Date(item.creation_date * 1000).toUTCString().slice(0, -13)}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )}
                keyExtractor={(item) => item.question_id}
            />

        </>
    );
};
const styles = (darkMode?: boolean) => StyleSheet.create({
    text: {
        backgroundColor: darkMode ? "#fff" : "#000",
        color: darkMode ? "#000" : "#fff"
    },
    question: {
        fontSize: 16,
        fontWeight: "bold",
    },
    item: {
        padding: 10,
        marginHorizontal: 4,
    },
    total: {
        left: 10,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10
    },
    titleText: {
        marginTop: 5,
    },
    Separator: {
        height: 1,
        width: "100%",
        backgroundColor: "#CED0CE"
    },
    sorting: {
        flexDirection: "row-reverse",
        marginTop: 10
    },
});
export default List;