import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface MealPlan {
  menuType: string;
  month: number;
  year: number;
  title?: string;
  dailyMeals: any;
  weeklyShoppingLists: any;
  nutritionTargets: any;
  mealPrepGuides: any;
}

interface RecipeDetails {
  id?: string;
  name: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  recipe_ingredients?: any[];
  recipe_instructions?: any[];
  recipe_nutrition?: any[];
}

export class EnhancedMealPlanPDFGenerator {
  private doc: jsPDF;
  private pageHeight: number;
  private pageWidth: number;
  private margins = { top: 40, bottom: 30, left: 20, right: 20 };
  private currentY: number;
  
  // Recipe mapping from meal plan names to database recipe names
  private recipeMapping: { [key: string]: string } = {
    // Breakfast recipes
    "Overnight Oats with Greek Yogurt": "Satiating Pumpkin Spice Overnight Oats",
    "Whole Grain Toast with Avocado and Feta": "Mediterranean Quinoa and Egg Breakfast Bowl", 
    "Turkish Breakfast Platter": "Turkish Menemen",
    "Mediterranean Egg Bites": "Mediterranean Shakshuka",
    "Greek Yogurt Parfait with Honey": "Autumn Protein-Packed Oatmeal Bowl",
    "Shakshuka with Whole Grain Pita": "Mediterranean Shakshuka",
    "Mediterranean Smoothie Bowl": "Pumpkin Pie Smoothie Bowl",
    "Mediterranean Omelet": "Turkish Menemen: Eggs in Tomato Sauce",
    "Ricotta Pancakes with Berry Compote": "Autumn Protein-Packed Oatmeal Bowl",
    
    // Lunch recipes  
    "Spanakopita with Greek Salad": "Mediterranean Roasted Vegetable and Feta Salad",
    "Mediterranean Chickpea Salad": "Mediterranean Chickpea Salad",
    "Greek Lentil Soup": "Moroccan Harira Lentil Soup with Poached Eggs",
    "Falafel Wrap with Tahini": "Mediterranean Baked Falafel Bites",
    "Stuffed Bell Peppers": "Mediterranean Quinoa Stuffed Peppers",
    "Greek Orzo Salad": "Mediterranean Chickpea and Quinoa Salad",
    "Mediterranean Quinoa Bowl": "Mediterranean Quinoa and Egg Breakfast Bowl",
    "Mediterranean Tuna Salad": "Mediterranean Tuna and Chickpea Salad",
    "Mezze Platter with Hummus": "Middle Eastern Hummus Platter",
    "Tabbouleh with Grilled Halloumi": "Mediterranean Roasted Vegetable and Feta Salad",
    
    // Dinner recipes
    "Grilled Lemon Herb Salmon": "Mediterranean Salmon and Quinoa Salad",
    "Ratatouille with Grilled Chicken": "Mediterranean Roasted Vegetable Medley",
    "Mediterranean Baked Fish": "Mediterranean Baked Feta with Roasted Vegetables",
    "Moussaka": "Mediterranean Quinoa Stuffed Peppers",
    "Chicken Souvlaki with Tzatziki": "Moroccan Spiced Chicken Tagine",
    "Grilled Vegetable and Halloumi Skewers": "Mediterranean Roasted Vegetable and Feta Salad",
    "Seafood Paella": "Mediterranean Salmon and Quinoa Salad",
    "Baked Cod with Tomatoes and Olives": "Mediterranean Baked Feta with Roasted Vegetables",
    "Chicken Tagine with Couscous": "Moroccan Tagine with Chicken and Seasonal Vegetables",
    "Lamb Kofta with Mint Yogurt": "Moroccan Lamb Tagine with Roasted Vegetables"
  };

  constructor() {
    this.doc = new jsPDF('p', 'mm', 'a4');
    this.pageHeight = this.doc.internal.pageSize.height;
    this.pageWidth = this.doc.internal.pageSize.width;
    this.currentY = this.margins.top;
  }

  private addNewPageIfNeeded(requiredSpace: number = 30) {
    if (this.currentY + requiredSpace > this.pageHeight - this.margins.bottom) {
      this.doc.addPage();
      this.currentY = this.margins.top;
      return true;
    }
    return false;
  }

  private drawHeader(title: string, subtitle: string) {
    // Add gradient-like header background
    this.doc.setFillColor(0, 150, 136); // Teal
    this.doc.rect(0, 0, this.pageWidth, 35, 'F');

    // Add title
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(title, this.pageWidth / 2, 15, { align: 'center' });

    // Add subtitle
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(subtitle, this.pageWidth / 2, 25, { align: 'center' });

    // Reset text color
    this.doc.setTextColor(0, 0, 0);
  }

