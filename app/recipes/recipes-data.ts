// Auto-generated from database - Do not edit manually
// Generated on: 2025-10-14T18:38:00.250Z
// Total recipes: 241

export interface Recipe {
  id: string
  name: string
  description: string
  prep_time: number
  cook_time: number
  servings: number
  difficulty: string
  image_url?: string | null
  diet_plan_names: { name: string; slug: string }[]
  recipe_nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
}

export const recipesByDiet = {
  "keto": [
    {
      "id": "a964b9ab-f070-4198-a0b1-9b954a4c8719",
      "name": "Roasted Garlic and Parmesan Zucchini Noodles",
      "description": "A delicious and satisfying keto-friendly dinner featuring zucchini noodles tossed in a creamy garlic-parmesan sauce.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a964b9ab-f070-4198-a0b1-9b954a4c8719/roasted-garlic-and-parmesan-zucchini-noodles-1760134071733.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 24,
        "carbs": 5,
        "fiber": 2,
        "protein": 12,
        "calories": 280
      }
    },
    {
      "id": "a321ed3e-8cdf-429f-bff1-086fe3550147",
      "name": "Roasted Salmon with Buttered Broccoli and Cauliflower",
      "description": "A delicious and satisfying keto-friendly lunch featuring wild-caught salmon, roasted broccoli and cauliflower in a rich, creamy butter sauce.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a321ed3e-8cdf-429f-bff1-086fe3550147/roasted-salmon-with-buttered-broccoli-and-cauliflower-1760133843316.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 26,
        "carbs": 10,
        "fiber": 4,
        "protein": 40,
        "calories": 425
      }
    },
    {
      "id": "35b21d42-2729-47e9-87bf-5ac4794d8010",
      "name": "Keto Breakfast Casserole with Spinach and Bacon",
      "description": "A delicious and satisfying keto-friendly breakfast casserole made with eggs, spinach, and crispy bacon.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/35b21d42-2729-47e9-87bf-5ac4794d8010/keto-breakfast-casserole-with-spinach-and-bacon-1760134035259.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 28,
        "carbs": 5,
        "fiber": 2,
        "protein": 25,
        "calories": 375
      }
    },
    {
      "id": "e3ea01e2-94e7-47e0-aeba-1aa47d64d8d9",
      "name": "Creamy Keto Mushroom Bites",
      "description": "Savory keto-friendly mushroom caps filled with a creamy, cheesy filling for a delightful winter snack.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e3ea01e2-94e7-47e0-aeba-1aa47d64d8d9/creamy-keto-mushroom-bites-1760133836279.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 13,
        "carbs": 4,
        "fiber": 1,
        "protein": 8,
        "calories": 155
      }
    },
    {
      "id": "77c28fa7-a6ba-445d-9b64-03084642d886",
      "name": "Baked Salmon with Roasted Brussels Sprouts and Avocado",
      "description": "A delicious and nutritious keto-friendly lunch featuring baked salmon, roasted Brussels sprouts, and creamy avocado.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/77c28fa7-a6ba-445d-9b64-03084642d886/baked-salmon-with-roasted-brussels-sprouts-and-avocado-1760133814219.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 6,
        "protein": 20,
        "calories": 400
      }
    },
    {
      "id": "f7370a8d-b05c-417e-a0bd-357958ec5893",
      "name": "Roasted Cauliflower and Garlic Soup with Crispy Bacon",
      "description": "A creamy, comforting keto-friendly soup made with roasted cauliflower, garlic, and topped with crispy bacon.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f7370a8d-b05c-417e-a0bd-357958ec5893/roasted-cauliflower-and-garlic-soup-with-crispy-bacon-1760133791997.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 4,
        "protein": 20,
        "calories": 345
      }
    },
    {
      "id": "df316e0b-f0d6-4b14-bfa9-bcd39eadb1c0",
      "name": "Roasted Keto Broccoli Bites",
      "description": "Crispy, flavorful broccoli bites that make the perfect keto-friendly snack or side dish.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/df316e0b-f0d6-4b14-bfa9-bcd39eadb1c0/roasted-keto-broccoli-bites-1760133694717.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 13,
        "carbs": 5,
        "fiber": 3,
        "protein": 9,
        "calories": 165
      }
    },
    {
      "id": "06450538-7e5e-48f6-b8ca-6dd6d1b823df",
      "name": "Roasted Salmon with Garlic Butter and Roasted Brussels Sprouts",
      "description": "A delicious and nutritious keto-friendly dinner featuring tender roasted salmon, garlic butter, and roasted brussels sprouts.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/06450538-7e5e-48f6-b8ca-6dd6d1b823df/roasted-salmon-with-garlic-butter-and-roasted-brussels-sprouts-1760133514181.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 5,
        "protein": 20,
        "calories": 420
      }
    },
    {
      "id": "fa32334e-01d8-4d20-afb0-61485c79c1bb",
      "name": "Keto Breakfast Skillet with Roasted Winter Vegetables",
      "description": "A delicious and satisfying keto-friendly breakfast skillet packed with nutrient-dense winter vegetables, savory sausage, and creamy eggs.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fa32334e-01d8-4d20-afb0-61485c79c1bb/keto-breakfast-skillet-with-roasted-winter-vegetables-1760133471027.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 380
      }
    },
    {
      "id": "6771c64d-681e-43be-a331-d883827a2d11",
      "name": "Creamy Keto Chicken Carbonara",
      "description": "A rich and indulgent keto-friendly carbonara made with tender chicken, crispy bacon, and a creamy, low-carb sauce.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6771c64d-681e-43be-a331-d883827a2d11/creamy-keto-chicken-carbonara-1760133464153.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 5,
        "fiber": 2,
        "protein": 40,
        "calories": 480
      }
    },
    {
      "id": "821e12e4-1ae6-4fc3-8e32-9029922a22a4",
      "name": "Roasted Cauliflower and Chicken Alfredo",
      "description": "A delicious and creamy keto-friendly dinner featuring roasted cauliflower, tender chicken, and a rich Alfredo sauce.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/821e12e4-1ae6-4fc3-8e32-9029922a22a4/roasted-cauliflower-and-chicken-alfredo-1760133448788.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 10,
        "fiber": 4,
        "protein": 38,
        "calories": 450
      }
    },
    {
      "id": "3b1c51ef-3d13-4b57-8089-9a18c293240c",
      "name": "Keto Roasted Walnut Bites",
      "description": "Crunchy, savory walnut bites packed with healthy fats and protein for a satisfying keto snack.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3b1c51ef-3d13-4b57-8089-9a18c293240c/keto-roasted-walnut-bites-1760044214532.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 25,
        "carbs": 4,
        "fiber": 2,
        "protein": 6,
        "calories": 260
      }
    },
    {
      "id": "49dc77b8-16a7-44c8-aec3-f2ac3d3d99a3",
      "name": "Keto Roasted Broccoli with Avocado Dip",
      "description": "A delicious and easy-to-make keto snack featuring roasted broccoli florets dipped in a creamy avocado-based dip, perfect for a winter pick-me-up.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/49dc77b8-16a7-44c8-aec3-f2ac3d3d99a3/keto-roasted-broccoli-with-avocado-dip-1760133186005.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 5,
        "fiber": 6,
        "protein": 20,
        "calories": 280
      }
    },
    {
      "id": "eaa507eb-9f23-40bf-85d0-218d0ae0215e",
      "name": "Keto Breakfast Frittata with Roasted Vegetables",
      "description": "A delicious and nutritious keto-friendly breakfast frittata loaded with winter vegetables and baked to perfection.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eaa507eb-9f23-40bf-85d0-218d0ae0215e/keto-breakfast-frittata-with-roasted-vegetables-1760133377021.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 25,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 325
      }
    },
    {
      "id": "edb343b5-ff33-49ea-ba6f-e3fc45c33602",
      "name": "Keto Spiced Roasted Almonds",
      "description": "Crunchy, savory, and satisfying keto-friendly snack made with roasted almonds and warming winter spices.",
      "prep_time": 10,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/edb343b5-ff33-49ea-ba6f-e3fc45c33602/keto-spiced-roasted-almonds-1760133171800.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 24,
        "carbs": 5,
        "fiber": 4,
        "protein": 8,
        "calories": 270
      }
    },
    {
      "id": "39b772a3-6323-4d2e-824a-b32ef220a6bc",
      "name": "Roasted Garlic and Cauliflower Mash with Seared Steak",
      "description": "A delicious and satisfying keto-friendly dinner featuring tender steak and creamy cauliflower mash, perfect for a cozy winter meal.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/39b772a3-6323-4d2e-824a-b32ef220a6bc/roasted-garlic-and-cauliflower-mash-with-seared-steak-1760133129766.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 400
      }
    },
    {
      "id": "9fea50c3-3c59-48e1-a874-94dc7037fc1c",
      "name": "Keto Spinach and Mushroom Frittata",
      "description": "A delicious and nutritious keto-friendly breakfast featuring fresh spinach, earthy mushrooms, and creamy eggs.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9fea50c3-3c59-48e1-a874-94dc7037fc1c/keto-spinach-and-mushroom-frittata-1760133304972.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "15e579fa-15d6-4c49-b2ed-1ca4b1f8c796",
      "name": "Creamy Garlic Chicken with Roasted Brussels Sprouts",
      "description": "A delectable keto-friendly dinner featuring tender chicken in a rich garlic cream sauce, served with roasted Brussels sprouts for a satisfying and nutritious meal.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/15e579fa-15d6-4c49-b2ed-1ca4b1f8c796/creamy-garlic-chicken-with-roasted-brussels-sprouts-1760133030848.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 34,
        "carbs": 5,
        "fiber": 4,
        "protein": 20,
        "calories": 415
      }
    },
    {
      "id": "6529a69e-20e3-4041-9f3c-eddd889cc47e",
      "name": "Keto Roasted Broccoli and Cauliflower Bites",
      "description": "Crispy, savory bites of roasted broccoli and cauliflower make for a delicious keto-friendly snack.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6529a69e-20e3-4041-9f3c-eddd889cc47e/keto-roasted-broccoli-and-cauliflower-bites-1760132924694.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 5,
        "fiber": 3,
        "protein": 8,
        "calories": 150
      }
    },
    {
      "id": "196fcbfe-df9b-4127-91dd-7fdf1abeb62c",
      "name": "Keto Breakfast Skillet with Sausage and Spinach",
      "description": "A delicious and nutritious keto-friendly breakfast that will keep you feeling full and energized throughout the morning.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/196fcbfe-df9b-4127-91dd-7fdf1abeb62c/keto-breakfast-skillet-with-sausage-and-spinach-1760132726197.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 27,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 365
      }
    },
    {
      "id": "916e1da7-6785-4f6b-a68a-1806e2c7f02c",
      "name": "Keto Roasted Chicken with Cauliflower Mash",
      "description": "A delicious and satisfying keto-friendly dinner featuring juicy roasted chicken and creamy cauliflower mash, perfect for the winter season.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/916e1da7-6785-4f6b-a68a-1806e2c7f02c/keto-roasted-chicken-with-cauliflower-mash-1760132705418.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 5,
        "fiber": 3,
        "protein": 35,
        "calories": 480
      }
    },
    {
      "id": "deadafb2-f9a6-4bba-ba19-88ce060f5a92",
      "name": "Creamy Keto Mushroom Soup",
      "description": "A rich and creamy keto-friendly mushroom soup made with seasonal winter ingredients, perfect for a cozy lunch.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/deadafb2-f9a6-4bba-ba19-88ce060f5a92/creamy-keto-mushroom-soup-1760132889539.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 280
      }
    },
    {
      "id": "5717046d-fb2f-4b0b-9858-3f2439019170",
      "name": "Creamy Keto Mushroom Omelette",
      "description": "A delicious and satisfying keto-friendly breakfast made with fluffy eggs, sautéed mushrooms, and a creamy cheese sauce.",
      "prep_time": 15,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5717046d-fb2f-4b0b-9858-3f2439019170/creamy-keto-mushroom-omelette-1760132698577.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "f5230f32-11ee-48da-8d3c-a983ea9c267f",
      "name": "Keto Roasted Broccoli with Garlic Butter",
      "description": "A delicious and easy-to-make keto-friendly snack that's perfect for the winter season.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f5230f32-11ee-48da-8d3c-a983ea9c267f/keto-roasted-broccoli-with-garlic-butter-1760132691444.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 16,
        "carbs": 5,
        "fiber": 2,
        "protein": 5,
        "calories": 180
      }
    },
    {
      "id": "694a5e9c-8947-40de-b852-b335b13bfc7b",
      "name": "Roasted Garlic and Parmesan Zucchini Chips",
      "description": "Crispy, flavorful zucchini chips that make the perfect keto-friendly snack!",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/694a5e9c-8947-40de-b852-b335b13bfc7b/roasted-garlic-and-parmesan-zucchini-chips-1760132663545.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 5,
        "fiber": 2,
        "protein": 9,
        "calories": 190
      }
    },
    {
      "id": "d4759492-b2f3-43a8-9444-f2930c543627",
      "name": "Creamy Keto Chicken and Broccoli Casserole",
      "description": "A delicious and easy-to-make keto-friendly casserole packed with tender chicken, broccoli, and a creamy cheese sauce.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d4759492-b2f3-43a8-9444-f2930c543627/creamy-keto-chicken-and-broccoli-casserole-1760132620393.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 450
      }
    },
    {
      "id": "b254bb22-3a1a-4467-844a-e9eb7e3704b4",
      "name": "Keto Breakfast Frittata with Roasted Winter Veggies",
      "description": "A hearty and nutritious keto-friendly breakfast frittata loaded with roasted winter vegetables and baked to perfection.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b254bb22-3a1a-4467-844a-e9eb7e3704b4/keto-breakfast-frittata-with-roasted-winter-veggies-1760132613013.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 340
      }
    },
    {
      "id": "061bc20d-c6ee-4f49-8372-75f8c1425ae8",
      "name": "Keto Cinnamon Roasted Almonds",
      "description": "Crunchy, buttery almonds coated in a sweet and spicy cinnamon blend - the perfect keto-friendly winter snack!",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/061bc20d-c6ee-4f49-8372-75f8c1425ae8/keto-cinnamon-roasted-almonds-1760132598696.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 4,
        "protein": 20,
        "calories": 300
      }
    },
    {
      "id": "89b78410-68c0-4c77-a12d-d80f53794aa2",
      "name": "Roasted Cauliflower and Avocado Salad with Lemon Garlic Dressing",
      "description": "A delicious and nutrient-dense keto-friendly lunch that combines the earthy flavors of roasted cauliflower with the creamy goodness of avocado, all tossed in a zesty lemon garlic dressing.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/89b78410-68c0-4c77-a12d-d80f53794aa2/roasted-cauliflower-and-avocado-salad-with-lemon-garlic-dressing-1760132570976.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 7,
        "protein": 20,
        "calories": 320
      }
    },
    {
      "id": "bb762cfa-447e-4fd0-bc7c-5a589b70b729",
      "name": "Roasted Pumpkin Seed Butter Cups",
      "description": "Delicious and nutritious keto-friendly pumpkin seed butter cups made with just a few simple ingredients.",
      "prep_time": 10,
      "cook_time": 5,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bb762cfa-447e-4fd0-bc7c-5a589b70b729/roasted-pumpkin-seed-butter-cups-1760132224024.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 5,
        "fiber": 3,
        "protein": 10,
        "calories": 240
      }
    },
    {
      "id": "0375cd9d-e6b5-4bac-9646-2c62bbcd9f5f",
      "name": "Roasted Pumpkin Soup with Crispy Bacon",
      "description": "A creamy, comforting keto-friendly pumpkin soup topped with crispy bacon and pumpkin seeds for a delicious fall lunch.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0375cd9d-e6b5-4bac-9646-2c62bbcd9f5f/roasted-pumpkin-soup-with-crispy-bacon-1760132217146.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 4,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "539deceb-9b51-4c38-832d-1ec85990625f",
      "name": "Roasted Butternut Squash with Grilled Chicken and Creamy Avocado Sauce",
      "description": "A delicious and satisfying keto-friendly dinner featuring tender roasted butternut squash, juicy grilled chicken, and a creamy avocado-based sauce.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/539deceb-9b51-4c38-832d-1ec85990625f/roasted-butternut-squash-with-grilled-chicken-and-creamy-avocado-sauce-1760044946902.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 15,
        "fiber": 5,
        "protein": 25,
        "calories": 420
      }
    },
    {
      "id": "0639580a-a55c-42e9-99c3-bf27df8d4cd8",
      "name": "Autumn Keto Squash Bites",
      "description": "Savory and satisfying keto-friendly bites featuring roasted butternut squash, pecans, and warming spices.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0639580a-a55c-42e9-99c3-bf27df8d4cd8/autumn-keto-squash-bites-1760131493737.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 17,
        "carbs": 14,
        "fiber": 4,
        "protein": 4,
        "calories": 210
      }
    },
    {
      "id": "fb772f8e-8f58-419f-9ca8-3611a357f063",
      "name": "Roasted Butternut Squash Salad with Pecans and Goat Cheese",
      "description": "A delicious and nutritious keto-friendly lunch featuring roasted butternut squash, crunchy pecans, and creamy goat cheese.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fb772f8e-8f58-419f-9ca8-3611a357f063/roasted-butternut-squash-salad-with-pecans-and-goat-cheese-1760048206902.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "dc64e052-cabb-4f22-8975-d9f978b8846d",
      "name": "Roasted Butternut Squash and Bacon Salad",
      "description": "A delicious and filling keto-friendly lunch featuring roasted butternut squash, crispy bacon, and a creamy avocado dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dc64e052-cabb-4f22-8975-d9f978b8846d/roasted-butternut-squash-and-bacon-salad-1760048192701.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 7,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "d9d98d6e-00c5-47c6-9288-c1c07cbb1765",
      "name": "Baked Pumpkin Egg Cups",
      "description": "Delicious and nutritious keto-friendly breakfast baked in a pumpkin shell.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d9d98d6e-00c5-47c6-9288-c1c07cbb1765/baked-pumpkin-egg-cups-1760046058593.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 2,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "a163710c-5432-4651-b6a8-2492975b66f0",
      "name": "Roasted Autumn Vegetable and Chicken Salad",
      "description": "A delicious and satisfying keto-friendly lunch featuring roasted seasonal vegetables and grilled chicken in a creamy avocado dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a163710c-5432-4651-b6a8-2492975b66f0/roasted-autumn-vegetable-and-chicken-salad-1760128265348.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 28,
        "carbs": 12,
        "fiber": 5,
        "protein": 20,
        "calories": 380
      }
    },
    {
      "id": "568cad93-5aed-4f71-8bda-f7c891902ea1",
      "name": "Roasted Butternut Squash and Bacon Frittata",
      "description": "A delicious and nutritious keto-friendly breakfast featuring roasted butternut squash, crispy bacon, and baked eggs.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/568cad93-5aed-4f71-8bda-f7c891902ea1/roasted-butternut-squash-and-bacon-frittata-1760048149394.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "3e917714-c09d-4597-ab43-851949a3696c",
      "name": "Autumn Keto Nut Butter Cups",
      "description": "Delicious and satisfying keto-friendly snack featuring homemade pumpkin seed butter and dark chocolate.",
      "prep_time": 10,
      "cook_time": 5,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3e917714-c09d-4597-ab43-851949a3696c/autumn-keto-nut-butter-cups-1760046794856.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 5,
        "fiber": 3,
        "protein": 10,
        "calories": 250
      }
    },
    {
      "id": "abb752bc-c076-4e8d-8a41-d2c066505b17",
      "name": "Pumpkin Seed Keto Bark",
      "description": "A delicious and satisfying keto-friendly snack made with roasted pumpkin seeds, dark chocolate, and warming fall spices.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/abb752bc-c076-4e8d-8a41-d2c066505b17/pumpkin-seed-keto-bark-1760046780351.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 5,
        "fiber": 3,
        "protein": 10,
        "calories": 240
      }
    },
    {
      "id": "90920577-5783-4ad1-8b93-ecdf4a647f9b",
      "name": "Roasted Autumn Squash with Grilled Chicken and Walnut Pesto",
      "description": "A delicious and nutrient-dense keto-friendly dinner featuring roasted seasonal squash, juicy grilled chicken, and a flavorful walnut pesto.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90920577-5783-4ad1-8b93-ecdf4a647f9b/roasted-autumn-squash-with-grilled-chicken-and-walnut-pesto-1760046406067.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 26,
        "carbs": 14,
        "fiber": 6,
        "protein": 30,
        "calories": 395
      }
    },
    {
      "id": "46be256b-55da-4fbe-9a13-94383fc4e5ec",
      "name": "Roasted Acorn Squash and Chicken Salad",
      "description": "A delicious and satisfying keto-friendly lunch featuring roasted acorn squash, grilled chicken, and a creamy avocado dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/46be256b-55da-4fbe-9a13-94383fc4e5ec/roasted-acorn-squash-and-chicken-salad-1760131386852.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "5f30dff3-1979-48aa-8b2e-b92715c0a144",
      "name": "Autumn Pumpkin Seed Butter Cups",
      "description": "Delicious keto-friendly pumpkin seed butter cups made with seasonal pumpkin seeds and flavored with warm fall spices.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5f30dff3-1979-48aa-8b2e-b92715c0a144/autumn-pumpkin-seed-butter-cups-1760131380000.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 270
      }
    },
    {
      "id": "78502820-f2ef-445a-b9ff-b0d003e4ef1e",
      "name": "Autumn Keto Baked Salmon with Roasted Vegetables",
      "description": "A delicious and nutritious keto-friendly dinner featuring baked salmon and roasted seasonal vegetables, perfect for the fall season.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/78502820-f2ef-445a-b9ff-b0d003e4ef1e/autumn-keto-baked-salmon-with-roasted-vegetables-1760131198908.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 6,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "caaa029e-3f10-4ef7-855c-98a4af180afb",
      "name": "Autumn Keto Breakfast Skillet",
      "description": "A delicious and satisfying keto-friendly breakfast skillet made with seasonal fall ingredients like butternut squash, spinach, and sage.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/caaa029e-3f10-4ef7-855c-98a4af180afb/autumn-keto-breakfast-skillet-1760131178126.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 25,
        "carbs": 10,
        "fiber": 4,
        "protein": 20,
        "calories": 330
      }
    },
    {
      "id": "4ad8f8cd-bb40-421b-9c44-b37ca7bff6bf",
      "name": "Roasted Pumpkin and Spinach Frittata",
      "description": "A delectable keto-friendly breakfast featuring roasted pumpkin, creamy eggs, and nutrient-dense spinach.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4ad8f8cd-bb40-421b-9c44-b37ca7bff6bf/roasted-pumpkin-and-spinach-frittata-1760047090106.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "fe51697f-7c96-44a3-ba87-18213760e00e",
      "name": "Roasted Acorn Squash with Creamy Garlic Chicken",
      "description": "A delicious and satisfying keto-friendly dinner featuring roasted acorn squash and creamy garlic chicken. Perfect for a cozy fall evening.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fe51697f-7c96-44a3-ba87-18213760e00e/roasted-acorn-squash-with-creamy-garlic-chicken-1760047083296.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 12,
        "fiber": 4,
        "protein": 38,
        "calories": 390
      }
    },
    {
      "id": "190e3f43-93e3-46e8-883a-3cbea13d388c",
      "name": "Keto Pumpkin Spice Muffins",
      "description": "Warm, fragrant keto-friendly pumpkin muffins made with almond flour and healthy fats.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/190e3f43-93e3-46e8-883a-3cbea13d388c/keto-pumpkin-spice-muffins-1760128173687.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 5,
        "fiber": 3,
        "protein": 9,
        "calories": 260
      }
    },
    {
      "id": "94a35082-a15f-4d6a-a9ce-4f1e7e2518a9",
      "name": "Roasted Pork Tenderloin with Creamy Garlic Broccoli",
      "description": "A delicious and satisfying keto-friendly dinner featuring tender pork tenderloin and creamy garlic-infused broccoli, perfect for the fall season.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/94a35082-a15f-4d6a-a9ce-4f1e7e2518a9/roasted-pork-tenderloin-with-creamy-garlic-broccoli-1760047040946.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 75,
        "carbs": 5,
        "fiber": 3,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "dee72527-0c29-4ced-ae5f-aeb8b6073b1f",
      "name": "Spiced Pumpkin Seed Keto Snack",
      "description": "A delicious and satisfying keto-friendly snack made with roasted pumpkin seeds, cinnamon, and fall spices.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dee72527-0c29-4ced-ae5f-aeb8b6073b1f/spiced-pumpkin-seed-keto-snack-1760045652861.png",
      "diet_plan_names": [
        {
          "name": "Keto Diet",
          "slug": "keto"
        }
      ],
      "recipe_nutrition": {
        "fat": 25,
        "carbs": 5,
        "fiber": 4,
        "protein": 20,
        "calories": 290
      }
    }
  ],
  "mediterranean": [
    {
      "id": "ec912d3b-2b85-45a7-8c7b-c6f7f257c11e",
      "name": "Mediterranean Tuna and Chickpea Salad",
      "description": "A flavorful and nutrient-dense snack featuring tuna, chickpeas, and a variety of Mediterranean vegetables and herbs.",
      "prep_time": 20,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ec912d3b-2b85-45a7-8c7b-c6f7f257c11e/mediterranean-tuna-and-chickpea-salad-1760188101661.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 8,
        "protein": 25,
        "calories": 300
      }
    },
    {
      "id": "003c5005-7fa1-426d-aaf2-98d1e1519961",
      "name": "Mediterranean Chickpea Salad",
      "description": "A refreshing and flavorful Mediterranean-inspired snack made with chickpeas, vegetables, and a tangy olive oil dressing.",
      "prep_time": 20,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/003c5005-7fa1-426d-aaf2-98d1e1519961/mediterranean-chickpea-salad-1760188094704.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 30,
        "fiber": 7,
        "protein": 10,
        "calories": 240
      }
    },
    {
      "id": "16a91276-86c8-4131-88ba-4dcf5ff7ad36",
      "name": "Mediterranean Quinoa and Egg Breakfast Bowl",
      "description": "A nutritious and flavorful breakfast featuring quinoa, vegetables, and poached eggs, all drizzled with a vibrant olive oil and lemon dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/16a91276-86c8-4131-88ba-4dcf5ff7ad36/mediterranean-quinoa-and-egg-breakfast-bowl-1760188003980.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 7,
        "protein": 20,
        "calories": 370
      }
    },
    {
      "id": "d7b2e0da-b458-4aae-ab6f-957ec948e189",
      "name": "Mediterranean Quinoa Stuffed Peppers",
      "description": "Flavorful and nutritious Mediterranean-inspired snack featuring quinoa, vegetables, and olive oil.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d7b2e0da-b458-4aae-ab6f-957ec948e189/mediterranean-quinoa-stuffed-peppers-1760187983444.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 36,
        "fiber": 8,
        "protein": 10,
        "calories": 280
      }
    },
    {
      "id": "c9f4b65d-4044-4ff9-9482-3a1986257f51",
      "name": "Mediterranean Chickpea and Quinoa Salad",
      "description": "A refreshing and nutritious Mediterranean-inspired snack featuring chickpeas, quinoa, and a flavorful olive oil-based dressing.",
      "prep_time": 20,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c9f4b65d-4044-4ff9-9482-3a1986257f51/mediterranean-chickpea-and-quinoa-salad-1760187919511.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 13,
        "carbs": 45,
        "fiber": 9,
        "protein": 12,
        "calories": 320
      }
    },
    {
      "id": "c84d2efa-76a7-439c-b77d-38cbc6738352",
      "name": "Mediterranean Baked Falafel Bites",
      "description": "Delicious and nutritious Mediterranean-inspired baked falafel bites made with chickpeas, herbs, and spices. A perfect snack or appetizer.",
      "prep_time": 20,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c84d2efa-76a7-439c-b77d-38cbc6738352/mediterranean-baked-falafel-bites-1760187815185.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 28,
        "fiber": 7,
        "protein": 9,
        "calories": 220
      }
    },
    {
      "id": "6096cdea-e097-4c77-99a7-036260e0fcc7",
      "name": "Mediterranean Chickpea and Spinach Salad",
      "description": "A refreshing and nutritious Mediterranean-inspired snack made with chickpeas, spinach, and a flavorful olive oil-based dressing.",
      "prep_time": 20,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6096cdea-e097-4c77-99a7-036260e0fcc7/mediterranean-chickpea-and-spinach-salad-1760187743226.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 24,
        "fiber": 6,
        "protein": 8,
        "calories": 210
      }
    },
    {
      "id": "37b10d8f-0b95-4adf-bf92-468ceffee49d",
      "name": "Mediterranean Salmon and Quinoa Salad",
      "description": "A delicious and nutritious Mediterranean-inspired lunch featuring grilled salmon, quinoa, fresh vegetables, and a zesty lemon-garlic dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/37b10d8f-0b95-4adf-bf92-468ceffee49d/mediterranean-salmon-and-quinoa-salad-1760187716174.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 16,
        "carbs": 27,
        "fiber": 6,
        "protein": 25,
        "calories": 360
      }
    },
    {
      "id": "b8a044b5-6cd3-46c7-8f78-0b80d28be399",
      "name": "Mediterranean Winter Vegetable Salad",
      "description": "A vibrant and nourishing Mediterranean-inspired snack featuring roasted winter vegetables, chickpeas, and a tangy lemon-herb dressing.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b8a044b5-6cd3-46c7-8f78-0b80d28be399/mediterranean-winter-vegetable-salad-1760134582983.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 40,
        "fiber": 9,
        "protein": 9,
        "calories": 280
      }
    },
    {
      "id": "9f7d06d5-00c0-41b5-b8dc-bba003d948cd",
      "name": "Winter Minestrone Soup",
      "description": "A hearty and nourishing Mediterranean-inspired vegetable soup featuring seasonal produce and whole grains.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9f7d06d5-00c0-41b5-b8dc-bba003d948cd/winter-minestrone-soup-1760134511329.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 45,
        "fiber": 10,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "4cc89575-97ac-45b6-8d4d-99ea359167e8",
      "name": "Mediterranean Roasted Vegetable Medley",
      "description": "A delightful Mediterranean-inspired snack featuring a blend of roasted seasonal vegetables, drizzled with flavorful olive oil and sprinkled with herbs.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4cc89575-97ac-45b6-8d4d-99ea359167e8/mediterranean-roasted-vegetable-medley-1760134482812.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 14,
        "carbs": 18,
        "fiber": 6,
        "protein": 5,
        "calories": 210
      }
    },
    {
      "id": "b3a3c78b-bcd1-4892-9819-7af03ea538f4",
      "name": "Mediterranean Roasted Vegetable Hummus Platter",
      "description": "A vibrant and nutritious Mediterranean-inspired snack platter featuring roasted seasonal vegetables, creamy homemade hummus, and whole grain crackers.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b3a3c78b-bcd1-4892-9819-7af03ea538f4/mediterranean-roasted-vegetable-hummus-platter-1760134398229.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 10,
        "calories": 300
      }
    },
    {
      "id": "04226dc2-1ca9-46cc-81ff-35e09e3883e4",
      "name": "Roasted Winter Vegetable Medley with Baked Cod",
      "description": "A delicious and nutritious Mediterranean-style snack featuring a colorful array of roasted seasonal vegetables and flaky baked cod, drizzled with a zesty lemon-garlic olive oil dressing.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/04226dc2-1ca9-46cc-81ff-35e09e3883e4/roasted-winter-vegetable-medley-with-baked-cod-1760134384345.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 25,
        "fiber": 6,
        "protein": 25,
        "calories": 320
      }
    },
    {
      "id": "264cb291-db77-463c-a2b0-05ccdc465f6c",
      "name": "Mediterranean Winter Vegetable Soup",
      "description": "A nourishing and comforting Mediterranean-inspired vegetable soup, perfect for a winter snack.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/264cb291-db77-463c-a2b0-05ccdc465f6c/mediterranean-winter-vegetable-soup-1760134143594.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 35,
        "fiber": 9,
        "protein": 10,
        "calories": 260
      }
    },
    {
      "id": "03281d6c-1015-4793-9349-0466339ccc25",
      "name": "Mediterranean Baked Feta with Roasted Vegetables",
      "description": "A delicious and nutritious Mediterranean-inspired snack featuring roasted vegetables, creamy feta, and a drizzle of olive oil.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/03281d6c-1015-4793-9349-0466339ccc25/mediterranean-baked-feta-with-roasted-vegetables-1760133708462.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 25,
        "fiber": 6,
        "protein": 20,
        "calories": 320
      }
    },
    {
      "id": "6dc82872-67ce-41e7-a878-dbea309e1289",
      "name": "Winter Vegetable and Chickpea Salad",
      "description": "A nourishing Mediterranean-inspired snack that's packed with seasonal vegetables, protein-rich chickpeas, and healthy fats from olive oil.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6dc82872-67ce-41e7-a878-dbea309e1289/winter-vegetable-and-chickpea-salad-1760133073722.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 27,
        "fiber": 7,
        "protein": 10,
        "calories": 240
      }
    },
    {
      "id": "c9c51cd3-d7db-466d-a307-e388daeec5b8",
      "name": "Roasted Pumpkin and Feta Salad",
      "description": "A delightful Mediterranean-inspired snack featuring roasted pumpkin, feta cheese, and a zesty dressing.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c9c51cd3-d7db-466d-a307-e388daeec5b8/roasted-pumpkin-and-feta-salad-1760132279883.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 18,
        "fiber": 3,
        "protein": 8,
        "calories": 225
      }
    },
    {
      "id": "e4e66710-a20c-4672-84a1-67f84a56ac39",
      "name": "Autumn Roasted Veggie and Quinoa Bowl",
      "description": "A nourishing Mediterranean-inspired breakfast bowl featuring roasted seasonal vegetables, protein-packed quinoa, and a flavorful olive oil dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e4e66710-a20c-4672-84a1-67f84a56ac39/autumn-roasted-veggie-and-quinoa-bowl-1760131841138.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "ad96b3b5-e113-4273-a40b-e1ae26d7fd71",
      "name": "Mediterranean Roasted Vegetable and Feta Salad",
      "description": "A delicious and nutritious Mediterranean-inspired lunch featuring roasted seasonal vegetables, protein-rich chickpeas, and tangy feta cheese.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ad96b3b5-e113-4273-a40b-e1ae26d7fd71/mediterranean-roasted-vegetable-and-feta-salad-1760046017292.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 9,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "07283db5-1121-44c8-81fc-c9141578641f",
      "name": "Mediterranean Shakshuka",
      "description": "Eggs poached in a spiced tomato sauce with feta and herbs",
      "prep_time": 15,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/07283db5-1121-44c8-81fc-c9141578641f/mediterranean-shakshuka-1760045701024.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 22,
        "fiber": 5,
        "protein": 16,
        "calories": 280
      }
    },
    {
      "id": "1587dcfa-08c7-4324-bb80-43fb42387e45",
      "name": "Roasted Vegetable and Feta Breakfast Scramble",
      "description": "A Mediterranean-inspired breakfast that's packed with vegetables, protein, and healthy fats to fuel your day.",
      "prep_time": 20,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1587dcfa-08c7-4324-bb80-43fb42387e45/roasted-vegetable-and-feta-breakfast-scramble-1760128616147.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 6,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "407f1664-5b53-44ab-bc01-7d719b9aed97",
      "name": "Autumn Harvest Mediterranean Salad",
      "description": "A flavorful and nutritious Mediterranean-inspired salad featuring roasted vegetables, grilled salmon, and a tangy lemon-herb dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/407f1664-5b53-44ab-bc01-7d719b9aed97/autumn-harvest-mediterranean-salad-1760130850814.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 30,
        "fiber": 7,
        "protein": 25,
        "calories": 380
      }
    },
    {
      "id": "bda2da91-d5ed-4da6-bb4a-ef644c26c9ed",
      "name": "Mediterranean Roasted Vegetable Hummus Wrap",
      "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted seasonal vegetables, creamy hummus, and whole-grain wrap.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bda2da91-d5ed-4da6-bb4a-ef644c26c9ed/mediterranean-roasted-vegetable-hummus-wrap-1760130559337.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "d12e219f-7b21-411b-9fbf-b8e634bc79f8",
      "name": "Roasted Salmon with Autumn Veggies",
      "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon, seasonal vegetables, and whole grains.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d12e219f-7b21-411b-9fbf-b8e634bc79f8/roasted-salmon-with-autumn-veggies-1760128538724.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 35,
        "fiber": 7,
        "protein": 30,
        "calories": 425
      }
    },
    {
      "id": "b56b9c9c-2dad-4a4f-ab6f-be690176f935",
      "name": "Autumn Frittata with Roasted Vegetables",
      "description": "A delicious and nutritious Mediterranean-style breakfast frittata featuring seasonal vegetables and lean protein.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b56b9c9c-2dad-4a4f-ab6f-be690176f935/autumn-frittata-with-roasted-vegetables-1760046356383.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 22,
        "carbs": 18,
        "fiber": 4,
        "protein": 20,
        "calories": 345
      }
    },
    {
      "id": "0e7f95ac-59bb-482a-9733-7c9565d3396e",
      "name": "Roasted Vegetable Frittata with Feta and Whole Grain Toast",
      "description": "A delicious and nutritious Mediterranean-inspired breakfast featuring roasted seasonal vegetables, eggs, and whole grain toast.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0e7f95ac-59bb-482a-9733-7c9565d3396e/roasted-vegetable-frittata-with-feta-and-whole-grain-toast-1760046315431.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 6,
        "protein": 20,
        "calories": 340
      }
    },
    {
      "id": "41893203-3142-4aa4-b857-b47951c31b35",
      "name": "Roasted Salmon with Autumn Vegetables",
      "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon and a medley of seasonal vegetables, all drizzled with a flavorful olive oil dressing.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/41893203-3142-4aa4-b857-b47951c31b35/roasted-salmon-with-autumn-vegetables-1760046308507.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 8,
        "protein": 25,
        "calories": 350
      }
    },
    {
      "id": "5f3728f0-72c9-4593-9477-ba225bfb64c7",
      "name": "Autumn Mediterranean Salmon and Quinoa Bowl",
      "description": "A nourishing and flavorful Mediterranean-inspired dinner featuring roasted salmon, quinoa, and a variety of seasonal vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5f3728f0-72c9-4593-9477-ba225bfb64c7/autumn-mediterranean-salmon-and-quinoa-bowl-1760131142942.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 35,
        "fiber": 7,
        "protein": 30,
        "calories": 400
      }
    },
    {
      "id": "f2e80c58-220d-44de-bbfa-07a46098fc23",
      "name": "Autumn Quinoa Salad with Roasted Vegetables",
      "description": "A Mediterranean-inspired quinoa salad featuring roasted seasonal vegetables, chickpeas, and a tangy lemon-herb dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f2e80c58-220d-44de-bbfa-07a46098fc23/autumn-quinoa-salad-with-roasted-vegetables-1760131066636.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 45,
        "fiber": 8,
        "protein": 10,
        "calories": 350
      }
    },
    {
      "id": "54b685c1-9824-46b3-9c42-108d14ba8c45",
      "name": "Autumn Harvest Meditteranean Salmon Bowl",
      "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon, seasonal vegetables, and hearty whole grains.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/54b685c1-9824-46b3-9c42-108d14ba8c45/autumn-harvest-meditteranean-salmon-bowl-1760130552609.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 19,
        "carbs": 32,
        "fiber": 7,
        "protein": 30,
        "calories": 430
      }
    },
    {
      "id": "f471df69-4ca6-4c98-b6d7-f81055df9c4f",
      "name": "Autumn Mediterranean Quinoa Bowl",
      "description": "A nourishing and flavorful breakfast bowl featuring seasonal fall produce, quinoa, and heart-healthy Mediterranean ingredients.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f471df69-4ca6-4c98-b6d7-f81055df9c4f/autumn-mediterranean-quinoa-bowl-1760130517523.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "9dcb2bc3-ba18-4dc6-aa3e-f193bafe1036",
      "name": "Roasted Butternut Squash and Lentil Salad",
      "description": "A delightful Mediterranean-inspired snack featuring roasted butternut squash, lentils, and a flavorful dressing.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9dcb2bc3-ba18-4dc6-aa3e-f193bafe1036/roasted-butternut-squash-and-lentil-salad-1760130677211.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 28,
        "fiber": 7,
        "protein": 10,
        "calories": 220
      }
    },
    {
      "id": "71475241-67d0-47b2-aa09-97b4aef2ee6e",
      "name": "Roasted Vegetable and Quinoa Stuffed Peppers",
      "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted vegetables, quinoa, and stuffed into bell peppers.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/71475241-67d0-47b2-aa09-97b4aef2ee6e/roasted-vegetable-and-quinoa-stuffed-peppers-1760130663032.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 35,
        "fiber": 7,
        "protein": 10,
        "calories": 260
      }
    },
    {
      "id": "31f600c8-624e-4b8d-af99-5b0e299227d6",
      "name": "Mediterranean Baked Salmon with Roasted Veggies",
      "description": "A delicious and nutritious Mediterranean-inspired dinner featuring baked salmon and a medley of roasted seasonal vegetables, all drizzled with heart-healthy olive oil.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/31f600c8-624e-4b8d-af99-5b0e299227d6/mediterranean-baked-salmon-with-roasted-veggies-1760130102903.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 8,
        "protein": 25,
        "calories": 350
      }
    },
    {
      "id": "f0e5ce77-de0d-4e1b-876c-3b696ee51c48",
      "name": "Autumn Harvest Grain Bowl",
      "description": "A nourishing and flavorful Mediterranean-inspired grain bowl featuring roasted fall vegetables, hearty whole grains, and a tangy lemon-garlic dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f0e5ce77-de0d-4e1b-876c-3b696ee51c48/autumn-harvest-grain-bowl-1760130067823.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 9,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "767d878e-c85e-4fa4-92ab-85d19bf6c9ec",
      "name": "Autumn Mediterranean Harvest Bowl",
      "description": "A nourishing and satisfying Mediterranean-inspired lunch bowl featuring roasted seasonal vegetables, flaky baked fish, and wholesome grains.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/767d878e-c85e-4fa4-92ab-85d19bf6c9ec/autumn-mediterranean-harvest-bowl-1760130215094.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 25,
        "calories": 390
      }
    },
    {
      "id": "ca8ff5e0-be29-418b-b380-6e447dd89617",
      "name": "Roasted Mediterranean Vegetable and Salmon Pasta",
      "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted seasonal vegetables, whole grain pasta, and flavorful baked salmon.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ca8ff5e0-be29-418b-b380-6e447dd89617/roasted-mediterranean-vegetable-and-salmon-pasta-1760129913970.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 45,
        "fiber": 7,
        "protein": 25,
        "calories": 450
      }
    },
    {
      "id": "90021192-2c01-450e-8254-96b2457871ef",
      "name": "Autumn Mediterranean Salmon Bake",
      "description": "A delicious and healthy Mediterranean-inspired salmon bake featuring seasonal fall vegetables and whole grains.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90021192-2c01-450e-8254-96b2457871ef/autumn-mediterranean-salmon-bake-1760129647876.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 6,
        "protein": 25,
        "calories": 375
      }
    },
    {
      "id": "c6d5df30-5c9f-40eb-b9f5-3493c534e2f9",
      "name": "Roasted Autumn Vegetable Hummus",
      "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted seasonal vegetables and creamy hummus.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c6d5df30-5c9f-40eb-b9f5-3493c534e2f9/roasted-autumn-vegetable-hummus-1760129569963.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 45,
        "fiber": 8,
        "protein": 10,
        "calories": 320
      }
    },
    {
      "id": "5c150113-a886-407b-a1b0-c970f66e27b6",
      "name": "Roasted Fall Vegetable Medley with Lemon-Garlic Chickpeas",
      "description": "A Mediterranean-inspired snack that combines the sweetness of roasted seasonal vegetables with the protein-packed goodness of chickpeas and the bright, tangy flavors of lemon and garlic.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5c150113-a886-407b-a1b0-c970f66e27b6/roasted-fall-vegetable-medley-with-lemon-garlic-chickpeas-1760129237529.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 45,
        "fiber": 10,
        "protein": 12,
        "calories": 320
      }
    },
    {
      "id": "4b51a38d-a5ab-400e-a918-a5c1c0f2d361",
      "name": "Baked Eggs with Roasted Vegetables and Whole Grain Toast",
      "description": "A delicious and nutritious Mediterranean-inspired breakfast featuring baked eggs nestled in a bed of roasted seasonal vegetables, served with whole grain toast.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4b51a38d-a5ab-400e-a918-a5c1c0f2d361/baked-eggs-with-roasted-vegetables-and-whole-grain-toast-1760129105179.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "8e8a6bb6-9d34-41ff-9365-16a9945fe0b4",
      "name": "Mediterranean Winter Vegetable Hash with Poached Eggs",
      "description": "A hearty and nutritious breakfast featuring seasonal vegetables, whole grains, and heart-healthy fats, all topped with perfectly poached eggs.",
      "prep_time": 20,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8e8a6bb6-9d34-41ff-9365-16a9945fe0b4/mediterranean-winter-vegetable-hash-with-poached-eggs-1760128111229.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "05dbd999-f456-45a5-8e9b-b3890408aae6",
      "name": "Baked Cod with Roasted Winter Vegetables",
      "description": "A delicious and nutritious Mediterranean-inspired lunch featuring baked cod and a medley of roasted seasonal vegetables, all drizzled with heart-healthy olive oil.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/05dbd999-f456-45a5-8e9b-b3890408aae6/baked-cod-with-roasted-winter-vegetables-1760048324438.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 18,
        "fiber": 6,
        "protein": 25,
        "calories": 310
      }
    },
    {
      "id": "dc288df3-772a-48e9-8929-61777e177915",
      "name": "Roasted Winter Vegetable Medley with Baked Lemon Garlic Salmon",
      "description": "A delicious and nutritious Mediterranean-inspired snack featuring a variety of roasted seasonal vegetables and baked salmon seasoned with lemon and garlic.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dc288df3-772a-48e9-8929-61777e177915/roasted-winter-vegetable-medley-with-baked-lemon-garlic-salmon-1760048254975.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 8,
        "protein": 25,
        "calories": 350
      }
    },
    {
      "id": "dec569e6-e72e-4c40-bc13-a71b40ad37d8",
      "name": "Mediterranean Baked Oatmeal with Roasted Veggies",
      "description": "A nutritious and delicious Mediterranean-inspired breakfast that's perfect for a cozy winter morning.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dec569e6-e72e-4c40-bc13-a71b40ad37d8/mediterranean-baked-oatmeal-with-roasted-veggies-1760046587530.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "834e362e-bb27-4feb-b940-32cbe7cea055",
      "name": "Winter Vegetable and Lentil Salad",
      "description": "A nourishing Mediterranean-inspired snack featuring roasted seasonal vegetables, hearty lentils, and a tangy lemon-herb dressing.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/834e362e-bb27-4feb-b940-32cbe7cea055/winter-vegetable-and-lentil-salad-1760046552488.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 35,
        "fiber": 9,
        "protein": 12,
        "calories": 260
      }
    },
    {
      "id": "38519393-ff38-4c58-8fbe-8819600cd74e",
      "name": "Mediterranean Chickpea and Veggie Salad",
      "description": "A flavorful and nutrient-dense snack that combines the best of the Mediterranean diet - olive oil, vegetables, whole grains, and legumes.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38519393-ff38-4c58-8fbe-8819600cd74e/mediterranean-chickpea-and-veggie-salad-1760046524824.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 25,
        "fiber": 6,
        "protein": 10,
        "calories": 260
      }
    },
    {
      "id": "319df537-0586-4dcb-be34-eca8846c3a62",
      "name": "Mediterranean Roasted Vegetable Salad",
      "description": "A nourishing and flavorful Mediterranean-inspired snack featuring roasted seasonal vegetables, chickpeas, and a tangy lemon-herb dressing.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/319df537-0586-4dcb-be34-eca8846c3a62/mediterranean-roasted-vegetable-salad-1760046120929.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 26,
        "fiber": 6,
        "protein": 8,
        "calories": 210
      }
    },
    {
      "id": "f510a1e8-75d0-403d-9c4b-9a3d1334b6a0",
      "name": "Mediterranean Baked Oatmeal with Roasted Vegetables",
      "description": "A hearty and nutritious Mediterranean-inspired breakfast that features baked oatmeal with roasted seasonal vegetables, olive oil, and a sprinkle of feta cheese.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f510a1e8-75d0-403d-9c4b-9a3d1334b6a0/mediterranean-baked-oatmeal-with-roasted-vegetables-1760045918719.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "fff22238-4a49-40b0-a7f6-fd88292f6fa2",
      "name": "Mediterranean Lentil and Vegetable Salad",
      "description": "A delicious and nutritious Mediterranean-inspired snack that is packed with fiber, protein, and healthy fats.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fff22238-4a49-40b0-a7f6-fd88292f6fa2/mediterranean-lentil-and-vegetable-salad-1760046092956.png",
      "diet_plan_names": [
        {
          "name": "Mediterranean Diet",
          "slug": "mediterranean"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 20,
        "fiber": 7,
        "protein": 11,
        "calories": 220
      }
    }
  ],
  "paleo": [
    {
      "id": "8dedd664-1771-49ec-8e8c-0571fc827ff2",
      "name": "Roasted Winter Veggie Bites",
      "description": "Delicious and nutritious paleo-friendly snack made with seasonal root vegetables and lean protein.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8dedd664-1771-49ec-8e8c-0571fc827ff2/roasted-winter-veggie-bites-1760179478206.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 25,
        "fiber": 6,
        "protein": 30,
        "calories": 290
      }
    },
    {
      "id": "217474b8-e56b-457c-9221-216d25c9e76b",
      "name": "Roasted Acorn Squash and Egg Bake",
      "description": "A nourishing and satisfying paleo breakfast featuring roasted acorn squash, eggs, and seasonal winter vegetables.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/217474b8-e56b-457c-9221-216d25c9e76b/roasted-acorn-squash-and-egg-bake-1760179085435.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 13,
        "carbs": 33,
        "fiber": 7,
        "protein": 27,
        "calories": 335
      }
    },
    {
      "id": "c63b80ec-bec9-493f-a4a7-ddc2044201be",
      "name": "Paleo Roasted Chicken with Roasted Winter Vegetables",
      "description": "A delicious and nutritious paleo-friendly lunch featuring lean roasted chicken and seasonal winter vegetables.",
      "prep_time": 20,
      "cook_time": 40,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c63b80ec-bec9-493f-a4a7-ddc2044201be/paleo-roasted-chicken-with-roasted-winter-vegetables-1760179428920.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "a7652275-2c5d-40ce-b869-b2e95afb550d",
      "name": "Paleo Winter Squash Bites",
      "description": "Delicious and nutritious paleo-friendly winter squash bites, perfect for a quick and easy snack.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a7652275-2c5d-40ce-b869-b2e95afb550d/paleo-winter-squash-bites-1760179422041.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 18,
        "fiber": 4,
        "protein": 2,
        "calories": 160
      }
    },
    {
      "id": "a3400294-83a3-46f3-9cc7-d103ce2f5cdd",
      "name": "Roasted Salmon and Seasonal Veggies",
      "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon and a medley of winter vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a3400294-83a3-46f3-9cc7-d103ce2f5cdd/roasted-salmon-and-seasonal-veggies-1760179415124.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "d3d0a6a4-31bb-4f6e-9a56-4c38c2802b41",
      "name": "Roasted Winter Veggie Medley",
      "description": "A delicious and nutritious paleo-friendly snack featuring a medley of roasted seasonal vegetables.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d3d0a6a4-31bb-4f6e-9a56-4c38c2802b41/roasted-winter-veggie-medley-1760179407823.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 8,
        "carbs": 25,
        "fiber": 6,
        "protein": 5,
        "calories": 180
      }
    },
    {
      "id": "7c7ba37c-2245-4063-9f50-91a92675e0d1",
      "name": "Roasted Salmon and Vegetable Medley",
      "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon, sweet potatoes, and a variety of seasonal vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/7c7ba37c-2245-4063-9f50-91a92675e0d1/roasted-salmon-and-vegetable-medley-1760179401075.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "b47877ad-1b09-46ea-a706-ccfd5b7c78de",
      "name": "Paleo Roasted Vegetable and Egg Skillet",
      "description": "A hearty and nutritious paleo breakfast skillet featuring roasted winter vegetables, lean turkey sausage, and eggs.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b47877ad-1b09-46ea-a706-ccfd5b7c78de/paleo-roasted-vegetable-and-egg-skillet-1760179017158.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 7,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590",
      "name": "Paleo Roasted Salmon with Roasted Winter Vegetables",
      "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon and a medley of roasted winter vegetables.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590/paleo-roasted-salmon-with-roasted-winter-vegetables-1760137527652.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "52736362-9d57-4ad7-be2b-80c1d28cc679",
      "name": "Grilled Salmon with Roasted Winter Vegetables",
      "description": "A delicious and nutritious paleo-friendly lunch featuring succulent grilled salmon and a medley of roasted seasonal vegetables.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52736362-9d57-4ad7-be2b-80c1d28cc679/grilled-salmon-with-roasted-winter-vegetables-1760138439333.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "f857b9a1-d66c-42cb-8dc7-f08056f2d7c1",
      "name": "Paleo Baked Eggs with Spinach and Mushrooms",
      "description": "A delicious and nutritious paleo-friendly breakfast that's perfect for a cozy winter morning.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f857b9a1-d66c-42cb-8dc7-f08056f2d7c1/paleo-baked-eggs-with-spinach-and-mushrooms-1760137520757.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 12,
        "fiber": 4,
        "protein": 27,
        "calories": 330
      }
    },
    {
      "id": "5fc62b36-cf35-4d4f-b155-12c4d23f73fe",
      "name": "Paleo Roasted Salmon and Broccolini",
      "description": "A delicious and nutrient-dense paleo dinner featuring succulent roasted salmon and tender broccolini, perfect for a cozy winter meal.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5fc62b36-cf35-4d4f-b155-12c4d23f73fe/paleo-roasted-salmon-and-broccolini-1760137513560.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 6,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "09b58f92-0da7-472b-9794-a850e6867c99",
      "name": "Roasted Salmon with Cauliflower and Brussels Sprouts",
      "description": "A delicious and nutritious paleo-friendly dinner featuring roasted salmon, cauliflower, and brussels sprouts - perfect for a cozy winter meal.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/09b58f92-0da7-472b-9794-a850e6867c99/roasted-salmon-with-cauliflower-and-brussels-sprouts-1760137499081.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "bc9f5108-b35b-4a9d-8bbd-2d32450b9b32",
      "name": "Paleo Breakfast Veggie Scramble",
      "description": "A delicious and nutritious paleo-friendly breakfast filled with seasonal winter vegetables and lean protein.",
      "prep_time": 15,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bc9f5108-b35b-4a9d-8bbd-2d32450b9b32/paleo-breakfast-veggie-scramble-1760137492331.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "a5c32cb2-aca7-4f4e-8026-cd787914a57c",
      "name": "Roasted Salmon with Balsamic Glazed Vegetables",
      "description": "A delicious and nutrient-dense paleo dinner featuring oven-roasted salmon and a medley of seasonal winter vegetables in a balsamic glaze.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a5c32cb2-aca7-4f4e-8026-cd787914a57c/roasted-salmon-with-balsamic-glazed-vegetables-1760137470921.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "2ab749e0-ed0c-4eb6-8a53-b73b272738e9",
      "name": "Paleo Baked Eggs with Spinach and Roasted Sweet Potatoes",
      "description": "A nourishing and satisfying paleo breakfast featuring baked eggs nestled in a bed of sautéed spinach and roasted sweet potatoes.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/2ab749e0-ed0c-4eb6-8a53-b73b272738e9/paleo-baked-eggs-with-spinach-and-roasted-sweet-potatoes-1760137463486.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 6,
        "protein": 25,
        "calories": 330
      }
    },
    {
      "id": "b64119cc-cb94-4c97-b2a3-097f3852a2f6",
      "name": "Roasted Salmon and Broccolini with Sweet Potato Mash",
      "description": "A delicious and nutritious paleo-friendly lunch featuring tender roasted salmon, savory broccolini, and a creamy sweet potato mash.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b64119cc-cb94-4c97-b2a3-097f3852a2f6/roasted-salmon-and-broccolini-with-sweet-potato-mash-1760137908966.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 16,
        "carbs": 32,
        "fiber": 7,
        "protein": 30,
        "calories": 380
      }
    },
    {
      "id": "315b021f-4c8b-475c-8041-0fac9db2a6a8",
      "name": "Roasted Salmon with Balsamic Glazed Brussels Sprouts",
      "description": "A delicious and nutritious paleo-friendly lunch featuring tender roasted salmon and caramelized Brussels sprouts in a balsamic glaze.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/315b021f-4c8b-475c-8041-0fac9db2a6a8/roasted-salmon-with-balsamic-glazed-brussels-sprouts-1760134327454.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 20,
        "fiber": 6,
        "protein": 30,
        "calories": 340
      }
    },
    {
      "id": "eabd6cea-4b24-4367-8ae8-daf907d9b803",
      "name": "Roasted Salmon and Beet Salad",
      "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon, roasted beets, and a variety of fresh vegetables.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eabd6cea-4b24-4367-8ae8-daf907d9b803/roasted-salmon-and-beet-salad-1760134313666.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "34b378c2-5e26-48f7-a22d-f03e55973d12",
      "name": "Roasted Butternut Squash and Spinach Frittata",
      "description": "A hearty and nutrient-dense paleo breakfast featuring roasted butternut squash, fresh spinach, and free-range eggs.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/34b378c2-5e26-48f7-a22d-f03e55973d12/roasted-butternut-squash-and-spinach-frittata-1760133970600.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 7,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "4a621911-70a1-4b27-86af-879af3102b90",
      "name": "Roasted Acorn Squash with Grilled Salmon and Sautéed Kale",
      "description": "A delicious and nourishing paleo-friendly dinner featuring roasted acorn squash, grilled salmon, and sautéed kale - perfect for a cozy winter meal.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4a621911-70a1-4b27-86af-879af3102b90/roasted-acorn-squash-with-grilled-salmon-and-saut-ed-kale-1760133963536.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "43996d8a-a35c-4489-868c-7d407e2d54e0",
      "name": "Roasted Winter Vegetable Frittata",
      "description": "A nourishing and satisfying paleo breakfast packed with seasonal vegetables and lean protein.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/43996d8a-a35c-4489-868c-7d407e2d54e0/roasted-winter-vegetable-frittata-1760133956653.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 16,
        "carbs": 27,
        "fiber": 7,
        "protein": 24,
        "calories": 330
      }
    },
    {
      "id": "255bc358-09d4-4c7a-bd68-d7e0ef987fd6",
      "name": "Roasted Winter Veggie Medley with Grilled Chicken",
      "description": "A delicious and nourishing paleo-friendly snack packed with seasonal winter veggies and lean protein.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/255bc358-09d4-4c7a-bd68-d7e0ef987fd6/roasted-winter-veggie-medley-with-grilled-chicken-1760134291498.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 25,
        "fiber": 7,
        "protein": 35,
        "calories": 330
      }
    },
    {
      "id": "59efee87-c24b-45ab-8c85-668b5f16bc2b",
      "name": "Paleo Roasted Chicken with Butternut Squash and Brussels Sprouts",
      "description": "A delicious and nutritious paleo-friendly dinner featuring juicy roasted chicken, tender butternut squash, and crispy Brussels sprouts.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/59efee87-c24b-45ab-8c85-668b5f16bc2b/paleo-roasted-chicken-with-butternut-squash-and-brussels-sprouts-1760133949928.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "0c3eb70d-8324-421a-bbf2-f5d66756a291",
      "name": "Roasted Chicken and Vegetable Medley",
      "description": "A delicious and nutritious paleo-friendly lunch featuring succulent roasted chicken, seasonal winter vegetables, and a flavorful herb seasoning.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0c3eb70d-8324-421a-bbf2-f5d66756a291/roasted-chicken-and-vegetable-medley-1760134269336.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 345
      }
    },
    {
      "id": "d4ce9963-27cb-4a67-a023-62caf9c55c71",
      "name": "Roasted Butternut Squash and Walnut Bites",
      "description": "A delicious and nutritious paleo-friendly snack made with roasted butternut squash, walnuts, and warming spices.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d4ce9963-27cb-4a67-a023-62caf9c55c71/roasted-butternut-squash-and-walnut-bites-1760134262629.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 20,
        "carbs": 35,
        "fiber": 6,
        "protein": 6,
        "calories": 320
      }
    },
    {
      "id": "cfde8d92-87a1-499f-9e9a-1e5eec062289",
      "name": "Roasted Butternut Squash and Almond Bites",
      "description": "A delightful paleo-friendly snack featuring roasted butternut squash and crunchy almonds, perfect for a winter pick-me-up.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cfde8d92-87a1-499f-9e9a-1e5eec062289/roasted-butternut-squash-and-almond-bites-1760134248896.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 35,
        "fiber": 7,
        "protein": 9,
        "calories": 320
      }
    },
    {
      "id": "88405b74-3672-4ea2-9464-30263b75450c",
      "name": "Sautéed Kale and Roasted Sweet Potato Breakfast Bowl",
      "description": "A nourishing and satisfying paleo breakfast that will fuel your day with lean protein, complex carbs, and healthy fats.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/88405b74-3672-4ea2-9464-30263b75450c/saut-ed-kale-and-roasted-sweet-potato-breakfast-bowl-1760133900536.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 9,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "5282442a-55f9-4542-9b20-8f5e956b3836",
      "name": "Roasted Butternut Squash and Turkey Bites",
      "description": "A delicious and nutritious paleo-friendly snack made with roasted butternut squash, ground turkey, and warming winter spices.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5282442a-55f9-4542-9b20-8f5e956b3836/roasted-butternut-squash-and-turkey-bites-1760132365571.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 13,
        "fiber": 3,
        "protein": 21,
        "calories": 210
      }
    },
    {
      "id": "73b798ec-6fc7-4271-a5b1-9f2ccbfc3386",
      "name": "Roasted Salmon with Balsamic-Glazed Brussels Sprouts",
      "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon and caramelized Brussels sprouts.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/73b798ec-6fc7-4271-a5b1-9f2ccbfc3386/roasted-salmon-with-balsamic-glazed-brussels-sprouts-1760131650078.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "1f4ef16d-1dd2-4ab4-b955-761819f2a3c3",
      "name": "Paleo Grilled Salmon with Roasted Winter Veggies",
      "description": "A delicious and nutritious paleo-friendly lunch featuring tender grilled salmon and a medley of roasted winter vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1f4ef16d-1dd2-4ab4-b955-761819f2a3c3/paleo-grilled-salmon-with-roasted-winter-veggies-1760132358068.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "57fbac4c-2e00-4129-ab07-a87cd9cef38a",
      "name": "Winter Paleo Breakfast Frittata",
      "description": "A nutrient-dense paleo breakfast frittata packed with seasonal vegetables, lean protein, and healthy fats to keep you fueled through the winter months.",
      "prep_time": 15,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/57fbac4c-2e00-4129-ab07-a87cd9cef38a/winter-paleo-breakfast-frittata-1760131642117.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 21,
        "carbs": 12,
        "fiber": 5,
        "protein": 27,
        "calories": 330
      }
    },
    {
      "id": "38a7ce96-4eea-4d68-9e74-1807d6106665",
      "name": "Winter Paleo Breakfast Scramble",
      "description": "A nourishing and satisfying paleo breakfast loaded with winter vegetables, lean protein, and healthy fats.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38a7ce96-4eea-4d68-9e74-1807d6106665/winter-paleo-breakfast-scramble-1760131628119.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 10,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "1f947709-e390-4362-a3b8-b3055050692d",
      "name": "Grilled Salmon and Roasted Brussels Sprouts",
      "description": "A delicious and nutritious paleo-friendly dinner featuring tender grilled salmon and roasted brussels sprouts with a hint of lemon and garlic.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1f947709-e390-4362-a3b8-b3055050692d/grilled-salmon-and-roasted-brussels-sprouts-1760131621018.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "5996bbb4-9ce1-4009-90e2-07b0c56d16a5",
      "name": "Roasted Winter Vegetable Salad with Grilled Chicken",
      "description": "A delicious and nutrient-dense paleo lunch featuring roasted seasonal vegetables, grilled chicken, and a zesty vinaigrette.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5996bbb4-9ce1-4009-90e2-07b0c56d16a5/roasted-winter-vegetable-salad-with-grilled-chicken-1760132095012.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "be978467-c404-4daa-9b61-35cd4132dfce",
      "name": "Sautéed Spinach and Salmon Breakfast Skillet",
      "description": "A nourishing and delicious paleo breakfast featuring tender sautéed spinach, flavorful salmon, and fresh seasonal vegetables.",
      "prep_time": 15,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/be978467-c404-4daa-9b61-35cd4132dfce/saut-ed-spinach-and-salmon-breakfast-skillet-1760131613562.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 11,
        "fiber": 4,
        "protein": 30,
        "calories": 340
      }
    },
    {
      "id": "a063ea23-4d72-4cec-aa8e-f0e4af7115f1",
      "name": "Roasted Winter Vegetable Medley",
      "description": "A delicious and nutrient-dense paleo snack featuring a variety of seasonal vegetables, nuts, and lean protein.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a063ea23-4d72-4cec-aa8e-f0e4af7115f1/roasted-winter-vegetable-medley-1760132087558.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 9,
        "protein": 30,
        "calories": 325
      }
    },
    {
      "id": "934f6db2-2335-42c1-bb66-1d264f85f7c0",
      "name": "Paleo Roasted Salmon and Veggie Medley",
      "description": "A delicious and nutritious paleo-friendly dinner featuring roasted salmon, sweet potatoes, Brussels sprouts, and a touch of winter herbs.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/934f6db2-2335-42c1-bb66-1d264f85f7c0/paleo-roasted-salmon-and-veggie-medley-1760131606645.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 7,
        "protein": 30,
        "calories": 360
      }
    },
    {
      "id": "0e2ca754-501a-401d-978e-4fad43fd5f08",
      "name": "Roasted Salmon and Winter Vegetable Salad",
      "description": "A nourishing and satisfying paleo-friendly lunch featuring roasted salmon, seasonal vegetables, and a zesty lemon-herb dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0e2ca754-501a-401d-978e-4fad43fd5f08/roasted-salmon-and-winter-vegetable-salad-1760132080467.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 35,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "90ceca61-84e3-454f-b454-f32b4447499f",
      "name": "Paleo Baked Salmon and Roasted Vegetables",
      "description": "A delicious and nutritious paleo-friendly breakfast featuring baked salmon, roasted winter vegetables, and a touch of fresh herbs.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90ceca61-84e3-454f-b454-f32b4447499f/paleo-baked-salmon-and-roasted-vegetables-1760131599582.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 16,
        "carbs": 27,
        "fiber": 6,
        "protein": 30,
        "calories": 360
      }
    },
    {
      "id": "02a47478-b417-49cb-a63b-d9f423477b39",
      "name": "Winter Citrus Salad with Grilled Chicken",
      "description": "A refreshing and nutrient-dense paleo snack featuring seasonal citrus fruits, crisp vegetables, and lean grilled chicken.",
      "prep_time": 10,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/02a47478-b417-49cb-a63b-d9f423477b39/winter-citrus-salad-with-grilled-chicken-1760132073376.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 20,
        "fiber": 6,
        "protein": 30,
        "calories": 260
      }
    },
    {
      "id": "3b440862-befc-481e-a3b8-15f11080db41",
      "name": "Seared Salmon with Roasted Winter Vegetables",
      "description": "A delicious and nutritious paleo-friendly dinner featuring seared salmon and a medley of roasted seasonal vegetables.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3b440862-befc-481e-a3b8-15f11080db41/seared-salmon-with-roasted-winter-vegetables-1760131592699.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "50aa198a-e241-43b8-a897-099ad7787a41",
      "name": "Roasted Butternut Squash and Egg Breakfast Bowl",
      "description": "A nourishing and satisfying paleo breakfast that will keep you feeling energized all morning.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/50aa198a-e241-43b8-a897-099ad7787a41/roasted-butternut-squash-and-egg-breakfast-bowl-1760131572495.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 7,
        "protein": 18,
        "calories": 325
      }
    },
    {
      "id": "f7c8a0cd-00b3-449f-b304-5e5ed4a48a11",
      "name": "Roasted Salmon with Baked Sweet Potatoes and Sautéed Kale",
      "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon, baked sweet potatoes, and sautéed kale.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f7c8a0cd-00b3-449f-b304-5e5ed4a48a11/roasted-salmon-with-baked-sweet-potatoes-and-saut-ed-kale-1760131565287.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 7,
        "protein": 30,
        "calories": 380
      }
    },
    {
      "id": "4ccb47bb-1ed2-4813-9568-4b9b54e2a982",
      "name": "Roasted Chicken and Winter Vegetable Salad",
      "description": "A nourishing and flavorful paleo-friendly lunch featuring tender roasted chicken, crisp seasonal vegetables, and a zesty vinaigrette.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4ccb47bb-1ed2-4813-9568-4b9b54e2a982/roasted-chicken-and-winter-vegetable-salad-1760132052489.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "624cd3fd-9e78-4d4b-9e69-c74dfc16783c",
      "name": "Paleo Baked Salmon and Roasted Veggies",
      "description": "A delicious and nutritious paleo-friendly breakfast featuring baked salmon, roasted winter vegetables, and a touch of lemon and herbs.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/624cd3fd-9e78-4d4b-9e69-c74dfc16783c/paleo-baked-salmon-and-roasted-veggies-1760131543679.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "47de8f31-9526-45d3-9bc7-8bf3ec64db1e",
      "name": "Roasted Butternut Squash and Apple Breakfast Hash",
      "description": "A delicious and nutritious paleo-friendly breakfast hash made with roasted butternut squash, apples, and lean turkey sausage.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/47de8f31-9526-45d3-9bc7-8bf3ec64db1e/roasted-butternut-squash-and-apple-breakfast-hash-1760180047048.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 35,
        "fiber": 7,
        "protein": 28,
        "calories": 340
      }
    },
    {
      "id": "68fdb748-0397-41c0-b8dd-c698b5ade2fb",
      "name": "Roasted Autumn Salad with Grilled Salmon",
      "description": "A delicious and nutritious paleo-friendly lunch featuring roasted fall vegetables and grilled salmon.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/68fdb748-0397-41c0-b8dd-c698b5ade2fb/roasted-autumn-salad-with-grilled-salmon-1760179673875.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 8,
        "protein": 30,
        "calories": 350
      }
    },
    {
      "id": "3a5a06c8-9e24-4584-a881-0dc3ee22637e",
      "name": "Roasted Sweet Potato and Pecan Snack",
      "description": "A delicious and nutritious paleo-friendly snack made with roasted sweet potatoes, pecans, and warm fall spices.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3a5a06c8-9e24-4584-a881-0dc3ee22637e/roasted-sweet-potato-and-pecan-snack-1760179010433.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 14,
        "carbs": 25,
        "fiber": 5,
        "protein": 3,
        "calories": 220
      }
    },
    {
      "id": "1c23f26b-cec9-410c-a9f7-df0956540553",
      "name": "Paleo Pumpkin Spice Breakfast Bowl",
      "description": "A delicious and nourishing paleo breakfast featuring seasonal pumpkin and warming spices.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1c23f26b-cec9-410c-a9f7-df0956540553/paleo-pumpkin-spice-breakfast-bowl-1760179187212.png",
      "diet_plan_names": [
        {
          "name": "Paleo",
          "slug": "paleo"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 18,
        "fiber": 4,
        "protein": 12,
        "calories": 245
      }
    }
  ],
  "vegan": [
    {
      "id": "62cc64d9-ac7e-458a-8dcf-5d809381feb9",
      "name": "Winter Veggie and Grain Snack Bites",
      "description": "Delicious and nourishing vegan snack bites made with seasonal vegetables, quinoa, and toasted nuts and seeds.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/62cc64d9-ac7e-458a-8dcf-5d809381feb9/winter-veggie-and-grain-snack-bites-1760178658640.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 30,
        "fiber": 5,
        "protein": 7,
        "calories": 250
      }
    },
    {
      "id": "d6a90e4c-49ad-46ef-8c38-63323f3ff136",
      "name": "Winter Vegetable Breakfast Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl packed with seasonal vegetables, plant-based proteins, and wholesome grains.",
      "prep_time": 20,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d6a90e4c-49ad-46ef-8c38-63323f3ff136/winter-vegetable-breakfast-bowl-1760178206012.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 355
      }
    },
    {
      "id": "02b8bba1-6f75-4a45-95da-76a40c334dd8",
      "name": "Roasted Root Vegetable Medley with Quinoa",
      "description": "A nourishing and satisfying vegan snack made with a variety of seasonal root vegetables, quinoa, and a blend of warming spices.",
      "prep_time": 10,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/02b8bba1-6f75-4a45-95da-76a40c334dd8/roasted-root-vegetable-medley-with-quinoa-1760177336115.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "cc08a8e6-5bef-42e4-9d33-eaebf5053004",
      "name": "Roasted Sweet Potato and Quinoa Breakfast Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted sweet potatoes, quinoa, and a variety of nutrient-dense plant-based ingredients.",
      "prep_time": 15,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cc08a8e6-5bef-42e4-9d33-eaebf5053004/roasted-sweet-potato-and-quinoa-breakfast-bowl-1760177928341.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "52b983fb-b76b-47a9-9c35-2f0e5bef0ddc",
      "name": "Winter Veggie Quinoa Bites",
      "description": "Flavorful vegan bites packed with plant-based proteins, veggies, and whole grains to fuel your day.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52b983fb-b76b-47a9-9c35-2f0e5bef0ddc/winter-veggie-quinoa-bites-1760177322723.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "2177f11d-2aec-43b1-b755-d0fe3ba9ee43",
      "name": "Winter Quinoa Veggie Bowl",
      "description": "A nourishing and satisfying vegan snack bowl featuring seasonal vegetables, protein-rich quinoa, and crunchy nuts and seeds.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/2177f11d-2aec-43b1-b755-d0fe3ba9ee43/winter-quinoa-veggie-bowl-1760177309098.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 330
      }
    },
    {
      "id": "98384396-16c0-45b9-ad69-30c817f3c80d",
      "name": "Hearty Winter Vegetable Hash",
      "description": "A nourishing vegan breakfast hash featuring seasonal winter vegetables, plant-based proteins, and warming spices.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/98384396-16c0-45b9-ad69-30c817f3c80d/hearty-winter-vegetable-hash-1760137105572.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "b8b11fd3-2ab0-4d38-87c6-becc73d0aac7",
      "name": "Roasted Winter Vegetable and Quinoa Bites",
      "description": "Warm, savory bites packed with plant-based protein, seasonal veggies, and crunchy nuts. A perfect snack or appetizer for cozy winter gatherings.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b8b11fd3-2ab0-4d38-87c6-becc73d0aac7/roasted-winter-vegetable-and-quinoa-bites-1760136681648.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 23,
        "fiber": 5,
        "protein": 7,
        "calories": 210
      }
    },
    {
      "id": "ad6a4436-c5fd-464c-a179-d48ac1226687",
      "name": "Roasted Root Vegetable and Quinoa Bowl",
      "description": "A nourishing and satisfying vegan lunch featuring a colorful array of roasted winter vegetables and protein-rich quinoa.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ad6a4436-c5fd-464c-a179-d48ac1226687/roasted-root-vegetable-and-quinoa-bowl-1760136660779.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "10b09534-9e43-4f16-bf5d-925be06ef58d",
      "name": "Roasted Vegetable and Quinoa Snack Bowl",
      "description": "A nourishing and satisfying vegan snack featuring roasted winter vegetables, protein-rich quinoa, and a sprinkle of toasted nuts and seeds.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/10b09534-9e43-4f16-bf5d-925be06ef58d/roasted-vegetable-and-quinoa-snack-bowl-1760136652809.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 340
      }
    },
    {
      "id": "f32f6b1c-1861-4119-b543-567554e9b9f5",
      "name": "Winter Veggie Breakfast Bowl",
      "description": "A nourishing vegan breakfast bowl packed with seasonal vegetables, plant-based proteins, and whole grains.",
      "prep_time": 20,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f32f6b1c-1861-4119-b543-567554e9b9f5/winter-veggie-breakfast-bowl-1760134721514.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 340
      }
    },
    {
      "id": "6ae6b0f0-7c3f-48ac-9d14-f8120aedc8e4",
      "name": "Roasted Winter Vegetable Medley with Quinoa and Nuts",
      "description": "A delicious and nourishing vegan snack made with a variety of seasonal vegetables, quinoa, and crunchy nuts.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6ae6b0f0-7c3f-48ac-9d14-f8120aedc8e4/roasted-winter-vegetable-medley-with-quinoa-and-nuts-1760136352013.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 14,
        "carbs": 42,
        "fiber": 7,
        "protein": 11,
        "calories": 320
      }
    },
    {
      "id": "e5bb75d5-28b0-4b40-924a-1fe0d12801b8",
      "name": "Winter Vegetable and Grain Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted seasonal vegetables, quinoa, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e5bb75d5-28b0-4b40-924a-1fe0d12801b8/winter-vegetable-and-grain-bowl-1760133228584.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "926f1058-0665-4106-8fe9-551df65b6ea2",
      "name": "Winter Vegetable and Quinoa Stew",
      "description": "A hearty and nourishing vegan stew featuring a variety of seasonal vegetables, protein-rich quinoa, and a blend of warming spices.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/926f1058-0665-4106-8fe9-551df65b6ea2/winter-vegetable-and-quinoa-stew-1760133221368.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "557e6c37-8b49-4b6c-b6ac-9c0d42ef3e26",
      "name": "Roasted Cauliflower and Quinoa Bites",
      "description": "Delicious and nutritious vegan snack made with roasted cauliflower, quinoa, and a blend of seasonal spices.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/557e6c37-8b49-4b6c-b6ac-9c0d42ef3e26/roasted-cauliflower-and-quinoa-bites-1760132839659.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 35,
        "fiber": 7,
        "protein": 15,
        "calories": 320
      }
    },
    {
      "id": "91143f13-4aae-4ae0-b6e0-d28005d2f455",
      "name": "Roasted Vegetable and Quinoa Stew",
      "description": "A hearty and nourishing vegan stew featuring a variety of roasted winter vegetables, protein-rich quinoa, and a blend of warming spices.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/91143f13-4aae-4ae0-b6e0-d28005d2f455/roasted-vegetable-and-quinoa-stew-1760133207147.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "e83238dd-81f1-4ee0-9c6d-ba104e8b88e1",
      "name": "Roasted Winter Vegetable Bowl with Quinoa and Tahini Dressing",
      "description": "A nourishing and satisfying vegan lunch that features a medley of roasted seasonal vegetables, fluffy quinoa, and a creamy tahini-based dressing.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e83238dd-81f1-4ee0-9c6d-ba104e8b88e1/roasted-winter-vegetable-bowl-with-quinoa-and-tahini-dressing-1760132832533.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "19c78835-b095-4142-849a-df06c72155b2",
      "name": "Winter Vegetable and Quinoa Snack Bites",
      "description": "Delicious and nutritious vegan snack bites featuring seasonal vegetables, quinoa, and a blend of nuts and seeds.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/19c78835-b095-4142-849a-df06c72155b2/winter-vegetable-and-quinoa-snack-bites-1760132825347.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 312
      }
    },
    {
      "id": "846d8c50-66c7-4129-8ab7-f4f7f796252f",
      "name": "Winter Vegetable and Quinoa Stir-Fry",
      "description": "A hearty and flavorful vegan lunch packed with plant-based proteins, seasonal vegetables, and whole grains.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/846d8c50-66c7-4129-8ab7-f4f7f796252f/winter-vegetable-and-quinoa-stir-fry-1760132818249.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 9,
        "protein": 15,
        "calories": 345
      }
    },
    {
      "id": "48e9ad99-32f8-46d5-b98e-67343ff7f882",
      "name": "Winter Lentil and Quinoa Stew",
      "description": "A hearty and nourishing vegan stew featuring plant-based proteins, seasonal vegetables, and whole grains.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/48e9ad99-32f8-46d5-b98e-67343ff7f882/winter-lentil-and-quinoa-stew-1760132768563.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "10095b0c-d99f-468c-b8ad-c30aa7cf4c1a",
      "name": "Winter Lentil and Quinoa Bowl",
      "description": "A nourishing and satisfying vegan lunch bowl featuring hearty lentils, fluffy quinoa, roasted vegetables, and a zesty tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/10095b0c-d99f-468c-b8ad-c30aa7cf4c1a/winter-lentil-and-quinoa-bowl-1760179554276.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "fc5cd6b6-7449-4c9a-94f2-9ba82b1bb1fc",
      "name": "Winter Lentil and Vegetable Stew",
      "description": "A hearty, plant-based stew featuring lentils, seasonal vegetables, and a blend of warming spices.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fc5cd6b6-7449-4c9a-94f2-9ba82b1bb1fc/winter-lentil-and-vegetable-stew-1760179288784.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 5,
        "carbs": 45,
        "fiber": 10,
        "protein": 15,
        "calories": 300
      }
    },
    {
      "id": "fc325f98-98ad-4ac6-a94f-9b892ab36af9",
      "name": "Winter Vegetable Quinoa Bites",
      "description": "Delicious and nutritious vegan snack made with seasonal vegetables, quinoa, and nuts.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fc325f98-98ad-4ac6-a94f-9b892ab36af9/winter-vegetable-quinoa-bites-1760179275096.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 27,
        "fiber": 5,
        "protein": 7,
        "calories": 220
      }
    },
    {
      "id": "fca5f7fa-6420-45f5-a0a3-4aa922f6ff26",
      "name": "Winter Vegetable and Quinoa Breakfast Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted winter vegetables, protein-packed quinoa, and crunchy nuts and seeds.",
      "prep_time": 20,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fca5f7fa-6420-45f5-a0a3-4aa922f6ff26/winter-vegetable-and-quinoa-breakfast-bowl-1760179254670.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "91ad8cb2-414b-4e83-a925-87f5681e3f3f",
      "name": "Roasted Vegetable and Quinoa Snack Mix",
      "description": "A flavorful and nutritious vegan snack made with roasted seasonal vegetables, quinoa, nuts, and seeds.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/91ad8cb2-414b-4e83-a925-87f5681e3f3f/roasted-vegetable-and-quinoa-snack-mix-1760179248097.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 35,
        "fiber": 7,
        "protein": 15,
        "calories": 320
      }
    },
    {
      "id": "b086f181-0c49-4254-a126-6851c65815b2",
      "name": "Roasted Winter Vegetable and Quinoa Bowl",
      "description": "A hearty and nourishing vegan dinner featuring a medley of roasted winter vegetables, protein-rich quinoa, and a creamy tahini dressing.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b086f181-0c49-4254-a126-6851c65815b2/roasted-winter-vegetable-and-quinoa-bowl-1760179241270.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "eb7dc075-a97c-4f94-a938-3024411f30c6",
      "name": "Winter Lentil and Quinoa Salad",
      "description": "A hearty and nutrient-dense vegan lunch that combines protein-rich lentils and quinoa with fresh winter vegetables and a tangy vinaigrette.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eb7dc075-a97c-4f94-a938-3024411f30c6/winter-lentil-and-quinoa-salad-1760179234702.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "242745b3-d08c-472d-840c-3584c909927b",
      "name": "Winter Quinoa Breakfast Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl made with nutrient-dense ingredients like quinoa, sweet potatoes, kale, and toasted nuts.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/242745b3-d08c-472d-840c-3584c909927b/winter-quinoa-breakfast-bowl-1760179227974.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "30ebfbb4-d6ec-476d-94c1-0bdc16170f82",
      "name": "Winter Vegetable Quinoa Bowl",
      "description": "A nourishing and satisfying vegan lunch featuring quinoa, roasted winter vegetables, and a flavorful tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/30ebfbb4-d6ec-476d-94c1-0bdc16170f82/winter-vegetable-quinoa-bowl-1760179207781.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "343756a3-f7b2-40cd-897a-38ad48e5b0ed",
      "name": "Winter Vegetable Breakfast Hash",
      "description": "A hearty and nourishing vegan breakfast made with a mix of seasonal vegetables, plant-based proteins, and warming spices.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/343756a3-f7b2-40cd-897a-38ad48e5b0ed/winter-vegetable-breakfast-hash-1760179200980.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 340
      }
    },
    {
      "id": "3c50fb93-c340-4904-8096-51f4da69c36e",
      "name": "Roasted Butternut Squash and Quinoa Snack Mix",
      "description": "A delicious and nutritious vegan snack mix featuring roasted butternut squash, quinoa, nuts, and seeds.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3c50fb93-c340-4904-8096-51f4da69c36e/roasted-butternut-squash-and-quinoa-snack-mix-1760178789391.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 18,
        "carbs": 35,
        "fiber": 7,
        "protein": 12,
        "calories": 320
      }
    },
    {
      "id": "38b76391-cc24-4114-9a21-6f4f3159a071",
      "name": "Roasted Pumpkin Seed and Quinoa Snack Bars",
      "description": "Delicious and nutritious vegan snack bars made with seasonal pumpkin seeds, quinoa, and other wholesome plant-based ingredients.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38b76391-cc24-4114-9a21-6f4f3159a071/roasted-pumpkin-seed-and-quinoa-snack-bars-1760177941892.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 6,
        "protein": 15,
        "calories": 330
      }
    },
    {
      "id": "5646ed8d-c4fc-48bf-a94b-6dda62f9501e",
      "name": "Autumn Quinoa Bowl with Roasted Veggies",
      "description": "A nourishing and satisfying vegan lunch featuring quinoa, roasted fall vegetables, and a flavorful tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5646ed8d-c4fc-48bf-a94b-6dda62f9501e/autumn-quinoa-bowl-with-roasted-veggies-1760176831040.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "a3270a29-dfa5-42df-94c3-712359098962",
      "name": "Autumn Quinoa and Roasted Vegetable Parfait",
      "description": "A delightful vegan snack featuring layers of nutty quinoa, roasted fall vegetables, and crunchy nuts and seeds.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a3270a29-dfa5-42df-94c3-712359098962/autumn-quinoa-and-roasted-vegetable-parfait-1760176421953.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 14,
        "carbs": 46,
        "fiber": 7,
        "protein": 12,
        "calories": 330
      }
    },
    {
      "id": "51c6d767-507e-4a91-bb99-b43578b3708c",
      "name": "Autumn Grain Bowl with Roasted Vegetables",
      "description": "A nourishing and flavorful vegan lunch that celebrates the bounty of the fall season.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/51c6d767-507e-4a91-bb99-b43578b3708c/autumn-grain-bowl-with-roasted-vegetables-1760170743917.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "a965c4b3-836b-45b6-89e3-6ef64a579d81",
      "name": "Autumn Quinoa and Roasted Veggie Bites",
      "description": "A delightful vegan snack packed with plant-based proteins, seasonal veggies, and a crunchy nut topping.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a965c4b3-836b-45b6-89e3-6ef64a579d81/autumn-quinoa-and-roasted-veggie-bites-1760168750890.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 348
      }
    },
    {
      "id": "0ae7a2b5-a857-482e-a781-f4fb97775888",
      "name": "Autumn Lentil and Quinoa Pilaf",
      "description": "A nourishing and flavorful plant-based dinner featuring hearty lentils, fluffy quinoa, and seasonal vegetables.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0ae7a2b5-a857-482e-a781-f4fb97775888/autumn-lentil-and-quinoa-pilaf-1760138214783.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "6661fa33-9732-47eb-94e8-0a854858afa5",
      "name": "Autumn Quinoa Snack Bites",
      "description": "Delicious and nutritious vegan snack bites made with quinoa, roasted fall vegetables, and crunchy nuts and seeds.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6661fa33-9732-47eb-94e8-0a854858afa5/autumn-quinoa-snack-bites-1760138166369.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 32,
        "fiber": 6,
        "protein": 7,
        "calories": 250
      }
    },
    {
      "id": "e4b7d488-4462-44d3-b791-1b3147c62a1f",
      "name": "Roasted Pumpkin Seed and Quinoa Bites",
      "description": "Delicious and nutritious vegan snack made with seasonal fall ingredients.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e4b7d488-4462-44d3-b791-1b3147c62a1f/roasted-pumpkin-seed-and-quinoa-bites-1760138138968.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 7,
        "protein": 15,
        "calories": 330
      }
    },
    {
      "id": "f54f1d8d-39bf-421e-9333-172cd2c39a9e",
      "name": "Autumn Lentil and Butternut Squash Bowl",
      "description": "A nourishing and flavorful vegan lunch featuring hearty lentils, roasted butternut squash, and a variety of seasonal vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f54f1d8d-39bf-421e-9333-172cd2c39a9e/autumn-lentil-and-butternut-squash-bowl-1760138096412.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 340
      }
    },
    {
      "id": "e17d1d16-c091-490d-a3b0-efccc25cfc30",
      "name": "Autumn Quinoa and Sweet Potato Hash",
      "description": "A nourishing and flavorful vegan breakfast hash made with seasonal sweet potatoes, quinoa, and warming spices.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e17d1d16-c091-490d-a3b0-efccc25cfc30/autumn-quinoa-and-sweet-potato-hash-1760137355178.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "ba02d32c-fa4c-4f48-b905-d467046f8848",
      "name": "Roasted Fall Vegetable Medley with Quinoa and Toasted Seeds",
      "description": "A delicious and nutritious vegan snack featuring a medley of roasted seasonal vegetables, quinoa, and toasted pumpkin and sunflower seeds.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ba02d32c-fa4c-4f48-b905-d467046f8848/roasted-fall-vegetable-medley-with-quinoa-and-toasted-seeds-1760136779836.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 7,
        "protein": 15,
        "calories": 320
      }
    },
    {
      "id": "8c18f94a-2291-4500-9c02-4bfc4fe31877",
      "name": "Autumn Quinoa Power Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl featuring quinoa, roasted fall vegetables, and a creamy cashew-based dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8c18f94a-2291-4500-9c02-4bfc4fe31877/autumn-quinoa-power-bowl-1760136546254.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 9,
        "protein": 15,
        "calories": 360
      }
    },
    {
      "id": "c2ece5f5-152f-4760-9b01-3b6f95f79406",
      "name": "Autumn Lentil and Butternut Squash Stew",
      "description": "A hearty and nourishing vegan stew featuring seasonal vegetables, plant-based proteins, and a blend of warming spices.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c2ece5f5-152f-4760-9b01-3b6f95f79406/autumn-lentil-and-butternut-squash-stew-1760135938036.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 12,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "29ddc766-e32e-4e81-a386-75c127626f4b",
      "name": "Autumn Harvest Vegetable Stew",
      "description": "A hearty and nourishing vegan stew featuring seasonal fall vegetables, plant-based proteins, and a blend of comforting spices.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/29ddc766-e32e-4e81-a386-75c127626f4b/autumn-harvest-vegetable-stew-1760135909795.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 10,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "c5159678-dc5d-4ef1-805f-c9eac6877bf0",
      "name": "Autumn Quinoa Veggie Cups",
      "description": "Delicious and nutritious vegan snack made with seasonal fall produce and plant-based proteins.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c5159678-dc5d-4ef1-805f-c9eac6877bf0/autumn-quinoa-veggie-cups-1760135829337.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 43,
        "fiber": 6,
        "protein": 8,
        "calories": 280
      }
    },
    {
      "id": "86bb1f98-8c2e-4200-8ac8-15f4fbccb626",
      "name": "Autumn Quinoa Veggie Bites",
      "description": "Delicious and nutritious plant-based snack packed with seasonal fall flavors.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/86bb1f98-8c2e-4200-8ac8-15f4fbccb626/autumn-quinoa-veggie-bites-1760135388833.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 31,
        "fiber": 5,
        "protein": 8,
        "calories": 230
      }
    },
    {
      "id": "ecc99d3f-e83d-44f6-bd25-65dec9a782bf",
      "name": "Autumn Quinoa Vegetable Bowl",
      "description": "A nourishing and satisfying vegan lunch bowl featuring hearty quinoa, roasted fall vegetables, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ecc99d3f-e83d-44f6-bd25-65dec9a782bf/autumn-quinoa-vegetable-bowl-1760135374401.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "28afc307-37a4-4dde-9a69-25768294de3d",
      "name": "Autumn Quinoa and Sweet Potato Bowl",
      "description": "A nourishing and satisfying vegan breakfast bowl featuring seasonal sweet potatoes, quinoa, and a variety of plant-based proteins, vegetables, and seeds.",
      "prep_time": 15,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/28afc307-37a4-4dde-9a69-25768294de3d/autumn-quinoa-and-sweet-potato-bowl-1760135367529.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 55,
        "fiber": 8,
        "protein": 15,
        "calories": 350
      }
    },
    {
      "id": "af211faf-f815-4bb6-ba53-139795fcabea",
      "name": "Autumn Quinoa and Roasted Vegetable Snack",
      "description": "A delicious and nutritious vegan snack featuring quinoa, roasted fall vegetables, and a savory tahini dressing.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/af211faf-f815-4bb6-ba53-139795fcabea/autumn-quinoa-and-roasted-vegetable-snack-1760135353073.png",
      "diet_plan_names": [
        {
          "name": "Vegan",
          "slug": "vegan"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 45,
        "fiber": 7,
        "protein": 10,
        "calories": 325
      }
    }
  ],
  "vegetarian": [
    {
      "id": "a5aa7985-4a55-4411-8a73-200c3aa7f599",
      "name": "Winter Vegetable and Egg Scramble",
      "description": "A hearty and nourishing vegetarian breakfast featuring seasonal winter produce and creamy scrambled eggs.",
      "prep_time": 20,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a5aa7985-4a55-4411-8a73-200c3aa7f599/winter-vegetable-and-egg-scramble-1760179888540.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 17,
        "carbs": 26,
        "fiber": 4,
        "protein": 21,
        "calories": 330
      }
    },
    {
      "id": "8b643cc2-7ba3-45cf-9146-f8472d8e1e16",
      "name": "Winter Vegetable Quinoa Bowls",
      "description": "A nourishing and satisfying vegetarian lunch with roasted seasonal veggies, protein-packed quinoa, and a creamy avocado dressing.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8b643cc2-7ba3-45cf-9146-f8472d8e1e16/winter-vegetable-quinoa-bowls-1760178303096.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 10,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "dcb08905-effe-4a50-a3be-57fa0239d27c",
      "name": "Warm Oatmeal with Roasted Winter Vegetables",
      "description": "A comforting and nutritious breakfast that combines the warmth of oatmeal with the sweetness of roasted winter vegetables.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dcb08905-effe-4a50-a3be-57fa0239d27c/warm-oatmeal-with-roasted-winter-vegetables-1760174968008.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "9210f0b5-c459-4328-8f0a-77e1f2aacec2",
      "name": "Winter Veggie Breakfast Frittata",
      "description": "A hearty, vegetable-packed frittata made with seasonal winter produce and fluffy eggs for a satisfying and nutritious breakfast.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9210f0b5-c459-4328-8f0a-77e1f2aacec2/winter-veggie-breakfast-frittata-1760167218886.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 14,
        "carbs": 25,
        "fiber": 6,
        "protein": 20,
        "calories": 290
      }
    },
    {
      "id": "8b4e6d21-079d-433a-8829-f210a60dc3db",
      "name": "Roasted Root Vegetable Medley",
      "description": "A delightful winter snack featuring a mix of seasonal root vegetables roasted to perfection.",
      "prep_time": 10,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8b4e6d21-079d-433a-8829-f210a60dc3db/roasted-root-vegetable-medley-1760138516193.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 8,
        "carbs": 50,
        "fiber": 8,
        "protein": 4,
        "calories": 250
      }
    },
    {
      "id": "252414b8-5f87-4647-a98e-75a0fc0be1b0",
      "name": "Winter Vegetable Quinoa Bake",
      "description": "A hearty and comforting baked dish featuring quinoa, roasted winter vegetables, and a creamy dairy-based sauce.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/252414b8-5f87-4647-a98e-75a0fc0be1b0/winter-vegetable-quinoa-bake-1760167196526.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 345
      }
    },
    {
      "id": "ffe01dc6-6941-46d0-8f55-0440c93f65a3",
      "name": "Baked Oatmeal with Apples and Pecans",
      "description": "A warm and comforting baked oatmeal dish made with seasonal apples, crunchy pecans, and a touch of maple syrup.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ffe01dc6-6941-46d0-8f55-0440c93f65a3/baked-oatmeal-with-apples-and-pecans-1760167161928.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 6,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "5642816a-9c5f-4ab9-9247-f7f7b7126dc7",
      "name": "Roasted Butternut Squash and Apple Bites",
      "description": "A delightful winter snack featuring the sweet and savory flavors of roasted butternut squash and apples, with a touch of cinnamon and nutmeg.",
      "prep_time": 10,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5642816a-9c5f-4ab9-9247-f7f7b7126dc7/roasted-butternut-squash-and-apple-bites-1760137127073.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 8,
        "carbs": 27,
        "fiber": 5,
        "protein": 2,
        "calories": 180
      }
    },
    {
      "id": "6052c645-d4e3-4c1e-98a1-af598e3c3d73",
      "name": "Seasonal Vegetable Frittata",
      "description": "A fluffy, protein-packed frittata filled with seasonal vegetables and herbs, perfect for a nourishing winter breakfast.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6052c645-d4e3-4c1e-98a1-af598e3c3d73/seasonal-vegetable-frittata-1760179827263.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 13,
        "carbs": 25,
        "fiber": 5,
        "protein": 20,
        "calories": 280
      }
    },
    {
      "id": "cd4a503c-186e-452d-be7c-159441bd0e59",
      "name": "Roasted Vegetable and Quinoa Casserole",
      "description": "A hearty and nutritious vegetarian casserole featuring a medley of roasted winter vegetables and protein-packed quinoa.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cd4a503c-186e-452d-be7c-159441bd0e59/roasted-vegetable-and-quinoa-casserole-1760179820499.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "230da67c-f419-47fd-92c3-9829352b0b50",
      "name": "Hearty Winter Vegetable Frittata",
      "description": "A nourishing vegetable-packed frittata made with fresh seasonal produce, eggs, and a touch of dairy for a satisfying breakfast.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/230da67c-f419-47fd-92c3-9829352b0b50/hearty-winter-vegetable-frittata-1760179813526.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 6,
        "protein": 20,
        "calories": 310
      }
    },
    {
      "id": "b422a5fc-7190-4a55-b938-a9dd005abbac",
      "name": "Winter Veggie and Grain Parfait",
      "description": "A delightful layered snack made with seasonal fruits, vegetables, and grains, perfect for a nutritious winter pick-me-up.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b422a5fc-7190-4a55-b938-a9dd005abbac/winter-veggie-and-grain-parfait-1760136744675.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 300
      }
    },
    {
      "id": "87d1c472-9c85-41dd-924a-8f1b8d3d2a92",
      "name": "Winter Vegetable Stew with Quinoa",
      "description": "A hearty and nourishing vegetable stew featuring seasonal winter produce and protein-rich quinoa, perfect for a cozy winter dinner.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/87d1c472-9c85-41dd-924a-8f1b8d3d2a92/winter-vegetable-stew-with-quinoa-1760179806396.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 10,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "13878b3f-8e34-4dd2-8d19-c79ad8f18a9c",
      "name": "Winter Vegetable Stir-Fry with Quinoa",
      "description": "A vibrant and nourishing vegetarian lunch featuring seasonal winter vegetables and protein-packed quinoa.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/13878b3f-8e34-4dd2-8d19-c79ad8f18a9c/winter-vegetable-stir-fry-with-quinoa-1760136359093.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 10,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "03c5c32a-ae13-4dad-8f6e-4465e2dc517c",
      "name": "Winter Vegetable Quinoa Salad",
      "description": "A nourishing and flavorful vegetarian lunch featuring roasted winter vegetables, quinoa, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/03c5c32a-ae13-4dad-8f6e-4465e2dc517c/winter-vegetable-quinoa-salad-1760133242406.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "11f59754-47a4-4460-873f-f75b7e7bf294",
      "name": "Winter Vegetable and Grain Medley",
      "description": "A nourishing and satisfying vegetarian snack made with seasonal produce and whole grains.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/11f59754-47a4-4460-873f-f75b7e7bf294/winter-vegetable-and-grain-medley-1760132882510.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 43,
        "fiber": 6,
        "protein": 14,
        "calories": 280
      }
    },
    {
      "id": "8eef8838-fcbb-4dec-ad6a-48f5f41b393a",
      "name": "Roasted Vegetable and Quinoa Bake",
      "description": "A hearty and nutritious vegetarian dinner featuring a medley of roasted winter vegetables and fluffy quinoa, baked to perfection.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8eef8838-fcbb-4dec-ad6a-48f5f41b393a/roasted-vegetable-and-quinoa-bake-1760179764289.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "3ef7e40b-23fc-431b-9df0-065a4c6b101f",
      "name": "Roasted Vegetable and Quinoa Snack Bites",
      "description": "Flavorful and satisfying vegetarian snack bites made with roasted seasonal vegetables, quinoa, and a touch of cheese.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3ef7e40b-23fc-431b-9df0-065a4c6b101f/roasted-vegetable-and-quinoa-snack-bites-1760181093442.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 25,
        "fiber": 5,
        "protein": 10,
        "calories": 220
      }
    },
    {
      "id": "abf5ae9f-b035-4a90-baef-bad10d05e5c5",
      "name": "Autumn Harvest Granola Bites",
      "description": "Delicious and nutritious vegetarian granola bites featuring seasonal fall ingredients like apples, pecans, and cinnamon.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/abf5ae9f-b035-4a90-baef-bad10d05e5c5/autumn-harvest-granola-bites-1760171815023.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 6,
        "protein": 20,
        "calories": 300
      }
    },
    {
      "id": "e872ca0f-9f35-4355-ba1b-3c33575a8e02",
      "name": "Autumn Vegetable Gratin",
      "description": "A comforting and nourishing vegetarian casserole featuring seasonal fall produce, grains, and melty cheese.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e872ca0f-9f35-4355-ba1b-3c33575a8e02/autumn-vegetable-gratin-1760167085685.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "93f81168-7d2c-4095-bc9f-fff8ff63370f",
      "name": "Autumn Harvest Vegetarian Bowl",
      "description": "A hearty and nourishing vegetarian lunch bowl featuring roasted fall vegetables, quinoa, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/93f81168-7d2c-4095-bc9f-fff8ff63370f/autumn-harvest-vegetarian-bowl-1760136290274.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "1706a85e-f0a7-4da7-bae0-e0b94a6ec66e",
      "name": "Autumn Vegetable Medley Snack",
      "description": "A nourishing and delightful vegetable-based snack that celebrates the flavors of fall.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1706a85e-f0a7-4da7-bae0-e0b94a6ec66e/autumn-vegetable-medley-snack-1760134348970.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 8,
        "carbs": 20,
        "fiber": 4,
        "protein": 9,
        "calories": 175
      }
    },
    {
      "id": "61a2da03-c29e-4add-95f9-7639944048e9",
      "name": "Autumn Vegetable Quinoa Salad",
      "description": "A hearty and flavorful vegetarian lunch that celebrates the bounty of fall produce.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/61a2da03-c29e-4add-95f9-7639944048e9/autumn-vegetable-quinoa-salad-1760132400763.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "e3f64a3c-0b9a-44f8-810a-d6090e9e36e5",
      "name": "Autumn Harvest Vegetable Stir-Fry",
      "description": "A delicious and nutritious vegetarian stir-fry featuring seasonal fall produce, grains, and a creamy dairy-based sauce.",
      "prep_time": 20,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e3f64a3c-0b9a-44f8-810a-d6090e9e36e5/autumn-harvest-vegetable-stir-fry-1760132372607.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "5549695f-47d5-448a-8ebe-753c5bff8ade",
      "name": "Fall Vegetable Frittata",
      "description": "A delicious and nutritious vegetarian breakfast frittata featuring seasonal fall produce.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5549695f-47d5-448a-8ebe-753c5bff8ade/fall-vegetable-frittata-1760179303856.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 30,
        "fiber": 5,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "74d7979f-991b-4000-a83a-bd83df57d22e",
      "name": "Autumn Oat and Fruit Parfait",
      "description": "A delicious and nutritious vegetarian breakfast parfait featuring seasonal fall fruits, creamy yogurt, and crunchy oats.",
      "prep_time": 15,
      "cook_time": 5,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/74d7979f-991b-4000-a83a-bd83df57d22e/autumn-oat-and-fruit-parfait-1760177783401.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 50,
        "fiber": 6,
        "protein": 20,
        "calories": 340
      }
    },
    {
      "id": "0c02496a-8b2b-4a6c-bdbf-a89432385357",
      "name": "Autumn Vegetable Hash with Poached Eggs",
      "description": "A hearty and nutritious breakfast featuring roasted fall vegetables, fluffy eggs, and a touch of creamy dairy.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0c02496a-8b2b-4a6c-bdbf-a89432385357/autumn-vegetable-hash-with-poached-eggs-1760177363459.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "400bc42d-1841-4961-a2b4-a8663fb177b7",
      "name": "Autumn Vegetable Quinoa Casserole",
      "description": "A hearty and nourishing vegetarian dinner featuring seasonal fall produce, protein-rich quinoa, and a creamy dairy-based sauce.",
      "prep_time": 25,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/400bc42d-1841-4961-a2b4-a8663fb177b7/autumn-vegetable-quinoa-casserole-1760176705970.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 12,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 360
      }
    },
    {
      "id": "52322858-cd4a-4435-a602-f62cff01700f",
      "name": "Autumn Vegetable Stir-Fry with Quinoa",
      "description": "A delicious and nutritious vegetarian lunch featuring seasonal fall produce and protein-packed quinoa.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52322858-cd4a-4435-a602-f62cff01700f/autumn-vegetable-stir-fry-with-quinoa-1760176498707.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 320
      }
    },
    {
      "id": "d347e31a-7549-4c80-9013-f7f69b5c1a95",
      "name": "Autumn Vegetable Risotto",
      "description": "A creamy, comforting risotto featuring seasonal vegetables and warming spices, perfect for a cozy fall dinner.",
      "prep_time": 15,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d347e31a-7549-4c80-9013-f7f69b5c1a95/autumn-vegetable-risotto-1760138694416.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 6,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "49ab9673-52ce-426b-8388-8199b6467faa",
      "name": "Autumn Vegetable Harvest Bowl",
      "description": "A nourishing and colorful vegetarian lunch bowl featuring seasonal fall produce, whole grains, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/49ab9673-52ce-426b-8388-8199b6467faa/autumn-vegetable-harvest-bowl-1760137880158.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 10,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "781e1c72-dddc-4c72-a2e3-33a23baa7d3d",
      "name": "Autumn Oat and Fruit Breakfast Bowl",
      "description": "A nourishing and delicious vegetarian breakfast featuring seasonal fall produce, creamy oats, and a touch of sweetness.",
      "prep_time": 15,
      "cook_time": 10,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/781e1c72-dddc-4c72-a2e3-33a23baa7d3d/autumn-oat-and-fruit-breakfast-bowl-1760138020473.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 50,
        "fiber": 8,
        "protein": 10,
        "calories": 350
      }
    },
    {
      "id": "b80cd17b-8d63-4ed3-b615-c4f6040e27f6",
      "name": "Autumn Vegetable Lasagna",
      "description": "A hearty and comforting vegetarian lasagna featuring seasonal fall vegetables, creamy ricotta, and a flavorful tomato sauce.",
      "prep_time": 30,
      "cook_time": 40,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b80cd17b-8d63-4ed3-b615-c4f6040e27f6/autumn-vegetable-lasagna-1760137276602.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 15,
        "carbs": 45,
        "fiber": 7,
        "protein": 20,
        "calories": 375
      }
    },
    {
      "id": "041c96f8-e331-4ba3-9e30-25af7ba86f3f",
      "name": "Autumn Harvest Vegetable Fritters",
      "description": "Crispy, golden vegetable fritters made with a mix of seasonal produce and whole grains, perfect for a nourishing snack.",
      "prep_time": 10,
      "cook_time": 15,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/041c96f8-e331-4ba3-9e30-25af7ba86f3f/autumn-harvest-vegetable-fritters-1760137247928.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 10,
        "carbs": 40,
        "fiber": 5,
        "protein": 10,
        "calories": 280
      }
    },
    {
      "id": "8d562526-38a6-42ed-9a14-fb3fd6a9e897",
      "name": "Autumn Vegetable Quiche",
      "description": "A delicious and nutritious vegetarian quiche featuring seasonal fall vegetables, eggs, and a flaky crust.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8d562526-38a6-42ed-9a14-fb3fd6a9e897/autumn-vegetable-quiche-1760136842089.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "926e04a3-8e63-48fc-abf6-111f6f44569f",
      "name": "Autumn Oat and Fruit Bake",
      "description": "A delicious and nutritious vegetarian breakfast bake featuring seasonal fall fruits and oats.",
      "prep_time": 20,
      "cook_time": 30,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/926e04a3-8e63-48fc-abf6-111f6f44569f/autumn-oat-and-fruit-bake-1760136474013.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 7,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "61f6671d-bf04-4a1f-b344-add9275f72af",
      "name": "Autumn Harvest Vegetable Casserole",
      "description": "A delicious and nutritious vegetarian casserole featuring seasonal fall produce, whole grains, and dairy for a balanced and satisfying dinner.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/61f6671d-bf04-4a1f-b344-add9275f72af/autumn-harvest-vegetable-casserole-1760136401414.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "fdf724b0-14ba-46d2-b9b8-c0077d9cd1d2",
      "name": "Autumn Harvest Veggie Medley",
      "description": "A delightful vegetarian snack featuring a colorful blend of seasonal fall produce, grains, and dairy.",
      "prep_time": 10,
      "cook_time": 0,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fdf724b0-14ba-46d2-b9b8-c0077d9cd1d2/autumn-harvest-veggie-medley-1760136379486.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 8,
        "carbs": 35,
        "fiber": 5,
        "protein": 10,
        "calories": 225
      }
    },
    {
      "id": "e07d0284-6f96-4932-9f84-d55c0d23c06c",
      "name": "Autumn Harvest Vegetable Medley",
      "description": "A nourishing and delicious vegetarian lunch featuring a colorful array of seasonal produce, whole grains, and a touch of dairy.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e07d0284-6f96-4932-9f84-d55c0d23c06c/autumn-harvest-vegetable-medley-1760136365975.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    },
    {
      "id": "6daed033-e1dd-4dcb-92d0-8a9b0351905f",
      "name": "Autumn Vegetable Quinoa Bake",
      "description": "A hearty and nutritious vegetarian dinner featuring seasonal fall produce, quinoa, and a creamy cheese sauce.",
      "prep_time": 25,
      "cook_time": 20,
      "servings": 4,
      "difficulty": "medium",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6daed033-e1dd-4dcb-92d0-8a9b0351905f/autumn-vegetable-quinoa-bake-1760136073673.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 9,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 345
      }
    },
    {
      "id": "3c6d5783-fe00-46db-8239-e60af90a3541",
      "name": "Autumn Vegetable Grain Bowl",
      "description": "A nourishing and flavorful vegetarian lunch featuring roasted fall vegetables, quinoa, and a creamy tahini dressing.",
      "prep_time": 20,
      "cook_time": 25,
      "servings": 4,
      "difficulty": "easy",
      "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3c6d5783-fe00-46db-8239-e60af90a3541/autumn-vegetable-grain-bowl-1760136058833.png",
      "diet_plan_names": [
        {
          "name": "Vegetarian",
          "slug": "vegetarian"
        }
      ],
      "recipe_nutrition": {
        "fat": 30,
        "carbs": 50,
        "fiber": 8,
        "protein": 20,
        "calories": 350
      }
    }
  ]
} as const

