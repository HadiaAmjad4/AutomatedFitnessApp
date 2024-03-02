import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useContext } from "react";
import FitnessCards from "../../Components/FitnessCards";
import { FitnessItems } from "../../Context";

const WorkHomeScreen = () => {
  const {
    minutes,
    calories,
    workout,
  } = useContext(FitnessItems);

  return (
    <ScrollView >
      <View
        style={{
          backgroundColor: '#001253',
          padding: 10,
          height: 200,
          width: "100%",
        }}
      >
        {/* <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          HOME WORKOUT
        </Text> */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {workout}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {calories}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              KCAL
            </Text>
          </View>

          <View>
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
                fontSize: 18,
              }}
            >
              {minutes}
            </Text>
            <Text style={{ color: "#D0D0D0", fontSize: 17, marginTop: 6 }}>
              MINS
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ width: "95%", height: 120, marginTop: 20, borderRadius: 7, }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf7-NqLrmmXB04Ds2rDOMgzQaX3P9KAg0b-HtIYHdQ7XHwa1v-tjtEGa-T5_n_AZPXmic&usqp=CAU",
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
        <FitnessCards />
      </View>

    </ScrollView>
  );
};

export default WorkHomeScreen;

const styles = StyleSheet.create({});