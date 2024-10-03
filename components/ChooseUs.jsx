import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { images, icons } from '../constants';

export const slider = [
    {
        id: 1,
        image: images.aziza1,
        title: 'Get Job Requests Instantly',
        icon: icons.request,
    },
    {
        id: 2,
        image: images.aziza2,
        title: 'Plan Your Day Efficiently',
        icon: icons.globe,
    },
    {
        id: 3,
        image: images.aziza5,
        title: 'Track Your Journey to Tractor Ownership',
        icon: icons.track,
    },
    {
        id: 4,
        image: images.aziza4,
        title: 'Become a Booking Agent and Earn more',
        icon: icons.briefcase,
    },
];

const Choose = () => {

    const renderSlider = ({ item }) => (
        <TouchableOpacity className='rounded-lg shadow-lg p-4 bg-white' style={{ marginRight: 15 }}>
            <Image
                source={item.icon}
                className='w-5 h-5 absolute top-2 left-2'
            />
            <View className='text-center space-y-2'>
                <Image
                    source={item.image}
                    className='w-[250px] h-[150px]'
                />
                <Text className='mt-5 text-xl font-pbold w-3/4'>{item.title}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View>
            <FlatList
                data={slider}
                renderItem={renderSlider}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ paddingLeft: 10 }}
            />
        </View>
    );
};

export default Choose;
