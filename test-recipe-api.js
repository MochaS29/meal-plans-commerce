const fetch = require('node-fetch');

async function testRecipeAPI() {
  // Test meal plan recipe names
  const testRecipes = [
    "Whole Grain Toast with Avocado and Feta",
    "Spanakopita with Greek Salad", 
    "Grilled Lemon Herb Salmon"
  ];

  // Recipe mappings from the code
  const recipeMapping = {
    "Whole Grain Toast with Avocado and Feta": "Mediterranean Quinoa and Egg Breakfast Bowl",
    "Spanakopita with Greek Salad": "Mediterranean Roasted Vegetable and Feta Salad",
    "Grilled Lemon Herb Salmon": "Mediterranean Salmon and Quinoa Salad"
  };

  for (const recipeName of testRecipes) {
    const mappedName = recipeMapping[recipeName] || recipeName;
    console.log(`\n=== Testing: ${recipeName} ===`);
    console.log(`Mapped to: ${mappedName}`);
    
    try {
      const response = await fetch(`http://localhost:3006/api/recipes/by-name/${encodeURIComponent(mappedName)}`);
      console.log(`Response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Recipe found:`, {
          name: data.name,
          id: data.id,
          hasIngredients: !!data.recipe_ingredients?.length,
          hasInstructions: !!data.recipe_instructions?.length,
          placeholder: data.placeholder
        });
      } else {
        const error = await response.text();
        console.log(`Error response: ${error}`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  }
}

testRecipeAPI();