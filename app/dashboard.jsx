import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Circular progress constants
const circleRadius = 100;
const strokeWidth = 20; // Increased stroke width
const circleCircumference = 2 * Math.PI * circleRadius;

const TrackerOwnerDashboard = () => {
  const [completedJobs, setCompletedJobs] = useState([]);
  const [progress, setProgress] = useState(0); 
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const totalJobsForOwnership = 15;

  useEffect(() => {
    const fetchCompletedJobs = async () => {
      try {
        const storedCompletedJobs = await AsyncStorage.getItem('completedJobs');
        if (storedCompletedJobs) {
          const completed = JSON.parse(storedCompletedJobs);
          setCompletedJobs(completed);
          updateProgress(completed.length); 
        }
      } catch (error) {
        console.log('Error fetching completed jobs:', error);
      }
    };

    fetchCompletedJobs();
  }, []);

  useEffect(() => {
    // Reset animation on component mount
    animatedProgress.setValue(0);
  }, []);

  const updateProgress = (completedCount) => {
    const newProgress = Math.min(completedCount / totalJobsForOwnership, 1);
    setProgress(newProgress);
    
    Animated.timing(animatedProgress, {
      toValue: newProgress,
      duration: 1000, 
      useNativeDriver: false, 
    }).start();
  };

  return (
    <ScrollView className="pb-20">
      {/* Circular Progress Tracker */}
      <View className="items-center justify-center mb-6 bg-black pt-20">
        <Text className="text-2xl font-bold mb-4 text-center text-white">🏆 Tractor Ownership Progress 🏆</Text>
        <Svg height="250" width="250" viewBox="0 0 250 250">
          {/* Background Circle (gray) */}
          <Circle
            cx="125"
            cy="125"
            r={circleRadius}
            stroke="#E6E6E6" // Gray background color
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Animated Progress Circle */}
          <AnimatedCircle
            cx="125"
            cy="125"
            r={circleRadius}
            stroke="#4CAF50" // Progress bar color
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circleCircumference}
            strokeDashoffset={animatedProgress.interpolate({
              inputRange: [0, 1],
              outputRange: [circleCircumference, 0], 
            })}
            strokeLinecap="round"
          />
          {/* Progress Text in the middle of the circle */}
          <Text 
            x="125" 
            y="125" 
            textAnchor="middle" 
            alignmentBaseline="middle" 
            fontSize="24" 
            fill="white" 
            fontWeight="bold"
          >
            {Math.round(progress * 100)}%
          </Text>
        </Svg>

        {/* Progress Text */}
        <Text className="text-2xl text-center mt-4 mb-4 font-pbold text-white">
          {Math.round(progress * 100)}% Completed
        </Text>
      </View>

      {/* Completed Jobs List */}
      <Text className="text-xl font-bold mb-3">Completed Jobs</Text>
      {completedJobs.length > 0 ? (
        completedJobs.map((job) => (
          <View
            key={job.id}
            className="mb-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200 pb-20"
          >
            <Text className="text-lg font-bold text-gray-900">{job.title}</Text>
            <Text className="text-sm text-gray-600 font-psemibold mb-2">Service: {job.service}</Text>
            <Text className="text-sm text-gray-600 font-psemibold mb-2">Price per Hectare: KES {job.price}</Text>
            <Text className="text-sm text-gray-600 font-psemibold mb-2">Duration: {job.duration} hours</Text>
            <Text className="text-sm text-gray-600 font-psemibold mb-2">
              Start Time: {new Date(job.startTime).toLocaleString()}
            </Text>
            <Text className="text-sm text-gray-600 font-psemibold mb-2">Instructions: {job.instructions}</Text>
          </View>
        ))
      ) : (
        <Text className="text-sm text-gray-500">No completed jobs yet.</Text>
      )}
    </ScrollView>
  );
};

// Circular Animated Circle Component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default TrackerOwnerDashboard;
