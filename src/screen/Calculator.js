import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider'

const Calculator = ({ }) => {
  const navigation = useNavigation();
  const [selectedGender, setSelectedGender] = useState(null);
  const [maleImageSource, setMaleImageSource] = useState(require('../../assets/maleImage.png'));
  const [femaleImageSource, setFemaleImageSource] = useState(require('../../assets/femaleImage.png'));

  // const [femaleImageStyle, setFemaleImageStyle] = useState(styles.GenderIconSelected); // Initialize with the default style
  const [femaleImageStyle, setFemaleImageStyle] = useState(styles.FemaleIcon);
  const [height, setHeight] = useState(0);
  const [heightUnit, setHeightUnit] = useState('cm');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [age, setAge] = useState('');
  const [bmi, setBMI] = useState('');
  const [bmr, setBMR] = useState('');
  const [bmiClassification, setBMIClassification] = useState('');

  const handleHeightChange = (value) => {
    setHeight(value);
  };

  const calculateBMI = () => {
    // Convert height to cm if the unit is ft/ inches
    let heightinCm = height;
    if (heightUnit === 'ft') {
      const [feet, inches] = height.split("");
      heightinCm = (parseInt(feet) * 30.48) + (parseInt(inches) * 2.54);
    }

    // Convert weight to kg if the unit is lbs
    let weightinKg = weight;
    if (weightUnit === 'lbs') {
      weightinKg = parseInt(weight) / 2.2046;
    }

    // Calculate BMI
    const bmiValue = weightinKg / Math.pow(heightinCm / 100, 2);
    // setBMI(bmiValue.toFixed(2));
    return bmiValue.toFixed(2);
  };


  const calculateBMR = () => {
    let bmrValue;
    if (selectedGender === 'male') {
      bmrValue = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
    } else {
      bmrValue = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
    }
    // setBMR(bmrValue.toFixed(2));
    return bmrValue.toFixed(2);
  };

  const handlePress = () => {
    calculateBMI();
    calculateBMR();
    navigation.setOptions({ handlePress: handlePress });
    navigation.navigate('classif', {
      handlePress: handlePress,
      bmi, bmr,
      age, height, weight,
      gender: selectedGender,
    });
  };

  const goToTargetScreen = () => {
    const bmiValue = calculateBMI();
    const bmrValue = calculateBMR();
    // Navigate to the target screen and pass the function as a prop
    navigation.navigate('classif', {
      bmi: bmiValue,
      bmr: bmrValue,
      age, weight, height,
      gender: selectedGender,
    });
  };



  const handleMaleIconPress = () => {
    setSelectedGender('male');
    setMaleImageSource(require('../../assets/maleSelectedImage.png'));
    setFemaleImageSource(require('../../assets/femaleImage.png'));
    setFemaleImageStyle(styles.FemaleIcon);
  };

  const handleFemaleIconPress = () => {
    setSelectedGender('female');
    setMaleImageSource(require('../../assets/maleImage.png'));
    setFemaleImageSource(require('../../assets/femaleSelectedImage.png'));
    setFemaleImageStyle(styles.GenderIconSelectedCustom); // Apply custom style for female image
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleView}> 
        <Text style={styles.title}> Calculator </Text>
        <Text style={styles.  subtitle}> BMI & BMR </Text>
      </View>
    
      {/* Main View for gender */}
      <View style={{ justifyContent: 'center', flexDirection: 'row',  }}>
        {/* Child view for male */}
        <View style = {{
          marginTop : -30
        }}>
          <TouchableOpacity
            onPress={handleMaleIconPress}
            style={styles.GenderButton}
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender('male')}
          >
            <Image source={maleImageSource} style={styles.GenderIconSelected} />
            <Text style={styles.GenderText}> Male </Text>
          </TouchableOpacity>
        </View>
        {/* Child view for female */}
        <View style = {{
          marginTop : -30
        }}>
          <TouchableOpacity
            onPress={handleFemaleIconPress}
            style={styles.GenderButton}
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender('female')}
          >
            <Image source={femaleImageSource} style={femaleImageStyle} />
            <Text style={styles.GenderText}> Female </Text>
          </TouchableOpacity>
        </View>
      </View>





      {/* View for height */}
      <View style={styles.HeightViewOne}>
        <Text style={{
          color: '#C8E8EA',
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: 120,
          marginTop: 15,
        }}> Height </Text>
      </View>
      <View style={styles.HeightView}>

        <Text style={styles.HeightText}>
          {height}
        </Text>
        <Text style={
          {
            color: '#C8E8EA',
            marginLeft: 2,
            fontSize: 16,
            marginTop: 10,
            fontWeight: 'bold',
          }
        }>cm</Text>
      </View>
      <View style={styles.HeightView}
      >

        <Slider
          style={{ flex: 1, marginRight: 25, marginLeft: 25, marginBottom: 20, }}
          minimumValue={50}
          maximumValue={300}
          value={height}
          onValueChange={handleHeightChange}
          step={1}
          minimumTrackTintColor="##850E35" // Customize track color
          maximumTrackTintColor="#C8E8EA"
          thumbTintColor="#fff" // Customize thumb color



        />

        {/* <Text>{height} cm</Text>  */}

      </View>





      {/* Main View for weight and age */}

      <View style={{
        justifyContent: 'center',
        flexDirection: 'row',
      }}>

        <View style={styles.boxes}
        >

          <Text style={{
            color: '#C8E8EA',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 20,

          }}> weight(KG) </Text>
          <TextInput
            placeholder="Weight"
            value={weight}
            onChangeText={(text) => setWeight(text)}
            onValueChange={(itemValue) => setWeightUnit(itemValue)}
            style={styles.WAgeButton}
          />


        </View>
        <View style={styles.boxes}>
          <Text style={{
            color: '#C8E8EA',
            fontSize: 18,
            fontWeight: 'bold',
            marginLeft: 35,
            marginTop: 20,

          }}>  Age </Text>
          <TextInput
            placeholder="Age"
            value={age}
            onChangeText={(text) => setAge(text)}
            style={styles.WAgeButton}

          />
        </View>
      </View>




      {/* View for Calculate */}

      <View style={{
        marginLeft: 42,
        marginRight: 36,
        // backgroundColor : '#08808E',
        backgroundColor: '#850E35',
        height: 50,
        marginTop: 10,
      }}>
        <TouchableOpacity style={{

        }}


        >
          <Text style={{
            color: '#C8E8EA',
            fontSize: 35,
            fontWeight: 'bold',
            marginLeft: 70,
            marginTop: 2,
          }}

            //  onPress={handlePress}
            onPress={goToTargetScreen}

          > Calculate</Text>
        </TouchableOpacity>

    
      </View>

      <View style= {styles.backaroowView}> 
      
      <TouchableOpacity
      onPress={() => navigation.navigate("menu")}
      > 
        <Image 
        source={require('../../assets/backarrow.png')} 
         style = {styles.back}
        />
      </TouchableOpacity>
    </View>

    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001253',
 

  },
  titleView : {
marginTop : 100,
alignItems : 'center',
justifyContent : 'center',
  },
  title : {
color : '#fff',
fontSize : 35,
fontWeight : '800'

  },
  subtitle : {
    color : '#fff',
    fontSize : 25,
    fontWeight : '600'
  },
  GenderButton: {
    height: 150,
    width: 150,
    backgroundColor: '#1D267D',
    marginLeft: 10,
    marginBottom: 20,
  },
  GenderText: {
    marginBottom: 15,
    paddingBottom: 15,
    marginLeft: 44,
    fontStyle: 'italic',
    fontSize: 18,
    color: '#fff',
    marginTop: 105,
    fontWeight: '700',
    position: 'absolute',


  },
  HeightViewOne: {
    marginLeft: 42,
    marginRight: 36,
    // backgroundColor : '#08808E',
    backgroundColor: '#1C4B82',
  },
  HeightView: {
    marginLeft: 42,
    marginRight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    //  backgroundColor : '#08808E',
    backgroundColor: '#1C4B82',

  },
  HeightText: {

    color: '#C8E8EA',
    fontSize: 35,
    fontWeight: 'bold',
    marginLeft: 110,


  },

  boxes: {
    height: 120,
    width: 130,
    backgroundColor: '#1C4B82',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,

  },
  Textboxes: {
    color: '#C8E8EA',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 46,
    marginTop: 20,
  },

  WAgeButton: {
    marginTop: 20,
    backgroundColor: '#C8E8EA',
    height: 50,
    width: 50,
    marginLeft: 22,
    borderRadius: 100,
    marginLeft: 39,
    position: 'absolute',
    marginTop: 53,
  },

  buttons: {
    marginLeft: 20,
    marginTop: 50,
    height: 50,
    width: 100,
    marginLeft: 75,

    backgroundColor: '#1C4B82',
    borderRadius: 100,
    marginLeft: 65,
  },
  buttonText: {
    marginTop: 13,
    marginLeft: 30,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
 
  GenderIconSelected: {
    height: 70,
    width: 60,
    margin: 20,
    marginLeft: 45,
    marginTop: 10,
  },
  GenderButton: {

    height: 150,
    width: 150,
 
    backgroundColor: '#1C4B82',
    marginTop: 60,
    marginLeft: 10,
    marginBottom: 20,
  },
  GenderIconSelectedCustom: {
    height: 70,
    width: 60,
    margin: 20,
    marginLeft: 45,
    marginTop: 10,

  },
  FemaleIcon: {
    height: 85,
    width: 60,
    margin: 20,
    marginLeft: 45,
    marginTop: 7,
  },

  classificationText: {

    color: 'white',
  },
  back : {
    height : 30,
    width : 30,
    marginTop : 15,

  },
  backaroowView : {

    marginLeft : 20,
    height : 50,
    width : 50,
    borderRadius : 100,
    backgroundColor: '#001253',
    alignItems : 'center',
    justifyContent : 'center',
    alignContent : 'center ',
    marginLeft : 180,
      },

})
