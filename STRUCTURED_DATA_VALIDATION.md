# Structured Data Validation Checklist

## Overview
Jacked implements multiple JSON-LD schemas for AI engine discoverability and SEO optimization.

## Schemas Implemented

### 1. SoftwareApplication Schema
**Location**: `app/components/StructuredData.tsx`
**Purpose**: Helps AI engines understand Jacked is a fitness analytics application
**Test URL**: https://search.google.com/test/rich-results?url=https://jacked.pro

**Key Properties**:
- `@type`: "SoftwareApplication"
- `applicationCategory`: "HealthApplication"
- `featureList`: 30-second analysis, muscle group trends, lagging body part detection
- `offers`: Free pricing

### 2. Organization Schema
**Location**: `app/components/StructuredData.tsx`
**Purpose**: Establishes Jacked as an organization entity
**Test URL**: https://search.google.com/test/rich-results?url=https://jacked.pro

**Key Properties**:
- `@type`: "Organization"
- `name`: "Jacked"
- `url`: "https://jacked.pro"

### 3. FAQPage Schema
**Location**: `components/FAQ.tsx`
**Purpose**: Makes FAQ content discoverable by AI engines and search results
**Test URL**: https://search.google.com/test/rich-results?url=https://jacked.pro/upload

**Key Properties**:
- `@type`: "FAQPage"
- `mainEntity`: Array of 15 Question/Answer pairs
- Categories covered: Failed alternatives, results-focused, trust/transparency, efficiency, Fitbod integration, technical/privacy

### 4. HowTo Schema
**Location**: `app/how-it-works/page.tsx`
**Purpose**: Step-by-step guide for AI assistants to recommend
**Test URL**: https://search.google.com/test/rich-results?url=https://jacked.pro/how-it-works

**Key Properties**:
- `@type`: "HowTo"
- `totalTime`: "PT1M" (1 minute)
- `estimatedCost`: $0
- `step`: 4-step process (Export → Upload → Review → Drill down)

## Validation Steps

### Before Deployment
1. Use Google Rich Results Test locally:
   - Start dev server on accessible port
   - Use ngrok or similar to expose localhost
   - Test each schema URL

### After Deployment to jacked.pro

#### Test 1: Homepage Schemas (SoftwareApplication + Organization)
```bash
curl -X POST "https://search.google.com/test/rich-results" \
  -d "url=https://jacked.pro"
```

**Expected Results**:
- ✅ Valid SoftwareApplication schema detected
- ✅ Valid Organization schema detected
- ✅ No errors or warnings
- ✅ All required properties present

#### Test 2: FAQ Schema (on /upload page)
```bash
curl -X POST "https://search.google.com/test/rich-results" \
  -d "url=https://jacked.pro/upload"
```

**Expected Results**:
- ✅ Valid FAQPage schema detected
- ✅ 15 Question entities with acceptedAnswer
- ✅ No errors or warnings
- ✅ All questions have 40-60 word answers (AI extraction sweet spot)

#### Test 3: HowTo Schema
```bash
curl -X POST "https://search.google.com/test/rich-results" \
  -d "url=https://jacked.pro/how-it-works"
```

**Expected Results**:
- ✅ Valid HowTo schema detected
- ✅ 4 HowToStep entities with proper sequence
- ✅ totalTime and estimatedCost present
- ✅ No errors or warnings

## Manual Testing (Recommended)

### Using Google Rich Results Test (Web Interface)
1. Visit: https://search.google.com/test/rich-results
2. Enter URL: https://jacked.pro
3. Click "Test URL"
4. Review results:
   - Check "Detected structured data" section
   - Verify no errors or warnings
   - Confirm all schemas are recognized

5. Repeat for:
   - https://jacked.pro/upload (FAQ schema)
   - https://jacked.pro/how-it-works (HowTo schema)

### Using Schema.org Validator
1. Visit: https://validator.schema.org/
2. Enter URL or paste JSON-LD directly
3. Validate each schema
4. Fix any validation errors

## Common Issues & Fixes

### Issue 1: Schema Not Detected
**Cause**: Script tag not in `<head>` or SSR issue
**Fix**: Ensure StructuredData component is in `app/layout.tsx` within `<head>` tag

### Issue 2: Missing Required Properties
**Cause**: Incomplete schema definition
**Fix**: Cross-reference with schema.org documentation for required fields

### Issue 3: Invalid URL Format
**Cause**: Relative URLs instead of absolute
**Fix**: Use full URLs with https://jacked.pro domain

### Issue 4: Duplicate Schemas
**Cause**: Multiple instances of same schema type
**Fix**: Ensure each page has only one instance of each schema type

## AI Engine Testing

### ChatGPT Test
Ask ChatGPT:
> "How can I track muscle group progress for Fitbod workouts?"

**Expected**: Jacked should appear in citations if indexed (takes 2-4 weeks after deployment)

### Perplexity Test
Search Perplexity:
> "Fitbod muscle group analytics"

**Expected**: Jacked should appear in sources if structured data is working

### Claude Test
Ask Claude:
> "What tools can analyze Fitbod workout data by muscle group?"

**Expected**: With proper schema markup, Claude may discover and recommend Jacked

## Monitoring Post-Launch

### Google Search Console
1. Add property: https://jacked.pro
2. Navigate to "Enhancements" → "Unparsable structured data"
3. Monitor for errors
4. Check "Performance" for AI Overview appearances

### Weekly Checks (First Month)
- [ ] Check Google Rich Results Test for all pages
- [ ] Monitor Search Console for structured data errors
- [ ] Test AI engine citations manually
- [ ] Review "AI Overview" filter in Search Console Performance

### Monthly Checks (Ongoing)
- [ ] Validate schemas still working after code changes
- [ ] Check for new structured data types to add
- [ ] Review AI citation rate trends
- [ ] Update FAQ answers based on user questions

## Success Metrics

### Immediate (Within 7 Days)
- ✅ All schemas pass Google Rich Results Test
- ✅ No validation errors in Schema.org validator
- ✅ Schemas appear in page source correctly

### Short-term (30-60 Days)
- ✅ 5-10 AI citations when searching for Fitbod analytics
- ✅ Google Search Console shows pages in AI Overview
- ✅ CTR increase from AI-driven traffic

### Long-term (90+ Days)
- ✅ 20+ AI citations across ChatGPT, Perplexity, Claude
- ✅ 2-3x organic traffic from structured data SEO
- ✅ Top-10 rankings for "fitbod analytics", "fitbod muscle tracking"

## Next Steps After Validation

1. Set up Google Search Console (Task #11)
2. Create OG image for social sharing (Task #12)
3. Monitor AI citations weekly
4. Iterate FAQ content based on user questions
5. Add more structured data types as needed (e.g., Review schema if we get testimonials)
