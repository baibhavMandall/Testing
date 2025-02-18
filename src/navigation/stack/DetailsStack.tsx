import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "@screen/camera/CameraScreen";
import DetailsScreen from "@screen/details/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function DetailsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Details" component={DetailsScreen} 
        options={{ 
          headerTitle: 'Inventory',
        }} 
      />
    </Stack.Navigator>
  )
}