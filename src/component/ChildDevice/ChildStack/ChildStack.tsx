import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../CS_launch_Page/Home';
import { requestLocationPermission } from '../../../Helper/Permissions/ChildDevices.Permission';
import ChildAuthStacks from '../../AuthStack/ChildAuthStacks';
import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { sendPostRequest } from '../../../Helper/SendToServer';
import { handleBackground, closedTheBackgroundTask } from '../BackGroundTask/GeolocationTask';
import { ChildsContext, ChildsProvider } from '../../../StateManagement/Child\'s_Stores/useChildStore';
import BackgroundService from 'react-native-background-actions';
import EnterCodeScreen from '../CS_launch_Page/EnterCodeScreen';
import { observer } from 'mobx-react';
export const ChildStack = observer((): JSX.Element => {
  const Stack = createStackNavigator();

  const { user, setUser, Signout } = React.useContext(AuthContext);

  const [initializing, setInitializing] = React.useState(true);

  const {storeEnterCode,ispaired} = React.useContext(ChildsContext);

  const onAuthStateChanged = (user: any) => {
    setUser(user);
    if (ispaired) sendPostRequest(user, "Child",storeEnterCode);
    if (ispaired) handleBackground();
    if (initializing) setInitializing(false);
    console.log(storeEnterCode)
  }
  React.useEffect(() => {
    requestLocationPermission();
    // closedTheBackgroundTask()
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => { unsubscribe() }
  }, [ispaired])



  if (initializing) return (<ActivityIndicator style={{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }} animating={true} color={MD2Colors.red800} />);

  return (
    <ChildsProvider>
      <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
        {
          user ?
            (
              <>
              {
                ispaired?
                <Stack.Screen name='Home' component={Home} /> :
                <Stack.Screen name='EnterCode' component={EnterCodeScreen} /> 
              }
              </>
            ):
            <Stack.Screen name="ChildAuth" component={ChildAuthStacks} />
        }
      </Stack.Navigator>
    </ChildsProvider>
  );
});

export default ChildStack;

const styles = StyleSheet.create({
  container: {}
});
