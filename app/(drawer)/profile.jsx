import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '../../constants';

const TractorOperatorProfile = () => {
  const router = useRouter();

  
  const operatorData = {
    name: 'John Doe',
    age: 35,
    experience: '10 years',
    tractorModel: 'John Deere 5055E',
    tractorImage: images.profile, 
    ownedTractors: 3,
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <TouchableOpacity 
        className="bg-orange-500 p-4 items-center mb-5 rounded-lg mx-2"
        onPress={() => router.push('/dashboard')}
      >
        <Text className="text-white text-lg font-bold">🌟🌟 Go to Tractor Ownership Dashboard 🌟🌟</Text>
      </TouchableOpacity>

      <View className="px-5 py-5 items-center">
        <Image source={operatorData.tractorImage} className="w-24 h-24 rounded-lg mb-5" />
        <Text className="text-2xl font-bold mb-5">Profile Information</Text>

        <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
          <Text className="text-lg font-semibold">Name:</Text>
          <Text className="text-lg text-gray-700">{operatorData.name}</Text>
        </View>
        <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
          <Text className="text-lg font-semibold">Age:</Text>
          <Text className="text-lg text-gray-700">{operatorData.age}</Text>
        </View>
        <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
          <Text className="text-lg font-semibold">Experience:</Text>
          <Text className="text-lg text-gray-700">{operatorData.experience}</Text>
        </View>
        <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
          <Text className="text-lg font-semibold">Tractor Model:</Text>
          <Text className="text-lg text-gray-700">{operatorData.tractorModel}</Text>
        </View>
        <View className="flex-row justify-between w-full border-b border-gray-300 pb-2 mb-2">
          <Text className="text-lg font-semibold">Owned Tractors:</Text>
          <Text className="text-lg text-gray-700">{operatorData.ownedTractors}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default TractorOperatorProfile;
