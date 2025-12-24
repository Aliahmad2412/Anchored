# GitHub Pages Deployment Guide

This project is configured to deploy to GitHub Pages using GitHub Actions.

## Important Notes

⚠️ **Limitations:**
- GitHub Pages only hosts static sites, so **API routes will NOT work**
- The waitlist form has been updated to use Supabase client-side (this works!)
- **Admin features will NOT work** (they require server-side API routes)
- Only the public waitlist page (`/anchored`) will function properly

## Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository: `https://github.com/Aliahmad2412/Anchored`
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Add Environment Variables as Secrets

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

### 3. Push Your Code

The GitHub Actions workflow will automatically deploy when you push to the `main` branch:

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

### 4. Access Your Site

After deployment (usually takes 1-2 minutes), your site will be available at:
- **https://aliahmad2412.github.io/Anchored/anchored**

## How It Works

- The workflow builds your Next.js app as a static site
- It deploys to the `gh-pages` branch automatically
- The site uses the base path `/Anchored` (your repository name)

## Troubleshooting

- **Build fails?** Check the Actions tab in GitHub for error details
- **Site not loading?** Make sure GitHub Pages is enabled and using GitHub Actions
- **Form not working?** Verify your Supabase secrets are set correctly
- **404 errors?** The base path is `/Anchored`, so URLs must include this prefix

## Alternative: Use Vercel (Recommended)

For full Next.js functionality (including API routes and admin features), consider deploying to Vercel:
- Free hosting
- Automatic deployments
- Full Next.js support
- Visit: https://vercel.com

