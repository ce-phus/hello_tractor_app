// JobsDetails.js
import { View, Text, Alert, Button } from 'react-native';
import React, { useState } from 'react';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { jobs } from '../../components/jobs';
import BookingModal from '../../components/BookingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JobsDetails = () => {
  const { jobId } = useLocalSearchParams();
  const job = jobs.find((job) => job.id === parseInt(jobId));

  const [modalVisible, setModalVisible] = useState(false);

  if (!job) {
    return (
      <View className="flex-1 p-4 pt-10 bg-gray-100">
        <Text className="text-2xl font-bold">Job not found</Text>
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

  const handleBookJob = () => {
    setModalVisible(true); // Show booking modal
  };

  const handleCancelJob = () => {
    Alert.alert('Job Cancelled', 'The job has been cancelled.');
  };

  const handleBookingSubmit = async () => {
    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      let bookedJobs = existingBookings ? JSON.parse(existingBookings) : [];
  
      const isAlreadyBooked = bookedJobs.some((b) => b.id === job.id);
      if (isAlreadyBooked) {
        Alert.alert('Already Booked', 'You have already booked this job.');
        return;
      }
  
      bookedJobs.push({
        id: job.id,
        name: job.title,
        service: job.service,
        servicePrice: job.pricePerHectare,
        startTime: job.startTime,
        duration: job.duration,
        instructions: job.instructions,
        farmPolygon: job.farmPolygon,
      });
  
      await AsyncStorage.setItem('bookings', JSON.stringify(bookedJobs));
      Alert.alert('Job Booked', 'The job has been successfully booked.');
    } catch (error) {
      Alert.alert('Error', 'There was an error booking the job.');
    }
  };
  

  return (
    <View className="flex-1 p-4 pt-10 bg-gray-100">
      <Text className="text-2xl font-bold mt-2 mb-3">{job.title}</Text>
      <Text className="text-xl font-medium mb-3">Farm Size: {job.farmSize}</Text>
      <Text className="text-xl font-medium mb-3">Start Time: {new Date(job.startTime).toLocaleString()}</Text>
      <Text className="text-xl font-medium mb-3">Price/ha: KES {job.pricePerHectare} </Text>
      <Text className="text-xl font-medium mb-3">Service type: {job.service} </Text>
      <Text className="text-xl font-medium mb-3">Instructions: {job.instructions}</Text>

      {/* Job Actions */}
      <View className="flex flex-row flex-wrap mb-4">
        <View className="w-1/2 p-1">
          <Button title="Start Job" onPress={handleStartJob} color="#4CAF50" />
        </View>
        <View className="w-1/2 p-1">
          <Button title="End Job" onPress={handleEndJob} color="#F44336" />
        </View>
        <View className="w-1/2 p-1">
          <Button title="Book Job" onPress={handleBookJob} color="#2196F3" />
        </View>
        <View className="w-1/2 p-1">
          <Button title="Cancel Job" onPress={handleCancelJob} color="#FF9800" />
        </View>
      </View>

      <MapView
        style={{ width: '100%', height: 300 }}
        initialRegion={{
          latitude: job.farmPolygon[0]?.latitude || 0,
          longitude: job.farmPolygon[0]?.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        userInterfaceStyle="dark"
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

      {/* Booking Modal */}
      <BookingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleBookingSubmit}
        job={job}
      />
    </View>
  );
};

export default JobsDetails;
