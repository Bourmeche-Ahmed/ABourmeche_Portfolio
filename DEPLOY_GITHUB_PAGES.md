# GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages with your custom domain.

## Prerequisites

✅ GitHub account (already have it)
✅ GitHub repository (ABourmeche_Portfolio)
✅ Custom domain (Ahmed_Bourmeche.portfolio)

## Step 1: Configure GitHub Secrets

Your EmailJS credentials need to be stored securely as GitHub Secrets so they can be used during deployment.

1. Go to your GitHub repository: https://github.com/Bourmeche-Ahmed/ABourmeche_Portfolio
2. Click **Settings** → **Secrets and Variables** → **Actions**
3. Click **New repository secret** and add these three:

   **Secret 1:**
   - Name: `VITE_EMAILJS_PUBLIC_KEY`
   - Value: `zpQNPM_pbxbkZxhcA`

   **Secret 2:**
   - Name: `VITE_EMAILJS_SERVICE_ID`
   - Value: `service_45gtr7u`

   **Secret 3:**
   - Name: `VITE_EMAILJS_TEMPLATE_ID`
   - Value: `template_np6qbg9`

✅ All three secrets are now securely stored and will be used during builds.

## Step 2: Configure GitHub Pages Settings

1. Go to your repository: https://github.com/Bourmeche-Ahmed/ABourmeche_Portfolio
2. Click **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch** (if not already selected)
4. Under **Branch**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

**Note:** When your first deployment completes, you'll get a GitHub Pages URL. Keep this handy.

## Step 3: Configure Custom Domain

1. Still in **Settings** → **Pages**
2. Under **Custom domain**, enter:
   ```
   Ahmed_Bourmeche.portfolio
   ```
3. Click **Save**

GitHub will automatically create a CNAME file in your repository (this is already done for you).

## Step 4: Point Your Domain DNS

You need to configure your domain provider to point to GitHub Pages.

### For .portfolio domains (check your registrar):

Contact your domain registrar or visit their DNS settings and create these records:

**Option A: Using A records (Recommended)**
```
Type: A
Name: @ (or root)
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

Add all 4 A records for redundancy.

**Option B: Using CNAME record**
```
Type: CNAME
Name: www
Value: Bourmeche-Ahmed.github.io
```

**Then add www subdomain redirect (optional):**
```
Type: CNAME
Name: www
Value: Ahmed_Bourmeche.portfolio
```

### DNS Check

After configuring DNS, verify it's working:

```bash
# Check if DNS is pointing correctly
nslookup Ahmed_Bourmeche.portfolio

# Should resolve to GitHub's IP addresses:
# 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
```

## Step 5: Enable Automatic Deployments

GitHub Actions is already configured (`deploy-portfolio.yml`). Now:

1. Go to **Actions** tab in your repository
2. You should see the deployment workflow
3. Every time you push to `main`, it will automatically:
   - Install dependencies
   - Build the portfolio
   - Deploy to GitHub Pages

## Deployment Process

When you push to GitHub:

1. **Trigger:** Any push to `main` branch starts the workflow
2. **Build:** 
   - Dependencies installed
   - Vite builds the portfolio
   - EmailJS credentials injected from secrets
3. **Deploy:**
   - Built files pushed to GitHub Pages
   - Live on `Ahmed_Bourmeche.portfolio`

## Verify Deployment

After your first push:

1. Go to your repository's **Actions** tab
2. Check the latest workflow run
3. If it shows a ✅ checkmark, deployment succeeded
4. Visit https://Ahmed_Bourmeche.portfolio to see it live

## SSL Certificate

GitHub Pages automatically provides SSL certificates via Let's Encrypt. This means:
- ✅ HTTPS support (automatic)
- ✅ Security badge in browser
- ✅ No additional cost

If you see a warning about SSL, wait 5-10 minutes and refresh.

## Troubleshooting

### Deployment failed?

1. Check the **Actions** workflow run for errors
2. Verify all 3 GitHub Secrets are added
3. Check that `.env` file credentials are correct locally

### Domain not working?

1. Wait 24-48 hours for DNS to propagate
2. Check DNS settings match GitHub's requirements
3. Verify CNAME file in repository with correct domain
4. Test with: `nslookup Ahmed_Bourmeche.portfolio`

### Site not loading?

1. Check GitHub Pages status in Settings → Pages
2. Verify build output is in `artifacts/portfolio/dist/public`
3. Check for 404 errors in browser console
4. Try clearing browser cache (Ctrl+Shift+Delete)

### EmailJS not working?

1. Verify GitHub Secrets are added correctly
2. Check that local `.env` file has same credentials
3. Look for console errors (F12 → Console)
4. Verify EmailJS template is active in dashboard

## Updating Your Portfolio

Every time you make changes and push to GitHub:

```bash
git add .
git commit -m "feat: your feature here"
git push
```

The GitHub Actions workflow will automatically:
- Build the latest version
- Deploy to GitHub Pages
- Live within 2-3 minutes

## Need Help?

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Domain DNS Help:** Contact your domain registrar's support

## Quick Checklist

- [ ] GitHub Secrets added (3 total)
- [ ] GitHub Pages enabled in Settings
- [ ] Custom domain configured in GitHub Pages
- [ ] Domain DNS records added
- [ ] First deployment pushed and succeeded
- [ ] Domain resolves to your portfolio
- [ ] HTTPS working (green lock icon)
- [ ] Contact form working with EmailJS

Done! Your portfolio is now automatically deployed to GitHub Pages! 🚀
