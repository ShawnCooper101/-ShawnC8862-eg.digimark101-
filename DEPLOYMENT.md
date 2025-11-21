# Deployment Guide - Multi-Domain Setup

This guide will help you deploy your DigiMark101 agency applications across multiple domains using Vercel.

## Overview

You have 4 domains to manage:
- **digimark101.com** - Main site (this Next.js AI Assistant)
- **digimark101.shop** - E-commerce platform
- **digimark101.info** - Resources/Blog
- **app.allinonemarketing.com** - WordPress software platform

## Step 1: Deploy to Vercel (Main Site - digimark101.com)

### Prerequisites
- GitHub account with this repository
- Vercel account (free tier is fine to start)
- OpenAI API key
- PayPal Client ID

### Deployment Steps

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New Project"
   - Select this repository: `ShawnCooper101/-ShawnC8862-eg.digimark101-`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add:
   
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_actual_paypal_client_id_here
   ```

   To get these:
   - OpenAI Key: https://platform.openai.com/account/api-keys
   - PayPal Client ID: https://developer.paypal.com/dashboard/

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - You'll get a URL like: `your-project.vercel.app`

6. **Add Custom Domain (digimark101.com)**
   - Go to Project Settings → Domains
   - Add `digimark101.com`
   - Add `www.digimark101.com`
   - Follow DNS instructions provided by Vercel

### DNS Configuration for digimark101.com

In your domain registrar (GoDaddy, Namecheap, etc.):

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

Wait 24-48 hours for DNS propagation (usually faster).

---

## Step 2: Configure app.allinonemarketing.com

Since this is your WordPress site, you have two options:

### Option A: Keep WordPress Separate (Recommended)
Keep WordPress on current hosting, just link to it from main site.

**Steps:**
1. No changes needed to WordPress
2. Navigation already points to app.allinonemarketing.com
3. Users click link → redirected to WordPress site

### Option B: Proxy Through Vercel (Advanced)
Use Vercel as a CDN/proxy in front of WordPress.

**Steps:**
1. Create new Vercel project
2. Add custom domain: `app.allinonemarketing.com`
3. Configure rewrites in `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "https://your-wordpress-host.com/$1"
    }
  ]
}
```

**Benefits:**
- Faster loading (Vercel CDN)
- Better security (DDoS protection)
- SSL management

---

## Step 3: Set Up digimark101.shop (E-commerce)

### Option A: Shopify Integration
1. Create Shopify store
2. Connect domain in Shopify admin
3. Update DNS:
```
CNAME   @       shops.myshopify.com
```

### Option B: Custom Next.js Store
1. Clone this repository for shop version
2. Add product pages and Stripe integration
3. Deploy to Vercel
4. Add domain `digimark101.shop`

---

## Step 4: Set Up digimark101.info (Resources/Blog)

### Option A: Simple Next.js Blog
1. Create new Next.js project with blog
2. Use markdown files or headless CMS
3. Deploy to Vercel
4. Add domain `digimark101.info`

### Option B: WordPress Headless CMS
1. Use WordPress as backend (REST API)
2. Next.js as frontend
3. Deploy Next.js to Vercel
4. Connect to WordPress API

---

## Testing Deployment

After deployment, test these URLs:

### Main Site (digimark101.com)
- [ ] Home page loads
- [ ] AI Assistant chat works
- [ ] Navigation links work
- [ ] PayPal checkout displays
- [ ] SSL certificate is active (https://)

### Cross-Domain Links
- [ ] Shop link opens digimark101.shop
- [ ] Resources link opens digimark101.info  
- [ ] Software link opens app.allinonemarketing.com
- [ ] All links open in new tab with proper security

### API Endpoints
- [ ] POST to /api/ask works
- [ ] Error handling works (try without API key)
- [ ] CORS headers are correct

---

## Monitoring & Maintenance

### Vercel Dashboard
Monitor:
- Deployment status
- Build logs
- Error tracking
- Analytics
- Performance metrics

### Regular Tasks
- **Daily:** Check error logs
- **Weekly:** Review analytics
- **Monthly:** Update dependencies
- **Quarterly:** Audit security

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Test locally: `npm run build`

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Check DNS settings with: `dig digimark101.com`
- Verify Vercel domain configuration

### API Errors
- Check environment variables are set
- Verify OpenAI API key is valid
- Check API quotas and billing

### PayPal Not Loading
- Verify PayPal Client ID is correct
- Check browser console for errors
- Test in sandbox mode first

---

## Environment Variables Reference

### Production (.env.local)
```bash
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx

# PayPal Configuration  
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Domain Configuration
NEXT_PUBLIC_MAIN_DOMAIN=digimark101.com
NEXT_PUBLIC_SHOP_DOMAIN=digimark101.shop
NEXT_PUBLIC_INFO_DOMAIN=digimark101.info
NEXT_PUBLIC_APP_DOMAIN=app.allinonemarketing.com
```

---

## Cost Estimation

### Vercel
- **Hobby (Free):** 
  - 100 GB bandwidth/month
  - Unlimited deployments
  - 3 team members
  - Good for starting

- **Pro ($20/month):**
  - 1 TB bandwidth/month
  - Advanced analytics
  - Recommended for production

### OpenAI
- **Pay-as-you-go:**
  - GPT-3.5-turbo: $0.002/1K tokens
  - Estimate: $10-50/month depending on usage

### PayPal
- **Transaction Fees:**
  - 2.9% + $0.30 per transaction
  - Example: $9.99 sale = $0.59 fee

### Total Monthly Cost
- Starting: $0-30/month
- Production: $50-100/month

---

## Support & Resources

### Documentation
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- OpenAI API: https://platform.openai.com/docs

### Community
- Vercel Discord: https://vercel.com/discord
- Next.js GitHub: https://github.com/vercel/next.js

### Professional Help
For deployment assistance, contact a Vercel partner or hire a developer familiar with:
- Next.js
- Vercel platform
- Domain management
- API integration

---

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test production build locally
npm run build && npm start
```

---

## Next Steps After Deployment

1. ✅ Verify all domains are working
2. ✅ Set up Google Analytics
3. ✅ Configure email notifications
4. ✅ Set up automated backups
5. ✅ Create content for blog/resources
6. ✅ Add products to shop
7. ✅ Test payment flow end-to-end
8. ✅ Set up customer support system
9. ✅ Create marketing materials
10. ✅ Launch announcement

---

## Security Checklist

- [ ] All domains use HTTPS
- [ ] API keys stored in environment variables (not in code)
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] PayPal in production mode (not sandbox)
- [ ] Regular security audits
- [ ] Dependencies updated regularly
- [ ] Backup strategy in place

---

## Success! 🎉

Once deployed, your multi-domain agency platform will be live with:
- Professional AI Assistant interface
- Integrated payment processing
- Cross-domain navigation
- Global CDN performance
- Automatic SSL certificates
- Zero-downtime deployments

Good luck with your DigiMark101 agency! 🚀
