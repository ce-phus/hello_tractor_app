import { View, Text, Alert, ActivityIndicator, TouchableOpacity, Animated, Easing } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import MapView, { Polygon, Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as turf from "@turf/turf";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormField } from '../../../../components';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { ScrollView } from 'react-native-gesture-handler';
import {useRouter} from "expo-router"


const services = [
  { label: 'Planting/Seeding', price: 5000 },
  { label: 'Harrowing', price: 5000 },
  { label: 'Tilling', price: 5000 },
  { label: 'Ploughing', price: 8750 },
  { label: 'Ridging', price: 6000 },
];

const Create = () => {
  const router = useRouter()
  const [farmName, setFarmName] = useState('');
  const [farmPolygon, setFarmPolygon] = useState([]);
  const [service, setService] = useState('');
  const [servicePrice, setServicePrice] = useState(null);
  const [tracking, setTracking] = useState(false);
  const [locationSubscription, setLocationSubscription] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [bookings, setBookings] = useState([]); // To track bookings made

  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Function to handle service selection
  const handleServiceChange = (itemValue) => {
    const selectedService = services.find(s => s.label === itemValue);
    setService(itemValue);
    setServicePrice(selectedService ? selectedService.price : null);
  };

  const handleStartTracking = async () => {
    setTracking(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Location permissions not granted to track the farm boundary');
      return;
    }

    const subscription = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, distance: 10 },
      (newLocation) => {
        const { latitude, longitude } = newLocation.coords;
        setFarmPolygon((prev) => [...prev, { latitude, longitude }]);
        setCurrentLocation({ latitude, longitude });
      }
    );

    setLocationSubscription(subscription);
  };

  const handleStopTracking = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }

    setTracking(false);

    if (farmPolygon.length > 2) {
      const coordinates = farmPolygon.map(point => [point.longitude, point.latitude]);
      const polygon = turf.polygon([[...coordinates, coordinates[0]]]);
      const area = turf.area(polygon) / 10000;
      Alert.alert('Area Calculated', `The farm area is approximately ${area.toFixed(2)} hectares`);
    }
  };

  // Dummy Save Farm Data method
  const saveDummyFarmData = async () => {
    const dummyPolygon = [
      { latitude: 37.7749, longitude: -122.4194 },
      { latitude: 37.7750, longitude: -122.4184 },
      { latitude: 37.7755, longitude: -122.4184 },
      { latitude: 37.7755, longitude: -122.4194 },
    ];

    if (farmName && service) {
      const newFarm = {
        id: Date.now(),
        name: farmName,
        service: service,
        servicePrice: servicePrice,
        polygon: dummyPolygon, 
      };

      try {
        const existingFarms = await AsyncStorage.getItem('farms');
        let farmsArray = existingFarms ? JSON.parse(existingFarms) : [];

        farmsArray.push(newFarm); 

        await AsyncStorage.setItem('farms', JSON.stringify(farmsArray));
        setBookings(farmsArray); // Update bookings list
        Alert.alert('Farm Saved', 'Dummy farm data saved successfully');
      } catch (error) {
        Alert.alert("Error", "Failed to save the dummy farm data");
      }
    } else {
      Alert.alert('Error', 'Please enter a farm name and select a service');
    }
  };

  // Save the farm details along with the service
  const saveFarmData = async () => {
    if (service && farmName && farmPolygon.length > 0) {
      const newFarm = {
        id: Date.now(),
        name: farmName,
        service: service,
        servicePrice: servicePrice,
        polygon: farmPolygon,
      };

      try {
        const existingFarms = await AsyncStorage.getItem('farms');
        let farmsArray = existingFarms ? JSON.parse(existingFarms) : [];

        farmsArray.push(newFarm);
        await AsyncStorage.setItem('farms', JSON.stringify(farmsArray));
        setBookings(farmsArray); // Update bookings list

        Alert.alert('Farm Saved', 'Booking successfully saved after app reload');
        router.push('/bookings')
      } catch (error) {
        Alert.alert("Error", "Failed to save the farm");
      } 
    } else {
      Alert.alert('Error', 'Please enter a farm name, select a service, and define the farm boundary');
    }
  };

  // Load saved bookings from AsyncStorage
  useEffect(() => {
    const loadBookings = async () => {
      const savedBookings = await AsyncStorage.getItem('farms');
      if (savedBookings) {
        setBookings(JSON.parse(savedBookings));
      }
    };
    loadBookings();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Permission to access location was denied.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setCurrentLocation({ latitude, longitude });
      startPulseAnimation();
      setLoading(false);
    })();
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading your location...</Text>
      </View>
    );
  }

  return (
    <>
    <Drawer.Screen
    options={{
      headerShown: true,
      title: "Add Bookings",
      headerLeft: () => <DrawerToggleButton/>
    }}
    />
    <ScrollView>
  
      <View className='flex-1 pb-20'>
      <MapView
        style={{ width: "100%", height: 500 }}
        initialRegion={initialRegion}
      >
        {farmPolygon.length > 0 && (
          <Polygon
            coordinates={farmPolygon}
            fillColor="rgba(0, 200, 0, 0.3)"
            strokeColor="#32CD32"
            strokeWidth={2}
          />
        )}
        {currentLocation && (
          <Marker coordinate={currentLocation}>
            <Animated.View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'rgba(255, 0, 0, 0.8)',
                transform: [{ scale: pulseAnim }],
              }}
            />
          </Marker>
        )}
      </MapView>
      <Text className='text-2xl font-bold mb-4 mx-2'>Add a New Farm</Text>
      <FormField
        title='Enter Farm Name'
        value={farmName}
        handleChangeText={setFarmName}
        otherStyles='mb-3 mx-3'
      />

      {/* Service Dropdown */}
      <View className="mb-4 mx-3">
        <Text className='text-lg font-psemibold'>Select a Service</Text>
        <Picker
        className='font-psemibold'
          selectedValue={service}
          onValueChange={(itemValue) => handleServiceChange(itemValue)}
        >
          {services.map((s) => (
            <Picker.Item label={s.label} value={s.label} key={s.label} />
          ))}
        </Picker>
      </View>

      <View className='flex flex-row pb-20 mx-3'>
        <View className='mr-5 '>
          <TouchableOpacity
            style={{
              backgroundColor: tracking ? '#f44336' : '#2196F3',
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 5,
            }}
            onPress={tracking ? handleStopTracking : handleStartTracking}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {tracking ? "Stop Tracking" : "Start Tracking"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50', 
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
          onPress={saveFarmData}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Farm</Text>
        </TouchableOpacity>

        {/* Button for saving dummy data */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FFA500', 
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            marginLeft: 5,
          }}
          onPress={saveDummyFarmData}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Save Dummy Data</Text>
        </TouchableOpacity>
      </View>

      

    </View>
    </ScrollView>
     
    </>
    
  );
};

export default Create;
