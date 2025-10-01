# 🔑 How to Find Your Supabase Connection String

## Step-by-Step Guide

### 1. Go to Your Supabase Project
- Visit: https://app.supabase.com/project/rnvowqoqqcrimrybuiea
- Or go to https://app.supabase.com and select your project

### 2. Navigate to Database Settings
- Click on the **"Settings"** icon (⚙️) in the left sidebar
- Then click on **"Database"** in the settings menu

### 3. Find Connection String Section
Look for **"Connection string"** section. You'll see several options:

## 📍 Connection String Options

### Option A: Connection Pooling (RECOMMENDED for Vercel)
Under **"Connection pooling"** section, you'll see:
```
postgresql://postgres.rnvowqoqqcrimrybuiea:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Option B: Direct Connection
Under **"Direct connection"** section:
```
postgresql://postgres.rnvowqoqqcrimrybuiea:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
```

## 🔐 Getting Your Database Password

### If You Remember Your Password:
Replace `[YOUR-PASSWORD]` in the connection string with your actual database password.

### If You Forgot Your Password:
1. In the same Database settings page
2. Look for **"Database password"** section
3. Click **"Reset database password"**
4. Generate a new password
5. **IMPORTANT**: Save this password somewhere safe!
6. Copy the new password and replace `[YOUR-PASSWORD]` in the connection string

## 🎯 Quick Method - URI Tab
1. In Database settings, look for tabs: "Parameters" | "URI"
2. Click on **"URI"** tab
3. You'll see the complete connection string
4. Toggle "**Use connection pooling**" ON (recommended for serverless)
5. Your password should be included if you're logged in

## 💡 What Your Final Connection String Should Look Like

For Vercel deployment, use the **pooled connection**:
```
postgresql://postgres.rnvowqoqqcrimrybuiea:YourActualPasswordHere@aws-0-us-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

## ⚠️ Important Notes

1. **Use Connection Pooling**: For Vercel/serverless, always use the pooled connection (port 6543)
2. **Don't Share**: Never share your connection string with the password
3. **URL Encode Special Characters**: If your password has special characters like @, #, or %, you need to URL encode them:
   - @ becomes %40
   - # becomes %23
   - % becomes %25
   - ! becomes %21

## 🚀 Add to Vercel

Once you have your connection string:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   Name: DATABASE_URL
   Value: [Your complete connection string with password]
   Environment: Production, Preview, Development
   ```

## 🔍 Can't Find It?

### Alternative Method:
1. Go to your Supabase project dashboard
2. Click on **"Connect"** button (usually green button at top)
3. Select **"ORMs"** or **"App Frameworks"**
4. Choose **"Next.js"**
5. Copy the `DATABASE_URL` from the example

### Still Having Issues?
The connection string format is:
```
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

Where:
- `PROJECT_REF` = rnvowqoqqcrimrybuiea (your project reference)
- `PASSWORD` = Your database password
- `REGION` = aws-0-us-west-1 (your project region)

---

**Need more help?** Check Supabase docs: https://supabase.com/docs/guides/database/connecting-to-postgres