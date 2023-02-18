import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ChildInfo from '../ChildDevice/CS_launch_Page/ChildInfo';


export const ChildAuthStacks = (): JSX.Element => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator  screenOptions={({ navigation, route }) => ({ header: () => null })}>
      <Stack.Screen name='Child-Signin' component={ChildInfo} initialParams={{ title: "Sign In", subTitle: "Go back to Sign Up",serverRoute:"signin" }} />
      <Stack.Screen name='Child-Details' component={ChildInfo} initialParams={{ title: "Register Now", subTitle: "Already a member", serverRoute:"signup" }} />
    </Stack.Navigator>
  );
};

export default ChildAuthStacks;

const styles = StyleSheet.create({
  container: {}
});
