import * as React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ParentRegister from '../ParentDevice/RegistrationForm/ParentRegister';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';


export const AuthStacks = (): JSX.Element => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
      <Stack.Screen name='Parent-Signin'
        component={ParentRegister}
        initialParams={{
          title: "Sign In",
          subTitle: "Go back to Sign Up",
          serverRoute: "signin"
        }} />
      <Stack.Screen name='Parent-Signup' component={ParentRegister} initialParams={{ title: "Register Now", subTitle: "Already a member", serverRoute: "signup" }} />
    </Stack.Navigator>
  );
};

export default AuthStacks;

const styles = StyleSheet.create({
  container: {}
});
