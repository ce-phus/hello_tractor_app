import { View, Text } from 'react-native'
import React from 'react'
import Carousel from './Carousel'

const Works = () => {
  return (
    <View className='space-y-2'>
      <Text className='text-xl font-pbold'>How it works</Text>
      <Text className='text-sm font-psemibold'>🔔 Get Job Requests – Receive real-time job notifications.</Text>
      <Text className='text-sm font-psemibold'>🗺 Plan Your Day – Use optimized routes to save time and fuel.</Text>
      <Text className='text-sm font-psemibold'>🚜 Complete Jobs – Easily track and log job completion</Text>
      <Text className='text-sm font-psemibold'>📈 Track Progress – Follow your path to tractor ownership with the Ownership Dashboard.</Text>
    </View>
  )
}

export default Works