import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeStack from "@navigation/stack/HomeStack";
import LoginStack from "@navigation/stack/LoginStack";
import CameraStack from "@navigation/stack/CameraStack";
import DetailsStack from "./stack/DetailsStack";

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator initialRouteName="HomeStack">
      <Stack.Screen name="LoginStack" component={LoginStack} options={{ headerShown: false }} />
      <Stack.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false }} />
      <Stack.Screen name="CameraStack" component={CameraStack} options={{ headerShown: false }} />
      <Stack.Screen name="DetailsStack" component={DetailsStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}