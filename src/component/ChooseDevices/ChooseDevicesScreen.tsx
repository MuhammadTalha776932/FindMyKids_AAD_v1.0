import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export const ChooseDevicesScreen = (): JSX.Element => {
  const navigation = useNavigation();

  const handleParentNavigation = () => {
    navigation.navigate("Parent" as never);
  }

  const handleChildNavigation = () => {
    navigation.navigate("Child" as never);
  }

  const [value, setValue] = React.useState('');
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Choose the devices for step up</Text>
      </View>
      <SegmentedButtons
        value={value}
        density={'regular'}
        style={{
          width: "50%"
        }}
        onValueChange={setValue}
        buttons={[
          {
            icon({ color, size, allowFontScaling }) {

              color = "black"
              size = 20
              allowFontScaling= true
              return <MaterialCommunityIcons style={{marginHorizontal:10}} name='human-male-female' size={size} color={color} />
            },
            value: 'Parent Device',
            label: '',
            onPress(event) {
              handleParentNavigation()
            },
          },
          {
            icon({ color, size, allowFontScaling }) {

              color = "black"
              size = 20
              return <MaterialCommunityIcons style={{marginHorizontal:10}} name='human-child' size={size} color={color} />
            },
            value: "Child Device",
            label: '',
            onPress(event) {
              handleChildNavigation()
            },
          },
        ]}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  textContainer: {
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default ChooseDevicesScreen;
