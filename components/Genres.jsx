import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { images, icons } from '../constants';

const { width } = Dimensions.get('window'); // Get the screen width

const genre = [
  {
    id: '1',
    title: 'Farm Small, Farm Smart',
    author: 'By: Diego Footer',
    image: images.podcast1, 
    description: "Strategies for small-scale farmers to thrive.",
    icon: icons.request,
  },
  {
    id: '2',
    title: 'The Farmer’s Podcast',
    author: 'By: John Doe',
    image: images.podcast2, 
    description: "Real stories from farmers around the world.",
    icon: icons.globe,
  },
  {
    id: '3',
    title: 'AgriTalk',
    author: 'By: Sarah Johnson',
    image: images.podcast3, 
    description: "Discussing the latest trends in agriculture.",
    icon: icons.track,
  },
  {
    id: '4',
    title: 'The Cultivator Podcast',
    author: 'By: Jane Smith',
    image: images.podcast1, 
    description: "Insights on sustainable farming practices.",
    icon: icons.briefcase,
  },
  {
    id: '5',
    title: 'Field to Fork',
    author: 'By: Mike Brown',
    image: images.podcast3, 
    description: "Connecting consumers with local farmers.",
    icon: icons.track,
  },
];

// Function to generate random color
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Genres = () => {
  const isLargeScreen = width > 600; // Check if the screen width is greater than 600px

  const renderSlider = ({ item }) => (
    <TouchableOpacity 
      className='rounded-lg shadow-lg p-4' 
      style={{ 
        margin: 5, 
        width: isLargeScreen ? width * 0.22 : width * 0.75, // Adjust width based on screen size
        backgroundColor: getRandomColor() // Apply random background color
      }} 
    >
      <Image
        source={item.icon}
        className='w-5 h-5 absolute top-2 left-2'
      />
      <View className='text-center space-y-2'>
        <Image
          source={item.image}
          className="w-full h-[100px]"
          resizeMode="contain"
        />
        <Text className='mt-5 text-xl font-pbold w-3/4 line-clamp-1'>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={genre}
        renderItem={renderSlider}
        keyExtractor={(item) => item.id.toString()}
        horizontal={!isLargeScreen} // Horizontal on small screens, vertical on large
        numColumns={isLargeScreen ? 4 : 1} // Use 4 columns on large screens, 1 on smaller
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ paddingLeft: 1 }}
      />
    </View>
  );
};

export default Genres;
