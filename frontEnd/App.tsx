import * as React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { globalStyles } from '../shared/globalStyles';
import { db } from './services/DatabaseFactory';
import { useEffect, useState } from 'react';
import { AddNotesScreen } from './AddNotesScreen/AddNotesScreen';
import { ViewNotesScreen } from './ViewNotesScreen/ViewNotesScreen';
import { Note } from '../shared/types';

// 建立 Tab Navigator
const Tab = createBottomTabNavigator();


// App 主結構
export default function App() {


  const [initialized, setInitialized] = React.useState(false);
  useEffect(() => {
    (async () => {
      await db.initialize(); // 初始化一次
    })();
    setInitialized(true)
  }, []);


  if (!initialized) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>筆記加載中...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
         <Tab.Screen name="檢視筆記" component={ViewNotesScreen} />
          <Tab.Screen name="新增筆記" component={AddNotesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
