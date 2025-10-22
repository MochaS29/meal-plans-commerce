import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ChefHat } from 'lucide-react'

// Static featured recipes data - loaded instantly, no API calls
// Organized by diet type to showcase variety
const featuredRecipesByDiet = {
  keto: {
    name: 'Keto Diet',
    slug: 'keto',
    description: 'High-fat, low-carb recipes',
    recipe: {
      id: 'f3f0c826-fb9b-4aa1-a594-e0ff235b3c53',
      name: 'Baked Avocado Eggs',
      description: 'A delicious and satisfying keto-friendly meal that combines creamy avocado with baked eggs for a nutrient-dense experience.',
      prepTime: 15,
      cookTime: 15,
      servings: 4,
      difficulty: 'medium',
      imageUrl: 'https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/f3f0c826-fb9b-4aa1-a594-e0ff235b3c53/baked-avocado-eggs-1760032381982.png',
      imageAlt: 'Baked Avocado Eggs'
    }
  },
  mediterranean: {
    name: 'Mediterranean Diet',
    slug: 'mediterranean',
    description: 'Heart-healthy Mediterranean cuisine',
    recipe: {
      id: '6a402e05-2612-4bae-9142-430314baeaad',
      name: 'Mediterranean Quinoa Bowl',
      description: 'A nourishing and flavorful bowl featuring quinoa, roasted vegetables, and a Mediterranean-inspired dressing.',
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      difficulty: 'medium',
      imageUrl: 'https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/6a402e05-2612-4bae-9142-430314baeaad/mediterranean-quinoa-breakfast-bowl-1760032592283.png',
      imageAlt: 'Mediterranean Quinoa Bowl'
    }
  },
  paleo: {
    name: 'Paleo',
    slug: 'paleo',
    description: 'Whole foods, naturally nutritious',
    recipe: {
      id: '624cd3fd-9e78-4d4b-9e69-c74dfc16783c',
      name: 'Paleo Baked Salmon and Roasted Veggies',
      description: 'A delicious and nutritious paleo-friendly meal featuring baked salmon, roasted winter vegetables, and a touch of lemon and herbs.',
      prepTime: 20,
      cookTime: 25,
      servings: 4,
      difficulty: 'easy',
      imageUrl: 'https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/624cd3fd-9e78-4d4b-9e69-c74dfc16783c/paleo-baked-salmon-and-roasted-veggies-1760131543679.png',
      imageAlt: 'Paleo Baked Salmon and Roasted Veggies'
    }
  },
  vegan: {
    name: 'Vegan',
    slug: 'vegan',
    description: 'Plant-based, 100% cruelty-free',
    recipe: {
      id: '48e9ad99-32f8-46d5-b98e-67343ff7f882',
      name: 'Winter Lentil and Quinoa Stew',
      description: 'A hearty and nourishing vegan stew featuring plant-based proteins, seasonal vegetables, and whole grains.',
      prepTime: 15,
      cookTime: 30,
      servings: 4,
      difficulty: 'medium',
      imageUrl: 'https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/48e9ad99-32f8-46d5-b98e-67343ff7f882/winter-lentil-and-quinoa-stew-1760132768563.png',
      imageAlt: 'Winter Lentil and Quinoa Stew'
    }
  },
  vegetarian: {
    name: 'Vegetarian',
    slug: 'vegetarian',
    description: 'Delicious meatless meals',
    recipe: {
      id: 'e3f64a3c-0b9a-44f8-810a-d6090e9e36e5',
      name: 'Autumn Harvest Vegetable Stir-Fry',
      description: 'A delicious and nutritious vegetarian stir-fry featuring seasonal fall produce, grains, and a creamy dairy-based sauce.',
      prepTime: 20,
      cookTime: 20,
      servings: 4,
      difficulty: 'medium',
      imageUrl: 'https://rnvowqoqqcrimrybuiea.supabase.co/storage/v1/object/public/recipe-images/recipes/e3f64a3c-0b9a-44f8-810a-d6090e9e36e5/autumn-harvest-vegetable-stir-fry-1760132372607.png',
      imageAlt: 'Autumn Harvest Vegetable Stir-Fry'
    }
  }
}

function DietCard({ diet, dietInfo }: { diet: string; dietInfo: typeof featuredRecipesByDiet.keto }) {
  const { recipe } = dietInfo
  const totalTime = recipe.prepTime + recipe.cookTime

  return (
    <div className="group">
      {/* Diet Type Header */}
      <div className="mb-3">
        <h3 className="text-xl font-bold text-gray-900">{dietInfo.name}</h3>
        <p className="text-sm text-gray-600">{dietInfo.description}</p>
      </div>

      {/* Recipe Card */}
      <Link href={`/recipes/${recipe.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-xl">
          <div className="relative h-56 w-full">
            <Image
              src={recipe.imageUrl}
              alt={recipe.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          <div className="p-5">
            <h4 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {recipe.name}
            </h4>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {recipe.description}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalTime} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{recipe.servings}</span>
              </div>
              <div className="flex items-center gap-1">
                <ChefHat className="w-4 h-4" />
                <span className="capitalize">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function RecipesShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-bold mb-3">
            Featured Recipes
          </h1>
          <p className="text-xl opacity-90">
            Explore unique, delicious meals from 5 popular diet types
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {Object.entries(featuredRecipesByDiet).map(([key, dietInfo]) => (
            <DietCard key={key} diet={key} dietInfo={dietInfo} />
          ))}
        </div>

        {/* Diet Types Overview */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Available Diet Types
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(featuredRecipesByDiet).map(([key, dietInfo]) => (
              <Link
                key={key}
                href={`/recipes?diet=${dietInfo.slug}`}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
              >
                <h3 className="font-semibold text-gray-900">{dietInfo.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{dietInfo.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">591+</div>
            <div className="text-gray-600">Unique Recipes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">5</div>
            <div className="text-gray-600">Diet Types</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">AI Generated</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Explore More?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Browse our complete collection of 591+ unique recipes across 5 different diet types.
            Find the perfect meal for any occasion!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recipes"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              View All Recipes
            </Link>
            <Link
              href="/diet-plans"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Diet Plans
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
