import { StyleSheet, Text, View ,ScrollView ,Image, TouchableOpacity} from 'react-native'
import React from 'react'

const TestScreen2 = ({navigation}) => {
  return (
    <View style = {styles.container}>
  

    
      <ScrollView showsVerticalScrollIndicator={true}
  
      >
      
{/* This is profile view  */}
<TouchableOpacity
  onPress={() => navigation.navigate("profile")}
>
  <View style= {styles.profileView}>
   <Image
   source={require('../../assets/profile.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Profile </Text>
  </View>
</TouchableOpacity>

{/* This is calculator  view  */}


<TouchableOpacity
  onPress={() => navigation.navigate("cal")}
>
         <View style = {styles.calView}> 
         <Image
   source={require('../../assets/cal.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Calculator </Text>
        </View>
        </TouchableOpacity>

{/* This is Pedometer  view  */}
<TouchableOpacity
  onPress={() => navigation.navigate("Pedo")}
>
       <View style = {styles.pedoView}>
       <Image
   source={require('../../assets/step.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Pedometer </Text>
        </View>
        </TouchableOpacity>


{/* This is Water Intake  view  */}

<TouchableOpacity
 onPress={() => navigation.navigate("Water")}
>
        <View style = {styles.waterView}>
        <Image
   source={require('../../assets/glass.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Water Intake </Text>
        </View>
        </TouchableOpacity>

{/* This is Recipe  view  */}

<TouchableOpacity
 onPress={() => navigation.navigate("Recipe")}
>


      <View style = {styles.RecipeView}>
      <Image
   source={require('../../assets/recipe.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Recipes </Text>
        </View>
        </TouchableOpacity>

{/* This is Workout  view  */}

<TouchableOpacity
 onPress={() => navigation.navigate("Workout")}
> 

         <View style = {styles.workView}> 
         <Image
   source={require('../../assets/work.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Workout </Text>
        </View>
        </TouchableOpacity>

{/* This is Search Doctor view  */}


<TouchableOpacity
 onPress={() => navigation.navigate("doctor")}
>
        <View style = {styles.DrView}> 

 <Image
   source={require('../../assets/dr.png')}
   style = {styles.profileImg}
   />
<Text  style = {styles.Text}> Find Doctor </Text>
</View>

</TouchableOpacity>








{/* <View style = {styles.chatView}>

</View> */}
      </ScrollView>
    </View>
  )
}

export default TestScreen2

const styles = StyleSheet.create({
 
  container : {
     backgroundColor : '#001253',
   
   height : 749,
  },

 profileView : {
  height : 60,
  width : 340,
  backgroundColor : '#FFFEC4',
  opacity : 0.7,
  marginTop : 70,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 profileImg : {
height : 40,
width : 40,
marginTop : 8,
marginLeft : 40,
 },
 Text : {
marginLeft : 40,
fontSize : 25,
marginTop : 15,
fontWeight : '600',
fontStyle : 'italic',
 },
 calView : {
 
  height : 60,
  width : 340,
  backgroundColor : '#FDCEDF',
  opacity : 0.7,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 pedoView : {
  height : 60,
  width : 340,
  backgroundColor : '#E3F4F4',
  opacity : 0.7,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 waterView : {
  height : 60,
  width : 340,
  backgroundColor : '#E4A5FF',
  opacity : 0.8,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 RecipeView : {
  height : 60,
  width : 340,
  backgroundColor : '#8696FE',
  opacity : 0.8,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 workView : {
  height : 60,
  width : 340,
  backgroundColor : '#E3DFFD',
  opacity : 0.8,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 DrView : {
  height : 60,
  width : 340,
  backgroundColor : '#D0F5BE',
  opacity : 0.8,
  marginTop : 30,
  borderRadius : 10,
  marginLeft : 25,
  flexDirection : 'row',
 },
 chatView : {
backgroundColor : '#ADE4DB',
height : 60,
width : 340,
opacity : 0.8,
marginTop : 30,
borderRadius : 10,
marginLeft : 25,
flexDirection : 'row',
 },
})