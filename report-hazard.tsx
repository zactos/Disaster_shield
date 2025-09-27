import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  AlertTriangle,
  Camera,
  Send,
  Clock,
} from 'lucide-react-native';
import * as Location from 'expo-location';

interface HazardType {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface SecurityLevel {
  id: string;
  name: string;
  description: string;
  color: string;
}

export default function ReportHazardScreen() {
  const [selectedHazard, setSelectedHazard] = useState<string>('');
  const [selectedSecurity, setSelectedSecurity] = useState<string>('');
  const [location, setLocation] = useState<string>('Getting location...');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const hazardTypes: HazardType[] = [
    { id: 'flood', name: 'Flood', icon: '🌊', color: '#3B82F6' },
    { id: 'fire', name: 'Fire', icon: '🔥', color: '#EF4444' },
    { id: 'earthquake', name: 'Earthquake', icon: '🌏', color: '#F59E0B' },
    { id: 'landslide', name: 'Landslide', icon: '⛰️', color: '#8B5CF6' },
    { id: 'storm', name: 'Storm', icon: '⛈️', color: '#6B7280' },
    { id: 'accident', name: 'Accident', icon: '🚗', color: '#DC2626' },
    { id: 'infrastructure', name: 'Infrastructure', icon: '🏗️', color: '#F97316' },
    { id: 'other', name: 'Other', icon: '⚠️', color: '#84CC16' },
  ];

  const securityLevels: SecurityLevel[] = [
    {
      id: 'low',
      name: 'Low Impact',
      description: 'Minor issue, no immediate danger',
      color: '#10B981',
    },
    {
      id: 'medium',
      name: 'Medium Impact',
      description: 'Moderate risk, some precautions needed',
      color: '#F59E0B',
    },
    {
      id: 'high',
      name: 'High Impact',
      description: 'Significant danger, immediate attention required',
      color: '#EF4444',
    },
    {
      id: 'critical',
      name: 'Critical Impact',
      description: 'Life-threatening situation, emergency response needed',
      color: '#DC2626',
    },
  ];

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocation('Location permission denied');
        return;
      }

      const locationResult = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = locationResult.coords;
      
      // Reverse geocoding to get address
      const addressResult = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      
      if (addressResult.length > 0) {
        const address = addressResult[0];
        const formattedAddress = `${address.street || ''} ${address.city || ''}, ${address.region || ''}`.trim();
        setLocation(formattedAddress || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      } else {
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
      }
    } catch (error) {
      setLocation('Unable to get location');
    }
  };

  const handleSubmit = () => {
    if (!selectedHazard || !selectedSecurity || !description.trim()) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted',
        'Your hazard report has been successfully submitted to emergency services.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Report Hazard',
          headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
          ),
        }}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hazard Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hazard Type *</Text>
          <Text style={styles.sectionSubtitle}>Select the type of hazard you want to report</Text>
          <View style={styles.optionsGrid}>
            {hazardTypes.map((hazard) => (
              <TouchableOpacity
                key={hazard.id}
                style={[
                  styles.optionCard,
                  selectedHazard === hazard.id && [
                    styles.optionCardSelected,
                    { borderColor: hazard.color },
                  ],
                ]}
                onPress={() => setSelectedHazard(hazard.id)}
              >
                <Text style={styles.optionIcon}>{hazard.icon}</Text>
                <Text
                  style={[
                    styles.optionText,
                    selectedHazard === hazard.id && { color: hazard.color },
                  ]}
                >
                  {hazard.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Level Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Impact Level *</Text>
          <Text style={styles.sectionSubtitle}>Indicate the severity of the hazard</Text>
          <View style={styles.securityLevels}>
            {securityLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.securityCard,
                  selectedSecurity === level.id && [
                    styles.securityCardSelected,
                    { borderColor: level.color, backgroundColor: `${level.color}10` },
                  ],
                ]}
                onPress={() => setSelectedSecurity(level.id)}
              >
                <View style={styles.securityHeader}>
                  <Text
                    style={[
                      styles.securityName,
                      selectedSecurity === level.id && { color: level.color },
                    ]}
                  >
                    {level.name}
                  </Text>
                  <View
                    style={[
                      styles.securityDot,
                      { backgroundColor: level.color },
                      selectedSecurity === level.id && styles.securityDotSelected,
                    ]}
                  />
                </View>
                <Text style={styles.securityDescription}>{level.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity style={styles.locationCard} onPress={getCurrentLocation}>
            <MapPin size={20} color="#3B82F6" />
            <View style={styles.locationContent}>
              <Text style={styles.locationText}>{location}</Text>
              <Text style={styles.locationSubtext}>Tap to refresh location</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description *</Text>
          <Text style={styles.sectionSubtitle}>
            Provide detailed information about the hazard
          </Text>
          <TextInput
            style={styles.descriptionInput}
            multiline
            numberOfLines={6}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe the hazard, its current condition, any immediate dangers, and any other relevant details..."
            placeholderTextColor="#9CA3AF"
            textAlignVertical="top"
          />
          <Text style={styles.characterCount}>{description.length}/500</Text>
        </View>

        {/* Photo Upload */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos (Optional)</Text>
          <TouchableOpacity style={styles.photoButton}>
            <Camera size={24} color="#6B7280" />
            <Text style={styles.photoButtonText}>Add Photos</Text>
            <Text style={styles.photoButtonSubtext}>Up to 3 photos</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Clock size={20} color="#FFFFFF" />
          ) : (
            <Send size={20} color="#FFFFFF" />
          )}
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Submitting Report...' : 'Submit Hazard Report'}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Your report will be sent to local emergency services and authorities for immediate review.
          </Text>
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
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  optionCard: {
    flex: 1,
    minWidth: '22%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  optionCardSelected: {
    borderWidth: 2,
    backgroundColor: '#F8FAFC',
  },
  optionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  securityLevels: {
    gap: 12,
  },
  securityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  securityCardSelected: {
    borderWidth: 2,
  },
  securityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  securityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  securityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  securityDotSelected: {
    transform: [{ scale: 1.2 }],
  },
  securityDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  locationContent: {
    flex: 1,
    marginLeft: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  locationSubtext: {
    fontSize: 12,
    color: '#6B7280',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#111827',
    height: 120,
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'right',
    marginTop: 8,
  },
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 8,
  },
  photoButtonSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#EF4444',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    padding: 16,
    paddingTop: 0,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 18,
  },
});