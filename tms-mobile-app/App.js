import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Profile from './screens/profile';
import AuthScreen from '../tms-mobile-app/screens/auth-mobile';
import { createStackNavigator } from '@react-navigation/stack';
import Project from "./screens/project"
import Projects from './screens/projects';
import Tasks from './screens/tasks';
import ProjectInfo from './screens/project-info';
import SaveTask from './screens/saveTask'
import Task from './screens/task'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth'>
        <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Project" component={Project} options={{headerShown: false}}/>
        <Stack.Screen name="Projects" component={Projects} options={{headerShown: false}}/>
        <Stack.Screen name="Tasks" component={Tasks} options={{headerShown: false}}/>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name="ProjectInfo" component={ProjectInfo} options={{headerShown: false}}/>
        <Stack.Screen name="SaveTask" component={SaveTask} options={{headerShown: false}}/>
        <Stack.Screen name="Task" component={Task} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

