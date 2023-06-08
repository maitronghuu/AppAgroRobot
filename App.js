import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { extendTheme, NativeBaseProvider } from "native-base";
import React from "react";
import { HomeScreen } from "./src/screen/Home";
import { ImagesScreen } from "./src/screen/Images";
import { ChartScreen } from "./src/screen/Chart";
import { GroupScreen } from "./src/screen/Group";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};
const Stack = createNativeStackNavigator();
// extend the theme
export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Images" component={ImagesScreen} />
          <Stack.Screen name="Chart" component={ChartScreen} />
          <Stack.Screen name="Group" component={GroupScreen} />
          






        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
