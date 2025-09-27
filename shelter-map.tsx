import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Stack, router } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  Navigation,
  Phone,
  Users,
  Clock,
  Shield,
} from 'lucide-react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

interface Shelter {
  id: string;
  name: string;
  address: string;
  phone: string;
  capacity: number;
  currentOccupancy: number;
  type: 'emergency' | 'evacuation' | 'community';
  riskZone: 'low' | 'medium' | 'high';
  distance: number; // in km
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface RiskZone {
  id: string;
  type: 'low' | 'medium' | 'high';
  coordinates: {
    latitude: number;
    longitude: number;
  }[];
}

export default function ShelterMapScreen() {
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [showList, setShowList] = useState(false);

  // Mock shelter data
  const shelters: Shelter[] = [
    {
      id: '1',
      name: 'Community Center Shelter',
      address: '123 Main St, Downtown',
      phone: '+1 (555) 123-4567',
      capacity: 200,
      currentOccupancy: 45,
      type: 'community',
      riskZone: 'low',
      distance: 2.3,
      amenities: ['Food', 'Medical', 'Pet Friendly', 'WiFi'],
      coordinates: {
        latitude: 37.7849,
        longitude: -122.4194,
      },
    },
    {
      id: '2',
      name: 'Emergency Response Center',
      address: '456 Oak Ave, Central District',
      phone: '+1 (555) 234-5678',
      capacity: 500,
      currentOccupancy: 120,
      type: 'emergency',
      riskZone: 'low',
      distance: 3.7,
      amenities: ['Medical', 'Food', 'Security', 'Generators'],
      coordinates: {
        latitude: 37.7749,
        longitude: -122.4094,
      },
    },
    {
      id: '3',
      name: 'High School Gymnasium',
      address: '789 Pine St, North Side',
      phone: '+1 (555) 345-6789',
      capacity: 150,
      currentOccupancy: 80,
      type: 'evacuation',
      riskZone: 'medium',
      distance: 5.1,
      amenities: ['Food', 'Showers', 'Childcare'],
      coordinates: {
        latitude: 37.7949,
        longitude: -122.4294,
      },
    },
  ];

  // Mock risk zones
  const riskZones: RiskZone[] = [
    {
      id: 'high-1',
      type: 'high',
      coordinates: [
        { latitude: 37.7649, longitude: -122.4394 },
        { latitude: 37.7649, longitude: -122.3994 },
        { latitude: 37.7449, longitude: -122.3994 },
        { latitude: 37.7449, longitude: -122.4394 },
      ],
    },
    {
      id: 'medium-1',
      type: 'medium',
      coordinates: [
        { latitude: 37.7849, longitude: -122.4494 },
        { latitude: 37.7849, longitude: -122.4094 },
        { latitude: 37.7649, longitude: -122.4094 },
        { latitude: 37.7649, longitude: -122.4494 },
      ],
    },
  ];

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required to find nearby shelters.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    } catch (error) {
      // Fallback to San Francisco coordinates
      setUserLocation({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const getRiskZoneColor = (type: string) => {
    switch (type) {
      case 'high':
        return 'rgba(239, 68, 68, 0.3)';
      case 'medium':
        return 'rgba(245, 158, 11, 0.3)';
      case 'low':
        return 'rgba(16, 185, 129, 0.3)';
      default:
        return 'rgba(107, 114, 128, 0.3)';
    }
  };

  const getShelterColor = (type: string) => {
    switch (type) {
      case 'emergency':
        return '#EF4444';
      case 'evacuation':
        return '#F59E0B';
      case 'community':
        return '#3B82F6';
      default:
        return '#6B7280';
    }
  };

  const getAvailabilityColor = (shelter: Shelter) => {
    const occupancyRate = (shelter.currentOccupancy / shelter.capacity) * 100;
    if (occupancyRate < 50) return '#10B981';
    if (occupancyRate < 80) return '#F59E0B';
    return '#EF4444';
  };

  const handleNavigateToShelter = (shelter: Shelter) => {
    const { latitude, longitude } = shelter.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Alert.alert(
      'Navigate to Shelter',
      `Open navigation to ${shelter.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Maps', onPress: () => console.log('Would open:', url) },
      ]
    );
  };

  const handleCallShelter = (phone: string) => {
    Alert.alert(
      'Call Shelter',
      `Call ${phone}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => console.log('Would call:', phone) },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: 'Find Shelter',
          headerTitleStyle: { fontSize: 18, fontWeight: 'bold' },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ArrowLeft size={24} color="#111827" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setShowList(!showList)}
              style={styles.toggleButton}
            >
              <Text style={styles.toggleButtonText}>
                {showList ? 'Map' : 'List'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />

      {!showList ? (
        <View style={styles.mapContainer}>
          {userLocation && (
            <MapView
              style={styles.map}
              initialRegion={userLocation}
              showsUserLocation
              showsMyLocationButton
            >
              {/* Risk Zone Polygons */}
              {riskZones.map((zone) => (
                <MapView.Polygon
                  key={zone.id}
                  coordinates={zone.coordinates}
                  fillColor={getRiskZoneColor(zone.type)}
                  strokeColor={getRiskZoneColor(zone.type).replace('0.3', '0.8')}
                  strokeWidth={2}
                />
              ))}

              {/* Shelter Markers */}
              {shelters.map((shelter) => (
                <Marker
                  key={shelter.id}
                  coordinate={shelter.coordinates}
                  onPress={() => setSelectedShelter(shelter)}
                  pinColor={getShelterColor(shelter.type)}
                  title={shelter.name}
                  description={`${shelter.distance}km away • ${shelter.capacity - shelter.currentOccupancy} spaces available`}
                />
              ))}
            </MapView>
          )}

          {/* Risk Zone Legend */}
          <View style={styles.legend}>
            <Text style={styles.legendTitle}>Risk Zones</Text>
            <View style={styles.legendItems}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.legendText}>High Risk</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.legendText}>Medium Risk</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Low Risk</Text>
              </View>
            </View>
          </View>

          {/* Selected Shelter Info */}
          {selectedShelter && (
            <View style={styles.shelterInfo}>
              <View style={styles.shelterHeader}>
                <Text style={styles.shelterName}>{selectedShelter.name}</Text>
                <TouchableOpacity
                  onPress={() => setSelectedShelter(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.shelterAddress}>{selectedShelter.address}</Text>
              <Text style={styles.shelterDistance}>
                📍 {selectedShelter.distance}km away
              </Text>

              <View style={styles.shelterStats}>
                <View style={styles.stat}>
                  <Users size={16} color="#6B7280" />
                  <Text style={styles.statText}>
                    {selectedShelter.capacity - selectedShelter.currentOccupancy}/{selectedShelter.capacity} available
                  </Text>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: getAvailabilityColor(selectedShelter) },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.amenities}>
                {selectedShelter.amenities.map((amenity, index) => (
                  <View key={index} style={styles.amenityTag}>
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.shelterActions}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleNavigateToShelter(selectedShelter)}
                >
                  <Navigation size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, styles.callButton]}
                  onPress={() => handleCallShelter(selectedShelter.phone)}
                >
                  <Phone size={16} color="#FFFFFF" />
                  <Text style={styles.actionButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      ) : (
        <ScrollView style={styles.listContainer}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Available Shelters</Text>
            <Text style={styles.listSubtitle}>Sorted by distance</Text>
          </View>

          {shelters
            .sort((a, b) => a.distance - b.distance)
            .map((shelter) => (
              <TouchableOpacity
                key={shelter.id}
                style={styles.shelterCard}
                onPress={() => {
                  setSelectedShelter(shelter);
                  setShowList(false);
                }}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitle}>
                    <Text style={styles.cardName}>{shelter.name}</Text>
                    <View
                      style={[
                        styles.typeTag,
                        { backgroundColor: getShelterColor(shelter.type) },
                      ]}
                    >
                      <Text style={styles.typeText}>
                        {shelter.type.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.cardDistance}>{shelter.distance}km</Text>
                </View>

                <Text style={styles.cardAddress}>{shelter.address}</Text>

                <View style={styles.cardStats}>
                  <View style={styles.cardStat}>
                    <Users size={14} color="#6B7280" />
                    <Text style={styles.cardStatText}>
                      {shelter.capacity - shelter.currentOccupancy} available
                    </Text>
                  </View>
                  <View style={styles.cardStat}>
                    <Shield size={14} color="#6B7280" />
                    <Text style={styles.cardStatText}>
                      {shelter.riskZone} risk zone
                    </Text>
                  </View>
                </View>

                <View style={styles.cardAmenities}>
                  {shelter.amenities.slice(0, 3).map((amenity, index) => (
                    <Text key={index} style={styles.cardAmenity}>
                      {amenity}
                    </Text>
                  ))}
                  {shelter.amenities.length > 3 && (
                    <Text style={styles.cardAmenityMore}>
                      +{shelter.amenities.length - 3} more
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </ScrollView>
      )}
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
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    marginRight: 8,
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  legend: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  legendItems: {
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
  },
  shelterInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  shelterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  shelterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#6B7280',
  },
  shelterAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  shelterDistance: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 12,
  },
  shelterStats: {
    marginBottom: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statText: {
    fontSize: 14,
    color: '#374151',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  amenityTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  amenityText: {
    fontSize: 12,
    color: '#374151',
  },
  shelterActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callButton: {
    backgroundColor: '#10B981',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    flex: 1,
  },
  listHeader: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  listSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  shelterCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  typeTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cardDistance: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  cardAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  cardStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  cardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardStatText: {
    fontSize: 12,
    color: '#374151',
  },
  cardAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardAmenity: {
    fontSize: 12,
    color: '#6B7280',
  },
  cardAmenityMore: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
});