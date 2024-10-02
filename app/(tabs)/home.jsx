import { View, Text, Image, ScrollView, Dimensions, ImageBackground } from 'react-native';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import Carousel from 'react-native-reanimated-carousel';
import JobList from '../../components/JobList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as lor,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const SLIDER_WIDTH = Dimensions.get('window').width;


const jobCategories = [
  {
    title: "Upcoming Jobs",
    title1: "Future Opportunities",
    image: require('../../assets/images/tractor1.png'),
    link: 'home',
  },
  {
    title: "Ongoing Jobs",
    title1: "Current Projects",
    image: require('../../assets/images/tractor2.png'),
    link: 'ongoingjobscreen',
  },
  {
    title: "Paused Jobs",
    title1: "On Hold Jobs",
    image: require('../../assets/images/farm3.png'),
    link: 'pausedjobsreen',
  },
  {
    title: "Completed Jobs",
    title1: "Finished Tasks",
    image: require('../../assets/images/farm4.png'),
    link: 'completedjobsreen',
  },
];


const Home = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = ({ item }) => (
    <ImageBackground
      source={item.image}
      className="w-full h-full justify-center items-center rounded-b-lg overflow-hidden"
      resizeMode='cover'
    >
      <Text className="text-white font-psemibold text-center text-3xl font-bold">{item.title1}</Text>
      <View className="flex-1 absolute bottom-0 w-3/4 px-1.5 mb-2 ml-2 py-1.5 rounded">
        <Text className="text-white bg-secondary-200 font-psemibold text-center mb-3 text-xl font-bold rounded py-1.5"
          onPress={() => navigation.navigate(jobCategories[index].link)}
        >
          {item.title}
        </Text>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView style={{ flex: 1 }}>
        <View className="flex-1 bg-white justify-center">
          <Carousel
            ref={carouselRef}
            data={jobCategories}
            renderItem={renderItem}
            width={SLIDER_WIDTH}
            height={300}
            onSnapToItem={(index) => setIndex(index)}
            loop={true}
            pagingEnabled={true}
            scrollAnimationDuration={300} 
          />
        </View>
        <JobList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;