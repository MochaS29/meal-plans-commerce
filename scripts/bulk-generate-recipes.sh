#!/usr/bin/env bash

# Generate recipes for missing diet types
# Usage: ./scripts/bulk-generate-recipes.sh

echo "🍽️  Bulk Recipe Generation for Missing Diet Types"
echo "================================================"
echo ""

# Generate 1 month (112 recipes) for each missing diet type
ADMIN_API_KEY=ba92ff3e18c089cc916f47f7e5eddeba03d3d71220f0914fbc2285d28aeed4e0 PORT=3002 node scripts/generate-recipes.js family-focused 1
echo ""
echo "✅ Family Focused recipes generated"
echo ""

ADMIN_API_KEY=ba92ff3e18c089cc916f47f7e5eddeba03d3d71220f0914fbc2285d28aeed4e0 PORT=3002 node scripts/generate-recipes.js global 1
echo ""
echo "✅ Global Cuisine recipes generated"
echo ""

ADMIN_API_KEY=ba92ff3e18c089cc916f47f7e5eddeba03d3d71220f0914fbc2285d28aeed4e0 PORT=3002 node scripts/generate-recipes.js intermittent-fasting 1
echo ""
echo "✅ Intermittent Fasting recipes generated"
echo ""

echo "🎉 All recipes generated successfully!"
echo ""
echo "🔍 Running duplicate detection and removal..."
echo ""

# Remove exact duplicates
PORT=3002 node scripts/remove-duplicates-smart.js
echo ""
echo "✅ Exact duplicates removed"
echo ""

# Remove similar/fuzzy duplicates
PORT=3002 node scripts/remove-similar-recipes.js
echo ""
echo "✅ Similar recipes removed"
echo ""

echo "🎉 Recipe generation and cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Run: PORT=3002 node scripts/generate-remaining-images-replicate.js"
echo "2. Run: PORT=3002 node scripts/export-recipes-for-static-page.js"
