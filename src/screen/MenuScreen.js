import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

const CustomButton = ({ title, onPress, imageSource, color }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 44,
      height: 44,
      marginRight: 20,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      fontStyle: 'italic',
    }
  })

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.62}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

const MenuScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 24, gap: 24 }}>
        <CustomButton
          title="Profile"
          onPress={() => navigation.navigate("profile")}
          imageSource={require('../../assets/profile.png')}
           color='lightblue' 

          />

        <CustomButton
          title="Calculator"
          onPress={() => navigation.navigate("cal")}
          imageSource={require('../../assets/cal.png')}
          color='#AEE2FF' 
          
          />

        <CustomButton
          title="Pedometer"
          onPress={() => navigation.navigate("Pedo")}
          imageSource={require('../../assets/step.png')}
           color='#E3F4F4' 
          />

        <CustomButton
          title="Water Intake"
          onPress={() => navigation.navigate("Water")}
          imageSource={require('../../assets/glass.png')}
           color='#C1EFFF' 
        
          />

        <CustomButton
          title="Recipes"
          onPress={() => navigation.navigate("Recipe")}
          imageSource={require('../../assets/recipe.png')}
           color='#D6EFED'

          />

        <CustomButton
          title="Workout"
          onPress={() => navigation.navigate("Home")}
          imageSource={require('../../assets/work.png')}
       color='#E3DFFD'
     
          />


        <CustomButton
          title="Find Doctor"
          onPress={() => navigation.navigate("doctor")}
          imageSource={require('../../assets/dr.png')}
        color='#DAEAF1' 
        
          />

        <CustomButton
          title="Food Composition"
          onPress={() => navigation.navigate("food_composition")}
          imageSource={require('../../assets/recipe.png')}
          color='#D6E5FA' />

        <CustomButton
          title="Logout"
          onPress={() => {
            Alert.alert('Logout', 'Are you sure you want to logout?', [
              {
                text: 'Cancel',
                onPress: () => {
                  return null;
                }
              },
              {
                text: 'Confirm',
                onPress: async () => {
                  await AsyncStorage.clear()
                  navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
                },
              },
            ]);
          }}
          imageSource={require('../../assets/logout.png')}
          color='#ADE4DB' />

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  )
}

export default MenuScreen

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#001253',
    flex: 1,
    // height: 749,
    paddingTop : 80,
  },

  profileView: {
    height: 60,
    width: 340,
    backgroundColor: '#FFFEC4',
    opacity: 0.7,
    marginTop: 70,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  profileImg: {
    height: 40,
    width: 40,
    marginTop: 8,
    marginLeft: 40,
  },
  Text: {
    marginLeft: 40,
    fontSize: 25,
    marginTop: 15,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  calView: {

    height: 60,
    width: 340,
    backgroundColor: '#FDCEDF',
    opacity: 0.7,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  pedoView: {
    height: 60,
    width: 340,
    backgroundColor: '#E3F4F4',
    opacity: 0.7,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  waterView: {
    height: 60,
    width: 340,
    backgroundColor: '#E4A5FF',
    opacity: 0.8,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  RecipeView: {
    height: 60,
    width: 340,
    backgroundColor: '#8696FE',
    opacity: 0.8,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  workView: {
    height: 60,
    width: 340,
    backgroundColor: '#E3DFFD',
    opacity: 0.8,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  DrView: {
    height: 60,
    width: 340,
    backgroundColor: '#D0F5BE',
    opacity: 0.8,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
  chatView: {
    backgroundColor: '#ADE4DB',
    height: 60,
    width: 340,
    opacity: 0.8,
    marginTop: 30,
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
  },
})