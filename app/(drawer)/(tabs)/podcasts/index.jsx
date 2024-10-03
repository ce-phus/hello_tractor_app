import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import {fetchFarmingPodcasts} from "../../../../api/spotifyService"
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';

const podcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPodcasts = async () => {
      try {
        const podcastData = await fetchFarmingPodcasts(); // Fetch podcasts from Spotify
  
        
        const validPodcasts = podcastData.filter((podcast) => podcast !== null && podcast !== undefined);
  
        setPodcasts(validPodcasts); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
  
    loadPodcasts();
  }, []);
  

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return <Text>Error loading podcasts: {error.message}</Text>;
  }

  return (
    <>
      <Drawer.Screen
      options={{
        headerShown: true,
        title: "Podcasts",
        headerLeft: () => <DrawerToggleButton/>
      }}
      />
      <View className="flex-1 p-4 pt-10">
      <Text className="text-2xl font-bold mb-4">Farming Podcasts</Text>
      <FlatList
        data={podcasts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {/* Optionally handle podcast playback or open in Spotify */}}
            className="mb-4"
          >
            <Image
              source={{ uri: item.images[0].url }}
              style={{ width: 100, height: 100 }}
            />
            <Text className="text-lg font-bold">{item.name}</Text>
            <Text className="text-gray-500">{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </>
    
  )
}

export default podcasts