import { View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, Modal, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { images, icons } from '../constants';
import { Link } from 'expo-router';

export const jobs = [
  {
    id: 1,
    title: 'Plowing 10 Acres at Greenfield Farm',
    startTime: new Date('2024-10-01T08:00:00Z'),
    image: images.farm1,
  },
  {
    id: 2,
    title: 'Tilling 5 Acres at Riverside Farm',
    startTime: new Date('2024-09-30T09:00:00Z'),
    image: images.farm2,
  },
  {
    id: 3,
    title: 'Fertilizing 8 Acres at Hilltop Farm',
    startTime: new Date('2024-09-29T10:00:00Z'),
    image: images.farm5,
  },
  {
    id: 4,
    title: 'Harvesting 15 Acres at Oakwood Farm',
    startTime: new Date('2024-09-28T11:00:00Z'),
    image: images.farm6,
  },
  {
    id: 5,
    title: 'Planting 20 Acres at Sunnydale Farm',
    startTime: new Date('2024-10-05T07:00:00Z'),
    image: images.farm7,
  },
];

const sortedJobs = jobs.sort((a, b) => b.startTime - a.startTime);
const limitedJobs = sortedJobs.slice(0, 4);

const JobList = () => {
  const router = useRouter();
  const windowWidth = Dimensions.get('window').width;
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [newJob, setNewJob] = useState(null);

  const handleJobPress = (jobId) => {
    router.push(`jobdetails/${jobId}`);
  };

  const handleSeeAllJobs = () => {
    router.push('alljobs');
  };

  const renderJobDetails = ({ item }) => (
    <TouchableOpacity onPress={() => handleJobPress(item.id)} className="rounded-lg">
      <ImageBackground
        source={item.image}
        style={{
          width: 290,
          height: 290,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: '#ffffff',
          overflow: 'hidden',
        }}
      >
        <View className="p-2">
          <Text className="text-2xl font-semibold">{item.title}</Text>
          <Text className="text-lg font-medium">
            Time: {new Date(item.startTime).toLocaleString()}
          </Text>
        </View>
        <View className='absolute bottom-5 right-2 bg-black/50 px-1.5 py-1.5 rounded'>
          <Text className='text-xl font-psemibold text-white'>View Job</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderSeeAllButton = () => (
    <TouchableOpacity
      onPress={handleSeeAllJobs}
      style={{
        width: 290,
        height: 290,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
      }}
    >
      <Image source={icons.arrowRight} style={{ width: 50, height: 50 }} />
      <Text className="text-lg font-bold">See All Jobs</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    const jobInterval = setInterval(() => {
      const newDummyJob = {
        id: Math.random(),
        title: `New Job Created at ${new Date().toLocaleTimeString()}`,
        startTime: new Date(),
        image: images.farm1,
      };
      setNewJob(newDummyJob);
      setNotificationVisible(true);
    }, 100000); // Every 100 seconds

    return () => clearInterval(jobInterval);
  }, []);

  const closeNotification = () => {
    setNotificationVisible(false);
  };

  return (
    <View>
      <Text className="text-3xl font-bold mb-3">Recent Jobs</Text>
      <FlatList
        data={[...limitedJobs, { id: 'see-all', type: 'see-all' }]}
        renderItem={({ item }) =>
          item.type === 'see-all' ? renderSeeAllButton() : renderJobDetails({ item })
        }
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10 }}
      />
      {/* <Modal
        transparent={true}
        animationType="fade"
        visible={notificationVisible}
        onRequestClose={closeNotification}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
            <Text className="text-lg font-bold">New Job Alert!</Text>
            {newJob && <Text className="mt-2">{newJob.title} has been created.</Text>}
            <TouchableOpacity onPress={closeNotification} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
              <Text className="text-blue-500">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default JobList;
