import React, { useEffect } from 'react';
import { View, Text, Button, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';

interface Props {
    darkMode: boolean
    user?: any | null
    questions: any[]
    setQuestions: (questions: any[]) => void
    modalVisible: boolean
    setModalVisible: (modalVisibl: boolean) => void
    link: string
    setLink: (link: string) => void
    setLoading: (loading: boolean) => void
}
const List: React.FC<Props> = (props) => {

    const { user, darkMode, setQuestions, modalVisible, setModalVisible, setLink, setLoading } = props

    useEffect(() => {
        if (!modalVisible) {
            setLoading(false)
        }
    }, [modalVisible])

    const sortHandler = (sortBy: string) => {
        const sorted = user.items.sort((a: any, b: any) => b[sortBy] - a[sortBy]);
        setQuestions([...sorted]);
    };

    const openModal = (link: string) => {
        setLink(link)
        setModalVisible(!modalVisible)
        setLoading(true)
    }

    return (
        <>
            {user && (
                <>
                    <View style={styles().sorting}>
                        <View style={{ margin: 5 }}>
                            <Button title="Date" onPress={() => sortHandler("creation_date")} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button title="Answers" onPress={() => sortHandler("answer_count")} />
                        </View>
                        <View style={{ margin: 5 }}>
                            <Button title="Views" onPress={() => sortHandler("view_count")} />
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
                ItemSeparatorComponent={() => <View style={styles().Separator} />}
                data={user && user.items}
                renderItem={({ item }) => (
                    <TouchableWithoutFeedback onPress={() => openModal(item.link)}>
                        <View style={styles().item} >
                            <Text style={[styles().question, styles(darkMode).text]}>
                                question:
                            </Text>
                            <Text
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