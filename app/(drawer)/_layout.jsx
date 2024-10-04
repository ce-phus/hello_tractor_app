import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomDrawerContent from '../../components/CustomDrawerContent';

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerHideStatusBarOnOpen:true,
        drawerActiveBackgroundColor:'#ff461e',
        drawerActiveTintColor:'#ffff',
        drawerLabelStyle: { marginLeft: -20 },
        swipeEdgeWidth:0,
        headerShown:true,
        drawerLabelStyle: {
          fontSize: 16,
          fontFamily: 'Poppins-Bold'
        }
      }}>
        <Drawer.Screen
        name='(tabs)'
        options={{
            drawerLabel: 'Home',
            headerTitle: 'Home',
            drawerIcon: ({ size, color }) => (
                <Ionicons name="home" size={size} color={color} />
            ),
            headerShown:false
        }}/>
        <Drawer.Screen
        name='profile'
        options={{
            drawerLabel: 'Profile',
            headerTitle: '',
            drawerIcon: ({ size, color }) => (
                <Ionicons name="person-outline" size={size} color={color} />
            )
        }}/>
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
