import { View, Text, Image } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { images } from '../constants'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CustomDrawerContent = (props) => {
  const router = useRouter();
  const { bottom, top } = useSafeAreaInsets()
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ paddingTop: 20, backgroundColor:'#FF9001',fontSize: 24 }}
      >
        <View style={{ alignItems: 'center', marginBottom: 20 }} className='mt-10'>
          <Image
            source={images.profile}
            style={{ width: 100, height: 100, borderRadius: 50 }}
            resizeMode="cover"
          />
          <Text className='text-lg text-white font-pbold mt-2'>Cephus Luke</Text>
        </View>
        <View style={{backgroundColor:'#fff', paddingTop:10 }} className='mt-'>
        <DrawerItemList {...props} />
        <DrawerItem label={'Logout'} onPress={() => router.replace('/')} />
        </View>
        
      </DrawerContentScrollView>

      <View style={{ borderTopWidth: 1, borderTopColor: '#dde3fe', padding: 20 + bottom }}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;
