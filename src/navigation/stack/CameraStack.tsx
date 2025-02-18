import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "@screen/camera/CameraScreen";

const Stack = createNativeStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}