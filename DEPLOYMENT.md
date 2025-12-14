# Deployment Guide

Complete guide to deploying your portfolio website to various hosting platforms.

## Table of Contents
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel (Recommended)](#vercel-recommended)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Custom Domain](#custom-domain)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying, ensure:

### 1. Test Production Build Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and test:
- ✅ All sections load correctly
- ✅ Images display properly
- ✅ Animations work smoothly
- ✅ Links function correctly
- ✅ Mobile responsive design
- ✅ No console errors

### 2. Optimize Images

Large images slow down your site. Compress them:

**Tools:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Image optimization

**Recommendations:**
- Max file size: 500KB per image
- Use WebP format when possible
- Compress without losing quality

### 3. Update Content

- ✅ Replace placeholder text with your content
- ✅ Add your real projects
- ✅ Update contact information
- ✅ Change social media links
- ✅ Update favicon
- ✅ Check all external links

### 4. SEO Preparation

Update `index.html`:

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/png" href="/src/assets/logos/favicon-c.png" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Update these -->
  <title>Your Name - Portfolio</title>
  <meta name="description" content="Portfolio of Your Name - Web Developer & Designer specializing in React, TypeScript, and modern web technologies." />
  
  <!-- Open Graph (Facebook, LinkedIn) -->
  <meta property="og:title" content="Your Name - Portfolio" />
  <meta property="og:description" content="Web Developer & Designer" />
  <meta property="og:image" content="/preview.png" />
  <meta property="og:url" content="https://yourwebsite.com" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Your Name - Portfolio" />
  <meta name="twitter:description" content="Web Developer & Designer" />
  <meta name="twitter:image" content="/preview.png" />
</head>
```

Create a preview image (`preview.png`) at 1200x630px for social sharing.

---

## Vercel (Recommended)

**Why Vercel?**
- ✅ Free for personal projects
- ✅ Automatic deployments from Git
- ✅ Built-in CDN and SSL
- ✅ Zero configuration for Vite
- ✅ Great performance

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote (create repo on GitHub first)
git remote add origin https://github.com/yourusername/your-repo.git

# Push
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your repository
5. Vercel auto-detects Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Step 3: Done! 🎉

Your site is live at: `https://your-project.vercel.app`

### Automatic Deployments

Every push to `main` branch automatically deploys!

```bash
# Make changes
git add .
git commit -m "Update content"
git push

# Vercel automatically builds and deploys
```

### Custom Domain (Vercel)

1. Go to your project settings
2. Navigate to "Domains"
3. Add your domain
4. Follow DNS configuration instructions

---

## Netlify

**Why Netlify?**
- ✅ Free tier available
- ✅ Drag & drop deployment option
- ✅ Form handling (useful for contact forms)
- ✅ Automatic HTTPS

### Option 1: Deploy from GitHub

1. Push code to GitHub (see Vercel instructions above)
2. Go to [netlify.com](https://netlify.com)
3. Sign up/Login
4. Click "Add new site" → "Import an existing project"
5. Connect to GitHub
6. Select your repository
7. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
8. Click "Deploy site"

### Option 2: Drag & Drop

Quick deployment without Git:

```bash
# Build locally
npm run build
```

1. Go to [netlify.com](https://netlify.com)
2. Drag the `dist` folder to the deploy area
3. Done!

**Note**: Drag & drop doesn't auto-update. You'll need to manually upload each time.

### Custom Domain (Netlify)

1. Go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration instructions

---

## GitHub Pages

**Why GitHub Pages?**
- ✅ Free hosting
- ✅ Good for personal projects
- ❌ More manual setup required

### Step 1: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json

Add these lines:

```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 3: Update vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Add this line
})
```

### Step 4: Deploy

```bash
npm run deploy
```

This:
1. Builds your project
2. Creates a `gh-pages` branch
3. Pushes the `dist` folder to that branch

### Step 5: Enable GitHub Pages

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: `gh-pages` branch
4. Save

Your site will be live at: `https://yourusername.github.io/your-repo-name`

### Subsequent Deployments

Just run:
```bash
npm run deploy
```

---

## Custom Domain

### Purchase a Domain

**Popular registrars:**
- [Namecheap](https://www.namecheap.com)
- [Google Domains](https://domains.google)
- [Cloudflare](https://www.cloudflare.com/products/registrar/)
- [GoDaddy](https://www.godaddy.com)

### Configure DNS (Example: Vercel)

1. **On Vercel:**
   - Go to project settings → Domains
   - Add your domain (e.g., `yourdomain.com`)
   - Vercel shows DNS records you need

2. **On Your Registrar:**
   - Go to DNS settings
   - Add these records:

   | Type | Name | Value |
   |------|------|-------|
   | A | @ | 76.76.21.21 |
   | CNAME | www | cname.vercel-dns.com |

3. **Wait for DNS propagation** (5 minutes - 48 hours)

4. **Enable HTTPS** (usually automatic)

### Configure DNS (Example: Netlify)

Similar process:
1. Add domain in Netlify
2. Update DNS records at your registrar
3. Netlify provides specific values

---

## Performance Optimization

### 1. Analyze Bundle Size

```bash
npm run build
```

Check `dist` folder size. Should be under 1MB total.

### 2. Code Splitting (Advanced)

For larger projects, implement lazy loading:

```tsx
import { lazy, Suspense } from 'react';

const Work = lazy(() => import('./components/Work'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Work />
    </Suspense>
  );
}
```

### 3. Image Optimization

Use modern formats:
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
```

### 4. Enable Compression

Most hosting platforms enable gzip/brotli automatically.

---

## Monitoring & Analytics

### Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Vercel Analytics

Free for Vercel users:

```bash
npm install @vercel/analytics
```

In `src/main.tsx`:
```tsx
import { inject } from '@vercel/analytics';

inject();
```

---

## Troubleshooting

### Images Not Loading

**Problem**: Images load locally but not in production

**Solution**:
- Use relative imports: `import img from '../assets/image.png'`
- Don't use absolute paths like `/images/pic.png`
- Ensure images are in `src/assets/`

### 404 on Refresh (SPA Issue)

**Problem**: Page works initially but 404 on refresh

**Solution for Vercel**: Create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Solution for Netlify**: Create `public/_redirects`:
```
/*    /index.html   200
```

### Build Fails

**Check**:
1. `npm run build` works locally
2. All imports are correct
3. No TypeScript errors: `npm run lint`
4. Dependencies are in `package.json`

### Slow Performance

1. Compress images
2. Check bundle size
3. Use lazy loading for large components
4. Enable CDN (Vercel/Netlify do this automatically)

### Animations Not Smooth

1. Reduce Framer Motion complexity
2. Use `will-change` CSS property sparingly
3. Test on target devices (mobile)

---

## Environment Variables (Advanced)

If you need API keys or secrets:

### Create `.env` file

```
VITE_API_KEY=your_key_here
```

### Use in code

```tsx
const apiKey = import.meta.env.VITE_API_KEY;
```

### Set on hosting platform

**Vercel:**
- Project Settings → Environment Variables
- Add key-value pairs

**Netlify:**
- Site Settings → Environment Variables
- Add key-value pairs

**GitHub Pages:**
- Use GitHub Secrets
- More complex setup required

---

## Continuous Deployment Workflow

### Recommended Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-project

# Make changes
# ... edit files ...

# Commit
git add .
git commit -m "Add new project"

# Push to GitHub
git push origin feature/new-project

# Create Pull Request on GitHub
# Review changes
# Merge to main

# Vercel/Netlify automatically deploys main branch
```

### Branch Previews

Vercel and Netlify create preview deployments for each branch/PR automatically!

---

## Costs

### Free Tiers

| Platform | Free Tier |
|----------|-----------|
| Vercel | 100GB bandwidth/month |
| Netlify | 100GB bandwidth/month |
| GitHub Pages | Unlimited for public repos |

Personal portfolios typically use < 10GB/month.

### When You Might Need to Pay

- Very high traffic (>100k visitors/month)
- Advanced features (serverless functions, etc.)
- Team collaboration features

---

## Quick Reference

### Deploy Commands

```bash
# Vercel
npx vercel

# Netlify
npx netlify deploy --prod

# GitHub Pages
npm run deploy
```

### Check Deployment Status

- **Vercel**: Check dashboard or GitHub commit status
- **Netlify**: Check dashboard or commit status
- **GitHub Pages**: Actions tab in your repo

---

## Next Steps After Deployment

1. ✅ Share your portfolio link
2. ✅ Add to resume/CV
3. ✅ Submit to job applications
4. ✅ Share on social media
5. ✅ Add to LinkedIn
6. ✅ Monitor analytics
7. ✅ Keep updating with new projects!

---

**Need Help?**
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

---

**Last Updated**: December 14, 2025
