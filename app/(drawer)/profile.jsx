import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

const TractorOperatorProfile = () => {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(-100)).current; // Start off-screen

  const operatorData = {
    name: 'John Doe',
    age: 35,
    experience: '10 years',
    tractorModel: 'John Deere 5055E',
    tractorImage: images.profile, 
    ownedTractors: 3,
  };

  useEffect(() => {
    // Animate the slide in
    Animated.timing(slideAnim, {
      toValue: 0, // Slide to the original position
      duration: 500, // Duration of animation
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [slideAnim]);

  return (
    <ScrollView className="flex-1 bg-white">
        <Animated.View style={{ transform: [{ translateY: slideAnim }], flex: 1, backgroundColor: 'white' }}>
          <TouchableOpacity 
            className="bg-secondary p-4 items-center mb-5 rounded-lg mx-2"
            onPress={() => router.push('/dashboard')}
          >
            <Text className="text-white text-lg font-bold">🌟🌟 Go to Tractor Ownership Dashboard 🌟🌟</Text>
          </TouchableOpacity>
        </Animated.View>

        <View className="px-5 py-5 items-center">
          <Image source={operatorData.tractorImage} className="w-24 h-24 rounded-lg mb-5" />
          <Text className="text-2xl font-pbold mb-5">Profile Information</Text>

          <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
            <Text className="text-lg font-psemibold">Name:</Text>
            <Text className="text-lg text-gray-700 font-psemibold">{operatorData.name}</Text>
          </View>
          <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
            <Text className="text-lg font-psemibold">Age:</Text>
            <Text className="text-lg text-gray-700 font-psemibold">{operatorData.age}</Text>
          </View>
          <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
            <Text className="text-lg font-psemibold">Experience:</Text>
            <Text className="text-lg text-gray-700 font-psemibold">{operatorData.experience}</Text>
          </View>
          <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
            <Text className="text-lg font-psemibold">Tractor Model:</Text>
            <Text className="text-lg text-gray-700 font-psemibold">{operatorData.tractorModel}</Text>
          </View>
          <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
            <Text className="text-lg font-psemibold">Owned Tractors:</Text>
            <Text className="text-lg text-gray-700 font-psemibold">{operatorData.ownedTractors}</Text>
          </View>
        </View>
      </ScrollView>
    
  );
};

export default TractorOperatorProfile;
