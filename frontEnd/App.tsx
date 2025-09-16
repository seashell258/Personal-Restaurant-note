import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { addNotesScreen } from './AddNotesScreen/AddNotesScreen';

// 建立 Tab Navigator
const Tab = createBottomTabNavigator();

// Home 畫面
function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>🏠 Home Screen</Text>
    </View>
  );
}


// App 主結構
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={addNotesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
