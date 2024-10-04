import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, useWindowDimensions, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [greetings, setGreetings] = useState('');
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 2 : 1; 
  const router = useRouter();

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const storedBookings = await AsyncStorage.getItem('bookings');
        const storedFarms = await AsyncStorage.getItem('farms');

        let bookedJobs = storedBookings ? JSON.parse(storedBookings) : [];
        let createdFarms = storedFarms ? JSON.parse(storedFarms) : [];

        const allBookings = [...bookedJobs, ...createdFarms];
        setBookings(allBookings);
      } catch (error) {
        Alert.alert("Error", "Failed to load bookings");
      }
    };

    loadBookings();
  }, []);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreetings("Good Morning");
    } else if (currentHour < 18) {
      setGreetings("Good Afternoon");
    } else {
      setGreetings("Good Evening");
    }
  }, []); 

  const handleDeleteBooking = async (id, type) => {
    try {
      let updatedBookings = bookings;
      let updatedFarms = farms; 
  
      if (type === 'booking') {
        const storedBookings = bookings.filter((booking) => booking.id !== id);
        updatedBookings = storedBookings;
        await AsyncStorage.setItem('bookings', JSON.stringify(storedBookings));
      } else if (type === 'farm') {
        const storedFarms = farms.filter((farm) => farm.id !== id);
        updatedFarms = storedFarms;
        await AsyncStorage.setItem('farms', JSON.stringify(storedFarms));
      }
      const allBookings = [...updatedBookings, ...updatedFarms];
      setBookings(allBookings);
  
      Alert.alert('Success', 'Item deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete item');
    }
  };
  
  const handleRescheduleBooking = (id) => {
    Alert.alert("Reschedule", "Rescheduling feature not implemented yet");
  };

  const renderBookingItem = ({ item }) => (
    <View style={{ flex: 1, margin: 5 }}>
      <TouchableOpacity className='bg-white p-2 rounded-lg shadow-md mt-10 mb-10'>
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
            onPress={() => handleDeleteBooking(item.id)}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 5,
              borderWidth: 1,
            }}
            className='bg-black'
            onPress={() => handleRescheduleBooking(item.id)}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>Reschedule</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const ListHeaderComponent = () => (
    <View className='bg-secondary-100 h-[300px] rounded-b-lg relative'>
      <Text className='text-3xl font-pbold pt-20 mt-10 mx-3 text-white'>Your Bookings</Text>
      <Text className='mx-3 text-white font-psemibold mt-3 text-xl'>{greetings} Cephus</Text>
      <View className='absolute inset-x-5 -bottom-7 -translate-y-[50%]'>
        <View className='bg-white py-2 px-4 w-full items-center rounded-lg'>
          <View className='flex-row justify-between'>
            <TouchableOpacity className='bg-red-400 px-1.5 py-2 mr-4 rounded-lg' onPress={()=> router.push('/create')}>
              <Text className='text-white font-psemibold w-3/4 text-center'>Create Bookings</Text>
            </TouchableOpacity>
            <TouchableOpacity className='bg-black/70 py-2 rounded-lg px-4'
            onPress={()=> router.push('/alljobs')}>
              <Text className='text-white font-psemibold w-3/4 text-center'>Review Jobs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Bookings",
          headerLeft: () => <DrawerToggleButton />
        }}
      />
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={() => (
          <View className='p-4'>
            <Text>No bookings available</Text>
          </View>
        )}
      />
    </>
  );
}

export default Bookings;
