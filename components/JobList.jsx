import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import MapView, { Polygon } from 'react-native-maps'; 
import { jobs } from './jobs';

const services = [
  { label: 'Planting/Seeding', price: 5000 },
  { label: 'Harrowing', price: 5000 },
  { label: 'Tilling', price: 5000 },
  { label: 'Ploughing', price: 8750 },
  { label: 'Ridging', price: 6000 },
];

const sortedJobs = jobs.sort((a, b) => b.startTime - a.startTime);
const limitedJobs = sortedJobs.slice(0, 4); 

const JobList = () => {
  const router = useRouter();
  const windowWidth = Dimensions.get('window').width;

  const handleJobPress = (jobId) => {
    router.push(`jobdetails/${jobId}`);
  };

  const handleSeeAllJobs = () => {
    router.push('alljobs');
  };

  const renderJobDetails = (item) => (
    <TouchableOpacity 
      style={{
        flexDirection: windowWidth < 600 ? 'column' : 'row',
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 16,
        borderRadius: 10,
        overflow: 'hidden',
      }}
    >
      <MapView
        style={{ width: windowWidth < 600 ? '100%' : windowWidth * 0.5, height: 250 }}
        initialRegion={{
          latitude: item.farmLocation.latitude,
          longitude: item.farmLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Polygon
          coordinates={item.farmPolygon}
          strokeColor="#000"
          fillColor="rgba(0, 200, 0, 0.3)"
          strokeWidth={2}
        />
      </MapView>

      <View style={{ padding: 16, width: windowWidth < 600 ? '100%' : '50%', justifyContent: 'space-between' }}>
        <View>
          <Text className='text-xl font-pbold mb-2'>{item.title}</Text>
          <Text className='text-md font-psemibold mb-2'>
             Time: {new Date(item.startTime).toLocaleString()}
          </Text>
          <Text className='text-md font-psemibold mb-2'>Service: {item.service}</Text>
          <Text className='text-md font-psemibold mb-2'>Farm Size: {item.farmSize}</Text>
        </View>
        
        {/* Change View to TouchableOpacity */}
        <TouchableOpacity 
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            paddingHorizontal: 12, 
            paddingVertical: 8, 
            borderRadius: 8, 
            alignSelf: 'flex-end' 
          }}
          onPress={() => handleJobPress(item.id)} // Add onPress here
        >
          <Text className='text-lg text-white font-psemibold'>View Job</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ paddingHorizontal: 5, marginBottom: 20 }}>
      <Text className='text-xl font-pbold mt-4 mb-3'>Recent Jobs</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {limitedJobs.map((item) => renderJobDetails(item))}

        <TouchableOpacity
          onPress={handleSeeAllJobs}
          style={{
            backgroundColor: '#FF6347',
            borderRadius: 10,
            width: '100%',
            height: 64,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>See All Jobs</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default JobList;
