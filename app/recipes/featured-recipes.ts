// Featured recipes for the recipes page
// 12 recipes from 5 different diet plans with images

export const featuredRecipes = [
  // Keto
  {
    id: "a964b9ab-f070-4198-a0b1-9b954a4c8719",
    name: "Roasted Garlic and Parmesan Zucchini Noodles",
    description: "A delicious and satisfying keto-friendly dinner featuring zucchini noodles tossed in a creamy garlic-parmesan sauce.",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a964b9ab-f070-4198-a0b1-9b954a4c8719/roasted-garlic-and-parmesan-zucchini-noodles-1760134071733.png",
    diet_plan_names: [{ name: "Keto Diet", slug: "keto" }],
    recipe_nutrition: [{
      fat: 24,
      carbs: 5,
      fiber: 2,
      protein: 12,
      calories: 280
    }]
  },
  // Keto
  {
    id: "a321ed3e-8cdf-429f-bff1-086fe3550147",
    name: "Roasted Salmon with Buttered Broccoli and Cauliflower",
    description: "A delicious and satisfying keto-friendly lunch featuring wild-caught salmon, roasted broccoli and cauliflower in a rich, creamy butter sauce.",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a321ed3e-8cdf-429f-bff1-086fe3550147/roasted-salmon-with-buttered-broccoli-and-cauliflower-1760133843316.png",
    diet_plan_names: [{ name: "Keto Diet", slug: "keto" }],
    recipe_nutrition: [{
      fat: 26,
      carbs: 10,
      fiber: 4,
      protein: 40,
      calories: 425
    }]
  },
  // Mediterranean
  {
    id: "ec912d3b-2b85-45a7-8c7b-c6f7f257c11e",
    name: "Mediterranean Tuna and Chickpea Salad",
    description: "A flavorful and nutrient-dense snack featuring tuna, chickpeas, and a variety of Mediterranean vegetables and herbs.",
    prep_time: 20,
    cook_time: 10,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ec912d3b-2b85-45a7-8c7b-c6f7f257c11e/mediterranean-tuna-and-chickpea-salad-1760188101661.png",
    diet_plan_names: [{ name: "Mediterranean Diet", slug: "mediterranean" }],
    recipe_nutrition: [{
      fat: 15,
      carbs: 30,
      fiber: 8,
      protein: 25,
      calories: 300
    }]
  },
  // Mediterranean
  {
    id: "16a91276-86c8-4131-88ba-4dcf5ff7ad36",
    name: "Mediterranean Quinoa and Egg Breakfast Bowl",
    description: "A nutritious and flavorful breakfast featuring quinoa, vegetables, and poached eggs, all drizzled with a vibrant olive oil and lemon dressing.",
    prep_time: 20,
    cook_time: 25,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/16a91276-86c8-4131-88ba-4dcf5ff7ad36/mediterranean-quinoa-and-egg-breakfast-bowl-1760188003980.png",
    diet_plan_names: [{ name: "Mediterranean Diet", slug: "mediterranean" }],
    recipe_nutrition: [{
      fat: 15,
      carbs: 45,
      fiber: 7,
      protein: 20,
      calories: 370
    }]
  },
  // Mediterranean
  {
    id: "d7b2e0da-b458-4aae-ab6f-957ec948e189",
    name: "Mediterranean Quinoa Stuffed Peppers",
    description: "Flavorful and nutritious Mediterranean-inspired snack featuring quinoa, vegetables, and olive oil.",
    prep_time: 20,
    cook_time: 25,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d7b2e0da-b458-4aae-ab6f-957ec948e189/mediterranean-quinoa-stuffed-peppers-1760187983444.png",
    diet_plan_names: [{ name: "Mediterranean Diet", slug: "mediterranean" }],
    recipe_nutrition: [{
      fat: 12,
      carbs: 36,
      fiber: 8,
      protein: 10,
      calories: 280
    }]
  },
  // Paleo
  {
    id: "b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590",
    name: "Paleo Roasted Salmon with Roasted Winter Vegetables",
    description: "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon and a medley of roasted winter vegetables.",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590/paleo-roasted-salmon-with-roasted-winter-vegetables-1760137527652.png",
    diet_plan_names: [{ name: "Paleo", slug: "paleo" }],
    recipe_nutrition: [{
      fat: 15,
      carbs: 35,
      fiber: 8,
      protein: 30,
      calories: 350
    }]
  },
  // Paleo
  {
    id: "52736362-9d57-4ad7-be2b-80c1d28cc679",
    name: "Grilled Salmon with Roasted Winter Vegetables",
    description: "A delicious and nutritious paleo-friendly lunch featuring succulent grilled salmon and a medley of roasted seasonal vegetables.",
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: "easy",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52736362-9d57-4ad7-be2b-80c1d28cc679/grilled-salmon-with-roasted-winter-vegetables-1760138439333.png",
    diet_plan_names: [{ name: "Paleo", slug: "paleo" }],
    recipe_nutrition: [{
      fat: 15,
      carbs: 35,
      fiber: 8,
      protein: 30,
      calories: 350
    }]
  },
  // Paleo
  {
    id: "f857b9a1-d66c-42cb-8dc7-f08056f2d7c1",
    name: "Paleo Baked Eggs with Spinach and Mushrooms",
    description: "A delicious and nutritious paleo-friendly breakfast that's perfect for a cozy winter morning.",
    prep_time: 15,
    cook_time: 20,
    servings: 4,
    difficulty: "easy",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f857b9a1-d66c-42cb-8dc7-f08056f2d7c1/paleo-baked-eggs-with-spinach-and-mushrooms-1760137520757.png",
    diet_plan_names: [{ name: "Paleo", slug: "paleo" }],
    recipe_nutrition: [{
      fat: 20,
      carbs: 12,
      fiber: 4,
      protein: 27,
      calories: 330
    }]
  },
  // Vegan
  {
    id: "d6a90e4c-49ad-46ef-8c38-63323f3ff136",
    name: "Winter Vegetable Breakfast Bowl",
    description: "A nourishing and satisfying vegan breakfast bowl packed with seasonal vegetables, plant-based proteins, and wholesome grains.",
    prep_time: 20,
    cook_time: 15,
    servings: 4,
    difficulty: "easy",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d6a90e4c-49ad-46ef-8c38-63323f3ff136/winter-vegetable-breakfast-bowl-1760178206012.png",
    diet_plan_names: [{ name: "Vegan", slug: "vegan" }],
    recipe_nutrition: [{
      fat: 30,
      carbs: 55,
      fiber: 10,
      protein: 15,
      calories: 355
    }]
  },
  // Vegan
  {
    id: "cc08a8e6-5bef-42e4-9d33-eaebf5053004",
    name: "Roasted Sweet Potato and Quinoa Breakfast Bowl",
    description: "A nourishing and satisfying vegan breakfast bowl featuring roasted sweet potatoes, quinoa, and a variety of nutrient-dense plant-based ingredients.",
    prep_time: 15,
    cook_time: 25,
    servings: 4,
    difficulty: "easy",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cc08a8e6-5bef-42e4-9d33-eaebf5053004/roasted-sweet-potato-and-quinoa-breakfast-bowl-1760177928341.png",
    diet_plan_names: [{ name: "Vegan", slug: "vegan" }],
    recipe_nutrition: [{
      fat: 30,
      carbs: 55,
      fiber: 8,
      protein: 15,
      calories: 350
    }]
  },
  // Vegetarian
  {
    id: "8eef8838-fcbb-4dec-ad6a-48f5f41b393a",
    name: "Roasted Vegetable and Quinoa Bake",
    description: "A hearty and nutritious vegetarian dinner featuring a medley of roasted winter vegetables and fluffy quinoa, baked to perfection.",
    prep_time: 20,
    cook_time: 25,
    servings: 4,
    difficulty: "medium",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8eef8838-fcbb-4dec-ad6a-48f5f41b393a/roasted-vegetable-and-quinoa-bake-1760179764289.png",
    diet_plan_names: [{ name: "Vegetarian", slug: "vegetarian" }],
    recipe_nutrition: [{
      fat: 30,
      carbs: 50,
      fiber: 8,
      protein: 20,
      calories: 350
    }]
  },
  // Vegetarian
  {
    id: "93f81168-7d2c-4095-bc9f-fff8ff63370f",
    name: "Autumn Harvest Vegetarian Bowl",
    description: "A hearty and nourishing vegetarian lunch bowl featuring roasted fall vegetables, quinoa, and a creamy tahini dressing.",
    prep_time: 20,
    cook_time: 25,
    servings: 4,
    difficulty: "easy",
    image_url: "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/93f81168-7d2c-4095-bc9f-fff8ff63370f/autumn-harvest-vegetarian-bowl-1760136290274.png",
    diet_plan_names: [{ name: "Vegetarian", slug: "vegetarian" }],
    recipe_nutrition: [{
      fat: 30,
      carbs: 50,
      fiber: 8,
      protein: 20,
      calories: 350
    }]
  }
]
