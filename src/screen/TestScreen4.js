import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from "react-native";
import oatmealImage from "../../assets/oatmeal.png";
import omeletImage from "../../assets/omlete.png";
import parathaImage from "../../assets/paratha.png";
import DaliaImage from "../../assets/vegDalia.png";
import ChaiImage from "../../assets/chai.png";
import puriImage from "../../assets/puri.png";
import nihariImage from "../../assets/nihari.png";
import bhujiaImage from "../../assets/bhujia.png";
import scrambledImage from "../../assets/scrambled.png";
import cerealImage from "../../assets/cereal.png";
import toastImage from "../../assets/toast.png";
import crepeImage from "../../assets/crepe.png";
import greekImage from "../../assets/greek.png";
import bananaImage from "../../assets/banana.png";
import cinnamonImage from "../../assets/cinnamon.png";
import eggsImage from "../../assets/egg.png";
import bellPeppersImage from "../../assets/bell-peppers.png";
import onionsImage from "../../assets/onions.png";
import tomatoesImage from "../../assets/tomatoes.png";
import mushroomsImage from "../../assets/mushrooms.png";
import flourImage from "../../assets/flour.png";
import saltImage from "../../assets/Wsalt.png";
import oilImage from "../../assets/oil.png";
import waterImage from "../../assets/water.png";
import ChoppedVegImage from "../../assets/choppedVeg.png";
import BeansImage from "../../assets/beans.png";
import wheatDaliaImage from "../../assets/wheatDalia.png";
import corianderImage from "../../assets/coriander.png";
import teaImage from "../../assets/tea.png";
import milkImage from "../../assets/milk.png";
import sugarImage from "../../assets/sugar.png";
import soojiImage from "../../assets/sooji.png";
import powderImage from "../../assets/powder.png";
import nutsImage from "../../assets/nuts.png";
import raisinsImage from "../../assets/raisins.png";
import meatImage from "../../assets/meat.png";
import pasteImage from "../../assets/paste.png";
import spicesImage from "../../assets/spices.png";
import potatoImage from "../../assets/potato.png";
import chilliImage from "../../assets/chilli.png";
import butterImage from "../../assets/butter.png";
import pepperImage from "../../assets/pepper.png";
import herbImage from "../../assets/herb.png";
import syrupImage from "../../assets/syrup.png";
import fruitImage from "../../assets/fruit.png";
import toppingImage from "../../assets/topping.png";
import breadImage from "../../assets/bread.png";
import yougurtImage from "../../assets/yougurt.png";
import clothImage from "../../assets/cloth.png";

