import React, { useEffect } from 'react'
import { Alert, StyleSheet, Text,  View } from 'react-native'
// import { ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import FoodCompositionDataset from '../data/FoodCompositionDataset.json'
import { TextInput } from 'react-native-paper'

const FoodCompositionScreen = ({ navigation }) => {
  const [data, setData] = React.useState(FoodCompositionDataset)
  const [filteredData, setFilteredData] = React.useState([])

  const [search, setSearch] = React.useState('')

  React.useEffect(() => {
    setFilteredData(data)
  }, [])

  const RenderListEmptyComponent = () => (
    <Text style={{
      textAlign: 'center',
      fontSize: 18,
      color: 'blue',
      marginTop: 8,
    }}>No Record Found!</Text>
  )

  const RenderListItem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        elevation: 4,
        marginHorizontal: 20,
        gap: 8
      }} activeOpacity={0.62}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.Food}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>KiloCalories (Per 100g)</Text>
          <Text style={{ fontSize: 16 }}>{item.KiloCalories}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>Protein (g)</Text>
          <Text style={{ fontSize: 16 }}>{item.Protein}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>Carbs (g)</Text>
          <Text style={{ fontSize: 16 }}>{item.Carbs}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1,  backgroundColor: "#001253", }}>
      <View style={{ padding: 20, flexDirection: 'row', gap: 12 }}>
        <TextInput
          mode='outlined'
          label='Search'
          placeholder='Search'
          style={{ flex: 1 }}
          value={search}
          onChangeText={(text) => {
            setSearch(text)
          }}
        />
        <TouchableOpacity style={{
          backgroundColor: 'blue',
          padding: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginTop: 5
        }} activeOpacity={0.62} onPress={() => {
          const filteredData = data.filter((item) => {
            return item.Food.toLowerCase().includes(search.toLowerCase())
          })
          setFilteredData(filteredData)
        }}>
          <Text style={{ color: 'white', fontSize: 18 }}>GO!</Text>
        </TouchableOpacity>
      </View>
      <FlashList
        data={filteredData}
        renderItem={RenderListItem}
        estimatedItemSize={129}
        ListEmptyComponent={RenderListEmptyComponent}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>
  )
}

export default FoodCompositionScreen


  const styles = StyleSheet.create({
   
}) 