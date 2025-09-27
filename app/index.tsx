import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IndexScreen() {
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('userLoggedIn');
      
      setTimeout(() => {
        if (isLoggedIn === 'true') {
          router.replace('/(tabs)');
        } else {
          router.replace('/login');
        }
      }, 1000);
    } catch (error) {
      router.replace('/login');
    }
  };

  return (
    <View style={styles.container}>
      {/* Splash screen content can be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
});