import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {images} from '../constants';
import CustomButton from "../components/CustomButton"
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const index = () => {
    
  return (
    <SafeAreaView className='bg-white h-full'>
        <ScrollView
        contentContainerStyle={{
            height: "100%",
          }}
          >
            <View className='w-full flex justify-center items-center h-fulll px-4 pt-20'>
                <Image source={images.logo}
                className="w-[130px] h-[84px]"
                resizeMode="contain"
                />
                <Image
                source={images.image}
                className='max-w-[380px] w-full h-[298px]'
                resizeMode='contain'
                />
                <View className='relative mt-5'>
                    <Text className='text-3xl text- font-bold text-center'>
                        Discover Endless{'\n'}
                        Possibilities with{" "}
                        <Text className='text-secondary-200'>Hello Tractor</Text>
                    </Text>

                    <Image
                        source={images.path}
                        className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
                        resizeMode="contain"
                        />
                </View>

                <Text className="text-sm font-pregular text-gray-700 mt-7 text-center">
                    Where Creativity Meets Innovation: Embark on a Journey of Limitless
                    Exploration with hello tractor
                </Text>
                <CustomButton
                title="Get Started"
                handlePress={() => router.push("/home")}
                containerStyles="w-full mt-7"
            />
            </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default index