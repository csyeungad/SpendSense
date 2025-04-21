import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RoundBtn from '@/components/Roundbtn';
import { router } from 'expo-router';

const Home = () => {

  const onAddReceipt = () => {
    router.push({pathname: "/ScanReceipt"})
  }

  const onGoDashboard = () => {
    router.push({pathname: "/Dashboard"})
  }

  const onAddExpense = () => {
    router.push({pathname: "/AddExpense"})
  }


  return (
    <View style={styles.container}>
      {/* Welcome Title */}
      <Text style={styles.title}>Welcome to SpendSense</Text>
      {/* App Logo */}
      <Image 
        style={styles.logo}
        source={require('../assets/images/ai_finance_icon.png')}
      />
      {/* Subtitle */}
      <Text style={styles.subtitle}>Manage Your Finances Effortlessly</Text>
      
      {/* Description */}
      <Text style={styles.description}>
        Scan receipts and track your expenses effortlessly with SpendSense.
      </Text>
      <View style={styles.actionRow}>
        <RoundBtn icon={'stats-chart'} text={'Dashboard'} onPress={onGoDashboard} />
        <RoundBtn icon={'camera-outline'} text={'Scan Receipt'} onPress={onAddReceipt} />
        <RoundBtn icon={'add-circle-outline'} text={'Add Expense'} onPress={onAddExpense} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'light-grey',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: "space-around",
    width: '80%',
    marginTop: 20,
  },
});

export default Home;