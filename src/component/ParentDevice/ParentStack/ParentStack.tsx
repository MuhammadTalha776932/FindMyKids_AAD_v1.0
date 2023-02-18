import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ParentRegister from '../RegistrationForm/ParentRegister';
import MapsContainer from '../ParentMapContainer/MapsContainer';
import AuthStacks from '../../AuthStack/AuthStacks';
import { AuthContext } from '../../FirebaseManagement/AuthProvider';
import auth from "@react-native-firebase/auth"
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { sendPostRequest } from '../../../Helper/SendToServer';
import BackgroundService from 'react-native-background-actions';
import { handleBackgroundNotifications, handleFNChildLocation } from '../BackgroundTask/NotificationBGT';
import { CoordinateProviderComponent } from '../../../StateManagement/useCoordinateStore';
import GenerateCode from '../SecratCode/GenerateCode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react';
import { UserContext } from '../../../StateManagement/userStore';
import { ScrollView } from 'react-native-gesture-handler';
export const ParentStack = observer((): JSX.Element => {
  const Stack = createStackNavigator();

  const { user, setUser, Signout } = React.useContext(AuthContext);
  const { ispaired, updateData } = React.useContext(UserContext);
  const [isLogout, setIsLogout] = React.useState(false);

  const [initializing, setInitializing] = React.useState(true);

  const onAuthStateChanged = (user: any) => {
    if (user) {
      setUser(user);
      updateData(user);
      if (user) sendPostRequest(user, "Parent");
    }
    else{
      setIsLogout(true);
    }
    if (initializing) setInitializing(false);
  }
  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(onAuthStateChanged);

    return () => { unsubscribe() }; // unsubscribe on unmount
  }, [ispaired]);


  if (initializing) return <ActivityIndicator style={{
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignSelf: "center"
  }} animating={true} color={MD2Colors.red800} />;

  return (
    <CoordinateProviderComponent>
      <Stack.Navigator screenOptions={({ navigation, route }) => ({ header: () => null })}>
        {
          user && ispaired ?
            (<>
              <Stack.Screen name='MapContainer' component={MapsContainer} />
            </>) :
            (
              <>
                {
                  !user ?
                    <Stack.Screen name="Auth" component={AuthStacks} /> :
                    (
                      <>
                        {
                          ispaired ?
                            <Stack.Screen name='MapContainer' component={MapsContainer} />
                            :
                            <Stack.Screen name='SecratCode' component={GenerateCode} />
                        }
                      </>
                    )
                }
              </>
            )
        }

      </Stack.Navigator>
    </CoordinateProviderComponent>
  );
});

export default ParentStack;

const styles = StyleSheet.create({
  container: {}
});
