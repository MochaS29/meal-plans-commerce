import jsPDF from 'jspdf';

interface MealPlan {
  menuType: string;
  month: number;
  year: number;
  dailyMeals: any;
  weeklyShoppingLists: any;
  nutritionTargets: any;
  mealPrepGuides: any;
}

export class SimpleMealPlanPDFGenerator {
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

  public async generateMealPlanPDF(mealPlan: MealPlan, userInfo?: { name?: string; email?: string }) {
    // Cover Page
    this.doc.setFillColor(0, 150, 136);
    this.doc.rect(0, 0, this.pageWidth, 35, 'F');

    this.doc.setTextColor(255, 255, 255);
    this.doc.setFontSize(24);
    this.doc.text(
      this.formatMenuType(mealPlan.menuType),
      this.pageWidth / 2,
      15,
      { align: 'center' }
    );

    this.doc.setFontSize(12);
    this.doc.text(
      `${this.getMonthName(mealPlan.month)} ${mealPlan.year} Meal Plan`,
      this.pageWidth / 2,
      25,
      { align: 'center' }
    );

    // Reset colors
    this.doc.setTextColor(0, 0, 0);
    this.currentY = 45;

    // User info
    if (userInfo?.name) {
      this.doc.setFontSize(14);
      this.doc.text(`Prepared for: ${userInfo.name}`, this.margins.left, this.currentY);
      this.currentY += 15;
    }

    // Overview Section
    this.doc.setFontSize(16);
    this.doc.text('Your Meal Plan Overview', this.margins.left, this.currentY);
    this.currentY += 15;

    // Nutrition Targets
    if (mealPlan.nutritionTargets) {
      this.doc.setFontSize(12);
      this.doc.setFillColor(245, 245, 245);
      this.doc.roundedRect(this.margins.left, this.currentY, this.pageWidth - 40, 35, 5, 5, 'F');
      this.currentY += 10;

      this.doc.text(`Daily Calories: ${mealPlan.nutritionTargets.dailyCalories || '1600-1800'}`, this.margins.left + 10, this.currentY);
      this.currentY += 8;
      this.doc.text(`Protein Target: ${mealPlan.nutritionTargets.proteinGrams || '90'}g daily`, this.margins.left + 10, this.currentY);
      this.currentY += 8;
      this.doc.text(`Special Focus: Heart-healthy, anti-inflammatory foods`, this.margins.left + 10, this.currentY);
    }

    // Footer
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(
      `Page 1 | © ${new Date().getFullYear()} Mocha's MindLab`,
      this.pageWidth / 2,
      this.pageHeight - 15,
      { align: 'center' }
    );

    // Week 1 Meal Plan
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setTextColor(0, 0, 0);
    this.doc.setFontSize(18);
    this.doc.text('Week 1 Meal Calendar', this.margins.left, this.currentY);
    this.currentY += 15;

    // Days 1-7
    for (let day = 1; day <= 7; day++) {
      this.addNewPageIfNeeded(40);

      const dayMeals = mealPlan.dailyMeals[`day_${day}`] ||
                      mealPlan.dailyMeals[day.toString()] ||
                      mealPlan.dailyMeals[day];

      if (dayMeals) {
        // Day header
        this.doc.setFillColor(0, 150, 136);
        this.doc.rect(this.margins.left, this.currentY, this.pageWidth - 40, 8, 'F');
        this.doc.setTextColor(255, 255, 255);
        this.doc.setFontSize(12);
        this.doc.text(`Day ${day}`, this.margins.left + 5, this.currentY + 6);
        this.doc.setTextColor(0, 0, 0);
        this.currentY += 12;

        // Meals
        this.doc.setFontSize(10);
        if (dayMeals.breakfast) {
          this.doc.text(`Breakfast: ${dayMeals.breakfast.name}`, this.margins.left + 5, this.currentY);
          this.currentY += 6;
        }
        if (dayMeals.lunch) {
          this.doc.text(`Lunch: ${dayMeals.lunch.name}`, this.margins.left + 5, this.currentY);
          this.currentY += 6;
        }
        if (dayMeals.dinner) {
          this.doc.text(`Dinner: ${dayMeals.dinner.name}`, this.margins.left + 5, this.currentY);
          this.currentY += 8;
        }
      }
    }

    // Shopping List Page
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.text('Week 1 Shopping List', this.margins.left, this.currentY);
    this.currentY += 15;

    if (mealPlan.weeklyShoppingLists?.week1 || mealPlan.weeklyShoppingLists?.week_1) {
      const week1List = mealPlan.weeklyShoppingLists.week1 || mealPlan.weeklyShoppingLists.week_1;

      // Categories
      const categories = ['produce', 'proteins', 'pantry', 'dairy'];

      for (const category of categories) {
        if (week1List[category]) {
          this.addNewPageIfNeeded(30);

          this.doc.setFontSize(12);
          this.doc.setFillColor(245, 245, 245);
          this.doc.rect(this.margins.left, this.currentY - 4, this.pageWidth - 40, 8, 'F');
          this.doc.text(this.capitalizeFirst(category), this.margins.left + 2, this.currentY);
          this.currentY += 10;

          this.doc.setFontSize(10);
          const items = week1List[category];

          if (Array.isArray(items)) {
            items.forEach(item => {
              const itemText = typeof item === 'string' ? item :
                              item.item ? `${item.item}: ${item.quantity}` : '';
              if (itemText) {
                this.doc.text(`• ${itemText}`, this.margins.left + 5, this.currentY);
                this.currentY += 6;
              }
            });
          }
          this.currentY += 5;
        }
      }
    }

    // Meal Prep Guide
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.text('Meal Prep Guide', this.margins.left, this.currentY);
    this.currentY += 15;

    this.doc.setFontSize(12);
    this.doc.text('Sunday Prep (2.5 hours):', this.margins.left, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(10);
    const prepTips = [
      'Cook grains in bulk (quinoa, brown rice)',
      'Wash and chop all vegetables',
      'Prepare marinades and dressings',
      'Cook proteins for first 3 days',
      'Make overnight oats for the week'
    ];

    prepTips.forEach(tip => {
      this.doc.text(`• ${tip}`, this.margins.left + 5, this.currentY);
      this.currentY += 6;
    });

    this.currentY += 10;
    this.doc.setFontSize(12);
    this.doc.text('Wednesday Refresh (45 minutes):', this.margins.left, this.currentY);
    this.currentY += 8;

    this.doc.setFontSize(10);
    const midWeekTips = [
      'Prep vegetables for remaining days',
      'Cook proteins for days 4-7',
      'Refresh salad greens'
    ];

    midWeekTips.forEach(tip => {
      this.doc.text(`• ${tip}`, this.margins.left + 5, this.currentY);
      this.currentY += 6;
    });

    // Final page footer
    this.doc.setFontSize(10);
    this.doc.setTextColor(128, 128, 128);
    this.doc.text(
      'Generated from meal-plans.mochasmindlab.com',
      this.pageWidth / 2,
      this.pageHeight - 10,
      { align: 'center' }
    );

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

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}