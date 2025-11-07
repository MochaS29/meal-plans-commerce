import { EnhancedMealPlanPDFGenerator } from '../lib/pdf-generator-enhanced';
import fs from 'fs';

async function testPDFCover() {
  console.log('🧪 Testing PDF cover image generation...');

  const generator = new EnhancedMealPlanPDFGenerator();

  // Create a sample meal plan structure
  const sampleMealPlan = {
    menuType: 'mediterranean',
    month: 1,
    year: 2025,
    title: 'Test Mediterranean Meal Plan',
    dailyMeals: {
      day_1: {
        breakfast: {
          id: 1,
          name: 'Greek Yogurt Parfait',
          prep_time: 5,
          cook_time: 0,
          servings: 2,
          difficulty: 'Easy',
          recipe_ingredients: [
            { ingredient: { name: 'Greek Yogurt', category: 'Dairy' }, quantity: '2 cups' }
          ],
          recipe_instructions: [
            { step_number: 1, instruction: 'Layer yogurt in bowl' }
          ]
        }
      }
    },
    weeklyShoppingLists: {},
    nutritionTargets: {},
    mealPrepGuides: {}
  };

  const userInfo = {
    name: 'Test User',
    email: 'test@example.com'
  };

  try {
    const pdfBlob = await generator.generateMealPlanPDF(sampleMealPlan, userInfo);

    // Save to file for inspection
    const outputPath = '/tmp/test-meal-plan-with-cover.pdf';
    fs.writeFileSync(outputPath, Buffer.from(await pdfBlob.arrayBuffer()));

    console.log('✅ PDF generated successfully!');
    console.log(`📄 Saved to: ${outputPath}`);
    console.log('');
    console.log('To view the PDF, run:');
    console.log(`open ${outputPath}`);

    return true;
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    return false;
  }
}

testPDFCover()
  .then(success => process.exit(success ? 0 : 1))
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
