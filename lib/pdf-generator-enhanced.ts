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

      // Multi-tier matching strategy for better recipe variety
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
    this.doc.text('Weekly Meal Calendar with Complete Recipes', this.margins.left, this.currentY);
    this.currentY += 15;

    // Collect all unique recipes from the meal plan to avoid duplicates
    const uniqueRecipes = new Map<string, {recipe: any, firstOccurrence: {day: number, meal: string}}>();
    const weeks = this.groupMealsByWeek(mealPlan.dailyMeals);

    // First, collect all unique recipe names from the meal plan
    for (const [weekNum, days] of Object.entries(weeks)) {
      for (const day of days as number[]) {
        const dayMeals = mealPlan.dailyMeals[`day_${day}`] || mealPlan.dailyMeals[day.toString()];
        
        if (dayMeals) {
          // Collect breakfast
          if (dayMeals.breakfast?.name && !uniqueRecipes.has(dayMeals.breakfast.name)) {
            const recipe = await this.fetchRecipeDetails(dayMeals.breakfast.name);
            if (recipe) {
              uniqueRecipes.set(dayMeals.breakfast.name, {
                recipe,
                firstOccurrence: { day, meal: 'Breakfast' }
              });
            }
          }

          // Collect lunch
          if (dayMeals.lunch?.name && !uniqueRecipes.has(dayMeals.lunch.name)) {
            const recipe = await this.fetchRecipeDetails(dayMeals.lunch.name);
            if (recipe) {
              uniqueRecipes.set(dayMeals.lunch.name, {
                recipe,
                firstOccurrence: { day, meal: 'Lunch' }
              });
            }
          }

          // Collect dinner
          if (dayMeals.dinner?.name && !uniqueRecipes.has(dayMeals.dinner.name)) {
            const recipe = await this.fetchRecipeDetails(dayMeals.dinner.name);
            if (recipe) {
              uniqueRecipes.set(dayMeals.dinner.name, {
                recipe,
                firstOccurrence: { day, meal: 'Dinner' }
              });
            }
          }
        }
      }
    }

    // Now add each unique recipe to the PDF only once
    console.log(`Found ${uniqueRecipes.size} unique recipes out of total meal plan`);
    
    let recipeCount = 0;
    for (const [recipeName, {recipe, firstOccurrence}] of uniqueRecipes) {
      recipeCount++;
      console.log(`Adding recipe ${recipeCount}: ${recipeName} (first appears on day ${firstOccurrence.day} as ${firstOccurrence.meal})`);
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
    this.doc.text('Weekly Shopping Lists', this.margins.left, this.currentY);
    this.currentY += 15;

    if (mealPlan.weeklyShoppingLists) {
      for (const [week, list] of Object.entries(mealPlan.weeklyShoppingLists)) {
        this.addNewPageIfNeeded(80);

        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${this.formatWeekName(week)}`, this.margins.left, this.currentY);
        this.currentY += 10;

        // Shopping list categories
        const categories = ['produce', 'proteins', 'pantry', 'dairy', 'herbs'];

        for (const category of categories) {
          if ((list as any)[category]) {
            this.doc.setFontSize(12);
            this.doc.setFont('helvetica', 'bold');
            this.doc.setFillColor(245, 245, 245);
            this.doc.rect(this.margins.left, this.currentY - 5, this.pageWidth - 40, 8, 'F');
            this.doc.text(this.capitalizeFirst(category), this.margins.left + 2, this.currentY);
            this.currentY += 8;

            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(10);

            const items = (list as any)[category];
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
        if ((list as any).estimatedCost || (list as any).totalEstimatedCost) {
          this.doc.setFont('helvetica', 'bold');
          this.doc.setFontSize(12);
          this.doc.text(
            `Estimated Weekly Cost: ${(list as any).estimatedCost || (list as any).totalEstimatedCost}`,
            this.margins.left,
            this.currentY
          );
          this.currentY += 10;
        }
      }
    }

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
}