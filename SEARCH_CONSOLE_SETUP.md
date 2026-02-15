# Google Search Console Setup Guide

## Overview
This guide walks through setting up Google Search Console for jacked.pro to track organic traffic, AI Overview appearances, and structured data performance.

## Prerequisites
- Jacked deployed to https://jacked.pro
- Google account with admin access to the domain
- DNS access (for domain verification)

## Step 1: Add Property to Search Console

### A. Navigate to Search Console
1. Go to: https://search.google.com/search-console
2. Click "Add property"
3. Select "Domain" property type
4. Enter: `jacked.pro`

### B. Verify Domain Ownership
Choose one verification method:

**Option 1: DNS Verification (Recommended)**
1. Copy the TXT record provided by Google
2. Add TXT record to DNS:
   ```
   Name: @
   Type: TXT
   Value: google-site-verification=XXXXXXXXXXXXXXXXXXXXXXX
   TTL: 3600
   ```
3. Wait 5-10 minutes for DNS propagation
4. Click "Verify" in Search Console

**Option 2: HTML File Upload**
1. Download verification file from Search Console
2. Upload to `public/` directory in Next.js project
3. Deploy to production
4. Access: https://jacked.pro/google[verification-code].html
5. Click "Verify" in Search Console

**Option 3: Meta Tag (Not Recommended for SPAs)**
- Can cause issues with client-side routing

## Step 2: Submit Sitemap

### A. Create Sitemap
Next.js automatically generates sitemap if configured. Add to `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://jacked.pro',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://jacked.pro/upload',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://jacked.pro/how-it-works',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
```

### B. Submit to Search Console
1. In Search Console, go to "Sitemaps"
2. Enter: `https://jacked.pro/sitemap.xml`
3. Click "Submit"
4. Wait 24-48 hours for Google to crawl

## Step 3: Set Up Baseline Metrics

### A. Document Current State (Before Growth Strategy)
Create baseline snapshot within 7 days of deployment:

```
Date: [Deployment Date]
Total Indexed Pages: ___
Average Position: ___
Total Clicks: ___
Total Impressions: ___
Average CTR: ___
```

### B. Key Metrics to Track

#### 1. Organic Traffic Growth
**Location**: Performance → Search Results
**Metric**: Total Clicks
**Goal**: 2-3x increase in 90 days

**Track weekly**:
- Week 1 baseline: ___ clicks
- Week 4: ___ clicks (+___%)
- Week 8: ___ clicks (+___%)
- Week 12: ___ clicks (+___%)

#### 2. AI Overview Appearances
**Location**: Performance → Search Results → Filter by "Search Appearance" → "AI Overview"
**Metric**: Impressions in AI Overviews
**Goal**: 10+ appearances within 60 days

**Track monthly**:
- Month 1: ___ AI Overview impressions
- Month 2: ___ AI Overview impressions
- Month 3: ___ AI Overview impressions

#### 3. Target Keyword Rankings

**Primary Keywords**:
1. "fitbod analytics" - Position: ___
2. "fitbod muscle tracking" - Position: ___
3. "why muscles not growing" - Position: ___
4. "not seeing results from workouts" - Position: ___
5. "fitbod progress dashboard" - Position: ___

**Track bi-weekly** in Performance → Queries

#### 4. Structured Data Performance
**Location**: Enhancements → Unparsable structured data
**Metric**: Errors/Warnings count
**Goal**: 0 errors, 0 warnings

**Track weekly** (first month):
- Valid pages: ___
- Pages with warnings: ___
- Pages with errors: ___

#### 5. Click-Through Rate (CTR)
**Location**: Performance → Search Results
**Metric**: Average CTR
**Goal**: 35%+ improvement in 60 days

**Baseline**: ____%
**Current**: ____%
**Change**: +____%

## Step 4: Configure Alerts

### A. Coverage Issues Alert
1. In Search Console, go to Settings → User and Permission
2. Add email for coverage issue alerts
3. Enable notifications for:
   - New "Errors" in Coverage report
   - Increase in "Excluded" pages
   - Manual actions

### B. Security Issues Alert
1. Same location as above
2. Enable notifications for:
   - Hacked content detected
   - Malware detected

## Step 5: Set Up Custom Dashboards (Optional)

### Google Looker Studio Dashboard
Create custom dashboard combining Search Console + Analytics:

1. Go to: https://lookerstudio.google.com/
2. Create new report
3. Add Search Console data source
4. Add visualizations:
   - Line chart: Clicks over time
   - Table: Top queries by CTR
   - Pie chart: AI Overview vs regular search
   - Bar chart: Clicks by page

5. Share with team/stakeholders

## Step 6: Monitor Core Web Vitals

### A. Core Web Vitals Report
**Location**: Experience → Core Web Vitals
**Metrics**:
- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

**Track monthly**:
- Good URLs: ___ (goal: 100%)
- Poor URLs: ___ (goal: 0%)

### B. Mobile Usability
**Location**: Experience → Mobile Usability
**Goal**: 0 mobile usability errors

## Step 7: Weekly Monitoring Routine (First 3 Months)

