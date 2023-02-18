import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { UserContext } from '../../../StateManagement/userStore';
import Clipboard from '@react-native-clipboard/clipboard';


const GenerateCode = observer(() => {

  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const { storePairingCode } = React.useContext(UserContext);

  const handleCopyToClipboard = (code: string) => {
    Clipboard.setString(code);
    Alert.alert('Code copied to clipboard!', `Here is Code ${code}`);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>Enter this code at child's device</Text>
        <TouchableOpacity onPress={() => handleCopyToClipboard(storePairingCode)}>
          <Text style={styles.code}>{storePairingCode}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  code: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});

export default GenerateCode;