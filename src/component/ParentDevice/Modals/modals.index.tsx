import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Menu, Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import Contents from './ModalContents/Contents';
import Settings from './ModalContents/menus';
import ModalContents from './ModalContents/ModalContents';

const Modals = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonStatus, setBStatus] = useState("");
    
    const [modalItems, setModalItems] = React.useState([
        {
            itemID: 1,
            title: "location",
            iconName: "location-sharp",
            color: "green",
            size: 30,

        },
        {
            itemID: 2,
            title: "route",
            iconName: "navigate-circle-sharp",
            color: "green",
            size: 30,

        },
        {
            itemID: 3,
            title: "add",
            iconName: "add-circle-sharp",
            color: "green",
            size: 30,

        },
        {
            itemID: 4,
            title: "surrounding",
            iconName: "mic-sharp",
            color: "green",
            size: 30,

        },
        {
            itemID: 5,
            title: "setting",
            iconName: "menu-sharp",
            color: "green",
            size: 30,

        },

    ])

    const onShow = (title: string) => {
        setBStatus(title);
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false)
    }

    const ModalNavigation = () => {
        return (
            modalItems.map(items =>
                <TouchableOpacity key={items.itemID} activeOpacity={0.7} style={styles.button} onPress={() => onShow(items.title)}>
                    <Ionicons name={items.iconName} size={items.size} color={items.color} />
                </TouchableOpacity>
            )
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {
                    ModalNavigation()
                }
            </View>
            <SafeAreaView>
                <Portal>
                    {
                        buttonStatus === "location" ? (
                            <Modal contentContainerStyle={
                                {
                                    width: "100%",
                                    height: "50%"
                                }
                            }
                                onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <ScrollView>
                                    <Contents />
                                </ScrollView>
                            </Modal>
                        ) : buttonStatus === "route" ? (
                            <Modal onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <Text style={styles.text}>Route</Text>
                            </Modal>
                        ) : buttonStatus === "add" ? (
                            <Modal contentContainerStyle={
                                {
                                    width: "100%",
                                    height: "50%"
                                }
                            } onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <ScrollView>
                                    <ModalContents />
                                </ScrollView>
                            </Modal>
                        ) : buttonStatus === "surrounding" ? (
                            <Modal onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <Text style={styles.text}>Surrounding</Text>
                            </Modal>
                        ) : buttonStatus === "setting" ? (
                            <Modal onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <ScrollView>
                                    <Settings />
                                </ScrollView>
                            </Modal>
                        ) : null
                    }
                </Portal>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f2f2f2',
        padding: 10,
        alignContent: "center",
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    button: {
        padding: 10,
    },
    text: {
        textAlign: "center",
        color: "black"
    },
    modalStyle: {
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "white",
        position: "absolute",
        width: "100%",
        height: "50%",
        bottom: 0,
        top: "auto"
    }
})

export default Modals;