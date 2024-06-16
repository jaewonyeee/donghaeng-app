import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import ContactScreen from './screens/ContactScreen';
import FuneralPlanning_101 from './screens/FuneralPlanning_101';
import FuneralPlanning_102 from './screens/FuneralPlanning_102';
import FuneralPlanning_201 from './screens/FuneralPlanning_201';
import FuneralPlanning_202 from './screens/FuneralPlanning_202';
import FuneralPlanning_301 from './screens/FuneralPlanning_301';
import FuneralPlanning_401 from './screens/FuneralPlanning_401';
import FuneralPlanning_402 from './screens/FuneralPlanning_402';
import FuneralPlanning_403 from './screens/FuneralPlanning_403';
import FuneralPlanning_404 from './screens/FuneralPlanning_404';
import FuneralPlanning_501 from './screens/FuneralPlanning_501';
import FuneralPlanning_601 from './screens/FuneralPlanning_601';
import FuneralPlanning_701 from './screens/FuneralPlanning_701';
import FuneralPlanning_801 from './screens/FuneralPlanning_801';
import FuneralPlanning_802 from './screens/FuneralPlanning_802';
import FuneralPlanning_803 from './screens/FuneralPlanning_803';
import FuneralPlanning_901 from './screens/FuneralPlanning_901';
import FuneralConsulting_101 from './screens/FuneralConsulting_101';
import FuneralStatus_101 from './screens/FuneralStatus_101';
import { FuneralProvider } from './FuneralContext';

/*Review Screen Import*/
import FuneralReviewScreen from './screens/review/FuneralReviewScreen';
import CreatePostScreen from './screens/review/CreatePostScreen';
import PostDetailScreen from './screens/review/PostDetailScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const FuneralReviewStack = createNativeStackNavigator();

function FuneralReviewStackNavigator() {
  return (
    <FuneralReviewStack.Navigator>
      <FuneralReviewStack.Screen name="FuneralReviewScreen" component={FuneralReviewScreen} options={{ headerShown: false }} />
      <FuneralReviewStack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{ headerShown: false }} />
      <FuneralReviewStack.Screen name="PostDetailScreen" component={PostDetailScreen} options={{ headerShown: false }} />
    </FuneralReviewStack.Navigator>
  );
}

export function HomeStack() {
  return (
    <Stack.Navigator>
      
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralConsulting_101" component={FuneralConsulting_101} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralStatus_101" component={FuneralStatus_101} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_101" component={FuneralPlanning_101} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_102" component={FuneralPlanning_102} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_201" component={FuneralPlanning_201} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_202" component={FuneralPlanning_202} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_301" component={FuneralPlanning_301} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_401" component={FuneralPlanning_401} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_402" component={FuneralPlanning_402} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_403" component={FuneralPlanning_403} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_404" component={FuneralPlanning_404} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_501" component={FuneralPlanning_501} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_601" component={FuneralPlanning_601} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_701" component={FuneralPlanning_701} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_801" component={FuneralPlanning_801} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_802" component={FuneralPlanning_802} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_803" component={FuneralPlanning_803} options={{ headerShown: false }} />
      <Stack.Screen name="FuneralPlanning_901" component={FuneralPlanning_901} options={{ headerShown: false }} />

      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FuneralProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'HomeStack') {
                iconName = 'home';
              } else if (route.name === 'FuneralStatus') {
                iconName = 'list';
              } else if (route.name === 'FuneralReview') {
                iconName = 'star';
              } else if (route.name === 'Contact') {
                iconName = 'file-text';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: '홈' }} />
          <Tab.Screen name="FuneralStatus" component={FuneralStatus_101} options={{ title: '장례현황' }} />
          <Tab.Screen name="FuneralReview" component={FuneralReviewStackNavigator} options={{ title: '장례리뷰' }} />
          <Tab.Screen name="Contact" component={ContactScreen} options={{ title: '행정서류' }} />
        </Tab.Navigator>
      </NavigationContainer>
    </FuneralProvider>
  );
}
