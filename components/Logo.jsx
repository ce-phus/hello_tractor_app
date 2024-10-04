import { View, Text, Image, Animated, Dimensions } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { images } from '../constants';

// Get the screen width to determine animation range
const screenWidth = Dimensions.get('window').width;

const AnimatedAdvert = ({ title }) => {
  const translateX = useRef(new Animated.Value(screenWidth)).current; // Start from screen width

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -screenWidth, // End off-screen to the left
        duration: 9000,
        useNativeDriver: true,
      })
    ).start();
  }, [translateX]);

  return (
    <Animated.View style={{ transform: [{ translateX }] }}
    className='full'>
      <Text className='text-gray-200 text-lg font-semibold'>{title}</Text>
    </Animated.View>
  );
};

const Logo = () => {
  return (
    <View className="mx-1 mb-4 relative">
        <View className='pb-20'>
        <Image
        source={images.logo}
        className="w-[130px] h-[50px] absolute right-0"
        resizeMode="contain"
      />
        </View>
      
      <View className="flex-row flex-wrap px-1.5 py-2  bg-secondary-100 rounded-lg">
        <AnimatedAdvert
          title="More Jobs, More Progress – The Road to Tractor Ownership Begins Today!"
        />
      </View>
    </View>
  );
};

export default Logo;
