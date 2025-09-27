import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Phone,
  MapPin,
  AlertCircle,
  Shield,
  Volume2,
  VolumeX,
} from 'lucide-react-native';
import { router } from 'expo-router';
import { Audio } from 'expo-av';

interface DisasterBanner {
  id: string;
  type: 'flood' | 'earthquake' | 'storm';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: string;
  value: string;
  timestamp: Date;
}

export default function DashboardScreen() {
  const [isAcousticActive, setIsAcousticActive] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [banners, setBanners] = useState<DisasterBanner[]>([
    {
      id: '1',
      type: 'flood',
      severity: 'high',
      location: 'Downtown Area',
      value: '2.5m water level',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'storm',
      severity: 'medium',
      location: 'Coastal Region',
      value: '65 km/h winds',
      timestamp: new Date(),
    },
  ]);

  const generateAcousticAlert = async () => {
    try {
      if (isAcousticActive && sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
        setSound(null);
        setIsAcousticActive(false);
        return;
      }

      // Generate emergency frequency tone
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH0N2QQoObrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmMcBjiR2fLNeSsFJHfH8N2QQA=' },
        { shouldLoop: true }
      );

      await newSound.playAsync();
      setSound(newSound);
      setIsAcousticActive(true);

      Alert.alert(
        'Acoustic Alert Active',
        'Emergency frequency is now broadcasting. Other devices with this app nearby will be alerted.'
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to generate acoustic alert');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return '#DC2626';
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return '🌊';
      case 'earthquake':
        return '🌏';
      case 'storm':
        return '🌪️';
      default:
        return '⚠️';
    }
  };

  const handleEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      'Would you like to call emergency services?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call 911', onPress: () => Alert.alert('Calling 911...') },
      ]
    );
  };

  const handleSOS = () => {
    Alert.alert(
      'SOS Alert Sent',
      'Emergency SOS has been broadcasted to nearby devices and emergency contacts.'
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Disaster Shield</Text>
          <Text style={styles.headerSubtitle}>Real-time Monitoring</Text>
        </View>

        {/* Acoustic Alert Section */}
        <View style={styles.acousticSection}>
          <View style={styles.acousticHeader}>
            <Text style={styles.sectionTitle}>Acoustic Alert Relay</Text>
            <TouchableOpacity
              style={[
                styles.acousticButton,
                isAcousticActive && styles.acousticButtonActive,
              ]}
              onPress={generateAcousticAlert}
            >
              {isAcousticActive ? (
                <VolumeX size={24} color="#FFFFFF" />
              ) : (
                <Volume2 size={24} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.acousticDescription}>
            {isAcousticActive
              ? 'Broadcasting emergency frequency to nearby devices'
              : 'Tap to broadcast emergency alert to nearby phones'}
          </Text>
        </View>

        {/* Disaster Banners */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Disaster Alerts</Text>
          {banners.map((banner) => (
            <View
              key={banner.id}
              style={[
                styles.bannerCard,
                { borderLeftColor: getSeverityColor(banner.severity) },
              ]}
            >
              <View style={styles.bannerHeader}>
                <Text style={styles.bannerEmoji}>
                  {getDisasterIcon(banner.type)}
                </Text>
                <View style={styles.bannerInfo}>
                  <Text style={styles.bannerTitle}>
                    {banner.type.toUpperCase()} ALERT
                  </Text>
                  <Text style={styles.bannerLocation}>{banner.location}</Text>
                </View>
                <View
                  style={[
                    styles.severityBadge,
                    { backgroundColor: getSeverityColor(banner.severity) },
                  ]}
                >
                  <Text style={styles.severityText}>
                    {banner.severity.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.bannerValue}>{banner.value}</Text>
              <Text style={styles.bannerTime}>
                {banner.timestamp.toLocaleTimeString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.actionButton, styles.emergencyButton]}
              onPress={handleEmergencyCall}
            >
              <Phone size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Emergency Call</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.reportButton]}
              onPress={() => router.push('/report-hazard')}
            >
              <AlertCircle size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Report Hazard</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.sosButton]}
              onPress={handleSOS}
            >
              <Shield size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>SOS Alert</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.shelterButton]}
              onPress={() => router.push('/shelter-map')}
            >
              <MapPin size={24} color="#FFFFFF" />
              <Text style={styles.actionButtonText}>Find Shelter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#EF4444',
    padding: 24,
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  acousticSection: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  acousticHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  acousticButton: {
    backgroundColor: '#3B82F6',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  acousticButtonActive: {
    backgroundColor: '#EF4444',
  },
  acousticDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  section: {
    margin: 16,
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  bannerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bannerEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  bannerLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  bannerTime: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: '#6B7280',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  },
  emergencyButton: {
    backgroundColor: '#DC2626',
  },
  reportButton: {
    backgroundColor: '#F59E0B',
  },
  sosButton: {
    backgroundColor: '#EF4444',
  },
  shelterButton: {
    backgroundColor: '#3B82F6',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
});