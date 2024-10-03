import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from 'expo-router';
import { SliderBox } from 'react-native-image-slider-box';
import JobList from '../../../../components/JobList';
import { images } from '../../../../constants';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const SLIDER_WIDTH = Dimensions.get('window').width;
const SLIDER_HEIGHT = 300;

const jobCategories = [
  {
    title: "Upcoming Jobs",
    title1: "Future Opportunities",
    image: images.tractor1,
  },
  {
    title: "Ongoing Jobs",
    title1: "Current Projects",
    image: images.tractor2,
    link: 'ongoingjobscreen',
  },
  {
    title: "Paused Jobs",
    title1: "On Hold Jobs",
    image: images.tractor3,
    link: 'pausedjobsreen',
  },
  {
    title: "Completed Jobs",
    title1: "Finished Tasks",
    image: images.tractor4,
    link: '/dashboard',
  },
];

const Jobs = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;  // Ref for the parallax effect

 

  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Jobs",
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} className="pb-20">
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }  // Ensure native driver is enabled
          )}
        >
          <View style={{ height: SLIDER_HEIGHT }}>
            <SliderBox
              images={jobCategories.map((item) => item.image)}
              dotColor="#FF8E01"
              inactiveDotColor="#1E1E2D"
              ImageComponentStyle={styles.imageStyle}
              sliderBoxHeight={SLIDER_HEIGHT}
              autoplay
              circleLoop
              onCurrentImagePressed={(index) => setIndex(index)}
            />
          </View>
          <JobList />
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: SLIDER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    zIndex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#FF8E01',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageStyle: {
    borderRadius: 15,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});

export default Jobs;
