#!/usr/bin/env node

/**
 * Test Recipe Matching for All Meals in Calendar
 * This tests how many meals will actually open when clicked
 */

async function testRecipeMatching() {
  console.log('🔍 Testing Recipe Matching for January 2025 Mediterranean Plan\n')
  console.log('=' .repeat(70) + '\n')

  // Fetch meal plan
  const mealPlanResponse = await fetch('http://localhost:3000/api/meal-plans?menuType=mediterranean&month=1&year=2025')
  const mealPlan = await mealPlanResponse.json()

  if (!mealPlan.dailyMeals) {
    console.log('❌ Failed to fetch meal plan')
    return
  }

  const results = {
    total: 0,
    found: 0,
    notFound: 0,
    meals: []
  }

  // Test each day
  for (let day = 1; day <= 31; day++) {
    const dayKey = `day_${day}`
    const dayData = mealPlan.dailyMeals[dayKey]

    if (!dayData) continue

    // Test breakfast
    if (dayData.breakfast?.name) {
      results.total++
      const recipeResponse = await fetch(`http://localhost:3000/api/recipes/by-name/${encodeURIComponent(dayData.breakfast.name)}`)

      if (recipeResponse.ok) {
        const recipe = await recipeResponse.json()
        if (recipe.name && !recipe.error) {
          results.found++
          results.meals.push({
            day,
            meal: 'Breakfast',
            requested: dayData.breakfast.name,
            found: recipe.name,
            exact: recipe.name.toLowerCase() === dayData.breakfast.name.toLowerCase()
          })
        } else {
          results.notFound++
          results.meals.push({
            day,
            meal: 'Breakfast',
            requested: dayData.breakfast.name,
            found: null
          })
        }
      } else {
        results.notFound++
        results.meals.push({
          day,
          meal: 'Breakfast',
          requested: dayData.breakfast.name,
          found: null
        })
      }
    }

    // Test lunch
    if (dayData.lunch?.name) {
      results.total++
      const recipeResponse = await fetch(`http://localhost:3000/api/recipes/by-name/${encodeURIComponent(dayData.lunch.name)}`)

      if (recipeResponse.ok) {
        const recipe = await recipeResponse.json()
        if (recipe.name && !recipe.error) {
          results.found++
          results.meals.push({
            day,
            meal: 'Lunch',
            requested: dayData.lunch.name,
            found: recipe.name,
            exact: recipe.name.toLowerCase() === dayData.lunch.name.toLowerCase()
          })
        } else {
          results.notFound++
          results.meals.push({
            day,
            meal: 'Lunch',
            requested: dayData.lunch.name,
            found: null
          })
        }
      } else {
        results.notFound++
        results.meals.push({
          day,
          meal: 'Lunch',
          requested: dayData.lunch.name,
          found: null
        })
      }
    }

    // Test dinner
    if (dayData.dinner?.name) {
      results.total++
      const recipeResponse = await fetch(`http://localhost:3000/api/recipes/by-name/${encodeURIComponent(dayData.dinner.name)}`)

      if (recipeResponse.ok) {
        const recipe = await recipeResponse.json()
        if (recipe.name && !recipe.error) {
          results.found++
          results.meals.push({
            day,
            meal: 'Dinner',
            requested: dayData.dinner.name,
            found: recipe.name,
            exact: recipe.name.toLowerCase() === dayData.dinner.name.toLowerCase()
          })
        } else {
          results.notFound++
          results.meals.push({
            day,
            meal: 'Dinner',
            requested: dayData.dinner.name,
            found: null
          })
        }
      } else {
        results.notFound++
        results.meals.push({
          day,
          meal: 'Dinner',
          requested: dayData.dinner.name,
          found: null
        })
      }
    }
  }

  // Calculate stats
  const exactMatches = results.meals.filter(m => m.found && m.exact).length
  const fuzzyMatches = results.meals.filter(m => m.found && !m.exact).length
  const matchRate = ((results.found / results.total) * 100).toFixed(1)
  const exactMatchRate = ((exactMatches / results.total) * 100).toFixed(1)

  // Print results
  console.log('📊 RESULTS:')
  console.log(`   Total meals tested: ${results.total}`)
  console.log(`   ✅ Found: ${results.found} (${matchRate}%)`)
  console.log(`   ❌ Not found: ${results.notFound}`)
  console.log(`\n   🎯 Exact matches: ${exactMatches} (${exactMatchRate}%)`)
  console.log(`   🔍 Fuzzy matches: ${fuzzyMatches}`)

  // Show examples of mismatches
  console.log('\n\n🔍 SAMPLE MATCHES:\n')

  // Show first 5 exact matches
  const exactSamples = results.meals.filter(m => m.found && m.exact).slice(0, 5)
  if (exactSamples.length > 0) {
    console.log('✅ Exact Matches (first 5):')
    exactSamples.forEach(m => {
      console.log(`   Day ${m.day} ${m.meal}: "${m.requested}"`)
    })
  }

  // Show first 10 fuzzy matches
  const fuzzySamples = results.meals.filter(m => m.found && !m.exact).slice(0, 10)
  if (fuzzySamples.length > 0) {
    console.log('\n🔍 Fuzzy Matches (first 10):')
    fuzzySamples.forEach(m => {
      console.log(`   Day ${m.day} ${m.meal}:`)
      console.log(`      Requested: "${m.requested}"`)
      console.log(`      Found:     "${m.found}"`)
    })
  }

  // Show not found
  const notFoundSamples = results.meals.filter(m => !m.found).slice(0, 10)
  if (notFoundSamples.length > 0) {
    console.log('\n❌ Not Found (first 10):')
    notFoundSamples.forEach(m => {
      console.log(`   Day ${m.day} ${m.meal}: "${m.requested}"`)
    })
  }

  console.log('\n' + '='.repeat(70))

  if (results.found === results.total) {
    console.log('\n🎉 PERFECT! All meals have recipes!')
  } else if (matchRate >= 90) {
    console.log('\n✅ GOOD! Most meals (90%+) have recipes.')
  } else if (matchRate >= 70) {
    console.log('\n⚠️  ACCEPTABLE! 70%+ meals have recipes, but could be improved.')
  } else {
    console.log('\n❌ NEEDS WORK! Less than 70% of meals have recipes.')
    console.log('   Recommendation: Update recipe mappings or meal plan JSON files.')
  }

  return results
}

testRecipeMatching().catch(console.error)
