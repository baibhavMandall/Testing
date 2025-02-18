import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "@screen/login/LoginScreen";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}