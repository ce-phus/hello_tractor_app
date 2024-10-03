import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { width } = useWindowDimensions();

  const numColumns = width > 768 ? 4 : 1;

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        const storedFarms = await AsyncStorage.getItem('farms');

        let bookedJobs = storedBookings ? JSON.parse(storedBookings) : [];
        let createdFarms = storedFarms ? JSON.parse(storedFarms) : [];

        // Combine booked jobs and created farms into a single array
        const allBookings = [...bookedJobs, ...createdFarms];

        setBookings(allBookings);
      } catch (error) {
        Alert.alert("Error", "Failed to load bookings");
      }
    };

    loadBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      const storedFarms = await AsyncStorage.getItem('farms');
  
      let bookedJobs = storedBookings ? JSON.parse(storedBookings) : [];
      let createdFarms = storedFarms ? JSON.parse(storedFarms) : [];
  
      if (bookedJobs.some((b) => b.id === id)) {
        bookedJobs = bookedJobs.filter((b) => b.id !== id);
        await AsyncStorage.setItem('bookings', JSON.stringify(bookedJobs));
      } else if (createdFarms.some((f) => f.id === id)) {
        createdFarms = createdFarms.filter((f) => f.id !== id);
        await AsyncStorage.setItem('farms', JSON.stringify(createdFarms));
      }
  
      const allBookings = [...bookedJobs, ...createdFarms];
      setBookings(allBookings);
    } catch (error) {
      Alert.alert("Error", "Failed to delete booking");
    }
  };

  const handleRescheduleBooking = (id) => {
    Alert.alert("Reschedule", "Rescheduling feature not implemented yet");
  };

  const renderBookingItem = ({ item, cardWidth }) => (
    <TouchableOpacity
      className='bg-white p-2 rounded-lg shadow-md mb-2'
    >
      <Text className='text-xl font-psemibold mb-2'>Farm Name: {item.name}</Text>
      <Text className='text-lg font-psemibold mb-2'>Service type: {item.service}</Text>
      <Text className='text-lg font-psemibold mb-2'>Price per ha: KES {item.servicePrice}</Text>
      <View className='flex-row justify-between'>
  <TouchableOpacity
    style={{
      backgroundColor: '#F44336',
      padding: 10,
      borderRadius: 5,
      borderColor: '#F44336',
      borderWidth: 1,
    }}
  >
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      onPress={() => handleDeleteBooking(item.id)}
    >
      Delete
    </Text>
  </TouchableOpacity>
  <TouchableOpacity
    style={{
      
      padding: 10,
      borderRadius: 5,
      borderWidth: 1,
    }}
    className='bg-black'
  >
    <Text
      style={{
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      }}
      onPress={() => handleRescheduleBooking(item.id)}
    >
      Reschedule
    </Text>
  </TouchableOpacity>
</View>
    </TouchableOpacity>
  );

  return (
    <>
    <Drawer.Screen
    options={{
      headerShown: true,
      title: "Bookings",
      headerLeft: () => <DrawerToggleButton/>
    }}
    />
      <View className='mx-3 pt-20 mt-4 pb-20'>
      <Text className='text-3xl font-pbold'>Your Bookings</Text>

      {bookings.length > 0 ? (
        <FlatList
          data={bookings}
          renderItem={renderBookingItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={numColumns} 
          key={numColumns} 
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No bookings found</Text>
        </View>
      )}
    </View>
    </>
    
  );
};

export default Bookings;
