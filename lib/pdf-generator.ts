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

export class MealPlanPDFGenerator {
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

  public async generateMealPlanPDF(mealPlan: MealPlan, userInfo?: { name?: string; email?: string }) {
    let pageNum = 1;

    // Cover Page
    this.drawHeader(
      this.formatMenuType(mealPlan.menuType),
      `${this.getMonthName(mealPlan.month)} ${mealPlan.year} Meal Plan`
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
    this.doc.text('Your Meal Plan Overview', this.margins.left, this.currentY);
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

    // Weekly Calendar Pages
    this.doc.addPage();
    this.currentY = this.margins.top;

    this.doc.setFontSize(18);
    this.doc.setFont('helvetica', 'bold');
    this.doc.text('Weekly Meal Calendar', this.margins.left, this.currentY);
    this.currentY += 15;

    // Generate calendar for each week
    const weeks = this.groupMealsByWeek(mealPlan.dailyMeals);

    for (const [weekNum, days] of Object.entries(weeks)) {
      this.addNewPageIfNeeded(60);

      this.doc.setFontSize(14);
      this.doc.setFont('helvetica', 'bold');
      this.doc.setFillColor(0, 150, 136);
      this.doc.setTextColor(255, 255, 255);
      this.doc.rect(this.margins.left, this.currentY, this.pageWidth - 40, 8, 'F');
      this.doc.text(`Week ${weekNum}`, this.margins.left + 5, this.currentY + 6);
      this.doc.setTextColor(0, 0, 0);
      this.currentY += 12;

      // Create table data for the week
      const tableData: any[] = [];

      (days as any[]).forEach(day => {
        const dayMeals = mealPlan.dailyMeals[`day_${day}` as keyof typeof mealPlan.dailyMeals] ||
                        mealPlan.dailyMeals[day.toString() as keyof typeof mealPlan.dailyMeals];

        if (dayMeals) {
          const row = [
            `Day ${day}`,
            dayMeals.breakfast?.name || '-',
            dayMeals.lunch?.name || '-',
            dayMeals.dinner?.name || '-'
          ];
          tableData.push(row);
        }
      });

      // Add table
      autoTable(this.doc, {
        head: [['Day', 'Breakfast', 'Lunch', 'Dinner']],
        body: tableData,
        startY: this.currentY,
        margin: { left: this.margins.left },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        headStyles: {
          fillColor: [0, 150, 136],
          textColor: 255
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245]
        }
      });

      this.currentY = (this.doc as any).previousAutoTable.finalY + 10;
    }

    this.drawFooter(pageNum++);

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

    // Meal Prep Guide Section
    if (mealPlan.mealPrepGuides) {
      this.doc.addPage();
      this.currentY = this.margins.top;

      this.doc.setFontSize(18);
      this.doc.setFont('helvetica', 'bold');
      this.doc.text('Meal Prep Strategies', this.margins.left, this.currentY);
      this.currentY += 15;

      for (const [week, guide] of Object.entries(mealPlan.mealPrepGuides)) {
        this.addNewPageIfNeeded(60);

        this.doc.setFontSize(14);
        this.doc.setFont('helvetica', 'bold');
        this.doc.text(`${this.formatWeekName(week)}`, this.margins.left, this.currentY);
        this.currentY += 10;

        for (const [day, tasks] of Object.entries(guide as any)) {
          if (Array.isArray(tasks)) {
            this.doc.setFontSize(12);
            this.doc.setFont('helvetica', 'bold');
            this.doc.text(this.capitalizeFirst(day), this.margins.left, this.currentY);
            this.currentY += 7;

            this.doc.setFont('helvetica', 'normal');
            this.doc.setFontSize(10);

            tasks.forEach(task => {
              const lines = this.doc.splitTextToSize(`• ${task}`, this.pageWidth - 45);
              lines.forEach(line => {
                this.doc.text(line, this.margins.left + 5, this.currentY);
                this.currentY += 5;
              });
            });
            this.currentY += 5;
          } else if (typeof tasks === 'string' && day === 'timeEstimate') {
            this.doc.setFont('helvetica', 'italic');
            this.doc.setFontSize(10);
            this.doc.text(`⏱ ${tasks}`, this.margins.left, this.currentY);
            this.currentY += 8;
          }
        }
      }

      this.drawFooter(pageNum++);
    }

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
}