import { View, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MapView, { Polygon, PROVIDER_GOOGLE } from 'react-native-maps';
import { useLocalSearchParams } from 'expo-router';
import { jobs } from '../../components/jobs';
import BookingModal from '../../components/BookingModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


const JobsDetails = () => {
  const { jobId } = useLocalSearchParams();
  const job = jobs.find((job) => job.id === parseInt(jobId));
  const router = useRouter();

  const [modalVisible, setModalVisible] = useState(false);

  if (!job) {
    return (
      <View className="flex-1 p-4 pt-10 bg-gray-100">
        <Text className="text-2xl font-bold">Job not found</Text>
      </View>
    );
  }

  const handleStartJob = () => {
    Alert.alert('Job Start not implemented yet!!😪');
  };

  const handleEndJob = async () => {
    try {
      const existingCompletedJobs = await AsyncStorage.getItem('completedJobs');
      let completedJobs = existingCompletedJobs ? JSON.parse(existingCompletedJobs) : [];

      const isAlreadyCompleted = completedJobs.some((completedJob) => completedJob.id === job.id);
      if (isAlreadyCompleted) {
        Alert.alert('Already Completed', 'You have already marked this job as completed.');
        return;
      }

      completedJobs.push({
        id: job.id,
        title: job.title,
        service: job.service,
        price: job.pricePerHectare,
        startTime: job.startTime,
        duration: job.duration,
        instructions: job.instructions,
        farmPolygon: job.farmPolygon,
      });
      await AsyncStorage.setItem('completedJobs', JSON.stringify(completedJobs));
      Alert.alert('Job Completed', 'The job has been marked as completed.');
      router.push('/dashboard'); 
    } catch (error) {
      Alert.alert('Error', 'There was an error completing the job.');
    }
  };

  const handleBookJob = () => {
    setModalVisible(true);
  };

  const handleCancelJob = () => {
    Alert.alert('Job Cancel not implemented yet!!😪');
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
      Alert.alert('Bookings Saved', 'Booking successfully saved after app reload');
      router.push('/bookings')
    } catch (error) {
      Alert.alert('Error', 'There was an error booking the job.');
    }
  };

  return (
    <ScrollView className="flex-1 pt-5 bg-gray-100 pb-20">
      <MapView
        style={{ width: '100%', height: 500 }}
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
      <View className='mx-3'>
      <Text className="text-xl font-pbold mt-2 mb-3">{job.title}</Text>
      <Text className="text-md font-psemibold mb-3">Farm Size: {job.farmSize}</Text>
      <Text className="text-md font-psemibold mb-3">Start Time: {new Date(job.startTime).toLocaleString()}</Text>
      <Text className="text-md font-psemibold mb-3">Price/ha: KES {job.pricePerHectare}</Text>
      <Text className="text-md font-psemibold mb-3">Service type: {job.service}</Text>
      <Text className="text-md font-psemibold mb-3">Instructions: {job.instructions}</Text>

      {/* Job Actions */}
      <View className="flex flex-row flex-wrap mb-4 pb-10">
        <View className="w-1/2 p-1">
          <TouchableOpacity
            onPress={handleStartJob}
            style={{
              backgroundColor: '#4CAF50',
              borderRadius: 10,
              padding: 15,
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-center">Start Job</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 p-1">
          <TouchableOpacity
            onPress={handleEndJob}
            style={{
              backgroundColor: '#F44336',
              borderRadius: 10,
              padding: 15,
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-center">Complete Job</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 p-1">
          <TouchableOpacity
            onPress={handleBookJob}
            style={{
              backgroundColor: '#2196F3',
              borderRadius: 10,
              padding: 15,
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-center">Book Job</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 p-1">
          <TouchableOpacity
            onPress={handleCancelJob}
            style={{
              backgroundColor: '#FF9800',
              borderRadius: 10,
              padding: 15,
              alignItems: 'center',
            }}
          >
            <Text className="text-white text-center">Cancel Job</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      

      <BookingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleBookingSubmit}
        job={job}
      />
    </ScrollView>
  );
};

export default JobsDetails;