  private drawFooter(pageNum: number) {
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(
      `Page ${pageNum} | Mocha's MindLab © ${new Date().getFullYear()}`,
      this.pageWidth / 2,
      this.pageHeight - 15,
      { align: 'center' }
    );
    this.doc.text(
      'Generated from mindfulmealplan.com',
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: 'center' }
    );
  }

  private async fetchRecipeDetails(recipeName: string): Promise<RecipeDetails | null> {
    try {
      // Use recipe mapping to find the correct database recipe name
      const mappedRecipeName = this.recipeMapping[recipeName] || recipeName;
      console.log(`PDF: Fetching recipe for "${recipeName}" -> mapped to: "${mappedRecipeName}"`);
      
      // Import and use Supabase directly for server-side access
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // First try exact match with mapped name
      const { data: exactMatch, error: exactError } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (*),
          recipe_instructions (*),
          recipe_nutrition (*)
        `)
        .eq('name', mappedRecipeName)
        .single();

      if (!exactError && exactMatch) {
        console.log(`PDF: Found exact match for "${mappedRecipeName}"`);
        return exactMatch;
      }

      // Fallback: get ALL recipes and match them intelligently
      const { data: allRecipes, error: allError } = await supabase
        .from('recipes')
        .select(`
          *,
          recipe_ingredients (*),
          recipe_instructions (*),
          recipe_nutrition (*)
        `)
        .order('created_at', { ascending: false });

      if (!allError && allRecipes && allRecipes.length > 0) {
        console.log(`Searching ${allRecipes.length} recipes for best match to: "${mappedRecipeName}"`);
        
        // Find the best match using comprehensive scoring with mapped name
        const bestMatch = this.findBestMatchFromAll(mappedRecipeName, allRecipes);
        if (bestMatch && bestMatch.score > 0) {
          console.log(`Found match: "${bestMatch.name}" (score: ${bestMatch.score}) for "${mappedRecipeName}"`);
          return bestMatch;
        }
      }

      // Fallback: Multi-tier search strategy if comprehensive matching fails
      const searchStrategies = [
        // Strategy 1: Exact match with mapped name
        mappedRecipeName,
        
        // Strategy 2: Remove common words and search by key ingredients
        this.extractKeyIngredients(mappedRecipeName),
        
        // Strategy 3: Search by meal type keywords
        this.extractMealType(mappedRecipeName),
        
        // Strategy 4: Broad category search
        this.extractBroadCategory(mappedRecipeName)
      ].filter(Boolean);

      for (const searchTerm of searchStrategies) {
        const { data: recipes, error } = await supabase
          .from('recipes')
          .select(`
            *,
            recipe_ingredients (*),
            recipe_instructions (*),
            recipe_nutrition (*)
          `)
          .ilike('name', `%${searchTerm}%`)
          .order('created_at', { ascending: false })
          .limit(5);

        if (!error && recipes && recipes.length > 0) {
          console.log(`Found ${recipes.length} recipes for "${mappedRecipeName}" using search term: "${searchTerm}"`);
          
          // Try to find the best match by scoring similarity
          const bestMatch = this.findBestMatch(mappedRecipeName, recipes);
          if (bestMatch) {
            return bestMatch;
          }
        }
      }

      console.log(`No recipes found for: ${recipeName}`);
      return null;
    } catch (error) {
      console.error(`Error fetching recipe ${recipeName}:`, error);
    }
    return null;
  }

  private extractKeyIngredients(recipeName: string): string {
    // Extract key cooking ingredients/proteins
    const keyWords = ['salmon', 'chicken', 'fish', 'chickpea', 'lentil', 'tofu', 'beef', 'pork', 'turkey', 'tuna', 'shrimp', 'pasta', 'quinoa', 'rice', 'oats', 'yogurt'];
    const words = recipeName.toLowerCase().split(/\s+/);
    const found = words.find(word => keyWords.some(key => word.includes(key) || key.includes(word)));
    return found || '';
  }

  private extractMealType(recipeName: string): string {
    // Extract cooking method or dish type
    const mealTypes = ['grilled', 'baked', 'roasted', 'soup', 'salad', 'stir', 'curry', 'stew', 'pasta', 'toast', 'overnight', 'smoothie'];
    const words = recipeName.toLowerCase().split(/\s+/);
    const found = words.find(word => mealTypes.some(type => word.includes(type) || type.includes(word)));
    return found || '';
  }

  private extractBroadCategory(recipeName: string): string {
    // Fallback to broad Mediterranean categories
    if (recipeName.toLowerCase().includes('breakfast') || recipeName.toLowerCase().includes('oats') || recipeName.toLowerCase().includes('toast')) {
      return 'breakfast';
    }
    if (recipeName.toLowerCase().includes('salad') || recipeName.toLowerCase().includes('chickpea')) {
      return 'mediterranean';
    }
    if (recipeName.toLowerCase().includes('fish') || recipeName.toLowerCase().includes('salmon')) {
      return 'fish';
    }
    return 'mediterranean';
  }

  private findBestMatchFromAll(originalName: string, recipes: any[]): any {
    // Enhanced scoring for comprehensive matching
    const scoredRecipes = recipes.map(recipe => ({
      ...recipe,
      score: this.calculateAdvancedSimilarityScore(originalName, recipe.name, recipe.recipe_ingredients)
    }));

    // Sort by score (highest first) and return the best match if score is above threshold
    scoredRecipes.sort((a, b) => b.score - a.score);
    const bestMatch = scoredRecipes[0];
    
    // Only return if we have a reasonable match (score > 1)
    return bestMatch && bestMatch.score > 1 ? bestMatch : null;
  }

  private findBestMatch(originalName: string, recipes: any[]): any {
    // Score recipes based on name similarity and return the best match
    const scoredRecipes = recipes.map(recipe => ({
      ...recipe,
      score: this.calculateSimilarityScore(originalName, recipe.name)
    }));

    // Sort by score (highest first) and return the best match
    scoredRecipes.sort((a, b) => b.score - a.score);
    return scoredRecipes[0];
  }

  private calculateAdvancedSimilarityScore(original: string, candidate: string, ingredients: any[]): number {
    const originalLower = original.toLowerCase();
    const candidateLower = candidate.toLowerCase();
    const originalWords = originalLower.split(/\s+/);
    const candidateWords = candidateLower.split(/\s+/);
    
    let score = 0;
    
    // 1. Direct word matching (high value)
    for (const word of originalWords) {
      if (word.length > 2) { // Ignore short words like "and", "of", etc.
        if (candidateWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
          score += 3;
        }
      }
    }
    
    // 2. Key ingredient matching (very high value)
    const keyIngredients = ['avocado', 'feta', 'oats', 'yogurt', 'chicken', 'salmon', 'quinoa', 'chickpea', 'lentil', 'beef', 'lamb', 'egg', 'spinach', 'toast'];
    for (const ingredient of keyIngredients) {
      if (originalLower.includes(ingredient)) {
        if (candidateLower.includes(ingredient)) {
          score += 5; // Exact ingredient match
        } else if (ingredients?.some((ing: any) => ing.ingredient?.toLowerCase().includes(ingredient))) {
          score += 4; // Ingredient in recipe ingredients
        }
      }
    }
    
    // 3. Cuisine type matching
    const cuisineTypes = ['mediterranean', 'greek', 'moroccan', 'turkish', 'italian', 'spanish'];
    for (const cuisine of cuisineTypes) {
      if (originalLower.includes(cuisine) && candidateLower.includes(cuisine)) {
        score += 2;
      }
    }
    
    // 4. Cooking method matching
    const cookingMethods = ['grilled', 'roasted', 'baked', 'fried', 'sauteed', 'overnight', 'poached'];
    for (const method of cookingMethods) {
      if (originalLower.includes(method) && candidateLower.includes(method)) {
        score += 2;
      }
    }
    
    // 5. Food category matching
    if (originalLower.includes('salad') && candidateLower.includes('salad')) score += 3;
    if (originalLower.includes('soup') && candidateLower.includes('soup')) score += 3;
    if (originalLower.includes('toast') && candidateLower.includes('toast')) score += 3;
    if (originalLower.includes('bowl') && candidateLower.includes('bowl')) score += 2;
    if (originalLower.includes('platter') && candidateLower.includes('platter')) score += 2;
    
    return score;
  }

  private calculateSimilarityScore(original: string, candidate: string): number {
    const originalWords = original.toLowerCase().split(/\s+/);
    const candidateWords = candidate.toLowerCase().split(/\s+/);
    
    let score = 0;
    
    // Award points for matching words
    for (const word of originalWords) {
      if (candidateWords.some(cWord => cWord.includes(word) || word.includes(cWord))) {
        score += 1;
      }
    }
    
    // Bonus for matching key ingredients
    const keyIngredient = this.extractKeyIngredients(original);
    if (keyIngredient && candidate.toLowerCase().includes(keyIngredient)) {
      score += 2;
    }
    
    return score;
  }

  private addRecipeToPage(recipe: RecipeDetails, day: number, meal: string, mealPlan?: MealPlan) {
    this.addNewPageIfNeeded(80);

    // Recipe header
    this.doc.setFillColor(0, 150, 136);
    this.doc.rect(this.margins.left, this.currentY, this.pageWidth - 40, 10, 'F');
    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    
    // Show where this recipe appears in the meal plan
    let occurrenceText = `Day ${day} • ${meal}`;
    if (mealPlan) {
      const occurrences = this.findRecipeOccurrences(recipe.name, mealPlan);
      if (occurrences.length > 1) {
        occurrenceText = `Appears on: ${occurrences.map(occ => `Day ${occ.day} ${occ.meal}`).join(', ')}`;
      }
    }
    
    this.doc.text(occurrenceText, this.margins.left + 5, this.currentY + 7);
    this.doc.setTextColor(0, 0, 0);
    this.currentY += 15;

    // Recipe name
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(recipe.name, this.margins.left, this.currentY);
    this.currentY += 10;

    // Recipe info bar
    this.doc.setFontSize(10);
    this.doc.setFont('helvetica', 'normal');
    this.doc.text(`Prep: ${recipe.prep_time}min | Cook: ${recipe.cook_time}min | Serves: ${recipe.servings} | ${recipe.difficulty}`, this.margins.left, this.currentY);
    this.currentY += 10;

    // Nutrition info if available
    if (recipe.recipe_nutrition?.[0]) {
      const nutrition = recipe.recipe_nutrition[0];
      this.doc.setFillColor(240, 250, 240);
      this.doc.rect(this.margins.left, this.currentY, this.pageWidth - 40, 15, 'F');
      this.currentY += 5;
      this.doc.text(`Calories: ${nutrition.calories} | Protein: ${nutrition.protein}g | Carbs: ${nutrition.carbs}g | Fat: ${nutrition.fat}g | Fiber: ${nutrition.fiber}g`, this.margins.left + 5, this.currentY + 5);
      this.currentY += 15;
    }

    this.currentY += 5;

    // Ingredients section
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Ingredients:', this.margins.left, this.currentY);
    this.currentY += 8;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);

    if (recipe.recipe_ingredients) {
      recipe.recipe_ingredients.forEach((ingredient: any) => {
        this.addNewPageIfNeeded(8);
        const ingredientText = `• ${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient}`;
        this.doc.text(ingredientText, this.margins.left + 5, this.currentY);
        this.currentY += 6;
      });
    }

    this.currentY += 5;

    // Instructions section
    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Instructions:', this.margins.left, this.currentY);
    this.currentY += 8;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);

    if (recipe.recipe_instructions) {
      recipe.recipe_instructions.forEach((instruction: any) => {
        this.addNewPageIfNeeded(15);
        
        // Step number
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${instruction.step_number}.`, this.margins.left + 5, this.currentY);
        
        // Instruction text
        this.doc.setFont('helvetica', 'normal');
        const instructionLines = this.doc.splitTextToSize(instruction.instruction, this.pageWidth - 60);
        let lineY = this.currentY;
        
        instructionLines.forEach((line: string) => {
          this.addNewPageIfNeeded(6);
          this.doc.text(line, this.margins.left + 15, lineY);
          lineY += 5;
        });
        
        this.currentY = lineY + 3;
      });
    }

    this.currentY += 10;
  }

  public async generateMealPlanPDF(mealPlan: MealPlan, userInfo?: { name?: string; email?: string }) {
    let pageNum = 1;

    // Calculate day range first (needed for title page)
    const dayKeys = Object.keys(mealPlan.dailyMeals).filter(key => key.startsWith('day_'));
    const dayNumbers = dayKeys.map(key => parseInt(key.replace('day_', ''))).sort((a, b) => a - b);
    const isWeekly = dayNumbers.length <= 7;

    // Cover Page
    const subtitle = isWeekly && dayNumbers.length > 0
      ? `${this.getMonthName(mealPlan.month)} ${mealPlan.year} - Days ${dayNumbers[0]}-${dayNumbers[dayNumbers.length - 1]} Meal Plan with Full Recipes`
      : `${this.getMonthName(mealPlan.month)} ${mealPlan.year} Meal Plan with Full Recipes`;

    this.drawHeader(
      this.formatMenuType(mealPlan.menuType),
      subtitle
    );

    // User info if provided
    if (userInfo?.name) {
      this.currentY = 45;
      this.doc.setFontSize(14);
      this.doc.text(`Prepared for: ${userInfo.name}`, this.margins.left, this.currentY);
      this.currentY += 15;
    }

    // Draw centered calendar on title page
    this.drawCenteredCalendar(mealPlan, userInfo ? 60 : 45);

    this.drawFooter(pageNum++);

    // Weekly Calendar Pages with Full Recipes
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text(`${this.formatMenuType(mealPlan.menuType)} - ${this.getMonthName(mealPlan.month)} ${mealPlan.year} Recipes`, this.margins.left, this.currentY);
    this.currentY += 15;

    // Collect unique recipes from the meal plan (could be full month or specific week)
    // Use database recipe ID as primary key for deduplication
    const uniqueRecipes = new Map<string, {recipe: any, firstOccurrence: {day: number, meal: string}, mealPlanName: string}>();

    console.log(`Processing ${dayNumbers.length} days: ${dayNumbers.join(', ')}`);

    // Process only the days present in the meal plan
    for (const day of dayNumbers) {
      const dayMeals = mealPlan.dailyMeals[`day_${day}`];

      if (dayMeals) {
        // Process each meal type
        const mealsToProcess = [
          { mealData: dayMeals.breakfast, mealType: 'Breakfast' },
          { mealData: dayMeals.lunch, mealType: 'Lunch' },
          { mealData: dayMeals.dinner, mealType: 'Dinner' }
        ];

        for (const { mealData, mealType } of mealsToProcess) {
          if (mealData?.name) {
            const recipeName = mealData.name.trim();
            
            console.log(`Processing: Day ${day} ${mealType} - "${recipeName}"`);

            const recipe = await this.fetchRecipeDetails(recipeName);
            if (recipe) {
              // Use database recipe ID as the key for deduplication
              const uniqueKey = recipe.id || `fallback_${recipeName}`;
              
              // Check if we already have this database recipe
              if (uniqueRecipes.has(uniqueKey)) {
                console.log(`Skipping duplicate database recipe: "${recipe.name}" (ID: ${recipe.id}) - already included from Day ${uniqueRecipes.get(uniqueKey)?.firstOccurrence.day}`);
                continue;
              }
              
              uniqueRecipes.set(uniqueKey, {
                recipe,
                firstOccurrence: { day, meal: mealType },
                mealPlanName: recipeName
              });
              
              console.log(`Added unique recipe: "${recipeName}" -> "${recipe.name}" (ID: ${recipe.id}) for Day ${day} ${mealType}`);
            } else {
              console.log(`No recipe found for: "${recipeName}"`);
            }
          }
        }
      }
    }

    // Now add each unique recipe to the PDF only once
    console.log(`Found ${uniqueRecipes.size} unique recipes out of total meal plan`);
    
    let recipeCount = 0;
    for (const [uniqueKey, {recipe, firstOccurrence, mealPlanName}] of uniqueRecipes) {
      recipeCount++;
      console.log(`Adding recipe ${recipeCount}: "${recipe.name}" (from meal plan: "${mealPlanName}") - first appears on Day ${firstOccurrence.day} as ${firstOccurrence.meal}`);
      this.addRecipeToPage(recipe, firstOccurrence.day, firstOccurrence.meal, mealPlan);
      
      // Add page break after every 2-3 recipes to avoid overcrowding
      if (recipeCount % 2 === 0) {
        this.drawFooter(pageNum++);
        this.doc.addPage();
        this.currentY = this.margins.top;
      }
    }

    // Shopping Lists Section - Generate from actual recipes
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    const shoppingListTitle = mealPlan.title?.includes('Week')
      ? `${mealPlan.title} Shopping List`
      : `${this.getMonthName(mealPlan.month)} ${mealPlan.year} Shopping List`;
    this.doc.text(shoppingListTitle, this.margins.left, this.currentY);
    this.currentY += 10;

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    const shoppingListDesc = isWeekly
      ? `Generated from recipes for days ${dayNumbers[0]}-${dayNumbers[dayNumbers.length - 1]} (${dayNumbers.length} days)`
      : `Generated from all recipes included in this month's meal plan (${dayNumbers.length} days)`;
    this.doc.text(shoppingListDesc, this.margins.left, this.currentY);
    this.currentY += 15;

    // Generate shopping list from recipe ingredients
    const shoppingList = this.generateShoppingListFromRecipes(uniqueRecipes);
    
    // Display categorized shopping list
    const categories = ['Proteins', 'Vegetables & Produce', 'Pantry & Grains', 'Dairy & Eggs', 'Herbs & Spices', 'Other'];

    for (const category of categories) {
      if (shoppingList[category] && shoppingList[category].length > 0) {
        this.addNewPageIfNeeded(30);
        
        this.doc.setFontSize(12);
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFillColor(245, 245, 245);
        this.doc.rect(this.margins.left, this.currentY - 5, this.pageWidth - 40, 8, 'F');
        this.doc.text(category, this.margins.left + 2, this.currentY);
        this.currentY += 8;

        this.doc.setFont('helvetica', 'normal');
        this.doc.setFontSize(10);

        shoppingList[category].forEach(item => {
          this.addNewPageIfNeeded(6);
          this.doc.text(`• ${item}`, this.margins.left + 5, this.currentY);
          this.currentY += 6;
        });
        this.currentY += 5;
      }
    }

    // Add note about the shopping list
    this.addNewPageIfNeeded(20);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setFontSize(10);
    this.doc.text('Note: This shopping list is generated from the specific recipes in your meal plan.', this.margins.left, this.currentY);
    this.currentY += 6;
    this.doc.text('Quantities may need adjustment based on your household size and existing pantry items.', this.margins.left, this.currentY);

    this.drawFooter(pageNum++);

    // Meal Prep Guide Section
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Weekly Meal Prep Guide', this.margins.left, this.currentY);
    this.currentY += 15;

    // Add meal prep strategies and tips
    this.addMealPrepGuide(mealPlan);

    this.drawFooter(pageNum++);

    // Return the PDF as blob
    return this.doc.output('blob');
  }

  private drawCenteredCalendar(mealPlan: MealPlan, startY: number) {
    // Calculate calendar dimensions (smaller, centered)
    const calendarWidth = 140; // Reduced from full width
    const cellWidth = 20;
    const cellHeight = 16;
    const headerHeight = 12;

    // Get days in month
    const daysInMonth = new Date(mealPlan.year, mealPlan.month, 0).getDate();
    const firstDay = new Date(mealPlan.year, mealPlan.month - 1, 1).getDay();

    // Center the calendar horizontally and vertically
    const calendarX = (this.pageWidth - calendarWidth) / 2;
    const calendarY = startY + (this.pageHeight - startY - this.margins.bottom - (headerHeight + cellHeight * 6)) / 2;

    // Draw month/year title
    this.doc.setFontSize(14);
    this.doc.setFont('helvetica', 'bold');
    const monthYearText = `${this.getMonthName(mealPlan.month)} ${mealPlan.year}`;
    this.doc.text(monthYearText, this.pageWidth / 2, calendarY, { align: 'center' });

    let currentY = calendarY + 10;

    // Draw day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.doc.setFontSize(9);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFillColor(240, 240, 240);
    this.doc.rect(calendarX, currentY, calendarWidth, headerHeight, 'F');

    days.forEach((day, i) => {
      const x = calendarX + (i * cellWidth) + (cellWidth / 2);
      this.doc.text(day, x, currentY + 8, { align: 'center' });
    });

    currentY += headerHeight;

    // Draw calendar grid
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10);

    let dayNum = 1;
    for (let week = 0; week < 6; week++) {
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const x = calendarX + (dayOfWeek * cellWidth);
        const y = currentY;

        // Draw cell border
        this.doc.setDrawColor(200, 200, 200);
        this.doc.rect(x, y, cellWidth, cellHeight);

        // Check if this cell should have a day number
        if ((week === 0 && dayOfWeek >= firstDay) || (week > 0 && dayNum <= daysInMonth)) {
          if (dayNum <= daysInMonth) {
            // Check if this day has meals in the meal plan
            const hasMeals = mealPlan.dailyMeals[`day_${dayNum}`];

            // Highlight days with meals
            if (hasMeals) {
              this.doc.setFillColor(220, 240, 255); // Light blue
              this.doc.rect(x, y, cellWidth, cellHeight, 'F');
              this.doc.rect(x, y, cellWidth, cellHeight); // Redraw border
            }

            // Draw day number
            this.doc.setTextColor(0, 0, 0);
            this.doc.text(dayNum.toString(), x + cellWidth / 2, y + cellHeight / 2 + 2, { align: 'center' });

            dayNum++;
          }
        }
      }
      currentY += cellHeight;

      if (dayNum > daysInMonth) break;
    }

    // Add legend
    currentY += 8;
    this.doc.setFontSize(8);
    this.doc.setFont('helvetica', 'italic');
    this.doc.setTextColor(100, 100, 100);
    this.doc.text('Days with meals are highlighted', this.pageWidth / 2, currentY, { align: 'center' });
  }

  private formatMenuType(menuType: string): string {
    return menuType
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private getMonthName(month: number): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months[month - 1] || 'January';
  }

  private groupMealsByWeek(dailyMeals: any): { [key: string]: number[] } {
    const weeks: { [key: string]: number[] } = {};

    for (let day = 1; day <= 31; day++) {
      const weekNum = Math.ceil(day / 7);
      if (!weeks[weekNum]) {
        weeks[weekNum] = [];
      }
      weeks[weekNum].push(day);
    }

    return weeks;
  }

  private formatWeekName(week: string): string {
    if (week.toLowerCase().includes('week')) {
      return week.charAt(0).toUpperCase() + week.slice(1).replace('_', ' ');
    }
    return `Week ${week}`;
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private generateShoppingListFromRecipes(uniqueRecipes: Map<string, {recipe: any, firstOccurrence: {day: number, meal: string}, mealPlanName: string}>): { [category: string]: string[] } {
    const shoppingList: { [category: string]: Set<string> } = {
      'Proteins': new Set(),
      'Vegetables & Produce': new Set(),
      'Pantry & Grains': new Set(),
      'Dairy & Eggs': new Set(),
      'Herbs & Spices': new Set(),
      'Other': new Set()
    };

    // Categorize ingredients from all recipes
    for (const [_, {recipe}] of uniqueRecipes) {
      if (recipe.recipe_ingredients) {
        recipe.recipe_ingredients.forEach((ingredient: any) => {
          const ingredientName = ingredient.ingredient?.toLowerCase() || '';
          const fullIngredient = `${ingredient.amount} ${ingredient.unit} ${ingredient.ingredient}`;
          
          // Categorize based on ingredient name
          if (this.isProtein(ingredientName)) {
            shoppingList['Proteins'].add(fullIngredient);
          } else if (this.isVegetableProduce(ingredientName)) {
            shoppingList['Vegetables & Produce'].add(fullIngredient);
          } else if (this.isPantryGrain(ingredientName)) {
            shoppingList['Pantry & Grains'].add(fullIngredient);
          } else if (this.isDairyEgg(ingredientName)) {
            shoppingList['Dairy & Eggs'].add(fullIngredient);
          } else if (this.isHerbSpice(ingredientName)) {
            shoppingList['Herbs & Spices'].add(fullIngredient);
          } else {
            shoppingList['Other'].add(fullIngredient);
          }
        });
      }
    }

    // Convert sets to arrays and sort
    const result: { [category: string]: string[] } = {};
    for (const [category, items] of Object.entries(shoppingList)) {
      result[category] = Array.from(items).sort();
    }

    return result;
  }

  private isProtein(ingredient: string): boolean {
    const proteins = ['chicken', 'beef', 'lamb', 'fish', 'salmon', 'tuna', 'shrimp', 'turkey', 'pork', 'tofu', 'tempeh'];
    return proteins.some(protein => ingredient.includes(protein));
  }

  private isVegetableProduce(ingredient: string): boolean {
    const vegetables = ['tomato', 'cucumber', 'pepper', 'onion', 'garlic', 'spinach', 'lettuce', 'carrot', 'celery', 
                       'mushroom', 'zucchini', 'eggplant', 'broccoli', 'cauliflower', 'lemon', 'lime', 'parsley', 
                       'cilantro', 'basil', 'mint', 'dill', 'avocado', 'olive'];
    return vegetables.some(veg => ingredient.includes(veg));
  }

  private isPantryGrain(ingredient: string): boolean {
    const pantry = ['oil', 'vinegar', 'quinoa', 'rice', 'pasta', 'flour', 'sugar', 'salt', 'pepper', 'chickpea', 
                    'lentil', 'bean', 'tahini', 'honey', 'maple', 'can', 'broth', 'stock', 'sauce'];
    return pantry.some(item => ingredient.includes(item));
  }

  private isDairyEgg(ingredient: string): boolean {
    const dairy = ['milk', 'yogurt', 'cheese', 'feta', 'halloumi', 'mozzarella', 'parmesan', 'egg', 'butter', 'cream'];
    return dairy.some(item => ingredient.includes(item));
  }

  private isHerbSpice(ingredient: string): boolean {
    const herbs = ['oregano', 'thyme', 'rosemary', 'cumin', 'paprika', 'cinnamon', 'turmeric', 'ginger', 'bay', 
                   'coriander', 'cardamom', 'nutmeg', 'clove', 'allspice', 'vanilla', 'saffron'];
    return herbs.some(herb => ingredient.includes(herb));
  }

  private findRecipeOccurrences(recipeName: string, mealPlan: MealPlan): {day: number, meal: string}[] {
    const occurrences: {day: number, meal: string}[] = [];
    
    Object.entries(mealPlan.dailyMeals).forEach(([dayKey, dayData]) => {
      const dayNum = parseInt(dayKey.replace('day_', ''));
      
      if ((dayData as any).breakfast?.name === recipeName) {
        occurrences.push({day: dayNum, meal: 'Breakfast'});
      }
      if ((dayData as any).lunch?.name === recipeName) {
        occurrences.push({day: dayNum, meal: 'Lunch'});
      }
      if ((dayData as any).dinner?.name === recipeName) {
        occurrences.push({day: dayNum, meal: 'Dinner'});
      }
    });
    
    return occurrences;
  }

  private addMealPrepGuide(mealPlan: MealPlan) {
    // Mediterranean meal prep strategies
    const mealPrepStrategies = [
      {
        title: "Sunday Prep Day Strategy",
        content: [
          "Wash and chop all vegetables for the week",
          "Cook grains in bulk (quinoa, brown rice, farro)",
          "Prepare protein sources (grill chicken, bake fish)",
          "Make large batches of Mediterranean staples (hummus, tzatziki)",
          "Prep grab-and-go snacks (olives, nuts, fresh fruit)"
        ]
      },
      {
        title: "Storage & Organization",
        content: [
          "Use glass containers for better food preservation",
          "Label everything with dates and contents",
          "Store herbs in water to keep them fresh longer",
          "Keep olive oil, vinegar, and spices easily accessible",
          "Prep mason jar salads for quick lunches"
        ]
      },
      {
        title: "Time-Saving Tips",
        content: [
          "Use a slow cooker for beans and legumes",
          "Freeze portions of soups and stews",
          "Pre-make healthy dressings and marinades",
          "Keep frozen vegetables on hand for quick additions",
          "Batch cook proteins that can be used multiple ways"
        ]
      },
      {
        title: "Daily Prep Strategies",
        content: [
          "Morning: Prep fresh components for dinner",
          "Afternoon: Start slow-cooking items",
          "Evening: Prep breakfast ingredients for next day",
          "Always keep healthy snacks ready",
          "Use weekend time for bigger prep sessions"
        ]
      }
    ];

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    
    const introText = `This guide helps you efficiently prepare your ${this.formatMenuType(mealPlan.menuType)} meals for the week, saving time while maintaining nutrition and flavor.`;
    
    const introLines = this.doc.splitTextToSize(introText, this.pageWidth - 40);
    introLines.forEach((line: string) => {
      this.doc.text(line, this.margins.left, this.currentY);
      this.currentY += 6;
    });
    
    this.currentY += 10;

    // Add each strategy section
    mealPrepStrategies.forEach((strategy, index) => {
      this.addNewPageIfNeeded(50);
      
      // Strategy title
      this.doc.setFillColor(0, 150, 136);
      this.doc.rect(this.margins.left, this.currentY - 5, this.pageWidth - 40, 12, 'F');
      this.doc.setTextColor(255, 255, 255);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFontSize(14);
      this.doc.text(strategy.title, this.margins.left + 5, this.currentY + 3);
      this.doc.setTextColor(0, 0, 0);
      this.currentY += 15;

      // Strategy content
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(11);
      
      strategy.content.forEach(tip => {
        this.addNewPageIfNeeded(8);
        this.doc.text(`• ${tip}`, this.margins.left + 5, this.currentY);
        this.currentY += 7;
      });
      
      this.currentY += 8;
    });

    // Add specific weekly tips based on meal plan
    this.addNewPageIfNeeded(30);
    
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(14);
    this.doc.setFillColor(245, 245, 245);
    this.doc.rect(this.margins.left, this.currentY - 5, this.pageWidth - 40, 12, 'F');
    this.doc.text('This Week\'s Specific Prep Tips', this.margins.left + 5, this.currentY + 3);
    this.currentY += 15;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(11);

    const weeklyTips = [
      "Focus on ingredients that appear multiple times this week",
      "Prep base sauces that work for several recipes",
      "Cook proteins that can be portioned for different meals",
      "Prepare vegetables that store well after cutting",
      "Make extra portions of popular recipes for leftovers"
    ];

    weeklyTips.forEach(tip => {
      this.addNewPageIfNeeded(8);
      this.doc.text(`• ${tip}`, this.margins.left + 5, this.currentY);
      this.currentY += 7;
    });
  }
}