import React, { useState, useEffect, Suspense } from 'react';
import { ActivityIndicator, Text, View } from "react-native";
import { Drawer } from 'expo-router/drawer';
import { SQLiteProvider } from 'expo-sqlite';
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { Ionicons } from '@expo/vector-icons';
import { drawerColors } from '@/constants/Colors';

// const dbName = "SpendSense.db";
const dbName = "SpendSense_w_data.db";

const loadDatabase = async () => {
  const dbFilePath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  const fileInfo = await FileSystem.getInfoAsync(dbFilePath);

  //Load an empty database
  if (!fileInfo.exists) {
    const dbAsset = require("../assets/SpendSense.db");
    const dbUri = Asset.fromModule(dbAsset).uri;
    await FileSystem.makeDirectoryAsync(
      `${FileSystem.documentDirectory}SQLite`,
      { intermediates: true }
    );
    await FileSystem.downloadAsync(dbUri, dbFilePath);
  }
};

const DrawerLayout = () => {
  const [dbLoaded, setDbLoaded] = useState<boolean>(false);

  useEffect(() => {
    // console.log('use effect loading database');
    loadDatabase()
      .then(() => setDbLoaded(true))
      .catch((e) => console.error(e));
  }, []);

  if (!dbLoaded){
    // console.log('Database not loaded yet')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} />
        <Text>Loading Database...</Text>
      </View>
    );
  }

  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={"large"} />
          <Text>Loading Database...</Text>
        </View>
      }
    >
      <SQLiteProvider databaseName= {dbName} useSuspense>
        <Drawer
          screenOptions={{
            drawerStyle: {
              backgroundColor: drawerColors.background,
              width: 250, // Custom width of the drawer
            },
            headerStyle: {
              backgroundColor: drawerColors.primary,
            },
            headerTintColor: drawerColors.iconActive,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: drawerColors.iconActive,
            },
          }}
        >
          <Drawer.Screen 
            name="index" 
            options={{
              drawerLabel: "Home",
              headerTitle: "Home",
              drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
            }}
          />
          <Drawer.Screen 
            name="ScanReceipt" 
            options={{
              drawerLabel: "Scan Receipt",
              headerTitle: "Scan Receipt",
              drawerIcon: ({ color, size }) => <Ionicons name="camera-outline" size={size} color={color} />,
            }}
          />
          <Drawer.Screen 
            name="AddExpense" 
            options={{
              drawerLabel: "Add Expense",
              headerTitle: "Add Expense",
              drawerIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
            }}
          />
          <Drawer.Screen 
            name="Dashboard" 
            options={{
              drawerLabel: "Dashboard",
              headerTitle: "Dashboard",
              drawerIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
            }}
          />
          <Drawer.Screen 
            name="ExpenseRecords" 
            options={{
              drawerLabel: "Expense Records",
              headerTitle: "Expense Records",
              drawerIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />,
            }}
          />
        </Drawer>
      </SQLiteProvider>
    </Suspense>
  );
};

export default DrawerLayout;