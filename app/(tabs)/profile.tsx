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
  User,
  Phone,
  MapPin,
  Bell,
  Shield,
  Settings,
  LogOut,
  Edit3,
  Users,
} from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.multiRemove(['userLoggedIn', 'userEmail']);
            router.replace('/login');
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Emergency Contacts',
      description: 'Manage your emergency contact list',
      icon: Users,
      color: '#3B82F6',
      action: () => Alert.alert('Feature coming soon'),
    },
    {
      title: 'Location Settings',
      description: 'Configure location sharing preferences',
      icon: MapPin,
      color: '#10B981',
      action: () => Alert.alert('Feature coming soon'),
    },
    {
      title: 'Notification Settings',
      description: 'Manage alert and notification preferences',
      icon: Bell,
      color: '#F59E0B',
      action: () => Alert.alert('Feature coming soon'),
    },
    {
      title: 'Safety Settings',
      description: 'Configure safety and privacy options',
      icon: Shield,
      color: '#8B5CF6',
      action: () => Alert.alert('Feature coming soon'),
    },
    {
      title: 'App Settings',
      description: 'General app configuration',
      icon: Settings,
      color: '#6B7280',
      action: () => Alert.alert('Feature coming soon'),
    },
  ];

  const stats = [
    { label: 'Reports Submitted', value: '12' },
    { label: 'Alerts Received', value: '34' },
    { label: 'Emergency Contacts', value: '5' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info */}
        <View style={styles.userSection}>
          <View style={styles.userAvatar}>
            <User size={48} color="#FFFFFF" />
          </View>
          <Text style={styles.userName}>Emergency User</Text>
          <Text style={styles.userEmail}>{userEmail || 'user@example.com'}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Edit3 size={16} color="#3B82F6" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Activity Summary</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Profile Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          {profileOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.optionCard}
                onPress={option.action}
              >
                <View style={[styles.optionIcon, { backgroundColor: option.color }]}>
                  <IconComponent size={20} color="#FFFFFF" />
                </View>
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Edit3 size={16} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Emergency Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Information</Text>
          <View style={styles.emergencyCard}>
            <View style={styles.emergencyItem}>
              <Phone size={20} color="#3B82F6" />
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyLabel}>Primary Contact</Text>
                <Text style={styles.emergencyValue}>+1 (555) 123-4567</Text>
              </View>
              <TouchableOpacity>
                <Edit3 size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.emergencyItem}>
              <MapPin size={20} color="#10B981" />
              <View style={styles.emergencyContent}>
                <Text style={styles.emergencyLabel}>Home Address</Text>
                <Text style={styles.emergencyValue}>123 Main St, City, State</Text>
              </View>
              <TouchableOpacity>
                <Edit3 size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Sign Out */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Disaster Shield v1.0.0</Text>
          <Text style={styles.footerSubtext}>Stay Safe, Stay Connected</Text>
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
  },
  userSection: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -16,
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
  userAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
  },
  statsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  emergencyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emergencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  emergencyContent: {
    flex: 1,
    marginLeft: 16,
  },
  emergencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  emergencyValue: {
    fontSize: 14,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  signOutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    padding: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});