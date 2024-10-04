import { View, Text, Button, ScrollView, TouchableOpacity, Image, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Logo, ChooseUs, Works, Carousel, Features } from '../../../../components';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { images } from '../../../../constants';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Home = () => {
  const router = useRouter();
  const [newJob, setNewJob] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); 

  const handlepress = () => {
    router.push('/jobs');
  };

  
  const checkForNewJobs = () => {
    setTimeout(() => {
      setNewJob(true);
    }, 10000); 
  };

  useEffect(() => {
    checkForNewJobs();
  }, []);

  useEffect(() => {
    if (newJob) {
      setModalVisible(true); 
      setNewJob(false);
    }
  }, [newJob]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Home",
          headerLeft: () => <DrawerToggleButton />
        }}
      />
      <ScrollView className="px-4 mt-2 pt-20">
        <View className='pb-20'>
          <StatusBar backgroundColor="#161622" style="light" />
          <Logo />
          <View className="mb-4">
            <Text className="text-xl font-pbold">
              Why Choose Us
            </Text>
          </View>
          <ChooseUs />

          <View className="flex items-center mt-2 text-center">
            <TouchableOpacity className='w-full py-2 bg-black rounded-lg' onPress={handlepress}>
              <Text className='text-lg font-psemibold text-white text-center'>View Jobs!</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 300 }}>
            <Carousel />
          </View>

          <Works />

          <View className="mt-6">
            <Text className='text-xl font-pbold mb-3'>🌟App Features</Text>
            <Features />
          </View>

          <View className="mt-6 pb-20 mb-10">
            <View className='flex flex-row'>
              <Image
                source={images.award1}
                className="w-9 h-9"
                resizeMode="contain" />
              <Text className="text-xl font-psemibold mb-2">Incentives & Rewards</Text>
            </View>
            <Text className="text-sm font-psemibold">"Unlock bonuses, discounts, and special perks as you work towards your dream of owning a tractor!"</Text>
          </View>
        </View>
      </ScrollView>

      {/* Modal for new job notification */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <Text className="text-2xl font-bold text-center">🔔 New Job Available!</Text>
            <Text className="text-center mt-4 mb-6 text-gray-600">A new job has been posted. Check the Jobs section for more details.</Text>
            <TouchableOpacity
              className="bg-blue-500 py-2 rounded-full"
              onPress={closeModal}
            >
              <Text className="text-white text-center font-semibold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Home;
