import { View, StyleSheet } from 'react-native';
import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { images } from '../constants';

const Carousel = () => {
    const slides = [
        require('../assets/images/tractor1.png'),
        require('../assets/images/tractor2.png'),
        require('../assets/images/farm3.png'),
        require('../assets/images/farm4.png'),
    ];

    return (
        <View style={styles.carouselContainer}>
            <SliderBox
                images={slides}
                dotColor='#FF8E01'
                inactiveDotColor='#1E1E2D'
                ImageComponentStyle={styles.imageStyle} 
                sliderBoxHeight={200}
                autoplay
                circleLoop
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: "center",
    },
    imageStyle: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
});

export default Carousel;
