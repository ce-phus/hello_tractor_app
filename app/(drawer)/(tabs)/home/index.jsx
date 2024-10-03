
import { View, Text, Button, ScrollView, TouchableOpacity, Image  } from 'react-native'
import React from 'react'
import { Logo, ChooseUs, Works, Carousel, Features } from '../../../../components'
import { StatusBar } from 'expo-status-bar'
import { useRouter } from 'expo-router'
import { images } from '../../../../constants'
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const Home = () => {
  const router = useRouter()
  const handlepress = () => {
    router.push('/jobs')
  }

  return (
    <>
    <Drawer.Screen
    options={{
      headerShown: true,
      title: "Home",
      headerLeft: () => <DrawerToggleButton/>
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
          <ChooseUs/>
          
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
            <Text className='text-xl font-pbold'>🌟App Features</Text>
            <Features />
          </View>


          <View className="mt-6 pb-20 mb-10">
            <View className='flex flex-row'>
              <Image
              source={images.award1}
              className="w-9 h-9"
              resizeMode="contain"/>
            <Text className="text-xl  font-psemibold mb-2">Incentives & Rewards</Text>

            </View>
            <Text className="text-sm font-psemibold">"Unlock bonuses, discounts, and special perks as you work towards your dream of owning a tractor!"</Text>
          </View>
      </View>
      </ScrollView>
    </>
      
  );
};

export default Home;