export const allRecipes: Recipe[] = [
  {
    "id": "a964b9ab-f070-4198-a0b1-9b954a4c8719",
    "name": "Roasted Garlic and Parmesan Zucchini Noodles",
    "description": "A delicious and satisfying keto-friendly dinner featuring zucchini noodles tossed in a creamy garlic-parmesan sauce.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a964b9ab-f070-4198-a0b1-9b954a4c8719/roasted-garlic-and-parmesan-zucchini-noodles-1760134071733.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 24,
      "carbs": 5,
      "fiber": 2,
      "protein": 12,
      "calories": 280
    }
  },
  {
    "id": "a321ed3e-8cdf-429f-bff1-086fe3550147",
    "name": "Roasted Salmon with Buttered Broccoli and Cauliflower",
    "description": "A delicious and satisfying keto-friendly lunch featuring wild-caught salmon, roasted broccoli and cauliflower in a rich, creamy butter sauce.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a321ed3e-8cdf-429f-bff1-086fe3550147/roasted-salmon-with-buttered-broccoli-and-cauliflower-1760133843316.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 26,
      "carbs": 10,
      "fiber": 4,
      "protein": 40,
      "calories": 425
    }
  },
  {
    "id": "35b21d42-2729-47e9-87bf-5ac4794d8010",
    "name": "Keto Breakfast Casserole with Spinach and Bacon",
    "description": "A delicious and satisfying keto-friendly breakfast casserole made with eggs, spinach, and crispy bacon.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/35b21d42-2729-47e9-87bf-5ac4794d8010/keto-breakfast-casserole-with-spinach-and-bacon-1760134035259.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 28,
      "carbs": 5,
      "fiber": 2,
      "protein": 25,
      "calories": 375
    }
  },
  {
    "id": "e3ea01e2-94e7-47e0-aeba-1aa47d64d8d9",
    "name": "Creamy Keto Mushroom Bites",
    "description": "Savory keto-friendly mushroom caps filled with a creamy, cheesy filling for a delightful winter snack.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e3ea01e2-94e7-47e0-aeba-1aa47d64d8d9/creamy-keto-mushroom-bites-1760133836279.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 13,
      "carbs": 4,
      "fiber": 1,
      "protein": 8,
      "calories": 155
    }
  },
  {
    "id": "77c28fa7-a6ba-445d-9b64-03084642d886",
    "name": "Baked Salmon with Roasted Brussels Sprouts and Avocado",
    "description": "A delicious and nutritious keto-friendly lunch featuring baked salmon, roasted Brussels sprouts, and creamy avocado.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/77c28fa7-a6ba-445d-9b64-03084642d886/baked-salmon-with-roasted-brussels-sprouts-and-avocado-1760133814219.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 6,
      "protein": 20,
      "calories": 400
    }
  },
  {
    "id": "f7370a8d-b05c-417e-a0bd-357958ec5893",
    "name": "Roasted Cauliflower and Garlic Soup with Crispy Bacon",
    "description": "A creamy, comforting keto-friendly soup made with roasted cauliflower, garlic, and topped with crispy bacon.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f7370a8d-b05c-417e-a0bd-357958ec5893/roasted-cauliflower-and-garlic-soup-with-crispy-bacon-1760133791997.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 4,
      "protein": 20,
      "calories": 345
    }
  },
  {
    "id": "df316e0b-f0d6-4b14-bfa9-bcd39eadb1c0",
    "name": "Roasted Keto Broccoli Bites",
    "description": "Crispy, flavorful broccoli bites that make the perfect keto-friendly snack or side dish.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/df316e0b-f0d6-4b14-bfa9-bcd39eadb1c0/roasted-keto-broccoli-bites-1760133694717.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 13,
      "carbs": 5,
      "fiber": 3,
      "protein": 9,
      "calories": 165
    }
  },
  {
    "id": "06450538-7e5e-48f6-b8ca-6dd6d1b823df",
    "name": "Roasted Salmon with Garlic Butter and Roasted Brussels Sprouts",
    "description": "A delicious and nutritious keto-friendly dinner featuring tender roasted salmon, garlic butter, and roasted brussels sprouts.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/06450538-7e5e-48f6-b8ca-6dd6d1b823df/roasted-salmon-with-garlic-butter-and-roasted-brussels-sprouts-1760133514181.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 5,
      "protein": 20,
      "calories": 420
    }
  },
  {
    "id": "fa32334e-01d8-4d20-afb0-61485c79c1bb",
    "name": "Keto Breakfast Skillet with Roasted Winter Vegetables",
    "description": "A delicious and satisfying keto-friendly breakfast skillet packed with nutrient-dense winter vegetables, savory sausage, and creamy eggs.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fa32334e-01d8-4d20-afb0-61485c79c1bb/keto-breakfast-skillet-with-roasted-winter-vegetables-1760133471027.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 380
    }
  },
  {
    "id": "6771c64d-681e-43be-a331-d883827a2d11",
    "name": "Creamy Keto Chicken Carbonara",
    "description": "A rich and indulgent keto-friendly carbonara made with tender chicken, crispy bacon, and a creamy, low-carb sauce.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6771c64d-681e-43be-a331-d883827a2d11/creamy-keto-chicken-carbonara-1760133464153.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 5,
      "fiber": 2,
      "protein": 40,
      "calories": 480
    }
  },
  {
    "id": "821e12e4-1ae6-4fc3-8e32-9029922a22a4",
    "name": "Roasted Cauliflower and Chicken Alfredo",
    "description": "A delicious and creamy keto-friendly dinner featuring roasted cauliflower, tender chicken, and a rich Alfredo sauce.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/821e12e4-1ae6-4fc3-8e32-9029922a22a4/roasted-cauliflower-and-chicken-alfredo-1760133448788.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 10,
      "fiber": 4,
      "protein": 38,
      "calories": 450
    }
  },
  {
    "id": "3b1c51ef-3d13-4b57-8089-9a18c293240c",
    "name": "Keto Roasted Walnut Bites",
    "description": "Crunchy, savory walnut bites packed with healthy fats and protein for a satisfying keto snack.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3b1c51ef-3d13-4b57-8089-9a18c293240c/keto-roasted-walnut-bites-1760044214532.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 25,
      "carbs": 4,
      "fiber": 2,
      "protein": 6,
      "calories": 260
    }
  },
  {
    "id": "49dc77b8-16a7-44c8-aec3-f2ac3d3d99a3",
    "name": "Keto Roasted Broccoli with Avocado Dip",
    "description": "A delicious and easy-to-make keto snack featuring roasted broccoli florets dipped in a creamy avocado-based dip, perfect for a winter pick-me-up.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/49dc77b8-16a7-44c8-aec3-f2ac3d3d99a3/keto-roasted-broccoli-with-avocado-dip-1760133186005.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 5,
      "fiber": 6,
      "protein": 20,
      "calories": 280
    }
  },
  {
    "id": "eaa507eb-9f23-40bf-85d0-218d0ae0215e",
    "name": "Keto Breakfast Frittata with Roasted Vegetables",
    "description": "A delicious and nutritious keto-friendly breakfast frittata loaded with winter vegetables and baked to perfection.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eaa507eb-9f23-40bf-85d0-218d0ae0215e/keto-breakfast-frittata-with-roasted-vegetables-1760133377021.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 25,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 325
    }
  },
  {
    "id": "edb343b5-ff33-49ea-ba6f-e3fc45c33602",
    "name": "Keto Spiced Roasted Almonds",
    "description": "Crunchy, savory, and satisfying keto-friendly snack made with roasted almonds and warming winter spices.",
    "prep_time": 10,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/edb343b5-ff33-49ea-ba6f-e3fc45c33602/keto-spiced-roasted-almonds-1760133171800.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 24,
      "carbs": 5,
      "fiber": 4,
      "protein": 8,
      "calories": 270
    }
  },
  {
    "id": "39b772a3-6323-4d2e-824a-b32ef220a6bc",
    "name": "Roasted Garlic and Cauliflower Mash with Seared Steak",
    "description": "A delicious and satisfying keto-friendly dinner featuring tender steak and creamy cauliflower mash, perfect for a cozy winter meal.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/39b772a3-6323-4d2e-824a-b32ef220a6bc/roasted-garlic-and-cauliflower-mash-with-seared-steak-1760133129766.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 400
    }
  },
  {
    "id": "9fea50c3-3c59-48e1-a874-94dc7037fc1c",
    "name": "Keto Spinach and Mushroom Frittata",
    "description": "A delicious and nutritious keto-friendly breakfast featuring fresh spinach, earthy mushrooms, and creamy eggs.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9fea50c3-3c59-48e1-a874-94dc7037fc1c/keto-spinach-and-mushroom-frittata-1760133304972.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "15e579fa-15d6-4c49-b2ed-1ca4b1f8c796",
    "name": "Creamy Garlic Chicken with Roasted Brussels Sprouts",
    "description": "A delectable keto-friendly dinner featuring tender chicken in a rich garlic cream sauce, served with roasted Brussels sprouts for a satisfying and nutritious meal.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/15e579fa-15d6-4c49-b2ed-1ca4b1f8c796/creamy-garlic-chicken-with-roasted-brussels-sprouts-1760133030848.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 34,
      "carbs": 5,
      "fiber": 4,
      "protein": 20,
      "calories": 415
    }
  },
  {
    "id": "6529a69e-20e3-4041-9f3c-eddd889cc47e",
    "name": "Keto Roasted Broccoli and Cauliflower Bites",
    "description": "Crispy, savory bites of roasted broccoli and cauliflower make for a delicious keto-friendly snack.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6529a69e-20e3-4041-9f3c-eddd889cc47e/keto-roasted-broccoli-and-cauliflower-bites-1760132924694.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 5,
      "fiber": 3,
      "protein": 8,
      "calories": 150
    }
  },
  {
    "id": "196fcbfe-df9b-4127-91dd-7fdf1abeb62c",
    "name": "Keto Breakfast Skillet with Sausage and Spinach",
    "description": "A delicious and nutritious keto-friendly breakfast that will keep you feeling full and energized throughout the morning.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/196fcbfe-df9b-4127-91dd-7fdf1abeb62c/keto-breakfast-skillet-with-sausage-and-spinach-1760132726197.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 27,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 365
    }
  },
  {
    "id": "916e1da7-6785-4f6b-a68a-1806e2c7f02c",
    "name": "Keto Roasted Chicken with Cauliflower Mash",
    "description": "A delicious and satisfying keto-friendly dinner featuring juicy roasted chicken and creamy cauliflower mash, perfect for the winter season.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/916e1da7-6785-4f6b-a68a-1806e2c7f02c/keto-roasted-chicken-with-cauliflower-mash-1760132705418.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 5,
      "fiber": 3,
      "protein": 35,
      "calories": 480
    }
  },
  {
    "id": "deadafb2-f9a6-4bba-ba19-88ce060f5a92",
    "name": "Creamy Keto Mushroom Soup",
    "description": "A rich and creamy keto-friendly mushroom soup made with seasonal winter ingredients, perfect for a cozy lunch.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/deadafb2-f9a6-4bba-ba19-88ce060f5a92/creamy-keto-mushroom-soup-1760132889539.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 280
    }
  },
  {
    "id": "5717046d-fb2f-4b0b-9858-3f2439019170",
    "name": "Creamy Keto Mushroom Omelette",
    "description": "A delicious and satisfying keto-friendly breakfast made with fluffy eggs, sautéed mushrooms, and a creamy cheese sauce.",
    "prep_time": 15,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5717046d-fb2f-4b0b-9858-3f2439019170/creamy-keto-mushroom-omelette-1760132698577.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "f5230f32-11ee-48da-8d3c-a983ea9c267f",
    "name": "Keto Roasted Broccoli with Garlic Butter",
    "description": "A delicious and easy-to-make keto-friendly snack that's perfect for the winter season.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f5230f32-11ee-48da-8d3c-a983ea9c267f/keto-roasted-broccoli-with-garlic-butter-1760132691444.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 16,
      "carbs": 5,
      "fiber": 2,
      "protein": 5,
      "calories": 180
    }
  },
  {
    "id": "694a5e9c-8947-40de-b852-b335b13bfc7b",
    "name": "Roasted Garlic and Parmesan Zucchini Chips",
    "description": "Crispy, flavorful zucchini chips that make the perfect keto-friendly snack!",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/694a5e9c-8947-40de-b852-b335b13bfc7b/roasted-garlic-and-parmesan-zucchini-chips-1760132663545.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 5,
      "fiber": 2,
      "protein": 9,
      "calories": 190
    }
  },
  {
    "id": "d4759492-b2f3-43a8-9444-f2930c543627",
    "name": "Creamy Keto Chicken and Broccoli Casserole",
    "description": "A delicious and easy-to-make keto-friendly casserole packed with tender chicken, broccoli, and a creamy cheese sauce.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d4759492-b2f3-43a8-9444-f2930c543627/creamy-keto-chicken-and-broccoli-casserole-1760132620393.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 450
    }
  },
  {
    "id": "b254bb22-3a1a-4467-844a-e9eb7e3704b4",
    "name": "Keto Breakfast Frittata with Roasted Winter Veggies",
    "description": "A hearty and nutritious keto-friendly breakfast frittata loaded with roasted winter vegetables and baked to perfection.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b254bb22-3a1a-4467-844a-e9eb7e3704b4/keto-breakfast-frittata-with-roasted-winter-veggies-1760132613013.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 340
    }
  },
  {
    "id": "061bc20d-c6ee-4f49-8372-75f8c1425ae8",
    "name": "Keto Cinnamon Roasted Almonds",
    "description": "Crunchy, buttery almonds coated in a sweet and spicy cinnamon blend - the perfect keto-friendly winter snack!",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/061bc20d-c6ee-4f49-8372-75f8c1425ae8/keto-cinnamon-roasted-almonds-1760132598696.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 4,
      "protein": 20,
      "calories": 300
    }
  },
  {
    "id": "89b78410-68c0-4c77-a12d-d80f53794aa2",
    "name": "Roasted Cauliflower and Avocado Salad with Lemon Garlic Dressing",
    "description": "A delicious and nutrient-dense keto-friendly lunch that combines the earthy flavors of roasted cauliflower with the creamy goodness of avocado, all tossed in a zesty lemon garlic dressing.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/89b78410-68c0-4c77-a12d-d80f53794aa2/roasted-cauliflower-and-avocado-salad-with-lemon-garlic-dressing-1760132570976.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 7,
      "protein": 20,
      "calories": 320
    }
  },
  {
    "id": "bb762cfa-447e-4fd0-bc7c-5a589b70b729",
    "name": "Roasted Pumpkin Seed Butter Cups",
    "description": "Delicious and nutritious keto-friendly pumpkin seed butter cups made with just a few simple ingredients.",
    "prep_time": 10,
    "cook_time": 5,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bb762cfa-447e-4fd0-bc7c-5a589b70b729/roasted-pumpkin-seed-butter-cups-1760132224024.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 5,
      "fiber": 3,
      "protein": 10,
      "calories": 240
    }
  },
  {
    "id": "0375cd9d-e6b5-4bac-9646-2c62bbcd9f5f",
    "name": "Roasted Pumpkin Soup with Crispy Bacon",
    "description": "A creamy, comforting keto-friendly pumpkin soup topped with crispy bacon and pumpkin seeds for a delicious fall lunch.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0375cd9d-e6b5-4bac-9646-2c62bbcd9f5f/roasted-pumpkin-soup-with-crispy-bacon-1760132217146.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 4,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "539deceb-9b51-4c38-832d-1ec85990625f",
    "name": "Roasted Butternut Squash with Grilled Chicken and Creamy Avocado Sauce",
    "description": "A delicious and satisfying keto-friendly dinner featuring tender roasted butternut squash, juicy grilled chicken, and a creamy avocado-based sauce.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/539deceb-9b51-4c38-832d-1ec85990625f/roasted-butternut-squash-with-grilled-chicken-and-creamy-avocado-sauce-1760044946902.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 15,
      "fiber": 5,
      "protein": 25,
      "calories": 420
    }
  },
  {
    "id": "0639580a-a55c-42e9-99c3-bf27df8d4cd8",
    "name": "Autumn Keto Squash Bites",
    "description": "Savory and satisfying keto-friendly bites featuring roasted butternut squash, pecans, and warming spices.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0639580a-a55c-42e9-99c3-bf27df8d4cd8/autumn-keto-squash-bites-1760131493737.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 17,
      "carbs": 14,
      "fiber": 4,
      "protein": 4,
      "calories": 210
    }
  },
  {
    "id": "fb772f8e-8f58-419f-9ca8-3611a357f063",
    "name": "Roasted Butternut Squash Salad with Pecans and Goat Cheese",
    "description": "A delicious and nutritious keto-friendly lunch featuring roasted butternut squash, crunchy pecans, and creamy goat cheese.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fb772f8e-8f58-419f-9ca8-3611a357f063/roasted-butternut-squash-salad-with-pecans-and-goat-cheese-1760048206902.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "dc64e052-cabb-4f22-8975-d9f978b8846d",
    "name": "Roasted Butternut Squash and Bacon Salad",
    "description": "A delicious and filling keto-friendly lunch featuring roasted butternut squash, crispy bacon, and a creamy avocado dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dc64e052-cabb-4f22-8975-d9f978b8846d/roasted-butternut-squash-and-bacon-salad-1760048192701.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 7,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "d9d98d6e-00c5-47c6-9288-c1c07cbb1765",
    "name": "Baked Pumpkin Egg Cups",
    "description": "Delicious and nutritious keto-friendly breakfast baked in a pumpkin shell.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d9d98d6e-00c5-47c6-9288-c1c07cbb1765/baked-pumpkin-egg-cups-1760046058593.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 2,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "a163710c-5432-4651-b6a8-2492975b66f0",
    "name": "Roasted Autumn Vegetable and Chicken Salad",
    "description": "A delicious and satisfying keto-friendly lunch featuring roasted seasonal vegetables and grilled chicken in a creamy avocado dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a163710c-5432-4651-b6a8-2492975b66f0/roasted-autumn-vegetable-and-chicken-salad-1760128265348.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 28,
      "carbs": 12,
      "fiber": 5,
      "protein": 20,
      "calories": 380
    }
  },
  {
    "id": "568cad93-5aed-4f71-8bda-f7c891902ea1",
    "name": "Roasted Butternut Squash and Bacon Frittata",
    "description": "A delicious and nutritious keto-friendly breakfast featuring roasted butternut squash, crispy bacon, and baked eggs.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/568cad93-5aed-4f71-8bda-f7c891902ea1/roasted-butternut-squash-and-bacon-frittata-1760048149394.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "3e917714-c09d-4597-ab43-851949a3696c",
    "name": "Autumn Keto Nut Butter Cups",
    "description": "Delicious and satisfying keto-friendly snack featuring homemade pumpkin seed butter and dark chocolate.",
    "prep_time": 10,
    "cook_time": 5,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3e917714-c09d-4597-ab43-851949a3696c/autumn-keto-nut-butter-cups-1760046794856.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 5,
      "fiber": 3,
      "protein": 10,
      "calories": 250
    }
  },
  {
    "id": "abb752bc-c076-4e8d-8a41-d2c066505b17",
    "name": "Pumpkin Seed Keto Bark",
    "description": "A delicious and satisfying keto-friendly snack made with roasted pumpkin seeds, dark chocolate, and warming fall spices.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/abb752bc-c076-4e8d-8a41-d2c066505b17/pumpkin-seed-keto-bark-1760046780351.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 5,
      "fiber": 3,
      "protein": 10,
      "calories": 240
    }
  },
  {
    "id": "90920577-5783-4ad1-8b93-ecdf4a647f9b",
    "name": "Roasted Autumn Squash with Grilled Chicken and Walnut Pesto",
    "description": "A delicious and nutrient-dense keto-friendly dinner featuring roasted seasonal squash, juicy grilled chicken, and a flavorful walnut pesto.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90920577-5783-4ad1-8b93-ecdf4a647f9b/roasted-autumn-squash-with-grilled-chicken-and-walnut-pesto-1760046406067.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 26,
      "carbs": 14,
      "fiber": 6,
      "protein": 30,
      "calories": 395
    }
  },
  {
    "id": "46be256b-55da-4fbe-9a13-94383fc4e5ec",
    "name": "Roasted Acorn Squash and Chicken Salad",
    "description": "A delicious and satisfying keto-friendly lunch featuring roasted acorn squash, grilled chicken, and a creamy avocado dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/46be256b-55da-4fbe-9a13-94383fc4e5ec/roasted-acorn-squash-and-chicken-salad-1760131386852.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "5f30dff3-1979-48aa-8b2e-b92715c0a144",
    "name": "Autumn Pumpkin Seed Butter Cups",
    "description": "Delicious keto-friendly pumpkin seed butter cups made with seasonal pumpkin seeds and flavored with warm fall spices.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5f30dff3-1979-48aa-8b2e-b92715c0a144/autumn-pumpkin-seed-butter-cups-1760131380000.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 270
    }
  },
  {
    "id": "78502820-f2ef-445a-b9ff-b0d003e4ef1e",
    "name": "Autumn Keto Baked Salmon with Roasted Vegetables",
    "description": "A delicious and nutritious keto-friendly dinner featuring baked salmon and roasted seasonal vegetables, perfect for the fall season.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/78502820-f2ef-445a-b9ff-b0d003e4ef1e/autumn-keto-baked-salmon-with-roasted-vegetables-1760131198908.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 6,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "caaa029e-3f10-4ef7-855c-98a4af180afb",
    "name": "Autumn Keto Breakfast Skillet",
    "description": "A delicious and satisfying keto-friendly breakfast skillet made with seasonal fall ingredients like butternut squash, spinach, and sage.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/caaa029e-3f10-4ef7-855c-98a4af180afb/autumn-keto-breakfast-skillet-1760131178126.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 25,
      "carbs": 10,
      "fiber": 4,
      "protein": 20,
      "calories": 330
    }
  },
  {
    "id": "4ad8f8cd-bb40-421b-9c44-b37ca7bff6bf",
    "name": "Roasted Pumpkin and Spinach Frittata",
    "description": "A delectable keto-friendly breakfast featuring roasted pumpkin, creamy eggs, and nutrient-dense spinach.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4ad8f8cd-bb40-421b-9c44-b37ca7bff6bf/roasted-pumpkin-and-spinach-frittata-1760047090106.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "fe51697f-7c96-44a3-ba87-18213760e00e",
    "name": "Roasted Acorn Squash with Creamy Garlic Chicken",
    "description": "A delicious and satisfying keto-friendly dinner featuring roasted acorn squash and creamy garlic chicken. Perfect for a cozy fall evening.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fe51697f-7c96-44a3-ba87-18213760e00e/roasted-acorn-squash-with-creamy-garlic-chicken-1760047083296.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 12,
      "fiber": 4,
      "protein": 38,
      "calories": 390
    }
  },
  {
    "id": "190e3f43-93e3-46e8-883a-3cbea13d388c",
    "name": "Keto Pumpkin Spice Muffins",
    "description": "Warm, fragrant keto-friendly pumpkin muffins made with almond flour and healthy fats.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/190e3f43-93e3-46e8-883a-3cbea13d388c/keto-pumpkin-spice-muffins-1760128173687.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 5,
      "fiber": 3,
      "protein": 9,
      "calories": 260
    }
  },
  {
    "id": "94a35082-a15f-4d6a-a9ce-4f1e7e2518a9",
    "name": "Roasted Pork Tenderloin with Creamy Garlic Broccoli",
    "description": "A delicious and satisfying keto-friendly dinner featuring tender pork tenderloin and creamy garlic-infused broccoli, perfect for the fall season.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/94a35082-a15f-4d6a-a9ce-4f1e7e2518a9/roasted-pork-tenderloin-with-creamy-garlic-broccoli-1760047040946.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 75,
      "carbs": 5,
      "fiber": 3,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "dee72527-0c29-4ced-ae5f-aeb8b6073b1f",
    "name": "Spiced Pumpkin Seed Keto Snack",
    "description": "A delicious and satisfying keto-friendly snack made with roasted pumpkin seeds, cinnamon, and fall spices.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dee72527-0c29-4ced-ae5f-aeb8b6073b1f/spiced-pumpkin-seed-keto-snack-1760045652861.png",
    "diet_plan_names": [
      {
        "name": "Keto Diet",
        "slug": "keto"
      }
    ],
    "recipe_nutrition": {
      "fat": 25,
      "carbs": 5,
      "fiber": 4,
      "protein": 20,
      "calories": 290
    }
  },
  {
    "id": "ec912d3b-2b85-45a7-8c7b-c6f7f257c11e",
    "name": "Mediterranean Tuna and Chickpea Salad",
    "description": "A flavorful and nutrient-dense snack featuring tuna, chickpeas, and a variety of Mediterranean vegetables and herbs.",
    "prep_time": 20,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ec912d3b-2b85-45a7-8c7b-c6f7f257c11e/mediterranean-tuna-and-chickpea-salad-1760188101661.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 8,
      "protein": 25,
      "calories": 300
    }
  },
  {
    "id": "003c5005-7fa1-426d-aaf2-98d1e1519961",
    "name": "Mediterranean Chickpea Salad",
    "description": "A refreshing and flavorful Mediterranean-inspired snack made with chickpeas, vegetables, and a tangy olive oil dressing.",
    "prep_time": 20,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/003c5005-7fa1-426d-aaf2-98d1e1519961/mediterranean-chickpea-salad-1760188094704.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 30,
      "fiber": 7,
      "protein": 10,
      "calories": 240
    }
  },
  {
    "id": "16a91276-86c8-4131-88ba-4dcf5ff7ad36",
    "name": "Mediterranean Quinoa and Egg Breakfast Bowl",
    "description": "A nutritious and flavorful breakfast featuring quinoa, vegetables, and poached eggs, all drizzled with a vibrant olive oil and lemon dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/16a91276-86c8-4131-88ba-4dcf5ff7ad36/mediterranean-quinoa-and-egg-breakfast-bowl-1760188003980.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 7,
      "protein": 20,
      "calories": 370
    }
  },
  {
    "id": "d7b2e0da-b458-4aae-ab6f-957ec948e189",
    "name": "Mediterranean Quinoa Stuffed Peppers",
    "description": "Flavorful and nutritious Mediterranean-inspired snack featuring quinoa, vegetables, and olive oil.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d7b2e0da-b458-4aae-ab6f-957ec948e189/mediterranean-quinoa-stuffed-peppers-1760187983444.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 36,
      "fiber": 8,
      "protein": 10,
      "calories": 280
    }
  },
  {
    "id": "c9f4b65d-4044-4ff9-9482-3a1986257f51",
    "name": "Mediterranean Chickpea and Quinoa Salad",
    "description": "A refreshing and nutritious Mediterranean-inspired snack featuring chickpeas, quinoa, and a flavorful olive oil-based dressing.",
    "prep_time": 20,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c9f4b65d-4044-4ff9-9482-3a1986257f51/mediterranean-chickpea-and-quinoa-salad-1760187919511.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 13,
      "carbs": 45,
      "fiber": 9,
      "protein": 12,
      "calories": 320
    }
  },
  {
    "id": "c84d2efa-76a7-439c-b77d-38cbc6738352",
    "name": "Mediterranean Baked Falafel Bites",
    "description": "Delicious and nutritious Mediterranean-inspired baked falafel bites made with chickpeas, herbs, and spices. A perfect snack or appetizer.",
    "prep_time": 20,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c84d2efa-76a7-439c-b77d-38cbc6738352/mediterranean-baked-falafel-bites-1760187815185.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 28,
      "fiber": 7,
      "protein": 9,
      "calories": 220
    }
  },
  {
    "id": "6096cdea-e097-4c77-99a7-036260e0fcc7",
    "name": "Mediterranean Chickpea and Spinach Salad",
    "description": "A refreshing and nutritious Mediterranean-inspired snack made with chickpeas, spinach, and a flavorful olive oil-based dressing.",
    "prep_time": 20,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6096cdea-e097-4c77-99a7-036260e0fcc7/mediterranean-chickpea-and-spinach-salad-1760187743226.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 24,
      "fiber": 6,
      "protein": 8,
      "calories": 210
    }
  },
  {
    "id": "37b10d8f-0b95-4adf-bf92-468ceffee49d",
    "name": "Mediterranean Salmon and Quinoa Salad",
    "description": "A delicious and nutritious Mediterranean-inspired lunch featuring grilled salmon, quinoa, fresh vegetables, and a zesty lemon-garlic dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/37b10d8f-0b95-4adf-bf92-468ceffee49d/mediterranean-salmon-and-quinoa-salad-1760187716174.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 16,
      "carbs": 27,
      "fiber": 6,
      "protein": 25,
      "calories": 360
    }
  },
  {
    "id": "b8a044b5-6cd3-46c7-8f78-0b80d28be399",
    "name": "Mediterranean Winter Vegetable Salad",
    "description": "A vibrant and nourishing Mediterranean-inspired snack featuring roasted winter vegetables, chickpeas, and a tangy lemon-herb dressing.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b8a044b5-6cd3-46c7-8f78-0b80d28be399/mediterranean-winter-vegetable-salad-1760134582983.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 40,
      "fiber": 9,
      "protein": 9,
      "calories": 280
    }
  },
  {
    "id": "9f7d06d5-00c0-41b5-b8dc-bba003d948cd",
    "name": "Winter Minestrone Soup",
    "description": "A hearty and nourishing Mediterranean-inspired vegetable soup featuring seasonal produce and whole grains.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9f7d06d5-00c0-41b5-b8dc-bba003d948cd/winter-minestrone-soup-1760134511329.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 45,
      "fiber": 10,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "4cc89575-97ac-45b6-8d4d-99ea359167e8",
    "name": "Mediterranean Roasted Vegetable Medley",
    "description": "A delightful Mediterranean-inspired snack featuring a blend of roasted seasonal vegetables, drizzled with flavorful olive oil and sprinkled with herbs.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4cc89575-97ac-45b6-8d4d-99ea359167e8/mediterranean-roasted-vegetable-medley-1760134482812.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 14,
      "carbs": 18,
      "fiber": 6,
      "protein": 5,
      "calories": 210
    }
  },
  {
    "id": "b3a3c78b-bcd1-4892-9819-7af03ea538f4",
    "name": "Mediterranean Roasted Vegetable Hummus Platter",
    "description": "A vibrant and nutritious Mediterranean-inspired snack platter featuring roasted seasonal vegetables, creamy homemade hummus, and whole grain crackers.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b3a3c78b-bcd1-4892-9819-7af03ea538f4/mediterranean-roasted-vegetable-hummus-platter-1760134398229.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 10,
      "calories": 300
    }
  },
  {
    "id": "04226dc2-1ca9-46cc-81ff-35e09e3883e4",
    "name": "Roasted Winter Vegetable Medley with Baked Cod",
    "description": "A delicious and nutritious Mediterranean-style snack featuring a colorful array of roasted seasonal vegetables and flaky baked cod, drizzled with a zesty lemon-garlic olive oil dressing.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/04226dc2-1ca9-46cc-81ff-35e09e3883e4/roasted-winter-vegetable-medley-with-baked-cod-1760134384345.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 25,
      "fiber": 6,
      "protein": 25,
      "calories": 320
    }
  },
  {
    "id": "264cb291-db77-463c-a2b0-05ccdc465f6c",
    "name": "Mediterranean Winter Vegetable Soup",
    "description": "A nourishing and comforting Mediterranean-inspired vegetable soup, perfect for a winter snack.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/264cb291-db77-463c-a2b0-05ccdc465f6c/mediterranean-winter-vegetable-soup-1760134143594.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 35,
      "fiber": 9,
      "protein": 10,
      "calories": 260
    }
  },
  {
    "id": "03281d6c-1015-4793-9349-0466339ccc25",
    "name": "Mediterranean Baked Feta with Roasted Vegetables",
    "description": "A delicious and nutritious Mediterranean-inspired snack featuring roasted vegetables, creamy feta, and a drizzle of olive oil.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/03281d6c-1015-4793-9349-0466339ccc25/mediterranean-baked-feta-with-roasted-vegetables-1760133708462.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 25,
      "fiber": 6,
      "protein": 20,
      "calories": 320
    }
  },
  {
    "id": "6dc82872-67ce-41e7-a878-dbea309e1289",
    "name": "Winter Vegetable and Chickpea Salad",
    "description": "A nourishing Mediterranean-inspired snack that's packed with seasonal vegetables, protein-rich chickpeas, and healthy fats from olive oil.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6dc82872-67ce-41e7-a878-dbea309e1289/winter-vegetable-and-chickpea-salad-1760133073722.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 27,
      "fiber": 7,
      "protein": 10,
      "calories": 240
    }
  },
  {
    "id": "c9c51cd3-d7db-466d-a307-e388daeec5b8",
    "name": "Roasted Pumpkin and Feta Salad",
    "description": "A delightful Mediterranean-inspired snack featuring roasted pumpkin, feta cheese, and a zesty dressing.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c9c51cd3-d7db-466d-a307-e388daeec5b8/roasted-pumpkin-and-feta-salad-1760132279883.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 18,
      "fiber": 3,
      "protein": 8,
      "calories": 225
    }
  },
  {
    "id": "e4e66710-a20c-4672-84a1-67f84a56ac39",
    "name": "Autumn Roasted Veggie and Quinoa Bowl",
    "description": "A nourishing Mediterranean-inspired breakfast bowl featuring roasted seasonal vegetables, protein-packed quinoa, and a flavorful olive oil dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e4e66710-a20c-4672-84a1-67f84a56ac39/autumn-roasted-veggie-and-quinoa-bowl-1760131841138.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "ad96b3b5-e113-4273-a40b-e1ae26d7fd71",
    "name": "Mediterranean Roasted Vegetable and Feta Salad",
    "description": "A delicious and nutritious Mediterranean-inspired lunch featuring roasted seasonal vegetables, protein-rich chickpeas, and tangy feta cheese.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ad96b3b5-e113-4273-a40b-e1ae26d7fd71/mediterranean-roasted-vegetable-and-feta-salad-1760046017292.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 9,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "07283db5-1121-44c8-81fc-c9141578641f",
    "name": "Mediterranean Shakshuka",
    "description": "Eggs poached in a spiced tomato sauce with feta and herbs",
    "prep_time": 15,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/07283db5-1121-44c8-81fc-c9141578641f/mediterranean-shakshuka-1760045701024.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 22,
      "fiber": 5,
      "protein": 16,
      "calories": 280
    }
  },
  {
    "id": "1587dcfa-08c7-4324-bb80-43fb42387e45",
    "name": "Roasted Vegetable and Feta Breakfast Scramble",
    "description": "A Mediterranean-inspired breakfast that's packed with vegetables, protein, and healthy fats to fuel your day.",
    "prep_time": 20,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1587dcfa-08c7-4324-bb80-43fb42387e45/roasted-vegetable-and-feta-breakfast-scramble-1760128616147.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 6,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "407f1664-5b53-44ab-bc01-7d719b9aed97",
    "name": "Autumn Harvest Mediterranean Salad",
    "description": "A flavorful and nutritious Mediterranean-inspired salad featuring roasted vegetables, grilled salmon, and a tangy lemon-herb dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/407f1664-5b53-44ab-bc01-7d719b9aed97/autumn-harvest-mediterranean-salad-1760130850814.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 30,
      "fiber": 7,
      "protein": 25,
      "calories": 380
    }
  },
  {
    "id": "bda2da91-d5ed-4da6-bb4a-ef644c26c9ed",
    "name": "Mediterranean Roasted Vegetable Hummus Wrap",
    "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted seasonal vegetables, creamy hummus, and whole-grain wrap.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bda2da91-d5ed-4da6-bb4a-ef644c26c9ed/mediterranean-roasted-vegetable-hummus-wrap-1760130559337.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "d12e219f-7b21-411b-9fbf-b8e634bc79f8",
    "name": "Roasted Salmon with Autumn Veggies",
    "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon, seasonal vegetables, and whole grains.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d12e219f-7b21-411b-9fbf-b8e634bc79f8/roasted-salmon-with-autumn-veggies-1760128538724.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 35,
      "fiber": 7,
      "protein": 30,
      "calories": 425
    }
  },
  {
    "id": "b56b9c9c-2dad-4a4f-ab6f-be690176f935",
    "name": "Autumn Frittata with Roasted Vegetables",
    "description": "A delicious and nutritious Mediterranean-style breakfast frittata featuring seasonal vegetables and lean protein.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b56b9c9c-2dad-4a4f-ab6f-be690176f935/autumn-frittata-with-roasted-vegetables-1760046356383.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 22,
      "carbs": 18,
      "fiber": 4,
      "protein": 20,
      "calories": 345
    }
  },
  {
    "id": "0e7f95ac-59bb-482a-9733-7c9565d3396e",
    "name": "Roasted Vegetable Frittata with Feta and Whole Grain Toast",
    "description": "A delicious and nutritious Mediterranean-inspired breakfast featuring roasted seasonal vegetables, eggs, and whole grain toast.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0e7f95ac-59bb-482a-9733-7c9565d3396e/roasted-vegetable-frittata-with-feta-and-whole-grain-toast-1760046315431.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 6,
      "protein": 20,
      "calories": 340
    }
  },
  {
    "id": "41893203-3142-4aa4-b857-b47951c31b35",
    "name": "Roasted Salmon with Autumn Vegetables",
    "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon and a medley of seasonal vegetables, all drizzled with a flavorful olive oil dressing.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/41893203-3142-4aa4-b857-b47951c31b35/roasted-salmon-with-autumn-vegetables-1760046308507.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 8,
      "protein": 25,
      "calories": 350
    }
  },
  {
    "id": "5f3728f0-72c9-4593-9477-ba225bfb64c7",
    "name": "Autumn Mediterranean Salmon and Quinoa Bowl",
    "description": "A nourishing and flavorful Mediterranean-inspired dinner featuring roasted salmon, quinoa, and a variety of seasonal vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5f3728f0-72c9-4593-9477-ba225bfb64c7/autumn-mediterranean-salmon-and-quinoa-bowl-1760131142942.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 35,
      "fiber": 7,
      "protein": 30,
      "calories": 400
    }
  },
  {
    "id": "f2e80c58-220d-44de-bbfa-07a46098fc23",
    "name": "Autumn Quinoa Salad with Roasted Vegetables",
    "description": "A Mediterranean-inspired quinoa salad featuring roasted seasonal vegetables, chickpeas, and a tangy lemon-herb dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f2e80c58-220d-44de-bbfa-07a46098fc23/autumn-quinoa-salad-with-roasted-vegetables-1760131066636.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 45,
      "fiber": 8,
      "protein": 10,
      "calories": 350
    }
  },
  {
    "id": "54b685c1-9824-46b3-9c42-108d14ba8c45",
    "name": "Autumn Harvest Meditteranean Salmon Bowl",
    "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted salmon, seasonal vegetables, and hearty whole grains.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/54b685c1-9824-46b3-9c42-108d14ba8c45/autumn-harvest-meditteranean-salmon-bowl-1760130552609.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 19,
      "carbs": 32,
      "fiber": 7,
      "protein": 30,
      "calories": 430
    }
  },
  {
    "id": "f471df69-4ca6-4c98-b6d7-f81055df9c4f",
    "name": "Autumn Mediterranean Quinoa Bowl",
    "description": "A nourishing and flavorful breakfast bowl featuring seasonal fall produce, quinoa, and heart-healthy Mediterranean ingredients.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f471df69-4ca6-4c98-b6d7-f81055df9c4f/autumn-mediterranean-quinoa-bowl-1760130517523.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "9dcb2bc3-ba18-4dc6-aa3e-f193bafe1036",
    "name": "Roasted Butternut Squash and Lentil Salad",
    "description": "A delightful Mediterranean-inspired snack featuring roasted butternut squash, lentils, and a flavorful dressing.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9dcb2bc3-ba18-4dc6-aa3e-f193bafe1036/roasted-butternut-squash-and-lentil-salad-1760130677211.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 28,
      "fiber": 7,
      "protein": 10,
      "calories": 220
    }
  },
  {
    "id": "71475241-67d0-47b2-aa09-97b4aef2ee6e",
    "name": "Roasted Vegetable and Quinoa Stuffed Peppers",
    "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted vegetables, quinoa, and stuffed into bell peppers.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/71475241-67d0-47b2-aa09-97b4aef2ee6e/roasted-vegetable-and-quinoa-stuffed-peppers-1760130663032.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 35,
      "fiber": 7,
      "protein": 10,
      "calories": 260
    }
  },
  {
    "id": "31f600c8-624e-4b8d-af99-5b0e299227d6",
    "name": "Mediterranean Baked Salmon with Roasted Veggies",
    "description": "A delicious and nutritious Mediterranean-inspired dinner featuring baked salmon and a medley of roasted seasonal vegetables, all drizzled with heart-healthy olive oil.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/31f600c8-624e-4b8d-af99-5b0e299227d6/mediterranean-baked-salmon-with-roasted-veggies-1760130102903.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 8,
      "protein": 25,
      "calories": 350
    }
  },
  {
    "id": "f0e5ce77-de0d-4e1b-876c-3b696ee51c48",
    "name": "Autumn Harvest Grain Bowl",
    "description": "A nourishing and flavorful Mediterranean-inspired grain bowl featuring roasted fall vegetables, hearty whole grains, and a tangy lemon-garlic dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f0e5ce77-de0d-4e1b-876c-3b696ee51c48/autumn-harvest-grain-bowl-1760130067823.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 9,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "767d878e-c85e-4fa4-92ab-85d19bf6c9ec",
    "name": "Autumn Mediterranean Harvest Bowl",
    "description": "A nourishing and satisfying Mediterranean-inspired lunch bowl featuring roasted seasonal vegetables, flaky baked fish, and wholesome grains.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/767d878e-c85e-4fa4-92ab-85d19bf6c9ec/autumn-mediterranean-harvest-bowl-1760130215094.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 25,
      "calories": 390
    }
  },
  {
    "id": "ca8ff5e0-be29-418b-b380-6e447dd89617",
    "name": "Roasted Mediterranean Vegetable and Salmon Pasta",
    "description": "A delicious and nutritious Mediterranean-inspired dinner featuring roasted seasonal vegetables, whole grain pasta, and flavorful baked salmon.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ca8ff5e0-be29-418b-b380-6e447dd89617/roasted-mediterranean-vegetable-and-salmon-pasta-1760129913970.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 45,
      "fiber": 7,
      "protein": 25,
      "calories": 450
    }
  },
  {
    "id": "90021192-2c01-450e-8254-96b2457871ef",
    "name": "Autumn Mediterranean Salmon Bake",
    "description": "A delicious and healthy Mediterranean-inspired salmon bake featuring seasonal fall vegetables and whole grains.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90021192-2c01-450e-8254-96b2457871ef/autumn-mediterranean-salmon-bake-1760129647876.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 6,
      "protein": 25,
      "calories": 375
    }
  },
  {
    "id": "c6d5df30-5c9f-40eb-b9f5-3493c534e2f9",
    "name": "Roasted Autumn Vegetable Hummus",
    "description": "A delicious and nutritious Mediterranean-inspired snack made with roasted seasonal vegetables and creamy hummus.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c6d5df30-5c9f-40eb-b9f5-3493c534e2f9/roasted-autumn-vegetable-hummus-1760129569963.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 45,
      "fiber": 8,
      "protein": 10,
      "calories": 320
    }
  },
  {
    "id": "5c150113-a886-407b-a1b0-c970f66e27b6",
    "name": "Roasted Fall Vegetable Medley with Lemon-Garlic Chickpeas",
    "description": "A Mediterranean-inspired snack that combines the sweetness of roasted seasonal vegetables with the protein-packed goodness of chickpeas and the bright, tangy flavors of lemon and garlic.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5c150113-a886-407b-a1b0-c970f66e27b6/roasted-fall-vegetable-medley-with-lemon-garlic-chickpeas-1760129237529.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 45,
      "fiber": 10,
      "protein": 12,
      "calories": 320
    }
  },
  {
    "id": "4b51a38d-a5ab-400e-a918-a5c1c0f2d361",
    "name": "Baked Eggs with Roasted Vegetables and Whole Grain Toast",
    "description": "A delicious and nutritious Mediterranean-inspired breakfast featuring baked eggs nestled in a bed of roasted seasonal vegetables, served with whole grain toast.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4b51a38d-a5ab-400e-a918-a5c1c0f2d361/baked-eggs-with-roasted-vegetables-and-whole-grain-toast-1760129105179.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "8e8a6bb6-9d34-41ff-9365-16a9945fe0b4",
    "name": "Mediterranean Winter Vegetable Hash with Poached Eggs",
    "description": "A hearty and nutritious breakfast featuring seasonal vegetables, whole grains, and heart-healthy fats, all topped with perfectly poached eggs.",
    "prep_time": 20,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8e8a6bb6-9d34-41ff-9365-16a9945fe0b4/mediterranean-winter-vegetable-hash-with-poached-eggs-1760128111229.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "05dbd999-f456-45a5-8e9b-b3890408aae6",
    "name": "Baked Cod with Roasted Winter Vegetables",
    "description": "A delicious and nutritious Mediterranean-inspired lunch featuring baked cod and a medley of roasted seasonal vegetables, all drizzled with heart-healthy olive oil.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/05dbd999-f456-45a5-8e9b-b3890408aae6/baked-cod-with-roasted-winter-vegetables-1760048324438.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 18,
      "fiber": 6,
      "protein": 25,
      "calories": 310
    }
  },
  {
    "id": "dc288df3-772a-48e9-8929-61777e177915",
    "name": "Roasted Winter Vegetable Medley with Baked Lemon Garlic Salmon",
    "description": "A delicious and nutritious Mediterranean-inspired snack featuring a variety of roasted seasonal vegetables and baked salmon seasoned with lemon and garlic.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dc288df3-772a-48e9-8929-61777e177915/roasted-winter-vegetable-medley-with-baked-lemon-garlic-salmon-1760048254975.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 8,
      "protein": 25,
      "calories": 350
    }
  },
  {
    "id": "dec569e6-e72e-4c40-bc13-a71b40ad37d8",
    "name": "Mediterranean Baked Oatmeal with Roasted Veggies",
    "description": "A nutritious and delicious Mediterranean-inspired breakfast that's perfect for a cozy winter morning.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dec569e6-e72e-4c40-bc13-a71b40ad37d8/mediterranean-baked-oatmeal-with-roasted-veggies-1760046587530.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "834e362e-bb27-4feb-b940-32cbe7cea055",
    "name": "Winter Vegetable and Lentil Salad",
    "description": "A nourishing Mediterranean-inspired snack featuring roasted seasonal vegetables, hearty lentils, and a tangy lemon-herb dressing.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/834e362e-bb27-4feb-b940-32cbe7cea055/winter-vegetable-and-lentil-salad-1760046552488.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 35,
      "fiber": 9,
      "protein": 12,
      "calories": 260
    }
  },
  {
    "id": "38519393-ff38-4c58-8fbe-8819600cd74e",
    "name": "Mediterranean Chickpea and Veggie Salad",
    "description": "A flavorful and nutrient-dense snack that combines the best of the Mediterranean diet - olive oil, vegetables, whole grains, and legumes.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38519393-ff38-4c58-8fbe-8819600cd74e/mediterranean-chickpea-and-veggie-salad-1760046524824.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 25,
      "fiber": 6,
      "protein": 10,
      "calories": 260
    }
  },
  {
    "id": "319df537-0586-4dcb-be34-eca8846c3a62",
    "name": "Mediterranean Roasted Vegetable Salad",
    "description": "A nourishing and flavorful Mediterranean-inspired snack featuring roasted seasonal vegetables, chickpeas, and a tangy lemon-herb dressing.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/319df537-0586-4dcb-be34-eca8846c3a62/mediterranean-roasted-vegetable-salad-1760046120929.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 26,
      "fiber": 6,
      "protein": 8,
      "calories": 210
    }
  },
  {
    "id": "f510a1e8-75d0-403d-9c4b-9a3d1334b6a0",
    "name": "Mediterranean Baked Oatmeal with Roasted Vegetables",
    "description": "A hearty and nutritious Mediterranean-inspired breakfast that features baked oatmeal with roasted seasonal vegetables, olive oil, and a sprinkle of feta cheese.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f510a1e8-75d0-403d-9c4b-9a3d1334b6a0/mediterranean-baked-oatmeal-with-roasted-vegetables-1760045918719.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "fff22238-4a49-40b0-a7f6-fd88292f6fa2",
    "name": "Mediterranean Lentil and Vegetable Salad",
    "description": "A delicious and nutritious Mediterranean-inspired snack that is packed with fiber, protein, and healthy fats.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fff22238-4a49-40b0-a7f6-fd88292f6fa2/mediterranean-lentil-and-vegetable-salad-1760046092956.png",
    "diet_plan_names": [
      {
        "name": "Mediterranean Diet",
        "slug": "mediterranean"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 20,
      "fiber": 7,
      "protein": 11,
      "calories": 220
    }
  },
  {
    "id": "8dedd664-1771-49ec-8e8c-0571fc827ff2",
    "name": "Roasted Winter Veggie Bites",
    "description": "Delicious and nutritious paleo-friendly snack made with seasonal root vegetables and lean protein.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8dedd664-1771-49ec-8e8c-0571fc827ff2/roasted-winter-veggie-bites-1760179478206.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 25,
      "fiber": 6,
      "protein": 30,
      "calories": 290
    }
  },
  {
    "id": "217474b8-e56b-457c-9221-216d25c9e76b",
    "name": "Roasted Acorn Squash and Egg Bake",
    "description": "A nourishing and satisfying paleo breakfast featuring roasted acorn squash, eggs, and seasonal winter vegetables.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/217474b8-e56b-457c-9221-216d25c9e76b/roasted-acorn-squash-and-egg-bake-1760179085435.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 13,
      "carbs": 33,
      "fiber": 7,
      "protein": 27,
      "calories": 335
    }
  },
  {
    "id": "c63b80ec-bec9-493f-a4a7-ddc2044201be",
    "name": "Paleo Roasted Chicken with Roasted Winter Vegetables",
    "description": "A delicious and nutritious paleo-friendly lunch featuring lean roasted chicken and seasonal winter vegetables.",
    "prep_time": 20,
    "cook_time": 40,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c63b80ec-bec9-493f-a4a7-ddc2044201be/paleo-roasted-chicken-with-roasted-winter-vegetables-1760179428920.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "a7652275-2c5d-40ce-b869-b2e95afb550d",
    "name": "Paleo Winter Squash Bites",
    "description": "Delicious and nutritious paleo-friendly winter squash bites, perfect for a quick and easy snack.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a7652275-2c5d-40ce-b869-b2e95afb550d/paleo-winter-squash-bites-1760179422041.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 18,
      "fiber": 4,
      "protein": 2,
      "calories": 160
    }
  },
  {
    "id": "a3400294-83a3-46f3-9cc7-d103ce2f5cdd",
    "name": "Roasted Salmon and Seasonal Veggies",
    "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon and a medley of winter vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a3400294-83a3-46f3-9cc7-d103ce2f5cdd/roasted-salmon-and-seasonal-veggies-1760179415124.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "d3d0a6a4-31bb-4f6e-9a56-4c38c2802b41",
    "name": "Roasted Winter Veggie Medley",
    "description": "A delicious and nutritious paleo-friendly snack featuring a medley of roasted seasonal vegetables.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d3d0a6a4-31bb-4f6e-9a56-4c38c2802b41/roasted-winter-veggie-medley-1760179407823.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 8,
      "carbs": 25,
      "fiber": 6,
      "protein": 5,
      "calories": 180
    }
  },
  {
    "id": "7c7ba37c-2245-4063-9f50-91a92675e0d1",
    "name": "Roasted Salmon and Vegetable Medley",
    "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon, sweet potatoes, and a variety of seasonal vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/7c7ba37c-2245-4063-9f50-91a92675e0d1/roasted-salmon-and-vegetable-medley-1760179401075.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "b47877ad-1b09-46ea-a706-ccfd5b7c78de",
    "name": "Paleo Roasted Vegetable and Egg Skillet",
    "description": "A hearty and nutritious paleo breakfast skillet featuring roasted winter vegetables, lean turkey sausage, and eggs.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b47877ad-1b09-46ea-a706-ccfd5b7c78de/paleo-roasted-vegetable-and-egg-skillet-1760179017158.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 7,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590",
    "name": "Paleo Roasted Salmon with Roasted Winter Vegetables",
    "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon and a medley of roasted winter vegetables.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b59f9da0-b7b4-42f0-8d4d-4e11c5d4f590/paleo-roasted-salmon-with-roasted-winter-vegetables-1760137527652.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "52736362-9d57-4ad7-be2b-80c1d28cc679",
    "name": "Grilled Salmon with Roasted Winter Vegetables",
    "description": "A delicious and nutritious paleo-friendly lunch featuring succulent grilled salmon and a medley of roasted seasonal vegetables.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52736362-9d57-4ad7-be2b-80c1d28cc679/grilled-salmon-with-roasted-winter-vegetables-1760138439333.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "f857b9a1-d66c-42cb-8dc7-f08056f2d7c1",
    "name": "Paleo Baked Eggs with Spinach and Mushrooms",
    "description": "A delicious and nutritious paleo-friendly breakfast that's perfect for a cozy winter morning.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f857b9a1-d66c-42cb-8dc7-f08056f2d7c1/paleo-baked-eggs-with-spinach-and-mushrooms-1760137520757.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 12,
      "fiber": 4,
      "protein": 27,
      "calories": 330
    }
  },
  {
    "id": "5fc62b36-cf35-4d4f-b155-12c4d23f73fe",
    "name": "Paleo Roasted Salmon and Broccolini",
    "description": "A delicious and nutrient-dense paleo dinner featuring succulent roasted salmon and tender broccolini, perfect for a cozy winter meal.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5fc62b36-cf35-4d4f-b155-12c4d23f73fe/paleo-roasted-salmon-and-broccolini-1760137513560.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 6,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "09b58f92-0da7-472b-9794-a850e6867c99",
    "name": "Roasted Salmon with Cauliflower and Brussels Sprouts",
    "description": "A delicious and nutritious paleo-friendly dinner featuring roasted salmon, cauliflower, and brussels sprouts - perfect for a cozy winter meal.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/09b58f92-0da7-472b-9794-a850e6867c99/roasted-salmon-with-cauliflower-and-brussels-sprouts-1760137499081.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "bc9f5108-b35b-4a9d-8bbd-2d32450b9b32",
    "name": "Paleo Breakfast Veggie Scramble",
    "description": "A delicious and nutritious paleo-friendly breakfast filled with seasonal winter vegetables and lean protein.",
    "prep_time": 15,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/bc9f5108-b35b-4a9d-8bbd-2d32450b9b32/paleo-breakfast-veggie-scramble-1760137492331.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "a5c32cb2-aca7-4f4e-8026-cd787914a57c",
    "name": "Roasted Salmon with Balsamic Glazed Vegetables",
    "description": "A delicious and nutrient-dense paleo dinner featuring oven-roasted salmon and a medley of seasonal winter vegetables in a balsamic glaze.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a5c32cb2-aca7-4f4e-8026-cd787914a57c/roasted-salmon-with-balsamic-glazed-vegetables-1760137470921.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "2ab749e0-ed0c-4eb6-8a53-b73b272738e9",
    "name": "Paleo Baked Eggs with Spinach and Roasted Sweet Potatoes",
    "description": "A nourishing and satisfying paleo breakfast featuring baked eggs nestled in a bed of sautéed spinach and roasted sweet potatoes.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/2ab749e0-ed0c-4eb6-8a53-b73b272738e9/paleo-baked-eggs-with-spinach-and-roasted-sweet-potatoes-1760137463486.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 6,
      "protein": 25,
      "calories": 330
    }
  },
  {
    "id": "b64119cc-cb94-4c97-b2a3-097f3852a2f6",
    "name": "Roasted Salmon and Broccolini with Sweet Potato Mash",
    "description": "A delicious and nutritious paleo-friendly lunch featuring tender roasted salmon, savory broccolini, and a creamy sweet potato mash.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b64119cc-cb94-4c97-b2a3-097f3852a2f6/roasted-salmon-and-broccolini-with-sweet-potato-mash-1760137908966.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 16,
      "carbs": 32,
      "fiber": 7,
      "protein": 30,
      "calories": 380
    }
  },
  {
    "id": "315b021f-4c8b-475c-8041-0fac9db2a6a8",
    "name": "Roasted Salmon with Balsamic Glazed Brussels Sprouts",
    "description": "A delicious and nutritious paleo-friendly lunch featuring tender roasted salmon and caramelized Brussels sprouts in a balsamic glaze.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/315b021f-4c8b-475c-8041-0fac9db2a6a8/roasted-salmon-with-balsamic-glazed-brussels-sprouts-1760134327454.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 20,
      "fiber": 6,
      "protein": 30,
      "calories": 340
    }
  },
  {
    "id": "eabd6cea-4b24-4367-8ae8-daf907d9b803",
    "name": "Roasted Salmon and Beet Salad",
    "description": "A delicious and nutritious paleo-friendly lunch featuring roasted salmon, roasted beets, and a variety of fresh vegetables.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eabd6cea-4b24-4367-8ae8-daf907d9b803/roasted-salmon-and-beet-salad-1760134313666.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "34b378c2-5e26-48f7-a22d-f03e55973d12",
    "name": "Roasted Butternut Squash and Spinach Frittata",
    "description": "A hearty and nutrient-dense paleo breakfast featuring roasted butternut squash, fresh spinach, and free-range eggs.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/34b378c2-5e26-48f7-a22d-f03e55973d12/roasted-butternut-squash-and-spinach-frittata-1760133970600.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 7,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "4a621911-70a1-4b27-86af-879af3102b90",
    "name": "Roasted Acorn Squash with Grilled Salmon and Sautéed Kale",
    "description": "A delicious and nourishing paleo-friendly dinner featuring roasted acorn squash, grilled salmon, and sautéed kale - perfect for a cozy winter meal.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4a621911-70a1-4b27-86af-879af3102b90/roasted-acorn-squash-with-grilled-salmon-and-saut-ed-kale-1760133963536.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "43996d8a-a35c-4489-868c-7d407e2d54e0",
    "name": "Roasted Winter Vegetable Frittata",
    "description": "A nourishing and satisfying paleo breakfast packed with seasonal vegetables and lean protein.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/43996d8a-a35c-4489-868c-7d407e2d54e0/roasted-winter-vegetable-frittata-1760133956653.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 16,
      "carbs": 27,
      "fiber": 7,
      "protein": 24,
      "calories": 330
    }
  },
  {
    "id": "255bc358-09d4-4c7a-bd68-d7e0ef987fd6",
    "name": "Roasted Winter Veggie Medley with Grilled Chicken",
    "description": "A delicious and nourishing paleo-friendly snack packed with seasonal winter veggies and lean protein.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/255bc358-09d4-4c7a-bd68-d7e0ef987fd6/roasted-winter-veggie-medley-with-grilled-chicken-1760134291498.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 25,
      "fiber": 7,
      "protein": 35,
      "calories": 330
    }
  },
  {
    "id": "59efee87-c24b-45ab-8c85-668b5f16bc2b",
    "name": "Paleo Roasted Chicken with Butternut Squash and Brussels Sprouts",
    "description": "A delicious and nutritious paleo-friendly dinner featuring juicy roasted chicken, tender butternut squash, and crispy Brussels sprouts.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/59efee87-c24b-45ab-8c85-668b5f16bc2b/paleo-roasted-chicken-with-butternut-squash-and-brussels-sprouts-1760133949928.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "0c3eb70d-8324-421a-bbf2-f5d66756a291",
    "name": "Roasted Chicken and Vegetable Medley",
    "description": "A delicious and nutritious paleo-friendly lunch featuring succulent roasted chicken, seasonal winter vegetables, and a flavorful herb seasoning.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0c3eb70d-8324-421a-bbf2-f5d66756a291/roasted-chicken-and-vegetable-medley-1760134269336.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 345
    }
  },
  {
    "id": "d4ce9963-27cb-4a67-a023-62caf9c55c71",
    "name": "Roasted Butternut Squash and Walnut Bites",
    "description": "A delicious and nutritious paleo-friendly snack made with roasted butternut squash, walnuts, and warming spices.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d4ce9963-27cb-4a67-a023-62caf9c55c71/roasted-butternut-squash-and-walnut-bites-1760134262629.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 20,
      "carbs": 35,
      "fiber": 6,
      "protein": 6,
      "calories": 320
    }
  },
  {
    "id": "cfde8d92-87a1-499f-9e9a-1e5eec062289",
    "name": "Roasted Butternut Squash and Almond Bites",
    "description": "A delightful paleo-friendly snack featuring roasted butternut squash and crunchy almonds, perfect for a winter pick-me-up.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cfde8d92-87a1-499f-9e9a-1e5eec062289/roasted-butternut-squash-and-almond-bites-1760134248896.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 35,
      "fiber": 7,
      "protein": 9,
      "calories": 320
    }
  },
  {
    "id": "88405b74-3672-4ea2-9464-30263b75450c",
    "name": "Sautéed Kale and Roasted Sweet Potato Breakfast Bowl",
    "description": "A nourishing and satisfying paleo breakfast that will fuel your day with lean protein, complex carbs, and healthy fats.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/88405b74-3672-4ea2-9464-30263b75450c/saut-ed-kale-and-roasted-sweet-potato-breakfast-bowl-1760133900536.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 9,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "5282442a-55f9-4542-9b20-8f5e956b3836",
    "name": "Roasted Butternut Squash and Turkey Bites",
    "description": "A delicious and nutritious paleo-friendly snack made with roasted butternut squash, ground turkey, and warming winter spices.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5282442a-55f9-4542-9b20-8f5e956b3836/roasted-butternut-squash-and-turkey-bites-1760132365571.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 13,
      "fiber": 3,
      "protein": 21,
      "calories": 210
    }
  },
  {
    "id": "73b798ec-6fc7-4271-a5b1-9f2ccbfc3386",
    "name": "Roasted Salmon with Balsamic-Glazed Brussels Sprouts",
    "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon and caramelized Brussels sprouts.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/73b798ec-6fc7-4271-a5b1-9f2ccbfc3386/roasted-salmon-with-balsamic-glazed-brussels-sprouts-1760131650078.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "1f4ef16d-1dd2-4ab4-b955-761819f2a3c3",
    "name": "Paleo Grilled Salmon with Roasted Winter Veggies",
    "description": "A delicious and nutritious paleo-friendly lunch featuring tender grilled salmon and a medley of roasted winter vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1f4ef16d-1dd2-4ab4-b955-761819f2a3c3/paleo-grilled-salmon-with-roasted-winter-veggies-1760132358068.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "57fbac4c-2e00-4129-ab07-a87cd9cef38a",
    "name": "Winter Paleo Breakfast Frittata",
    "description": "A nutrient-dense paleo breakfast frittata packed with seasonal vegetables, lean protein, and healthy fats to keep you fueled through the winter months.",
    "prep_time": 15,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/57fbac4c-2e00-4129-ab07-a87cd9cef38a/winter-paleo-breakfast-frittata-1760131642117.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 21,
      "carbs": 12,
      "fiber": 5,
      "protein": 27,
      "calories": 330
    }
  },
  {
    "id": "38a7ce96-4eea-4d68-9e74-1807d6106665",
    "name": "Winter Paleo Breakfast Scramble",
    "description": "A nourishing and satisfying paleo breakfast loaded with winter vegetables, lean protein, and healthy fats.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38a7ce96-4eea-4d68-9e74-1807d6106665/winter-paleo-breakfast-scramble-1760131628119.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 10,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "1f947709-e390-4362-a3b8-b3055050692d",
    "name": "Grilled Salmon and Roasted Brussels Sprouts",
    "description": "A delicious and nutritious paleo-friendly dinner featuring tender grilled salmon and roasted brussels sprouts with a hint of lemon and garlic.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1f947709-e390-4362-a3b8-b3055050692d/grilled-salmon-and-roasted-brussels-sprouts-1760131621018.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "5996bbb4-9ce1-4009-90e2-07b0c56d16a5",
    "name": "Roasted Winter Vegetable Salad with Grilled Chicken",
    "description": "A delicious and nutrient-dense paleo lunch featuring roasted seasonal vegetables, grilled chicken, and a zesty vinaigrette.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5996bbb4-9ce1-4009-90e2-07b0c56d16a5/roasted-winter-vegetable-salad-with-grilled-chicken-1760132095012.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "be978467-c404-4daa-9b61-35cd4132dfce",
    "name": "Sautéed Spinach and Salmon Breakfast Skillet",
    "description": "A nourishing and delicious paleo breakfast featuring tender sautéed spinach, flavorful salmon, and fresh seasonal vegetables.",
    "prep_time": 15,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/be978467-c404-4daa-9b61-35cd4132dfce/saut-ed-spinach-and-salmon-breakfast-skillet-1760131613562.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 11,
      "fiber": 4,
      "protein": 30,
      "calories": 340
    }
  },
  {
    "id": "a063ea23-4d72-4cec-aa8e-f0e4af7115f1",
    "name": "Roasted Winter Vegetable Medley",
    "description": "A delicious and nutrient-dense paleo snack featuring a variety of seasonal vegetables, nuts, and lean protein.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a063ea23-4d72-4cec-aa8e-f0e4af7115f1/roasted-winter-vegetable-medley-1760132087558.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 9,
      "protein": 30,
      "calories": 325
    }
  },
  {
    "id": "934f6db2-2335-42c1-bb66-1d264f85f7c0",
    "name": "Paleo Roasted Salmon and Veggie Medley",
    "description": "A delicious and nutritious paleo-friendly dinner featuring roasted salmon, sweet potatoes, Brussels sprouts, and a touch of winter herbs.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/934f6db2-2335-42c1-bb66-1d264f85f7c0/paleo-roasted-salmon-and-veggie-medley-1760131606645.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 7,
      "protein": 30,
      "calories": 360
    }
  },
  {
    "id": "0e2ca754-501a-401d-978e-4fad43fd5f08",
    "name": "Roasted Salmon and Winter Vegetable Salad",
    "description": "A nourishing and satisfying paleo-friendly lunch featuring roasted salmon, seasonal vegetables, and a zesty lemon-herb dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0e2ca754-501a-401d-978e-4fad43fd5f08/roasted-salmon-and-winter-vegetable-salad-1760132080467.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 35,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "90ceca61-84e3-454f-b454-f32b4447499f",
    "name": "Paleo Baked Salmon and Roasted Vegetables",
    "description": "A delicious and nutritious paleo-friendly breakfast featuring baked salmon, roasted winter vegetables, and a touch of fresh herbs.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/90ceca61-84e3-454f-b454-f32b4447499f/paleo-baked-salmon-and-roasted-vegetables-1760131599582.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 16,
      "carbs": 27,
      "fiber": 6,
      "protein": 30,
      "calories": 360
    }
  },
  {
    "id": "02a47478-b417-49cb-a63b-d9f423477b39",
    "name": "Winter Citrus Salad with Grilled Chicken",
    "description": "A refreshing and nutrient-dense paleo snack featuring seasonal citrus fruits, crisp vegetables, and lean grilled chicken.",
    "prep_time": 10,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/02a47478-b417-49cb-a63b-d9f423477b39/winter-citrus-salad-with-grilled-chicken-1760132073376.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 20,
      "fiber": 6,
      "protein": 30,
      "calories": 260
    }
  },
  {
    "id": "3b440862-befc-481e-a3b8-15f11080db41",
    "name": "Seared Salmon with Roasted Winter Vegetables",
    "description": "A delicious and nutritious paleo-friendly dinner featuring seared salmon and a medley of roasted seasonal vegetables.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3b440862-befc-481e-a3b8-15f11080db41/seared-salmon-with-roasted-winter-vegetables-1760131592699.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "50aa198a-e241-43b8-a897-099ad7787a41",
    "name": "Roasted Butternut Squash and Egg Breakfast Bowl",
    "description": "A nourishing and satisfying paleo breakfast that will keep you feeling energized all morning.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/50aa198a-e241-43b8-a897-099ad7787a41/roasted-butternut-squash-and-egg-breakfast-bowl-1760131572495.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 7,
      "protein": 18,
      "calories": 325
    }
  },
  {
    "id": "f7c8a0cd-00b3-449f-b304-5e5ed4a48a11",
    "name": "Roasted Salmon with Baked Sweet Potatoes and Sautéed Kale",
    "description": "A delicious and nutritious paleo-friendly dinner featuring tender roasted salmon, baked sweet potatoes, and sautéed kale.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f7c8a0cd-00b3-449f-b304-5e5ed4a48a11/roasted-salmon-with-baked-sweet-potatoes-and-saut-ed-kale-1760131565287.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 7,
      "protein": 30,
      "calories": 380
    }
  },
  {
    "id": "4ccb47bb-1ed2-4813-9568-4b9b54e2a982",
    "name": "Roasted Chicken and Winter Vegetable Salad",
    "description": "A nourishing and flavorful paleo-friendly lunch featuring tender roasted chicken, crisp seasonal vegetables, and a zesty vinaigrette.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/4ccb47bb-1ed2-4813-9568-4b9b54e2a982/roasted-chicken-and-winter-vegetable-salad-1760132052489.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "624cd3fd-9e78-4d4b-9e69-c74dfc16783c",
    "name": "Paleo Baked Salmon and Roasted Veggies",
    "description": "A delicious and nutritious paleo-friendly breakfast featuring baked salmon, roasted winter vegetables, and a touch of lemon and herbs.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/624cd3fd-9e78-4d4b-9e69-c74dfc16783c/paleo-baked-salmon-and-roasted-veggies-1760131543679.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "47de8f31-9526-45d3-9bc7-8bf3ec64db1e",
    "name": "Roasted Butternut Squash and Apple Breakfast Hash",
    "description": "A delicious and nutritious paleo-friendly breakfast hash made with roasted butternut squash, apples, and lean turkey sausage.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/47de8f31-9526-45d3-9bc7-8bf3ec64db1e/roasted-butternut-squash-and-apple-breakfast-hash-1760180047048.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 35,
      "fiber": 7,
      "protein": 28,
      "calories": 340
    }
  },
  {
    "id": "68fdb748-0397-41c0-b8dd-c698b5ade2fb",
    "name": "Roasted Autumn Salad with Grilled Salmon",
    "description": "A delicious and nutritious paleo-friendly lunch featuring roasted fall vegetables and grilled salmon.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/68fdb748-0397-41c0-b8dd-c698b5ade2fb/roasted-autumn-salad-with-grilled-salmon-1760179673875.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 8,
      "protein": 30,
      "calories": 350
    }
  },
  {
    "id": "3a5a06c8-9e24-4584-a881-0dc3ee22637e",
    "name": "Roasted Sweet Potato and Pecan Snack",
    "description": "A delicious and nutritious paleo-friendly snack made with roasted sweet potatoes, pecans, and warm fall spices.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3a5a06c8-9e24-4584-a881-0dc3ee22637e/roasted-sweet-potato-and-pecan-snack-1760179010433.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 14,
      "carbs": 25,
      "fiber": 5,
      "protein": 3,
      "calories": 220
    }
  },
  {
    "id": "1c23f26b-cec9-410c-a9f7-df0956540553",
    "name": "Paleo Pumpkin Spice Breakfast Bowl",
    "description": "A delicious and nourishing paleo breakfast featuring seasonal pumpkin and warming spices.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1c23f26b-cec9-410c-a9f7-df0956540553/paleo-pumpkin-spice-breakfast-bowl-1760179187212.png",
    "diet_plan_names": [
      {
        "name": "Paleo",
        "slug": "paleo"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 18,
      "fiber": 4,
      "protein": 12,
      "calories": 245
    }
  },
  {
    "id": "62cc64d9-ac7e-458a-8dcf-5d809381feb9",
    "name": "Winter Veggie and Grain Snack Bites",
    "description": "Delicious and nourishing vegan snack bites made with seasonal vegetables, quinoa, and toasted nuts and seeds.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/62cc64d9-ac7e-458a-8dcf-5d809381feb9/winter-veggie-and-grain-snack-bites-1760178658640.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 30,
      "fiber": 5,
      "protein": 7,
      "calories": 250
    }
  },
  {
    "id": "d6a90e4c-49ad-46ef-8c38-63323f3ff136",
    "name": "Winter Vegetable Breakfast Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl packed with seasonal vegetables, plant-based proteins, and wholesome grains.",
    "prep_time": 20,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d6a90e4c-49ad-46ef-8c38-63323f3ff136/winter-vegetable-breakfast-bowl-1760178206012.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 355
    }
  },
  {
    "id": "02b8bba1-6f75-4a45-95da-76a40c334dd8",
    "name": "Roasted Root Vegetable Medley with Quinoa",
    "description": "A nourishing and satisfying vegan snack made with a variety of seasonal root vegetables, quinoa, and a blend of warming spices.",
    "prep_time": 10,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/02b8bba1-6f75-4a45-95da-76a40c334dd8/roasted-root-vegetable-medley-with-quinoa-1760177336115.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "cc08a8e6-5bef-42e4-9d33-eaebf5053004",
    "name": "Roasted Sweet Potato and Quinoa Breakfast Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted sweet potatoes, quinoa, and a variety of nutrient-dense plant-based ingredients.",
    "prep_time": 15,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cc08a8e6-5bef-42e4-9d33-eaebf5053004/roasted-sweet-potato-and-quinoa-breakfast-bowl-1760177928341.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "52b983fb-b76b-47a9-9c35-2f0e5bef0ddc",
    "name": "Winter Veggie Quinoa Bites",
    "description": "Flavorful vegan bites packed with plant-based proteins, veggies, and whole grains to fuel your day.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52b983fb-b76b-47a9-9c35-2f0e5bef0ddc/winter-veggie-quinoa-bites-1760177322723.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "2177f11d-2aec-43b1-b755-d0fe3ba9ee43",
    "name": "Winter Quinoa Veggie Bowl",
    "description": "A nourishing and satisfying vegan snack bowl featuring seasonal vegetables, protein-rich quinoa, and crunchy nuts and seeds.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/2177f11d-2aec-43b1-b755-d0fe3ba9ee43/winter-quinoa-veggie-bowl-1760177309098.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 330
    }
  },
  {
    "id": "98384396-16c0-45b9-ad69-30c817f3c80d",
    "name": "Hearty Winter Vegetable Hash",
    "description": "A nourishing vegan breakfast hash featuring seasonal winter vegetables, plant-based proteins, and warming spices.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/98384396-16c0-45b9-ad69-30c817f3c80d/hearty-winter-vegetable-hash-1760137105572.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "b8b11fd3-2ab0-4d38-87c6-becc73d0aac7",
    "name": "Roasted Winter Vegetable and Quinoa Bites",
    "description": "Warm, savory bites packed with plant-based protein, seasonal veggies, and crunchy nuts. A perfect snack or appetizer for cozy winter gatherings.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b8b11fd3-2ab0-4d38-87c6-becc73d0aac7/roasted-winter-vegetable-and-quinoa-bites-1760136681648.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 23,
      "fiber": 5,
      "protein": 7,
      "calories": 210
    }
  },
  {
    "id": "ad6a4436-c5fd-464c-a179-d48ac1226687",
    "name": "Roasted Root Vegetable and Quinoa Bowl",
    "description": "A nourishing and satisfying vegan lunch featuring a colorful array of roasted winter vegetables and protein-rich quinoa.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ad6a4436-c5fd-464c-a179-d48ac1226687/roasted-root-vegetable-and-quinoa-bowl-1760136660779.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "10b09534-9e43-4f16-bf5d-925be06ef58d",
    "name": "Roasted Vegetable and Quinoa Snack Bowl",
    "description": "A nourishing and satisfying vegan snack featuring roasted winter vegetables, protein-rich quinoa, and a sprinkle of toasted nuts and seeds.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/10b09534-9e43-4f16-bf5d-925be06ef58d/roasted-vegetable-and-quinoa-snack-bowl-1760136652809.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 340
    }
  },
  {
    "id": "f32f6b1c-1861-4119-b543-567554e9b9f5",
    "name": "Winter Veggie Breakfast Bowl",
    "description": "A nourishing vegan breakfast bowl packed with seasonal vegetables, plant-based proteins, and whole grains.",
    "prep_time": 20,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f32f6b1c-1861-4119-b543-567554e9b9f5/winter-veggie-breakfast-bowl-1760134721514.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 340
    }
  },
  {
    "id": "6ae6b0f0-7c3f-48ac-9d14-f8120aedc8e4",
    "name": "Roasted Winter Vegetable Medley with Quinoa and Nuts",
    "description": "A delicious and nourishing vegan snack made with a variety of seasonal vegetables, quinoa, and crunchy nuts.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6ae6b0f0-7c3f-48ac-9d14-f8120aedc8e4/roasted-winter-vegetable-medley-with-quinoa-and-nuts-1760136352013.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 14,
      "carbs": 42,
      "fiber": 7,
      "protein": 11,
      "calories": 320
    }
  },
  {
    "id": "e5bb75d5-28b0-4b40-924a-1fe0d12801b8",
    "name": "Winter Vegetable and Grain Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted seasonal vegetables, quinoa, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e5bb75d5-28b0-4b40-924a-1fe0d12801b8/winter-vegetable-and-grain-bowl-1760133228584.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "926f1058-0665-4106-8fe9-551df65b6ea2",
    "name": "Winter Vegetable and Quinoa Stew",
    "description": "A hearty and nourishing vegan stew featuring a variety of seasonal vegetables, protein-rich quinoa, and a blend of warming spices.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/926f1058-0665-4106-8fe9-551df65b6ea2/winter-vegetable-and-quinoa-stew-1760133221368.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "557e6c37-8b49-4b6c-b6ac-9c0d42ef3e26",
    "name": "Roasted Cauliflower and Quinoa Bites",
    "description": "Delicious and nutritious vegan snack made with roasted cauliflower, quinoa, and a blend of seasonal spices.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/557e6c37-8b49-4b6c-b6ac-9c0d42ef3e26/roasted-cauliflower-and-quinoa-bites-1760132839659.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 35,
      "fiber": 7,
      "protein": 15,
      "calories": 320
    }
  },
  {
    "id": "91143f13-4aae-4ae0-b6e0-d28005d2f455",
    "name": "Roasted Vegetable and Quinoa Stew",
    "description": "A hearty and nourishing vegan stew featuring a variety of roasted winter vegetables, protein-rich quinoa, and a blend of warming spices.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/91143f13-4aae-4ae0-b6e0-d28005d2f455/roasted-vegetable-and-quinoa-stew-1760133207147.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "e83238dd-81f1-4ee0-9c6d-ba104e8b88e1",
    "name": "Roasted Winter Vegetable Bowl with Quinoa and Tahini Dressing",
    "description": "A nourishing and satisfying vegan lunch that features a medley of roasted seasonal vegetables, fluffy quinoa, and a creamy tahini-based dressing.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e83238dd-81f1-4ee0-9c6d-ba104e8b88e1/roasted-winter-vegetable-bowl-with-quinoa-and-tahini-dressing-1760132832533.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "19c78835-b095-4142-849a-df06c72155b2",
    "name": "Winter Vegetable and Quinoa Snack Bites",
    "description": "Delicious and nutritious vegan snack bites featuring seasonal vegetables, quinoa, and a blend of nuts and seeds.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/19c78835-b095-4142-849a-df06c72155b2/winter-vegetable-and-quinoa-snack-bites-1760132825347.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 312
    }
  },
  {
    "id": "846d8c50-66c7-4129-8ab7-f4f7f796252f",
    "name": "Winter Vegetable and Quinoa Stir-Fry",
    "description": "A hearty and flavorful vegan lunch packed with plant-based proteins, seasonal vegetables, and whole grains.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/846d8c50-66c7-4129-8ab7-f4f7f796252f/winter-vegetable-and-quinoa-stir-fry-1760132818249.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 9,
      "protein": 15,
      "calories": 345
    }
  },
  {
    "id": "48e9ad99-32f8-46d5-b98e-67343ff7f882",
    "name": "Winter Lentil and Quinoa Stew",
    "description": "A hearty and nourishing vegan stew featuring plant-based proteins, seasonal vegetables, and whole grains.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/48e9ad99-32f8-46d5-b98e-67343ff7f882/winter-lentil-and-quinoa-stew-1760132768563.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "10095b0c-d99f-468c-b8ad-c30aa7cf4c1a",
    "name": "Winter Lentil and Quinoa Bowl",
    "description": "A nourishing and satisfying vegan lunch bowl featuring hearty lentils, fluffy quinoa, roasted vegetables, and a zesty tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/10095b0c-d99f-468c-b8ad-c30aa7cf4c1a/winter-lentil-and-quinoa-bowl-1760179554276.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "fc5cd6b6-7449-4c9a-94f2-9ba82b1bb1fc",
    "name": "Winter Lentil and Vegetable Stew",
    "description": "A hearty, plant-based stew featuring lentils, seasonal vegetables, and a blend of warming spices.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fc5cd6b6-7449-4c9a-94f2-9ba82b1bb1fc/winter-lentil-and-vegetable-stew-1760179288784.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 5,
      "carbs": 45,
      "fiber": 10,
      "protein": 15,
      "calories": 300
    }
  },
  {
    "id": "fc325f98-98ad-4ac6-a94f-9b892ab36af9",
    "name": "Winter Vegetable Quinoa Bites",
    "description": "Delicious and nutritious vegan snack made with seasonal vegetables, quinoa, and nuts.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fc325f98-98ad-4ac6-a94f-9b892ab36af9/winter-vegetable-quinoa-bites-1760179275096.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 27,
      "fiber": 5,
      "protein": 7,
      "calories": 220
    }
  },
  {
    "id": "fca5f7fa-6420-45f5-a0a3-4aa922f6ff26",
    "name": "Winter Vegetable and Quinoa Breakfast Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl featuring roasted winter vegetables, protein-packed quinoa, and crunchy nuts and seeds.",
    "prep_time": 20,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fca5f7fa-6420-45f5-a0a3-4aa922f6ff26/winter-vegetable-and-quinoa-breakfast-bowl-1760179254670.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "91ad8cb2-414b-4e83-a925-87f5681e3f3f",
    "name": "Roasted Vegetable and Quinoa Snack Mix",
    "description": "A flavorful and nutritious vegan snack made with roasted seasonal vegetables, quinoa, nuts, and seeds.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/91ad8cb2-414b-4e83-a925-87f5681e3f3f/roasted-vegetable-and-quinoa-snack-mix-1760179248097.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 35,
      "fiber": 7,
      "protein": 15,
      "calories": 320
    }
  },
  {
    "id": "b086f181-0c49-4254-a126-6851c65815b2",
    "name": "Roasted Winter Vegetable and Quinoa Bowl",
    "description": "A hearty and nourishing vegan dinner featuring a medley of roasted winter vegetables, protein-rich quinoa, and a creamy tahini dressing.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b086f181-0c49-4254-a126-6851c65815b2/roasted-winter-vegetable-and-quinoa-bowl-1760179241270.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "eb7dc075-a97c-4f94-a938-3024411f30c6",
    "name": "Winter Lentil and Quinoa Salad",
    "description": "A hearty and nutrient-dense vegan lunch that combines protein-rich lentils and quinoa with fresh winter vegetables and a tangy vinaigrette.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/eb7dc075-a97c-4f94-a938-3024411f30c6/winter-lentil-and-quinoa-salad-1760179234702.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "242745b3-d08c-472d-840c-3584c909927b",
    "name": "Winter Quinoa Breakfast Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl made with nutrient-dense ingredients like quinoa, sweet potatoes, kale, and toasted nuts.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/242745b3-d08c-472d-840c-3584c909927b/winter-quinoa-breakfast-bowl-1760179227974.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "30ebfbb4-d6ec-476d-94c1-0bdc16170f82",
    "name": "Winter Vegetable Quinoa Bowl",
    "description": "A nourishing and satisfying vegan lunch featuring quinoa, roasted winter vegetables, and a flavorful tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/30ebfbb4-d6ec-476d-94c1-0bdc16170f82/winter-vegetable-quinoa-bowl-1760179207781.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "343756a3-f7b2-40cd-897a-38ad48e5b0ed",
    "name": "Winter Vegetable Breakfast Hash",
    "description": "A hearty and nourishing vegan breakfast made with a mix of seasonal vegetables, plant-based proteins, and warming spices.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/343756a3-f7b2-40cd-897a-38ad48e5b0ed/winter-vegetable-breakfast-hash-1760179200980.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 340
    }
  },
  {
    "id": "3c50fb93-c340-4904-8096-51f4da69c36e",
    "name": "Roasted Butternut Squash and Quinoa Snack Mix",
    "description": "A delicious and nutritious vegan snack mix featuring roasted butternut squash, quinoa, nuts, and seeds.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3c50fb93-c340-4904-8096-51f4da69c36e/roasted-butternut-squash-and-quinoa-snack-mix-1760178789391.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 18,
      "carbs": 35,
      "fiber": 7,
      "protein": 12,
      "calories": 320
    }
  },
  {
    "id": "38b76391-cc24-4114-9a21-6f4f3159a071",
    "name": "Roasted Pumpkin Seed and Quinoa Snack Bars",
    "description": "Delicious and nutritious vegan snack bars made with seasonal pumpkin seeds, quinoa, and other wholesome plant-based ingredients.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/38b76391-cc24-4114-9a21-6f4f3159a071/roasted-pumpkin-seed-and-quinoa-snack-bars-1760177941892.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 6,
      "protein": 15,
      "calories": 330
    }
  },
  {
    "id": "5646ed8d-c4fc-48bf-a94b-6dda62f9501e",
    "name": "Autumn Quinoa Bowl with Roasted Veggies",
    "description": "A nourishing and satisfying vegan lunch featuring quinoa, roasted fall vegetables, and a flavorful tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5646ed8d-c4fc-48bf-a94b-6dda62f9501e/autumn-quinoa-bowl-with-roasted-veggies-1760176831040.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "a3270a29-dfa5-42df-94c3-712359098962",
    "name": "Autumn Quinoa and Roasted Vegetable Parfait",
    "description": "A delightful vegan snack featuring layers of nutty quinoa, roasted fall vegetables, and crunchy nuts and seeds.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a3270a29-dfa5-42df-94c3-712359098962/autumn-quinoa-and-roasted-vegetable-parfait-1760176421953.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 14,
      "carbs": 46,
      "fiber": 7,
      "protein": 12,
      "calories": 330
    }
  },
  {
    "id": "51c6d767-507e-4a91-bb99-b43578b3708c",
    "name": "Autumn Grain Bowl with Roasted Vegetables",
    "description": "A nourishing and flavorful vegan lunch that celebrates the bounty of the fall season.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/51c6d767-507e-4a91-bb99-b43578b3708c/autumn-grain-bowl-with-roasted-vegetables-1760170743917.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "a965c4b3-836b-45b6-89e3-6ef64a579d81",
    "name": "Autumn Quinoa and Roasted Veggie Bites",
    "description": "A delightful vegan snack packed with plant-based proteins, seasonal veggies, and a crunchy nut topping.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a965c4b3-836b-45b6-89e3-6ef64a579d81/autumn-quinoa-and-roasted-veggie-bites-1760168750890.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 348
    }
  },
  {
    "id": "0ae7a2b5-a857-482e-a781-f4fb97775888",
    "name": "Autumn Lentil and Quinoa Pilaf",
    "description": "A nourishing and flavorful plant-based dinner featuring hearty lentils, fluffy quinoa, and seasonal vegetables.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0ae7a2b5-a857-482e-a781-f4fb97775888/autumn-lentil-and-quinoa-pilaf-1760138214783.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "6661fa33-9732-47eb-94e8-0a854858afa5",
    "name": "Autumn Quinoa Snack Bites",
    "description": "Delicious and nutritious vegan snack bites made with quinoa, roasted fall vegetables, and crunchy nuts and seeds.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6661fa33-9732-47eb-94e8-0a854858afa5/autumn-quinoa-snack-bites-1760138166369.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 32,
      "fiber": 6,
      "protein": 7,
      "calories": 250
    }
  },
  {
    "id": "e4b7d488-4462-44d3-b791-1b3147c62a1f",
    "name": "Roasted Pumpkin Seed and Quinoa Bites",
    "description": "Delicious and nutritious vegan snack made with seasonal fall ingredients.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e4b7d488-4462-44d3-b791-1b3147c62a1f/roasted-pumpkin-seed-and-quinoa-bites-1760138138968.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 7,
      "protein": 15,
      "calories": 330
    }
  },
  {
    "id": "f54f1d8d-39bf-421e-9333-172cd2c39a9e",
    "name": "Autumn Lentil and Butternut Squash Bowl",
    "description": "A nourishing and flavorful vegan lunch featuring hearty lentils, roasted butternut squash, and a variety of seasonal vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f54f1d8d-39bf-421e-9333-172cd2c39a9e/autumn-lentil-and-butternut-squash-bowl-1760138096412.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 340
    }
  },
  {
    "id": "e17d1d16-c091-490d-a3b0-efccc25cfc30",
    "name": "Autumn Quinoa and Sweet Potato Hash",
    "description": "A nourishing and flavorful vegan breakfast hash made with seasonal sweet potatoes, quinoa, and warming spices.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e17d1d16-c091-490d-a3b0-efccc25cfc30/autumn-quinoa-and-sweet-potato-hash-1760137355178.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "ba02d32c-fa4c-4f48-b905-d467046f8848",
    "name": "Roasted Fall Vegetable Medley with Quinoa and Toasted Seeds",
    "description": "A delicious and nutritious vegan snack featuring a medley of roasted seasonal vegetables, quinoa, and toasted pumpkin and sunflower seeds.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ba02d32c-fa4c-4f48-b905-d467046f8848/roasted-fall-vegetable-medley-with-quinoa-and-toasted-seeds-1760136779836.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 7,
      "protein": 15,
      "calories": 320
    }
  },
  {
    "id": "8c18f94a-2291-4500-9c02-4bfc4fe31877",
    "name": "Autumn Quinoa Power Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl featuring quinoa, roasted fall vegetables, and a creamy cashew-based dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8c18f94a-2291-4500-9c02-4bfc4fe31877/autumn-quinoa-power-bowl-1760136546254.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 9,
      "protein": 15,
      "calories": 360
    }
  },
  {
    "id": "c2ece5f5-152f-4760-9b01-3b6f95f79406",
    "name": "Autumn Lentil and Butternut Squash Stew",
    "description": "A hearty and nourishing vegan stew featuring seasonal vegetables, plant-based proteins, and a blend of warming spices.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c2ece5f5-152f-4760-9b01-3b6f95f79406/autumn-lentil-and-butternut-squash-stew-1760135938036.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 12,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "29ddc766-e32e-4e81-a386-75c127626f4b",
    "name": "Autumn Harvest Vegetable Stew",
    "description": "A hearty and nourishing vegan stew featuring seasonal fall vegetables, plant-based proteins, and a blend of comforting spices.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/29ddc766-e32e-4e81-a386-75c127626f4b/autumn-harvest-vegetable-stew-1760135909795.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 10,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "c5159678-dc5d-4ef1-805f-c9eac6877bf0",
    "name": "Autumn Quinoa Veggie Cups",
    "description": "Delicious and nutritious vegan snack made with seasonal fall produce and plant-based proteins.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/c5159678-dc5d-4ef1-805f-c9eac6877bf0/autumn-quinoa-veggie-cups-1760135829337.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 43,
      "fiber": 6,
      "protein": 8,
      "calories": 280
    }
  },
  {
    "id": "86bb1f98-8c2e-4200-8ac8-15f4fbccb626",
    "name": "Autumn Quinoa Veggie Bites",
    "description": "Delicious and nutritious plant-based snack packed with seasonal fall flavors.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/86bb1f98-8c2e-4200-8ac8-15f4fbccb626/autumn-quinoa-veggie-bites-1760135388833.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 31,
      "fiber": 5,
      "protein": 8,
      "calories": 230
    }
  },
  {
    "id": "ecc99d3f-e83d-44f6-bd25-65dec9a782bf",
    "name": "Autumn Quinoa Vegetable Bowl",
    "description": "A nourishing and satisfying vegan lunch bowl featuring hearty quinoa, roasted fall vegetables, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ecc99d3f-e83d-44f6-bd25-65dec9a782bf/autumn-quinoa-vegetable-bowl-1760135374401.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "28afc307-37a4-4dde-9a69-25768294de3d",
    "name": "Autumn Quinoa and Sweet Potato Bowl",
    "description": "A nourishing and satisfying vegan breakfast bowl featuring seasonal sweet potatoes, quinoa, and a variety of plant-based proteins, vegetables, and seeds.",
    "prep_time": 15,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/28afc307-37a4-4dde-9a69-25768294de3d/autumn-quinoa-and-sweet-potato-bowl-1760135367529.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 55,
      "fiber": 8,
      "protein": 15,
      "calories": 350
    }
  },
  {
    "id": "af211faf-f815-4bb6-ba53-139795fcabea",
    "name": "Autumn Quinoa and Roasted Vegetable Snack",
    "description": "A delicious and nutritious vegan snack featuring quinoa, roasted fall vegetables, and a savory tahini dressing.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/af211faf-f815-4bb6-ba53-139795fcabea/autumn-quinoa-and-roasted-vegetable-snack-1760135353073.png",
    "diet_plan_names": [
      {
        "name": "Vegan",
        "slug": "vegan"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 45,
      "fiber": 7,
      "protein": 10,
      "calories": 325
    }
  },
  {
    "id": "a5aa7985-4a55-4411-8a73-200c3aa7f599",
    "name": "Winter Vegetable and Egg Scramble",
    "description": "A hearty and nourishing vegetarian breakfast featuring seasonal winter produce and creamy scrambled eggs.",
    "prep_time": 20,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/a5aa7985-4a55-4411-8a73-200c3aa7f599/winter-vegetable-and-egg-scramble-1760179888540.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 17,
      "carbs": 26,
      "fiber": 4,
      "protein": 21,
      "calories": 330
    }
  },
  {
    "id": "8b643cc2-7ba3-45cf-9146-f8472d8e1e16",
    "name": "Winter Vegetable Quinoa Bowls",
    "description": "A nourishing and satisfying vegetarian lunch with roasted seasonal veggies, protein-packed quinoa, and a creamy avocado dressing.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8b643cc2-7ba3-45cf-9146-f8472d8e1e16/winter-vegetable-quinoa-bowls-1760178303096.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 10,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "dcb08905-effe-4a50-a3be-57fa0239d27c",
    "name": "Warm Oatmeal with Roasted Winter Vegetables",
    "description": "A comforting and nutritious breakfast that combines the warmth of oatmeal with the sweetness of roasted winter vegetables.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/dcb08905-effe-4a50-a3be-57fa0239d27c/warm-oatmeal-with-roasted-winter-vegetables-1760174968008.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "9210f0b5-c459-4328-8f0a-77e1f2aacec2",
    "name": "Winter Veggie Breakfast Frittata",
    "description": "A hearty, vegetable-packed frittata made with seasonal winter produce and fluffy eggs for a satisfying and nutritious breakfast.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/9210f0b5-c459-4328-8f0a-77e1f2aacec2/winter-veggie-breakfast-frittata-1760167218886.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 14,
      "carbs": 25,
      "fiber": 6,
      "protein": 20,
      "calories": 290
    }
  },
  {
    "id": "8b4e6d21-079d-433a-8829-f210a60dc3db",
    "name": "Roasted Root Vegetable Medley",
    "description": "A delightful winter snack featuring a mix of seasonal root vegetables roasted to perfection.",
    "prep_time": 10,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8b4e6d21-079d-433a-8829-f210a60dc3db/roasted-root-vegetable-medley-1760138516193.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 8,
      "carbs": 50,
      "fiber": 8,
      "protein": 4,
      "calories": 250
    }
  },
  {
    "id": "252414b8-5f87-4647-a98e-75a0fc0be1b0",
    "name": "Winter Vegetable Quinoa Bake",
    "description": "A hearty and comforting baked dish featuring quinoa, roasted winter vegetables, and a creamy dairy-based sauce.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/252414b8-5f87-4647-a98e-75a0fc0be1b0/winter-vegetable-quinoa-bake-1760167196526.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 345
    }
  },
  {
    "id": "ffe01dc6-6941-46d0-8f55-0440c93f65a3",
    "name": "Baked Oatmeal with Apples and Pecans",
    "description": "A warm and comforting baked oatmeal dish made with seasonal apples, crunchy pecans, and a touch of maple syrup.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/ffe01dc6-6941-46d0-8f55-0440c93f65a3/baked-oatmeal-with-apples-and-pecans-1760167161928.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 6,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "5642816a-9c5f-4ab9-9247-f7f7b7126dc7",
    "name": "Roasted Butternut Squash and Apple Bites",
    "description": "A delightful winter snack featuring the sweet and savory flavors of roasted butternut squash and apples, with a touch of cinnamon and nutmeg.",
    "prep_time": 10,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5642816a-9c5f-4ab9-9247-f7f7b7126dc7/roasted-butternut-squash-and-apple-bites-1760137127073.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 8,
      "carbs": 27,
      "fiber": 5,
      "protein": 2,
      "calories": 180
    }
  },
  {
    "id": "6052c645-d4e3-4c1e-98a1-af598e3c3d73",
    "name": "Seasonal Vegetable Frittata",
    "description": "A fluffy, protein-packed frittata filled with seasonal vegetables and herbs, perfect for a nourishing winter breakfast.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6052c645-d4e3-4c1e-98a1-af598e3c3d73/seasonal-vegetable-frittata-1760179827263.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 13,
      "carbs": 25,
      "fiber": 5,
      "protein": 20,
      "calories": 280
    }
  },
  {
    "id": "cd4a503c-186e-452d-be7c-159441bd0e59",
    "name": "Roasted Vegetable and Quinoa Casserole",
    "description": "A hearty and nutritious vegetarian casserole featuring a medley of roasted winter vegetables and protein-packed quinoa.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/cd4a503c-186e-452d-be7c-159441bd0e59/roasted-vegetable-and-quinoa-casserole-1760179820499.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "230da67c-f419-47fd-92c3-9829352b0b50",
    "name": "Hearty Winter Vegetable Frittata",
    "description": "A nourishing vegetable-packed frittata made with fresh seasonal produce, eggs, and a touch of dairy for a satisfying breakfast.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/230da67c-f419-47fd-92c3-9829352b0b50/hearty-winter-vegetable-frittata-1760179813526.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 6,
      "protein": 20,
      "calories": 310
    }
  },
  {
    "id": "b422a5fc-7190-4a55-b938-a9dd005abbac",
    "name": "Winter Veggie and Grain Parfait",
    "description": "A delightful layered snack made with seasonal fruits, vegetables, and grains, perfect for a nutritious winter pick-me-up.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b422a5fc-7190-4a55-b938-a9dd005abbac/winter-veggie-and-grain-parfait-1760136744675.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 300
    }
  },
  {
    "id": "87d1c472-9c85-41dd-924a-8f1b8d3d2a92",
    "name": "Winter Vegetable Stew with Quinoa",
    "description": "A hearty and nourishing vegetable stew featuring seasonal winter produce and protein-rich quinoa, perfect for a cozy winter dinner.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/87d1c472-9c85-41dd-924a-8f1b8d3d2a92/winter-vegetable-stew-with-quinoa-1760179806396.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 10,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "13878b3f-8e34-4dd2-8d19-c79ad8f18a9c",
    "name": "Winter Vegetable Stir-Fry with Quinoa",
    "description": "A vibrant and nourishing vegetarian lunch featuring seasonal winter vegetables and protein-packed quinoa.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/13878b3f-8e34-4dd2-8d19-c79ad8f18a9c/winter-vegetable-stir-fry-with-quinoa-1760136359093.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 10,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "03c5c32a-ae13-4dad-8f6e-4465e2dc517c",
    "name": "Winter Vegetable Quinoa Salad",
    "description": "A nourishing and flavorful vegetarian lunch featuring roasted winter vegetables, quinoa, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/03c5c32a-ae13-4dad-8f6e-4465e2dc517c/winter-vegetable-quinoa-salad-1760133242406.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "11f59754-47a4-4460-873f-f75b7e7bf294",
    "name": "Winter Vegetable and Grain Medley",
    "description": "A nourishing and satisfying vegetarian snack made with seasonal produce and whole grains.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/11f59754-47a4-4460-873f-f75b7e7bf294/winter-vegetable-and-grain-medley-1760132882510.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 43,
      "fiber": 6,
      "protein": 14,
      "calories": 280
    }
  },
  {
    "id": "8eef8838-fcbb-4dec-ad6a-48f5f41b393a",
    "name": "Roasted Vegetable and Quinoa Bake",
    "description": "A hearty and nutritious vegetarian dinner featuring a medley of roasted winter vegetables and fluffy quinoa, baked to perfection.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8eef8838-fcbb-4dec-ad6a-48f5f41b393a/roasted-vegetable-and-quinoa-bake-1760179764289.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "3ef7e40b-23fc-431b-9df0-065a4c6b101f",
    "name": "Roasted Vegetable and Quinoa Snack Bites",
    "description": "Flavorful and satisfying vegetarian snack bites made with roasted seasonal vegetables, quinoa, and a touch of cheese.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3ef7e40b-23fc-431b-9df0-065a4c6b101f/roasted-vegetable-and-quinoa-snack-bites-1760181093442.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 25,
      "fiber": 5,
      "protein": 10,
      "calories": 220
    }
  },
  {
    "id": "abf5ae9f-b035-4a90-baef-bad10d05e5c5",
    "name": "Autumn Harvest Granola Bites",
    "description": "Delicious and nutritious vegetarian granola bites featuring seasonal fall ingredients like apples, pecans, and cinnamon.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/abf5ae9f-b035-4a90-baef-bad10d05e5c5/autumn-harvest-granola-bites-1760171815023.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 6,
      "protein": 20,
      "calories": 300
    }
  },
  {
    "id": "e872ca0f-9f35-4355-ba1b-3c33575a8e02",
    "name": "Autumn Vegetable Gratin",
    "description": "A comforting and nourishing vegetarian casserole featuring seasonal fall produce, grains, and melty cheese.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e872ca0f-9f35-4355-ba1b-3c33575a8e02/autumn-vegetable-gratin-1760167085685.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "93f81168-7d2c-4095-bc9f-fff8ff63370f",
    "name": "Autumn Harvest Vegetarian Bowl",
    "description": "A hearty and nourishing vegetarian lunch bowl featuring roasted fall vegetables, quinoa, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/93f81168-7d2c-4095-bc9f-fff8ff63370f/autumn-harvest-vegetarian-bowl-1760136290274.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "1706a85e-f0a7-4da7-bae0-e0b94a6ec66e",
    "name": "Autumn Vegetable Medley Snack",
    "description": "A nourishing and delightful vegetable-based snack that celebrates the flavors of fall.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/1706a85e-f0a7-4da7-bae0-e0b94a6ec66e/autumn-vegetable-medley-snack-1760134348970.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 8,
      "carbs": 20,
      "fiber": 4,
      "protein": 9,
      "calories": 175
    }
  },
  {
    "id": "61a2da03-c29e-4add-95f9-7639944048e9",
    "name": "Autumn Vegetable Quinoa Salad",
    "description": "A hearty and flavorful vegetarian lunch that celebrates the bounty of fall produce.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/61a2da03-c29e-4add-95f9-7639944048e9/autumn-vegetable-quinoa-salad-1760132400763.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "e3f64a3c-0b9a-44f8-810a-d6090e9e36e5",
    "name": "Autumn Harvest Vegetable Stir-Fry",
    "description": "A delicious and nutritious vegetarian stir-fry featuring seasonal fall produce, grains, and a creamy dairy-based sauce.",
    "prep_time": 20,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e3f64a3c-0b9a-44f8-810a-d6090e9e36e5/autumn-harvest-vegetable-stir-fry-1760132372607.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "5549695f-47d5-448a-8ebe-753c5bff8ade",
    "name": "Fall Vegetable Frittata",
    "description": "A delicious and nutritious vegetarian breakfast frittata featuring seasonal fall produce.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/5549695f-47d5-448a-8ebe-753c5bff8ade/fall-vegetable-frittata-1760179303856.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 30,
      "fiber": 5,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "74d7979f-991b-4000-a83a-bd83df57d22e",
    "name": "Autumn Oat and Fruit Parfait",
    "description": "A delicious and nutritious vegetarian breakfast parfait featuring seasonal fall fruits, creamy yogurt, and crunchy oats.",
    "prep_time": 15,
    "cook_time": 5,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/74d7979f-991b-4000-a83a-bd83df57d22e/autumn-oat-and-fruit-parfait-1760177783401.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 50,
      "fiber": 6,
      "protein": 20,
      "calories": 340
    }
  },
  {
    "id": "0c02496a-8b2b-4a6c-bdbf-a89432385357",
    "name": "Autumn Vegetable Hash with Poached Eggs",
    "description": "A hearty and nutritious breakfast featuring roasted fall vegetables, fluffy eggs, and a touch of creamy dairy.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/0c02496a-8b2b-4a6c-bdbf-a89432385357/autumn-vegetable-hash-with-poached-eggs-1760177363459.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "400bc42d-1841-4961-a2b4-a8663fb177b7",
    "name": "Autumn Vegetable Quinoa Casserole",
    "description": "A hearty and nourishing vegetarian dinner featuring seasonal fall produce, protein-rich quinoa, and a creamy dairy-based sauce.",
    "prep_time": 25,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/400bc42d-1841-4961-a2b4-a8663fb177b7/autumn-vegetable-quinoa-casserole-1760176705970.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 12,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 360
    }
  },
  {
    "id": "52322858-cd4a-4435-a602-f62cff01700f",
    "name": "Autumn Vegetable Stir-Fry with Quinoa",
    "description": "A delicious and nutritious vegetarian lunch featuring seasonal fall produce and protein-packed quinoa.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/52322858-cd4a-4435-a602-f62cff01700f/autumn-vegetable-stir-fry-with-quinoa-1760176498707.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 320
    }
  },
  {
    "id": "d347e31a-7549-4c80-9013-f7f69b5c1a95",
    "name": "Autumn Vegetable Risotto",
    "description": "A creamy, comforting risotto featuring seasonal vegetables and warming spices, perfect for a cozy fall dinner.",
    "prep_time": 15,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/d347e31a-7549-4c80-9013-f7f69b5c1a95/autumn-vegetable-risotto-1760138694416.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 6,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "49ab9673-52ce-426b-8388-8199b6467faa",
    "name": "Autumn Vegetable Harvest Bowl",
    "description": "A nourishing and colorful vegetarian lunch bowl featuring seasonal fall produce, whole grains, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/49ab9673-52ce-426b-8388-8199b6467faa/autumn-vegetable-harvest-bowl-1760137880158.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 10,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "781e1c72-dddc-4c72-a2e3-33a23baa7d3d",
    "name": "Autumn Oat and Fruit Breakfast Bowl",
    "description": "A nourishing and delicious vegetarian breakfast featuring seasonal fall produce, creamy oats, and a touch of sweetness.",
    "prep_time": 15,
    "cook_time": 10,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/781e1c72-dddc-4c72-a2e3-33a23baa7d3d/autumn-oat-and-fruit-breakfast-bowl-1760138020473.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 50,
      "fiber": 8,
      "protein": 10,
      "calories": 350
    }
  },
  {
    "id": "b80cd17b-8d63-4ed3-b615-c4f6040e27f6",
    "name": "Autumn Vegetable Lasagna",
    "description": "A hearty and comforting vegetarian lasagna featuring seasonal fall vegetables, creamy ricotta, and a flavorful tomato sauce.",
    "prep_time": 30,
    "cook_time": 40,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/b80cd17b-8d63-4ed3-b615-c4f6040e27f6/autumn-vegetable-lasagna-1760137276602.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 15,
      "carbs": 45,
      "fiber": 7,
      "protein": 20,
      "calories": 375
    }
  },
  {
    "id": "041c96f8-e331-4ba3-9e30-25af7ba86f3f",
    "name": "Autumn Harvest Vegetable Fritters",
    "description": "Crispy, golden vegetable fritters made with a mix of seasonal produce and whole grains, perfect for a nourishing snack.",
    "prep_time": 10,
    "cook_time": 15,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/041c96f8-e331-4ba3-9e30-25af7ba86f3f/autumn-harvest-vegetable-fritters-1760137247928.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 10,
      "carbs": 40,
      "fiber": 5,
      "protein": 10,
      "calories": 280
    }
  },
  {
    "id": "8d562526-38a6-42ed-9a14-fb3fd6a9e897",
    "name": "Autumn Vegetable Quiche",
    "description": "A delicious and nutritious vegetarian quiche featuring seasonal fall vegetables, eggs, and a flaky crust.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/8d562526-38a6-42ed-9a14-fb3fd6a9e897/autumn-vegetable-quiche-1760136842089.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "926e04a3-8e63-48fc-abf6-111f6f44569f",
    "name": "Autumn Oat and Fruit Bake",
    "description": "A delicious and nutritious vegetarian breakfast bake featuring seasonal fall fruits and oats.",
    "prep_time": 20,
    "cook_time": 30,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/926e04a3-8e63-48fc-abf6-111f6f44569f/autumn-oat-and-fruit-bake-1760136474013.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 7,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "61f6671d-bf04-4a1f-b344-add9275f72af",
    "name": "Autumn Harvest Vegetable Casserole",
    "description": "A delicious and nutritious vegetarian casserole featuring seasonal fall produce, whole grains, and dairy for a balanced and satisfying dinner.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/61f6671d-bf04-4a1f-b344-add9275f72af/autumn-harvest-vegetable-casserole-1760136401414.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "fdf724b0-14ba-46d2-b9b8-c0077d9cd1d2",
    "name": "Autumn Harvest Veggie Medley",
    "description": "A delightful vegetarian snack featuring a colorful blend of seasonal fall produce, grains, and dairy.",
    "prep_time": 10,
    "cook_time": 0,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/fdf724b0-14ba-46d2-b9b8-c0077d9cd1d2/autumn-harvest-veggie-medley-1760136379486.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 8,
      "carbs": 35,
      "fiber": 5,
      "protein": 10,
      "calories": 225
    }
  },
  {
    "id": "e07d0284-6f96-4932-9f84-d55c0d23c06c",
    "name": "Autumn Harvest Vegetable Medley",
    "description": "A nourishing and delicious vegetarian lunch featuring a colorful array of seasonal produce, whole grains, and a touch of dairy.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e07d0284-6f96-4932-9f84-d55c0d23c06c/autumn-harvest-vegetable-medley-1760136365975.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  },
  {
    "id": "6daed033-e1dd-4dcb-92d0-8a9b0351905f",
    "name": "Autumn Vegetable Quinoa Bake",
    "description": "A hearty and nutritious vegetarian dinner featuring seasonal fall produce, quinoa, and a creamy cheese sauce.",
    "prep_time": 25,
    "cook_time": 20,
    "servings": 4,
    "difficulty": "medium",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6daed033-e1dd-4dcb-92d0-8a9b0351905f/autumn-vegetable-quinoa-bake-1760136073673.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 9,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 345
    }
  },
  {
    "id": "3c6d5783-fe00-46db-8239-e60af90a3541",
    "name": "Autumn Vegetable Grain Bowl",
    "description": "A nourishing and flavorful vegetarian lunch featuring roasted fall vegetables, quinoa, and a creamy tahini dressing.",
    "prep_time": 20,
    "cook_time": 25,
    "servings": 4,
    "difficulty": "easy",
    "image_url": "https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/3c6d5783-fe00-46db-8239-e60af90a3541/autumn-vegetable-grain-bowl-1760136058833.png",
    "diet_plan_names": [
      {
        "name": "Vegetarian",
        "slug": "vegetarian"
      }
    ],
    "recipe_nutrition": {
      "fat": 30,
      "carbs": 50,
      "fiber": 8,
      "protein": 20,
      "calories": 350
    }
  }
]

export const dietPlans = [
  {
    "id": "f149af29-ae72-4573-a8fe-8ff9948b438a",
    "name": "Keto Diet",
    "slug": "keto"
  },
  {
    "id": "7dfc0523-df8a-4822-996c-e4fdda87bd53",
    "name": "Mediterranean Diet",
    "slug": "mediterranean"
  },
  {
    "id": "4a652d5b-837b-43ee-90b7-6dded56e71c0",
    "name": "Paleo",
    "slug": "paleo"
  },
  {
    "id": "fffb9085-59d4-40a5-825d-7c702600cca4",
    "name": "Vegan",
    "slug": "vegan"
  },
  {
    "id": "6907db7c-75f0-4e7a-86b1-3fde4b1154c1",
    "name": "Vegetarian",
    "slug": "vegetarian"
  }
]