### Monday Morning Check (15 minutes)
- [ ] Check Performance report for previous week
- [ ] Note top 5 queries and their positions
- [ ] Check for any coverage errors
- [ ] Review AI Overview impressions

### Monthly Deep Dive (1 hour)
- [ ] Export Performance data to spreadsheet
- [ ] Calculate month-over-month growth %
- [ ] Identify declining queries (address in content)
- [ ] Review structured data enhancements
- [ ] Check Core Web Vitals trends
- [ ] Document learnings and optimizations

## Expected Timeline

### Week 1-2: Setup & Indexing
- Property verified
- Sitemap submitted
- Initial pages indexed (3-5 pages expected)
- Baseline metrics documented

### Week 3-4: Initial Data
- First structured data detected
- Initial keyword impressions appear
- Baseline CTR established
- 10-50 impressions/day expected

### Month 2: Growth Phase
- AI Overview appearances start (5-10 expected)
- Target keyword rankings improve
- Organic traffic 1.5-2x baseline
- CTR improves 10-20%

### Month 3: Momentum
- AI citations increase (20+ expected)
- Top 20 rankings for target keywords
- Organic traffic 2-3x baseline
- CTR improves 25-35%

## Troubleshooting Common Issues

### Issue 1: Pages Not Indexed
**Symptoms**: URL Inspection shows "Discovered - currently not indexed"
**Causes**: Low crawl budget, duplicate content, or low page quality
**Fix**:
1. Request indexing manually in URL Inspection
2. Add internal links to the page
3. Improve page content quality/uniqueness
4. Check for robots.txt blocking

### Issue 2: Structured Data Not Detected
**Symptoms**: Enhancements report shows 0 pages with structured data
**Causes**: JS rendering issues, invalid JSON-LD, or crawl errors
**Fix**:
1. Test with Google Rich Results Test
2. Verify JSON-LD is in `<head>`, not dynamically rendered
3. Check for syntax errors in JSON
4. Wait 7-14 days after deployment

### Issue 3: No AI Overview Appearances
**Symptoms**: "AI Overview" filter shows 0 impressions after 60 days
**Causes**: Low search volume for target keywords, or content not answer-focused
**Fix**:
1. Verify FAQPage schema is valid
2. Expand FAQ answers to 50-70 words
3. Target question-based keywords
4. Add more how-to content
5. Wait 90 days (AI citations take time)

### Issue 4: High Impressions, Low Clicks
**Symptoms**: CTR < 2% despite good impressions
**Causes**: Poor title/description, wrong intent match, or low position
**Fix**:
1. Rewrite title to be more compelling
2. Add emotional language to description
3. Include numbers/specifics ("30 seconds", "9 muscle groups")
4. Test different meta descriptions

## Integration with Other Tools

### Google Analytics 4 (Optional)
Link Search Console to GA4 for combined insights:

1. In GA4, go to Admin → Product Links → Search Console Links
2. Link your Search Console property
3. View Search Console data in GA4 Acquisition reports

### Vercel Analytics (Already Integrated)
Jacked already has Vercel Analytics. Compare:
- Vercel: User behavior, conversion funnels
- Search Console: Organic discovery, keyword rankings

## Success Criteria Checklist

### Week 1
- [ ] Search Console property verified
- [ ] Sitemap submitted and accepted
- [ ] Baseline metrics documented
- [ ] 3+ pages indexed

### Month 1
- [ ] All structured data schemas detected (4 types)
- [ ] 0 structured data errors
- [ ] 50+ organic impressions/day
- [ ] 5+ target keywords ranking (any position)

### Month 2
- [ ] 5+ AI Overview impressions
- [ ] 100+ organic clicks/month
- [ ] 2+ keywords in top 50
- [ ] CTR improved 15%+

### Month 3
- [ ] 20+ AI Overview impressions
- [ ] 300+ organic clicks/month (3x baseline)
- [ ] 1+ keyword in top 20
- [ ] CTR improved 30%+

## Post-Setup Maintenance

### Monthly Tasks
- Review Performance report trends
- Check for new structured data errors
- Update FAQ content based on Search queries
- Monitor Core Web Vitals
- Document learnings

### Quarterly Tasks
- Comprehensive SEO audit
- Competitor keyword analysis
- Content gap identification
- Structured data expansion (add Review schema if testimonials collected)

### Yearly Tasks
- Full site SEO audit
- Migrate to new Search Console features
- Historical data analysis
- Strategy refinement based on 12-month trends

## Resources

- **Search Console Help**: https://support.google.com/webmasters
- **Structured Data Guidelines**: https://developers.google.com/search/docs/appearance/structured-data
- **AI Overviews Documentation**: https://developers.google.com/search/docs/appearance/ai-overviews
- **Schema.org Documentation**: https://schema.org/

## Questions & Support

If you encounter issues not covered in this guide:
1. Check Search Console Help Center
2. Review site's STRUCTURED_DATA_VALIDATION.md
3. Test schemas with Google Rich Results Test
4. Allow 2-4 weeks for new changes to be reflected
