import { View, Text, FlatList, useWindowDimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { jobs } from '../../components/jobs';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

// Job Card component
const JobCard = ({ job, cardWidth }) => {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/jobdetails/${job.id}`);
  };

  return (
    <TouchableOpacity onPress={() => handlePress(job.id)} style={{ width: cardWidth }}>
      <View className="bg-white p-2 rounded-lg shadow-md mb-4">
        <Image source={job.image} className="rounded-md mb-2" style={{ width: '100%', height: 150 }} resizeMode="cover" />
        <Text className="text-xl font-bold mb-1">{job.title}</Text>
        <Text className="text-md font-semibold text-gray-600 mb-1">
          {format(new Date(job.startTime), "do MMMM yyyy")}
        </Text>
        <Text className="text-md font-semibold text-lg mb-1">Farm Size: {job.farmSize}</Text>
        <Text className="text-md font-semibold text-lg mb-1">Instructions: {job.instructions}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Main Component
const AllJobs = () => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;
  const [sortedJobs, setSortedJobs] = useState([]);

  // Sorting jobs by most recent startTime
  useEffect(() => {
    const sorted = [...jobs].sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    setSortedJobs(sorted);
  }, []);

  // Define the number of columns and card width based on device type
  const numColumns = isTablet ? 3 : 1;
  const cardWidth = isTablet ? width / numColumns - 20 : '100%';

  return (
    <View className="flex-1 p-4 bg-gray-100 pt-10">
      <FlatList
        data={sortedJobs}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        renderItem={({ item }) => (
          <View style={{ flex: 1 }}>
            <JobCard job={item} cardWidth={cardWidth} />
          </View>
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </View>
  );
};

export default AllJobs;
