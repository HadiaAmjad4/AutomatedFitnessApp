import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FitnessContext } from './Context';
import WorkHomeScreen from './src/screen/WorkHomeScreen';
import WorkoutScree from './src/screen/WorkoutScree';

import RestScreen from './src/screen/RestScreen';
import FitScreen from './src/screen/FitScreen';

import MealScreen from './src/screen/MealScreen';
import DiabetesScreen from './src/screen/DiabetesScreen';
import HypertensionScreen from './src/screen/HypertensionScreen';
import BothScreen from './src/screen/BothScreen';
import NothingScreen from './src/screen/NothingScreen';

import HomeScreen from './src/screen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import MainScreen from './src/screen/MainScreen';
import SignupScreen from './src/SignupScreen';
import Calculator from './src/screen/Calculator';
import WaterIntake from './src/screen/WaterIntake';
import PedometerScreen from './src/screen/PedometerScreen';
import TestScreen from './src/screen/TestScreen';
import TestScreen2 from './src/screen/TestScreen2';
import TestScreen3 from './src/screen/TestScreen3';
import TestScreen4 from './src/screen/TestScreen4';
import ChatBot from './src/ChatBot';
import Classification from './Classification';
import ProfileScreen from './src/screen/ProfileScreen';
import RecipeScreen from './src/screen/RecipeScreen';
import WorkoutScreen from './src/screen/WorkoutScreen';
import DoctorScreen from './src/screen/DoctorScreen';
import NameScreen from './src/screen/NameScreen';
import AgeScreen from './src/screen/AgeScreen';
import EmailScreen from './src/screen/EmailScreen';
import MenuScreen from './src/screen/MenuScreen';
import RoleScreen from './src/screen/RoleScreen';
import GenderScreen from './src/screen/GenderScreen';
import WeightScreen from './src/screen/WeightScreen';
import HeightScreen from './src/screen/HeightScreen';
import PasswordScreen from './src/screen/PasswordScreen';
import FoodCompositionScreen from './src/screen/FoodCompositionScreen';
import MealRecommendationScreen from './src/screen/MealRecommendationScreen'

import DoctorHomeScreen from './src/screen/doctor/HomeScreen';
import ViewPatientsScreen from './src/screen/doctor/ViewPatientsScreen';
import RequestsScreen from './src/screen/doctor/RequestsScreen';
import FirstScreen from './src/screen/FirstScreen';


export default function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FitnessContext>
        <NavigationContainer>
      
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* <Stack.Screen name="doctor_home" component={DoctorHomeScreen} /> */}
            <Stack.Screen name="first" component={FirstScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />

            {/* SIGN-UP STEP SCREENS */}
            <Stack.Screen name="role" component={RoleScreen} />
            <Stack.Screen name="gender" component={GenderScreen} />
            <Stack.Screen name="name" component={NameScreen} />
            <Stack.Screen name="email" component={EmailScreen} />
            <Stack.Screen name="password" component={PasswordScreen} />
            <Stack.Screen name="age" component={AgeScreen} />
            <Stack.Screen name="weight" component={WeightScreen} />
            <Stack.Screen name="height" component={HeightScreen} />

            {/* PATIENT SCREENS */}
            <Stack.Screen name="menu" component={MenuScreen} />
            <Stack.Screen name="profile" component={ProfileScreen} />
            <Stack.Screen name="cal" component={Calculator} />
            <Stack.Screen name="classif" component={Classification} />
            <Stack.Screen name="meal_recommendation" component={MealRecommendationScreen} options={{ headerShown: true, headerTitle: 'MEAL RECOMMENDATION' }} />
            <Stack.Screen name="Pedo" component={PedometerScreen} />
            <Stack.Screen name="Water" component={WaterIntake} />
            <Stack.Screen name="Recipe" component={RecipeScreen} />
            {/* <Stack.Screen name="Workout" component={WorkoutScree} /> */}
            <Stack.Screen name="doctor" component={DoctorScreen} options={{ headerShown: true, headerTitle: 'DOCTORS' }} />
            <Stack.Screen name="food_composition" component={FoodCompositionScreen} options={{ headerShown: true, headerTitle: 'FOOD COMPOSITION' }} />

            {/* DOCTOR SCREENS */}
            <Stack.Screen name="test" component={TestScreen} />
            <Stack.Screen name="doctor_home" component={DoctorHomeScreen} />
            <Stack.Screen name="view_patients" component={ViewPatientsScreen} options={{ headerShown: true, headerTitle: 'PATIENTS' }} />
            <Stack.Screen name="doctor_requests" component={RequestsScreen} options={{ headerShown: true, headerTitle: 'REQUESTS' }} />

            {/* OTHER SCREENS */}
            <Stack.Screen name="test4" component={TestScreen4} />
            <Stack.Screen name="test2" component={TestScreen2} />
            <Stack.Screen name="test3" component={TestScreen3} />
          
            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
            <Stack.Screen name="chat" component={ChatBot} />
            <Stack.Screen name="Signup" component={SignupScreen} />


            {/* ADDTIONAL */}
            <Stack.Screen name="Home" component={WorkHomeScreen} options={{ headerShown: true, title: 'HOME WORKOUT' }} />
            <Stack.Screen name="Workout" component={WorkoutScree} options={{ headerShown: false }} />

            <Stack.Screen name="Fit" component={FitScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Rest" component={RestScreen} options={{ headerShown: false }} />

            <Stack.Screen name="meal" component={MealScreen} options={{ headerShown: true, title: 'MEAL SCREEN' }} />
            <Stack.Screen name="diabtes" component={DiabetesScreen} />
            <Stack.Screen name="hyper" component={HypertensionScreen} />
            <Stack.Screen name="both" component={BothScreen} />
            <Stack.Screen name="nothing" component={NothingScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </FitnessContext>
    </SafeAreaView>
  );
}