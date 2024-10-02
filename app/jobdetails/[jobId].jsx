import { View, Text, Alert, Button, StyleSheet } from 'react-native';
import React from 'react';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { jobs } from '../../components/jobs';

const JobsDetails = () => {
  const { jobId } = useLocalSearchParams();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  if (!job) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Job not found</Text>
      </View>
    );
  }

  // Handlers for job actions
  const handleStartJob = () => {
    Alert.alert('Job Started', 'You have started the job');
  };

  const handleEndJob = () => {
    Alert.alert('Job Ended', 'You have ended the job');
  };

  const handleRescheduleJob = () => {
    Alert.alert('Job Rescheduled', 'You can choose a new time');
  };

  const handleCancelJob = () => {
    Alert.alert('Job Cancelled', 'The job has been cancelled.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} className='text-2xl font-pbold mt-2 mb-3'>{job.title}</Text>
      <Text className='text-xl font-pmedium mb-3'>Farm Size: {job.farmSize}</Text>
      <Text className='text-xl font-pmedium mb-3'>Start Time: {new Date(job.startTime).toLocaleString()}</Text>
      <Text className='text-xl font-pmedium mb-3'>Duration: {job.duration} hours</Text>
      <Text className='text-xl font-pmedium mb-3'>Instructions: {job.instructions}</Text>

      {/* Job Actions */}
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Start Job" onPress={handleStartJob} color="#4CAF50" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="End Job" onPress={handleEndJob} color="#F44336" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Reschedule Job" onPress={handleRescheduleJob} color="#2196F3" />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Cancel Job" onPress={handleCancelJob} color="#FF9800" />
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: job.farmPolygon[0]?.latitude || 0, 
          longitude: job.farmPolygon[0]?.longitude || 0,
          latitudeDelta: 0.005,  
          longitudeDelta: 0.005,
        }}
        userInterfaceStyle='dark'
        provider={PROVIDER_GOOGLE}
        showsBuildings
        showsUserLocation
        showsMyLocationButton
      >
        <Polygon
          coordinates={job.farmPolygon}
          strokeColor="#000" 
          fillColor="rgba(0, 200, 0, 0.5)" 
          strokeWidth={2}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#f0f0f0',
  },
  
  info: {
    fontSize: 18,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  buttonWrapper: {
    width: '48%', // Adjust width to fit two buttons in a row
    margin: '1%', // Add margin for spacing
  },
  map: {
    width: '100%',
    height: 300,
  },
});

export default JobsDetails;
