import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface MealPlan {
  menuType: string;
  month: number;
  year: number;
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
      'Generated from meal-plans.mochasmindlab.com',
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: 'center' }
    );
  }

  private async fetchRecipeDetails(recipeName: string): Promise<RecipeDetails | null> {
    try {
      // Import and use Supabase directly for server-side access
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      // First try to get ALL recipes and match them intelligently
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
        console.log(`Searching ${allRecipes.length} recipes for best match to: "${recipeName}"`);
        
        // Find the best match using comprehensive scoring
        const bestMatch = this.findBestMatchFromAll(recipeName, allRecipes);
        if (bestMatch && bestMatch.score > 0) {
          console.log(`Found match: "${bestMatch.name}" (score: ${bestMatch.score}) for "${recipeName}"`);
          return bestMatch;
        }
      }

      // Fallback: Multi-tier search strategy if comprehensive matching fails
      const searchStrategies = [
        // Strategy 1: Exact match
        recipeName,
        
        // Strategy 2: Remove common words and search by key ingredients
        this.extractKeyIngredients(recipeName),
        
        // Strategy 3: Search by meal type keywords
        this.extractMealType(recipeName),
        
        // Strategy 4: Broad category search
        this.extractBroadCategory(recipeName)
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
          console.log(`Found ${recipes.length} recipes for "${recipeName}" using search term: "${searchTerm}"`);
          
          // Try to find the best match by scoring similarity
          const bestMatch = this.findBestMatch(recipeName, recipes);
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

    // Cover Page
    this.drawHeader(
      this.formatMenuType(mealPlan.menuType),
      `${this.getMonthName(mealPlan.month)} ${mealPlan.year} Meal Plan with Full Recipes`
    );

    // User info if provided
    if (userInfo?.name) {
      this.currentY = 45;
      this.doc.setFontSize(14);
      this.doc.text(`Prepared for: ${userInfo.name}`, this.margins.left, this.currentY);
      this.currentY += 10;
    }

    // Plan Overview Section
    this.currentY = 60;
    this.doc.setFontSize(16);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Your Complete Meal Plan', this.margins.left, this.currentY);
    this.currentY += 10;

    // Nutrition Targets Box
    this.doc.setFillColor(245, 245, 245);
    this.doc.roundedRect(this.margins.left, this.currentY, this.pageWidth - 40, 40, 5, 5, 'F');

    this.doc.setFontSize(12);
    this.doc.setFont('helvetica', 'normal');
    this.currentY += 10;

    if (mealPlan.nutritionTargets) {
      this.doc.text(`Daily Calories: ${mealPlan.nutritionTargets.dailyCalories}`, this.margins.left + 10, this.currentY);
      this.currentY += 8;
      this.doc.text(`Protein: ${mealPlan.nutritionTargets.proteinGrams}g daily`, this.margins.left + 10, this.currentY);
      this.currentY += 8;
      if (mealPlan.nutritionTargets.fiberGrams) {
        this.doc.text(`Fiber: ${mealPlan.nutritionTargets.fiberGrams}g daily`, this.margins.left + 10, this.currentY);
      }
    }

    this.drawFooter(pageNum++);

    // Weekly Calendar Pages with Full Recipes
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Week 1 Recipes & Shopping List', this.margins.left, this.currentY);
    this.currentY += 15;

    // Collect unique recipes for Week 1 only (days 1-7)
    // Use database recipe ID as primary key for deduplication
    const uniqueRecipes = new Map<string, {recipe: any, firstOccurrence: {day: number, meal: string}, mealPlanName: string}>();
    
    // Process only the first week (days 1-7)
    for (let day = 1; day <= 7; day++) {
      const dayMeals = mealPlan.dailyMeals[`day_${day}`] || mealPlan.dailyMeals[day.toString()];
      
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

    // Shopping Lists Section
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Week 1 Shopping List', this.margins.left, this.currentY);
    this.currentY += 15;

    // Show only Week 1 shopping list
    if (mealPlan.weeklyShoppingLists?.week1 || mealPlan.weeklyShoppingLists?.week_1) {
      const week1List = mealPlan.weeklyShoppingLists.week1 || mealPlan.weeklyShoppingLists.week_1;

      // Shopping list categories
      const categories = ['produce', 'proteins', 'pantry', 'dairy', 'herbs'];

      for (const category of categories) {
        if (week1List[category]) {
          this.doc.setFontSize(12);
          this.doc.setFont('helvetica', 'bold');
          this.doc.setFillColor(245, 245, 245);
          this.doc.rect(this.margins.left, this.currentY - 5, this.pageWidth - 40, 8, 'F');
          this.doc.text(this.capitalizeFirst(category), this.margins.left + 2, this.currentY);
          this.currentY += 8;

          this.doc.setFont('helvetica', 'normal');
          this.doc.setFontSize(10);

          const items = week1List[category];
          if (Array.isArray(items)) {
            items.forEach(item => {
              if (typeof item === 'string') {
                this.doc.text(`• ${item}`, this.margins.left + 5, this.currentY);
              } else if (item.item) {
                const costText = item.estimatedCost ? ` - ${item.estimatedCost}` : '';
                this.doc.text(`• ${item.item}: ${item.quantity}${costText}`, this.margins.left + 5, this.currentY);
              }
              this.currentY += 6;
            });
          }
          this.currentY += 5;
        }
      }

      // Add estimated cost if available
      if (week1List.estimatedCost || week1List.totalEstimatedCost) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.setFontSize(12);
        this.doc.text(
          `Estimated Weekly Cost: ${week1List.estimatedCost || week1List.totalEstimatedCost}`,
          this.margins.left,
          this.currentY
        );
        this.currentY += 10;
      }
    }

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