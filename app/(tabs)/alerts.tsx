import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { AlertTriangle, Clock, MapPin, ChevronRight } from 'lucide-react-native';

interface Alert {
  id: string;
  type: 'flood' | 'earthquake' | 'storm' | 'fire' | 'landslide';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  isRead: boolean;
}

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'flood',
      priority: 'critical',
      title: 'Flash Flood Warning',
      description: 'Immediate evacuation required for downtown area. Water levels rising rapidly.',
      location: 'Downtown District',
      timestamp: new Date(Date.now() - 5 * 60000),
      isRead: false,
    },
    {
      id: '2',
      type: 'storm',
      priority: 'high',
      title: 'Severe Thunderstorm Alert',
      description: 'High winds and hail expected. Seek shelter immediately.',
      location: 'Central Region',
      timestamp: new Date(Date.now() - 15 * 60000),
      isRead: false,
    },
    {
      id: '3',
      type: 'earthquake',
      priority: 'medium',
      title: 'Seismic Activity Detected',
      description: 'Minor earthquake detected. Monitor for aftershocks.',
      location: 'Northern Area',
      timestamp: new Date(Date.now() - 45 * 60000),
      isRead: true,
    },
    {
      id: '4',
      type: 'fire',
      priority: 'high',
      title: 'Wildfire Approaching',
      description: 'Forest fire moving towards residential areas. Prepare for evacuation.',
      location: 'West Hills',
      timestamp: new Date(Date.now() - 60 * 60000),
      isRead: false,
    },
    {
      id: '5',
      type: 'landslide',
      priority: 'medium',
      title: 'Landslide Risk',
      description: 'Heavy rains have increased landslide risk in mountainous areas.',
      location: 'Mountain Region',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      isRead: true,
    },
  ]);

  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return '🌊';
      case 'earthquake':
        return '🌏';
      case 'storm':
        return '⛈️';
      case 'fire':
        return '🔥';
      case 'landslide':
        return '⛰️';
      default:
        return '⚠️';
    }
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const filteredAlerts = alerts
    .filter(alert => selectedPriority === 'all' || alert.priority === selectedPriority)
    .sort((a, b) => {
      // Sort by priority first (critical > high > medium > low)
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by timestamp (newest first)
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const markAsRead = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount} unread alerts
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'critical', 'high', 'medium', 'low'].map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.filterButton,
                selectedPriority === priority && styles.filterButtonActive,
                priority !== 'all' && { borderColor: getPriorityColor(priority) },
                selectedPriority === priority && priority !== 'all' && 
                { backgroundColor: getPriorityColor(priority) },
              ]}
              onPress={() => setSelectedPriority(priority)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedPriority === priority && styles.filterButtonTextActive,
                ]}
              >
                {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.alertsList} showsVerticalScrollIndicator={false}>
        {filteredAlerts.map((alert) => (
          <TouchableOpacity
            key={alert.id}
            style={[
              styles.alertCard,
              !alert.isRead && styles.alertCardUnread,
              { borderLeftColor: getPriorityColor(alert.priority) },
            ]}
            onPress={() => markAsRead(alert.id)}
          >
            <View style={styles.alertHeader}>
              <Text style={styles.alertEmoji}>{getTypeIcon(alert.type)}</Text>
              <View style={styles.alertInfo}>
                <View style={styles.alertTitleRow}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  {!alert.isRead && <View style={styles.unreadDot} />}
                </View>
                <View style={styles.alertMeta}>
                  <MapPin size={12} color="#6B7280" />
                  <Text style={styles.alertLocation}>{alert.location}</Text>
                  <Clock size={12} color="#6B7280" style={{ marginLeft: 12 }} />
                  <Text style={styles.alertTime}>{getTimeAgo(alert.timestamp)}</Text>
                </View>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: getPriorityColor(alert.priority) },
                ]}
              >
                <Text style={styles.priorityText}>
                  {alert.priority.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <Text style={styles.alertDescription}>{alert.description}</Text>
            
            <View style={styles.alertActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionButtonText}>View Details</Text>
                <ChevronRight size={16} color="#3B82F6" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
        
        {filteredAlerts.length === 0 && (
          <View style={styles.emptyState}>
            <AlertTriangle size={48} color="#9CA3AF" />
            <Text style={styles.emptyStateTitle}>No alerts found</Text>
            <Text style={styles.emptyStateText}>
              {selectedPriority === 'all' 
                ? 'No alerts available at this time.' 
                : `No ${selectedPriority} priority alerts found.`}
            </Text>
          </View>
        )}
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
  filterContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  alertsList: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
  },
  alertCard: {
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
  alertCardUnread: {
    backgroundColor: '#FEF3F2',
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  alertEmoji: {
    fontSize: 24,
    marginRight: 12,
    marginTop: 2,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginLeft: 8,
  },
  alertMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 12,
  },
  priorityText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  alertDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});