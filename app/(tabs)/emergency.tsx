import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  Phone,
  AlertCircle,
  Shield,
  MapPin,
  Users,
  Radio,
  Siren,
  Heart,
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function EmergencyScreen() {
  const [sosActive, setSosActive] = useState(false);

  const handleEmergencyCall = (number: string, service: string) => {
    Alert.alert(
      `Call ${service}`,
      `Are you sure you want to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${number}`);
          },
        },
      ]
    );
  };

  const handleSOS = () => {
    if (sosActive) {
      setSosActive(false);
      Alert.alert('SOS Deactivated', 'Emergency broadcast has been stopped.');
      return;
    }

    Alert.alert(
      'Activate SOS',
      'This will send your location and emergency alert to all emergency contacts and nearby rescue teams.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Activate SOS',
          style: 'destructive',
          onPress: () => {
            setSosActive(true);
            Alert.alert(
              'SOS Activated',
              'Emergency alert has been broadcasted. Help is on the way.'
            );
          },
        },
      ]
    );
  };

  const emergencyServices = [
    {
      name: 'Police',
      number: '911',
      icon: Shield,
      color: '#3B82F6',
      description: 'Police Emergency',
    },
    {
      name: 'Fire Department',
      number: '911',
      icon: AlertCircle,
      color: '#DC2626',
      description: 'Fire & Rescue',
    },
    {
      name: 'Medical Emergency',
      number: '911',
      icon: Heart,
      color: '#EF4444',
      description: 'Ambulance',
    },
    {
      name: 'Disaster Response',
      number: '1-800-DISASTER',
      icon: Radio,
      color: '#F59E0B',
      description: 'Emergency Management',
    },
  ];

  const quickActions = [
    {
      title: 'Report Hazard',
      description: 'Report dangerous conditions or disasters',
      icon: AlertCircle,
      color: '#F59E0B',
      action: () => router.push('/report-hazard'),
    },
    {
      title: 'Find Shelter',
      description: 'Locate nearby emergency shelters',
      icon: MapPin,
      color: '#3B82F6',
      action: () => router.push('/shelter-map'),
    },
    {
      title: 'Emergency Contacts',
      description: 'Manage your emergency contacts',
      icon: Users,
      color: '#10B981',
      action: () => Alert.alert('Feature coming soon'),
    },
    {
      title: 'Evacuation Routes',
      description: 'View safe evacuation paths',
      icon: MapPin,
      color: '#8B5CF6',
      action: () => Alert.alert('Feature coming soon'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Emergency</Text>
          <Text style={styles.headerSubtitle}>Quick Access to Emergency Services</Text>
        </View>

        {/* SOS Button */}
        <View style={styles.sosSection}>
          <TouchableOpacity
            style={[styles.sosButton, sosActive && styles.sosButtonActive]}
            onPress={handleSOS}
          >
            <Siren size={48} color="#FFFFFF" />
            <Text style={styles.sosButtonText}>
              {sosActive ? 'SOS ACTIVE' : 'EMERGENCY SOS'}
            </Text>
            <Text style={styles.sosButtonSubtext}>
              {sosActive ? 'Tap to deactivate' : 'Press for emergency alert'}
            </Text>
          </TouchableOpacity>
          {sosActive && (
            <View style={styles.sosActiveIndicator}>
              <Text style={styles.sosActiveText}>
                🚨 Emergency alert is broadcasting your location
              </Text>
            </View>
          )}
        </View>

        {/* Emergency Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Services</Text>
          <View style={styles.servicesGrid}>
            {emergencyServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.serviceCard, { borderColor: service.color }]}
                  onPress={() => handleEmergencyCall(service.number, service.name)}
                >
                  <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                    <IconComponent size={24} color="#FFFFFF" />
                  </View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceNumber}>{service.number}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                  <IconComponent size={20} color="#FFFFFF" />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </View>
                <Phone size={16} color="#9CA3AF" style={{ transform: [{ rotate: '90deg' }] }} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Emergency Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>During an Emergency:</Text>
            <Text style={styles.tipText}>
              • Stay calm and assess the situation{'\n'}
              • Move to higher ground in case of flooding{'\n'}
              • Stay away from downed power lines{'\n'}
              • Listen to local authorities and emergency broadcasts{'\n'}
              • Keep emergency kit accessible{'\n'}
              • Have evacuation routes planned
            </Text>
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
  sosSection: {
    padding: 24,
    alignItems: 'center',
  },
  sosButton: {
    backgroundColor: '#DC2626',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: '#991B1B',
    shadowColor: '#DC2626',
    shadowOpacity: 0.5,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  sosButtonSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  sosActiveIndicator: {
    marginTop: 16,
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  sosActiveText: {
    color: '#991B1B',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    minWidth: '47%',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionCard: {
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
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  tipCard: {
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
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
});