const RecipeScreen = ({ navigation }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const recipes = [
    {
      id: 1,
      name: "Oatmeal with Bananas",
      instructions:
        "1. Cook oatmeal according to package instructions.\n2. Slice bananas into thin rounds.\n3. Once the oatmeal is cooked, top it with the sliced bananas.\n4. Sprinkle a generous amount of cinnamon on top.\n5. Enjoy your delicious oatmeal with sliced bananas and a sprinkle of cinnamon!",
      image: oatmealImage,
      calories: 300,
      cookingTime: "15 min",
      ingredients: [
        { name: "Oatmeal", image: oatmealImage },
        { name: "Bananas", image: bananaImage },
        { name: "Cinnamon", image: cinnamonImage },
      ],
    },
    {
      id: 2,
      name: "Vegetable Omelet",
      instructions:
        "1. Heat a non-stick skillet over medium heat.\n2. Add a tablespoon of oil and let it heat up.\n3. In a bowl, beat 2-3 eggs with salt and pepper to taste.\n4. Add chopped vegetables of your choice, such as bell peppers, onions, tomatoes, and mushrooms, to the beaten eggs.\n5. Pour the egg and vegetable mixture into the skillet.\n6. Let the omelet cook undisturbed for a few minutes until the edges start to set.\n7. Gently lift the edges with a spatula and tilt the skillet to let the uncooked egg flow to the edges.\n8. When the omelet is mostly set but still slightly runny in the center, fold it in half with the spatula.\n9. Cook for another minute or two until the omelet is fully set.\n10. Slide the omelet onto a plate and serve hot.\n11. Enjoy your delicious vegetable omelet!",
      image: omeletImage,
      calories: 200,
      cookingTime: "15 min",
      ingredients: [
        { name: "Eggs", image: eggsImage },
        { name: "Bell Peppers", image: bellPeppersImage },
        { name: "Onions", image: onionsImage },
        { name: "Tomatoes", image: tomatoesImage },
        { name: "Mushrooms", image: mushroomsImage },
      ],
    },
    {
      id: 3,
      name: "Whole Wheat Paratha",
      instructions:
        "1. In a mixing bowl, combine 2 cups of whole wheat flour, 1/2 teaspoon of salt, and 1 tablespoon of oil.\n2. Gradually add water and knead the mixture into a smooth and soft dough.\n3. Cover the dough and let it rest for 15-20 minutes.\n4. Divide the dough into small equal-sized portions and roll each portion into a ball.\n5. Take one dough ball and dust it with flour.\n6. Roll the dough ball into a flat circle of your desired thickness using a rolling pin.\n7. Heat a tawa or griddle over medium heat.\n8. Place the rolled paratha on the heated tawa and cook for a minute or until small bubbles start to appear on the surface.\n9. Flip the paratha and cook the other side for another minute.\n10. Brush the cooked paratha with ghee or oil.\n11. Remove the paratha from the tawa and keep it warm.\n12. Repeat the process with the remaining dough balls.\n13. Serve the hot and delicious whole wheat parathas with your favorite curry or yogurt.\n14. Enjoy!",
      image : parathaImage,
       calories: 200,
      cookingTime: "10 min",  
      ingredients: [
        { name: "Flour", image: flourImage },
        { name: "Salt", image: saltImage},
        { name: "Oil", image: oilImage},
        { name: "Water", image: waterImage },
      ],
   
    },
    {
      id: 4,
      name: "Vegetable Dalia",
      instructions:
        "1. Heat a tablespoon of ghee or oil in a pressure cooker.\n2. Add cumin seeds and let them splutter.\n3. Add finely chopped onions and sauté until they turn translucent.\n4. Add finely chopped vegetables of your choice, such as carrots, peas, bell peppers, and beans. Sauté for a few minutes.\n5. Add cracked wheat (dalia) and roast it for a couple of minutes to enhance the flavor.\n6. Add water, salt, and any desired spices like turmeric, cumin powder, or garam masala.\n7. Stir well and close the pressure cooker with its lid.\n8. Cook the dalia on medium heat for 3-4 whistles or until it reaches a porridge-like consistency.\n9. Allow the pressure to release naturally.\n10. Open the cooker and give the dalia a good stir.\n11. Garnish with chopped coriander leaves and serve hot.\n12. Enjoy a nutritious bowl of vegetable dalia!",
        image : DaliaImage,
       calories: 200,
      cookingTime: "25 min", 
      ingredients: [
        { name: "Oil", image: oilImage},
        { name: "Onions", image: onionsImage },
        { name: "ChppedVeg", image: ChoppedVegImage},
        { name: "Beans", image: BeansImage },
        { name: "coriander", image: corianderImage },
      ],
    
    },
    {
      id: 5,
      name: "Chai",
      image : ChaiImage,
      instructions:
   
      "For Chai (Tea):\n\n1. Boil water in a saucepan and add tea leaves (or tea bags) according to your desired strength.\n2. Let the tea steep for a few minutes.\n3. Add milk to the saucepan and bring it to a simmer.\n4. Add sugar or any sweetener of your choice and stir until dissolved.\n5. Strain the tea into cups and serve hot.",
      calories: 100,
      cookingTime: "10 min",
      ingredients: [
        { name: "Water", image: waterImage },
        { name: "Milk", image: milkImage },
        { name: "Tea", image: teaImage},
        { name: "Sugar", image: sugarImage},
      
      ],
    },
    {
      id: 6,
      name: "Halwa Puri",
      instructions:
        "For Halwa:\n\n1. Heat ghee or oil in a pan.\n2. Add semolina (sooji) and roast it until it turns golden brown and gives a nutty aroma.\n3. Add sugar and water to the roasted semolina. Stir well.\n4. Cook the mixture on medium heat until the semolina absorbs the water and becomes thick.\n5. Add cardamom powder, chopped nuts (like almonds and pistachios), and raisins. Mix well.\n6. Cook for a few more minutes until the halwa reaches your desired consistency.\n7. Remove from heat and keep it aside.\n\nFor Puri:\n\n1. In a mixing bowl, combine whole wheat flour, salt, and a little oil.\n2. Gradually add water and knead the mixture into a soft and smooth dough.\n3. Cover the dough and let it rest for 15-20 minutes.\n4. Divide the dough into small equal-sized portions and roll each portion into a ball.\n5. Take one dough ball and flatten it with a rolling pin into a small disc.\n6. Heat oil in a deep frying pan or kadhai over medium heat.\n7. Carefully slide the flattened dough disc into the hot oil.\n8. Fry the puri until it puffs up and turns golden brown on both sides.\n9. Remove the puri from the oil and place it on a paper towel to drain excess oil.\n10. Repeat the process with the remaining dough balls.\n\nTo serve:\n\n1. Serve the hot and delicious halwa with puri.\n2. Enjoy the scrumptious Halwa Puri!",
        image: puriImage,
       calories: 500,
      cookingTime: "1.5 hours",
      ingredients: [
        { name: "Oil", image: oilImage},
        { name: "Sooji", image: soojiImage },
        { name: "Cardamom_Powder", image: powderImage },
        { name: "Sugar", image: sugarImage},
        { name: "Water", image: waterImage },
        { name: "Nuts", image: nutsImage },
        { name: "Raisins", image: raisinsImage },
        { name: "Flour", image: flourImage },
        { name: "Salt", image: saltImage},
      ],
    
    },
    {
      id: 7,
      name: "Nihari",
      instructions:
        "1. Heat ghee or oil in a large pot or pressure cooker.\n2. Add the sliced onions and sauté until golden brown.\n3. Add the ginger-garlic paste and cook for a minute until fragrant.\n4. Add the lamb or beef pieces to the pot and cook until browned on all sides.\n5. Add the powdered spices - red chili powder, turmeric powder, coriander powder, cumin powder, and garam masala. Mix well to coat the meat.\n6. Add the bone marrow or beef shank pieces (if using) for added flavor. Stir to combine.\n7. Pour in enough water to cover the meat completely.\n8. Cover the pot or pressure cooker and cook on low heat for several hours (4-6 hours) until the meat is tender and the flavors are well-developed. If using a pressure cooker, cook for 30-40 minutes.\n9. In a separate bowl, mix wheat flour (atta) with water to make a smooth paste (slurry).\n10. Gradually add the slurry to the pot while stirring continuously to thicken the gravy.\n11. Continue to cook the nihari for another 30 minutes to an hour until the gravy has thickened and the meat is falling apart tender.\n12. Adjust the salt and spice levels according to your taste.\n13. Serve the hot and flavorful nihari with naan, roti, or rice.\n14. Garnish with fresh coriander leaves, ginger slices, and a squeeze of lemon juice if desired.\n15. Enjoy the delicious and rich Nihari!",
   image: nihariImage,
      
      calories: 600,
      cookingTime: "4 Hours",
    
      ingredients: [
        { name: "Oil", image: oilImage},
        { name: "Onions", image: onionsImage },
        { name: "Ginger/Garlic Paste", image: pasteImage },
        { name: "Meat", image: meatImage },
        { name: "coriander", image: corianderImage },
        { name: "Spices", image: spicesImage },
      ],

    },
    {
      id: 8,
      name: "Aloo Bhujia",
      instructions:
        "1. Peel and grate the potatoes.\n2. Heat oil in a deep frying pan or kadhai over medium heat.\n3. Add the grated potatoes to the hot oil and fry until golden brown and crispy.\n4. Remove the fried potatoes from the oil and place them on a paper towel to drain excess oil.\n5. In a separate pan, heat a little oil and add cumin seeds.\n6. Once the cumin seeds start to splutter, add chopped onions and sauté until they turn translucent.\n7. Add ginger-garlic paste and cook for a minute until fragrant.\n8. Add chopped green chilies and mix well.\n9. Add the fried potato bhujia to the pan and mix everything together.\n10. Season with salt, red chili powder, turmeric powder, and chaat masala. Mix well.\n11. Cook for a few more minutes, stirring occasionally, until the flavors are well combined.\n12. Garnish with chopped coriander leaves.\n13. Serve the hot and crispy Aloo Bhujia as a snack or side dish.\n14. Enjoy the flavorful Aloo Bhujia!",
        image:
       bhujiaImage,
      
      calories: 500,
      cookingTime: "40 min",
      ingredients: [
        { name: "Oil", image: oilImage},
        { name: "Potatoes", image: potatoImage },
        { name: "Onions", image: onionsImage },
        { name: "Ginger/Garlic Paste", image: pasteImage },
        { name: "Green_Chilli", image: chilliImage },
        { name: "coriander", image: corianderImage },
        { name: "Spices", image: spicesImage },
     
      ],
  },
  {
    id: 9,
    name: "Scrambled Eggs",
    instructions:
      "1. Crack the eggs into a bowl and beat them well until the yolks and whites are fully combined.\n2. Heat a non-stick frying pan or skillet over medium heat.\n3. Add a little butter or oil to the pan and let it melt or heat up.\n4. Pour the beaten eggs into the pan.\n5. Allow the eggs to cook undisturbed for a few seconds until the edges start to set.\n6. Using a spatula, gently push and fold the cooked edges toward the center, allowing the uncooked eggs to flow to the edges.\n7. Continue this process of pushing and folding the eggs until they are mostly cooked but still slightly runny.\n8. Reduce the heat to low and continue to cook, stirring gently, until the eggs reach your desired level of doneness.\n9. Be careful not to overcook the eggs as they can become dry.\n10. Season with salt, pepper, and any additional desired spices or herbs.\n11. Remove the scrambled eggs from the heat and transfer them to a serving plate.\n12. Serve the scrambled eggs hot with toast, bread, or any desired accompaniments.\n13. Enjoy the delicious and fluffy Scrambled Eggs!",
    image: scrambledImage,  
      calories: 140,
    cookingTime: "6 min",
    ingredients: [
      { name: "Eggs", image: eggsImage },
      { name: "Butter", image: butterImage },
      { name: "Salt", image: saltImage},
      { name: "Black Pepper", image: pepperImage },
      { name: "Herb", image: herbImage },
    ],
  },
  {
    id: 10,
    name: "Cereal",
    instructions:
      "1. Pour your desired amount of cereal into a bowl.\n2. Add milk (dairy or non-dairy) to the bowl, pouring it over the cereal.\n3. Let the cereal soak in the milk for a few minutes if you prefer it softer.\n4. Optional: Add sweeteners like sugar, honey, or maple syrup to taste.\n5. You can also add toppings such as fresh fruits, nuts, or seeds for added flavor and texture.\n6. Grab a spoon and enjoy your bowl of cereal!\n7. Note: You can choose from a variety of cereal types such as corn flakes, bran flakes, rice cereal, oatmeal, or granola, based on your preference.",
    image: cerealImage,
    calories: 160,
    cookingTime: "5 min",
    ingredients: [
      { name: "Cereal", image: cerealImage },
      { name: "Milk", image: milkImage },
      { name: "Sugar", image: sugarImage },
      { name: "Syrup", image: syrupImage},
      { name: "Fruits", image: fruitImage },
      { name: "Nuts", image: nutsImage },
    ],
  },
  {
    id: 11,
    name: "Whole Grain Toast",
    instructions:
      "1. Start by selecting your favorite whole grain bread slices.\n2. Place the bread slices in a toaster or toaster oven.\n3. Toast the bread slices according to your desired level of crispiness.\n4. Once the toast is ready, remove it from the toaster or toaster oven.\n5. Optional: Spread a layer of butter or margarine on the warm toast.\n6. You can also add toppings such as avocado, peanut butter, almond butter, or jam for added flavor.\n7. Sprinkle salt, pepper, or any desired seasonings over the toast.\n8. Serve the whole grain toast immediately and enjoy!\n9. Note: You can customize your whole grain toast with various toppings and spreads based on your preference.",
    image: toastImage,
    calories: 100,
    cookingTime: "10 min", 

    ingredients: [
      { name: "Toast", image: breadImage },
      { name: "Butter", image: butterImage },
      { name: "Topping", image: toppingImage },
      { name: "Nuts", image: nutsImage},
      { name: "Salt", image: saltImage },
      { name: "Pepper", image: pepperImage },
    ],
  },
  {
    id: 12,
    name: "Anda Pratha Crepe",
    instructions:
      "1. In a mixing bowl, whisk together eggs, flour, milk, salt, and any desired spices.\n2. Heat a non-stick frying pan or crepe pan over medium heat.\n3. Add a little oil or butter to the pan and let it melt or coat the surface.\n4. Pour a ladleful of the crepe batter onto the hot pan.\n5. Tilt the pan in a circular motion to spread the batter evenly and form a thin crepe.\n6. Cook the crepe for a minute or until the edges start to lift and the bottom is lightly browned.\n7. Carefully flip the crepe using a spatula and cook the other side for another minute.\n8. Remove the cooked crepe from the pan and place it on a plate.\n9. Repeat the process with the remaining batter to make more crepes.\n10. Serve the Anda Pratha Crepes hot with your choice of fillings, such as scrambled eggs, vegetables, cheese, or any desired toppings.\n11. Enjoy the delicious Anda Pratha Crepes!",
      image: crepeImage,
   
    calories: 250,
    cookingTime: "10 min", 
    ingredients: [
      { name: "Eggs", image: eggsImage },
      { name: "Flour", image: flourImage },
      { name: "Milk", image: milkImage },
      { name: "Oil", image: oilImage},
      { name: "Spices", image: spicesImage },
    ],
  },
  {
    id: 13,
    name: "Greek Yogurt",
    instructions:
      "1. Start by selecting a high-quality pl0ain yogurt as the base for your Greek yogurt.\n2. Place a fine-mesh sieve or cheesecloth over a bowl or container.\n3. Pour the plain yogurt into the sieve or cheesecloth, allowing the liquid (whey) to drain out.\n4. Let the yogurt sit and drain for several hours or overnight in the refrigerator.\n5. As the liquid drains out, the yogurt will become thicker and creamier, resembling Greek yogurt.\n6. Once the desired consistency is achieved, remove the thickened yogurt from the sieve or cheesecloth.\n7. Transfer the Greek yogurt to a separate bowl or container.\n8. You can enjoy the Greek yogurt as is, or you can add sweeteners, fruits, nuts, or granola for additional flavor and texture.\n9. Stir well before serving.\n10. Store the Greek yogurt in an airtight container in the refrigerator for future use.\n11. Enjoy the creamy and nutritious Greek Yogurt!",
      image: greekImage,
      calories: 80,
      cookingTime: "4 Hours", 
      ingredients: [
        { name: "Plain yougurt", image: yougurtImage },
        { name: "Cheesecloth/Mesh", image: clothImage },
      ],
     },
  ];

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <ScrollView >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Recipes For Your</Text>
          <Text style={styles.title2}>Cooking Experience</Text>
        </View>

        {recipes.map((recipe) => (
          <View key={recipe.id} style={styles.recipeView}>
            <TouchableOpacity
              style={[
                styles.recipeItem,
                recipe.id % 2 === 0 ? styles.recipeItemRight : null,
              ]}
              onPress={() => handleRecipePress(recipe)}
            >
              <Image source={recipe.image} style={styles.recipeImage} />
              <View style={styles.recipeContent}>
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeDetails}>
                  Cal {recipe.calories} | {recipe.cookingTime}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <Modal visible={selectedRecipe !== null} animationType="slide">
          <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalScrollContainer}>
              <Text style={styles.modalTitle}>{selectedRecipe?.name}</Text>

              <View style={styles.ingredientsContainer}>
                <Text style={styles.ingredientTitle}>INGREDIENTS</Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.ingredientsImagesContainer}
                >
                  {selectedRecipe?.ingredients.map((ingredient, index) => (
                    <View key={index} style={styles.ingredientImageContainer}>
                      <Image
                        source={ingredient.image}
                        style={styles.ingredientImage}
                      />
                      <Text style={styles.ingredientName}>
                        {ingredient.name}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View> 
<Text style={{
     fontSize: 22,
     fontWeight : 'bold',
     textAlign : 'left',
      color: "#fff",
      marginLeft : 15,
}}> Steps </Text>
              <Text style={styles.modalInstructions}>
                {selectedRecipe?.instructions}
              </Text>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#001253",
   
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 60,
    marginLeft: 15,
    fontStyle: "italic",
  },
  title2: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 15,
    marginBottom: 60,
    fontStyle: "italic",
    marginTop : 5,

  },
  recipeView: {
    marginBottom: 10,
  },
  recipeItem: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#A1C2F1",
    opacity: 0.9,
  },
  recipeItemRight: {
    flexDirection: "row-reverse",
  },
  recipeContent: {
    flex: 1,
    marginLeft: 10,
    marginTop: 25,
  },
  recipeName: {
    fontWeight: "700",
    fontSize: 18,
    color: "#001253",
  },
  recipeDetails: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 10,
  },
  recipeImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001253",
  },
  modalScrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    marginTop: 120,
  },
  modalInstructions: {
    fontSize: 16,
    textAlign: "center",
    color: "#fff",
    marginTop: 20,
    paddingHorizontal: 20,
    textAlign: "left",
    lineHeight: 24,
  },
  
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "gray",
    borderRadius: 5,
    marginTop: 20,
    backgroundColor: "#A1C2F1",
  marginBottom : 25,
  width : 150,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    color: "#001253",
    textAlign : 'center',
  },
  ingredientsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 40,
    flexWrap: "wrap",
  },
  ingredientItem: {
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  ingredientImage: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 30,
  },
  ingredientName: {
    fontSize: 12,
    marginTop: 5,
    color: "#fff",
  },
  ingredientTitle: {
    color: "#fff",
    fontSize: 19,
    marginTop: 15,
    marginRight: 170,
  },
  ingredientsImagesContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 10,
  },
  ingredientImageContainer: {
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop : 10,
  },
});

export default RecipeScreen;

