# GitHub Repository Setup

## Current Status
Your project is in a git repository that's currently pointing to an old project (MLHealthAndroid). Follow these steps to create a proper repository for meal-plans-commerce.

## Option 1: Create New Repository (Recommended)

### Step 1: Create new GitHub repository
1. Go to https://github.com/new
2. Name: `meal-plans-commerce`
3. Description: "AI-powered meal planning e-commerce platform with automated agent system"
4. Set to Private or Public as desired
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### Step 2: Update local repository
```bash
# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/meal-plans-commerce.git

# Add all meal-plans-commerce files
cd /Users/mocha/meal-plans-commerce
git add .

# Commit the meal planning platform
git commit -m "feat: Complete AI-powered meal planning commerce platform

- Next.js 14 frontend with Stripe integration
- Multiple diet types (Mediterranean, IF, Keto, Family)
- AI-powered recipe generation with Claude/OpenAI
- Smart shopping lists and meal prep guides
- Docker-based agent system
- Complete documentation and deployment guides"

# Push to new repository
git push -u origin main
```

## Option 2: Create Fresh Repository

If you want a clean history without the old MindQuest commits:

### Step 1: Create fresh git repository
```bash
cd /Users/mocha/meal-plans-commerce

# Remove existing git directory
rm -rf ../.git

# Initialize new repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: AI-powered meal planning commerce platform"
```

### Step 2: Create GitHub repository
Same as Option 1, Step 1

### Step 3: Push to GitHub
```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/meal-plans-commerce.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## After Setup

Once your repository is set up:

1. **Add collaborators** (if needed):
   - Settings → Manage access → Add people

2. **Set up branch protection**:
   - Settings → Branches → Add rule
   - Branch name pattern: `main`
   - Check: Require pull request reviews

3. **Configure Actions** (optional):
   - Actions → New workflow → Node.js
   - This will run tests on each push

4. **Add repository topics**:
   - Settings → Topics
   - Add: `nextjs`, `stripe`, `ai`, `meal-planning`, `ecommerce`, `docker`

5. **Update README** with repository badges:
   ```markdown
   ![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/meal-plans-commerce)
   ![GitHub last commit](https://img.shields.io/github/last-commit/YOUR_USERNAME/meal-plans-commerce)
   ```

## Deployment Integration

After setting up GitHub:

1. **Connect to Vercel**:
   - Go to vercel.com
   - Import Git Repository
   - Select meal-plans-commerce
   - Auto-deploys will be enabled

2. **Set up GitHub Secrets** for CI/CD:
   ```
   Settings → Secrets → Actions → New repository secret
   ```
   Add:
   - `STRIPE_SECRET_KEY`
   - `OPENAI_API_KEY`
   - `ANTHROPIC_API_KEY`
   - `DATABASE_URL`

## Useful GitHub Features

1. **Issues**: Track bugs and feature requests
2. **Projects**: Kanban board for task management
3. **Wiki**: Additional documentation
4. **Discussions**: Community Q&A
5. **Releases**: Version your deployments

## Next Steps

After GitHub setup:
1. Deploy frontend to Vercel (see DEPLOYMENT.md)
2. Set up agent system infrastructure
3. Configure monitoring and analytics
4. Start accepting payments!

Need help? Check the deployment guide or contact support@mochasmindlab.com