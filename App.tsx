import 'react-native-gesture-handler';
import "react-native-reanimated";
import React, { useEffect } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
// import ParentRegister from "./component/ParentRegister";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ChooseDevicesScreen } from "./src/component/ChooseDevices/ChooseDevicesScreen"
import { ParentStack } from "./src/component/ParentDevice/ParentStack/ParentStack"
import { ChildStack } from "./src/component/ChildDevice/ChildStack/ChildStack"
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/component/FirebaseManagement/AuthProvider';
import { requestUserPermission } from "./src/component/Notifications/Permissions/Notification.Permission";
import { notificationListener } from './src/component/Notifications/NotificationMessage/NotificationMessage';
import { handleFNChildLocation } from './src/component/ParentDevice/BackgroundTask/NotificationBGT';
import { Trunk } from './src/StateManagement/useCoordinateStore';
import { UserProvider, UserTrunk } from './src/StateManagement/userStore';
import { ChildsTrunk } from './src/StateManagement/Child\'s_Stores/useChildStore';
// Azure DevOps
function App() {

  const Stack = createStackNavigator();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    const rehydrate = async () => {
      await Trunk.init()
      await UserTrunk.init()
      await ChildsTrunk.init()
    }
    rehydrate();
    const unSplashScreen: void = SplashScreen.hide();
  }, [])

  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <UserProvider>
            <Stack.Navigator initialRouteName="chooseDevices"
              screenOptions={(
                { navigation, route }) => ({ header: () => null }
              )}>
              <Stack.Screen name="chooseDevices" component={ChooseDevicesScreen} />
              <Stack.Screen name="Parent" component={ParentStack} />
              <Stack.Screen name="Child" component={ChildStack} />
            </Stack.Navigator>
          </UserProvider>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
