import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { icons } from '../../../../constants';
import { Genres, PodcastView } from '../../../../components';

const podcasts = () => {
  return (
    <>
      <Drawer.Screen
        options={{
          headerShown: true,
          title: "Podcasts",
          headerLeft: () => <DrawerToggleButton />
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-secondary-200 h-[200px] rounded-b-lg">
          <Text className='text-3xl font-pbold pt-20 mt-10 mx-3 text-white'>Discover</Text>
          <View className='flex items-center justify-center'>
            <View className="w-3/4 h-10 px-2 bg-gray-300 rounded-2xl border-2 border-gray-200 focus:border-secondary flex flex-row items-center">
              <Image 
                source={icons.search}
                className='h-5 w-5 rounded-full'
              />
            </View>
          </View>
        </View>
        
        <View className='flex-row justify-between mt-3'>
          <Text className='text-xl font-psemibold mb-3 mx-3'>Genres</Text>
          <TouchableOpacity className='bg-secondary px-1.5 py-2 mr-3 rounded-lg'>
            <Text className='text-white font-psemibold text-lg'>View All</Text>
          </TouchableOpacity>
        </View>
        <Genres />
        <View className='flex-row justify-between'>
          <Text className='text-xl font-psemibold mb-3 mx-3'>Recently Played</Text>
          <TouchableOpacity className='bg-secondary px-1.5 py-2 mr-3 rounded-lg'>
            <Text className='text-white font-psemibold text-lg'>View All</Text>
          </TouchableOpacity>
        </View>
        <PodcastView />
      </ScrollView>
    </>
  );
}

export default podcasts;
