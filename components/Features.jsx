import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { images, icons } from '../constants';

const { width } = Dimensions.get('window'); // Get the screen width

export const slider = [
    {
        id: 1,
        image: images.review,
        title: 'Start, reschedule, or cancel jobs with a tap',
        icon: icons.request,
    },
    {
        id: 2,
        image: images.location,
        title: 'View detailed farm maps and boundaries',
        icon: icons.globe,
    },
    {
        id: 3,
        image: images.planning,
        title: 'Daily overviews and route planning',
        icon: icons.track,
    },
    {
        id: 4,
        image: images.award,
        title: 'Achieve milestones and track your progress.',
        icon: icons.briefcase,
    },
];

const Features = () => {
    const renderSlider = ({ item }) => (
        <TouchableOpacity 
            className='rounded-lg shadow-lg p-4 bg-white' 
            style={{ marginRight: 15, width: width * 0.75 }} // Set width to 75% of screen width
        >
            <Image
                source={item.icon}
                className='w-5 h-5 absolute top-2 left-2'
            />
            <View className='text-center space-y-2'>
                <Image
                    source={item.image}
                    className="w-[130px] h-[100px]"
                    resizeMode="contain"
                />
                <Text className='mt-5 text-xl font-pbold w-3/4 line-clamp-1'>{item.title}</Text>
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
                style={{ paddingLeft: 1 }}
            />
        </View>
    );
};

export default Features;
