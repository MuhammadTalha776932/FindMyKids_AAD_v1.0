import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsPage from './ModalsContainer/SettingsPage';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import axios from 'axios';


const BottomModals = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonStatus, setBStatus] = useState("");
    const [coords,setCoords] = useState({})

    const onShow = (title: string) => {
        setBStatus(title);
        setModalVisible(true);
    }

    const onClose = () => {
        setModalVisible(false)
    }

    const handleNotification = async () => {
            await axios.post('https://findmykids.cyclic.app/notifications', {
                title: "Your Child is in Danger",
                body: `See location on maps`,
                topic: "SOS",
            },
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                },
            ).catch(error => console.error(error));
    }

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ ...styles.button, backgroundColor: "green", width: "45%", borderRadius: 25 }}
                    onPress={() => handleNotification()}>
                    <Text style={{ textAlign: "center", color: "white" }}>SOS</Text>
                    {/* <Ionicons name='navigate-circle-sharp' size={30} color={"green"} /> */}
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => onShow("Setting")}>
                    <Ionicons name='settings-outline' size={30} color={"green"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => onShow("Add")}>
                    <Ionicons name='person-add-outline' size={30} color={"green"} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => onShow("Chats")}>
                    <Ionicons name='chatbubble-ellipses-outline' size={30} color={"green"} />
                </TouchableOpacity>
            </View>
            <SafeAreaView>
                <Portal>
                    {
                        buttonStatus === "Setting" ? (
                            <Modal contentContainerStyle={{
                                flex: 1,
                                flexDirection: "column",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "gray",
                                borderTopLeftRadius: 12.5,
                                borderTopRightRadius: 12.5,
                            }} onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}
                                children={
                                    <SettingsPage />
                                }
                            />


                        ) : buttonStatus === "Add" ? (
                            <Modal onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <Text style={styles.text}>Add Parent</Text>
                            </Modal>
                        ) : buttonStatus === "Chats" ? (
                            <Modal onDismiss={onClose} style={styles.modalStyle} visible={modalVisible}>
                                <Text style={styles.text}>Surrounding</Text>
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

export default BottomModals;