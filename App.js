import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';

import Dashboard from './src/Dashboard';
import ViewCard from './src/ViewCard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard}
          options={{
            title: 'All Notes',
            headerStyle: {
              backgroundColor: '#1a1c1b',
            },
            headerTintColor: '#FAFAFA',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen 
          name="ViewCard" 
          component={ViewCard} 
          options={{
            title: 'Your Note',
            headerStyle: {
              backgroundColor: '#1a1c1b',
            },
            headerTintColor: '#FAFAFA',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}