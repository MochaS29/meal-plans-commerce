#!/bin/bash

# Update each diet page to have single button linking to customize with diet pre-selected

# Mediterranean
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=mediterranean"\
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/mediterranean/page.tsx

# Keto
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=keto"\
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/keto/page.tsx

# Paleo
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=paleo"\
                className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/paleo/page.tsx

# Vegetarian
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=vegetarian"\
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/vegetarian/page.tsx

# Intermittent Fasting
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=intermittent-fasting"\
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/intermittent-fasting/page.tsx

# Family Focused
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=family"\
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/family-focused/page.tsx

# Global Cuisine
sed -i '' -e '/<div className="flex flex-col sm:flex-row gap-4 justify-center">/,/<\/div>/c\
            <div className="flex justify-center">\
              <Link\
                href="/plans/customize?diet=global"\
                className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"\
              >\
                Get Started\
              </Link>\
            </div>
' /Users/mocha/meal-plans-commerce/app/diets/global/page.tsx

echo "✅ All diet pages updated!"
