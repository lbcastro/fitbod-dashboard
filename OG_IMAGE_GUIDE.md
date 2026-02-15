# Open Graph Image Creation Guide

## Overview
The OG (Open Graph) image is crucial for social sharing and AI engine citations. It appears when jacked.pro is shared on Twitter, LinkedIn, Slack, or embedded in AI responses.

**Current Status**: Referenced in metadata but file doesn't exist yet
**Required Dimensions**: 1200x630px
**File Location**: `/public/og-image.png`

## Design Requirements

### Must-Have Elements
1. **Screenshot of dashboard** - Show the Progress Summary grid with status indicators
2. **Value proposition text** - Clear, results-focused headline
3. **Branding** - "JACKED" wordmark prominently displayed
4. **Contrast** - Dark background (matches app) with bright accent (green)

### Design Specifications
- **Dimensions**: 1200px × 630px (Facebook/Twitter/LinkedIn standard)
- **Format**: PNG (supports transparency, better quality than JPG)
- **File size**: < 1MB (ideally < 300KB for fast loading)
- **Safe zone**: Keep important content within center 1000x600px (avoid edge cropping)
- **Text**: Large enough to read at thumbnail size (200x105px)

## Option 1: Screenshot-Based OG Image (Recommended)

### A. Capture Dashboard Screenshot

**Steps**:
1. Navigate to http://localhost:3004/upload
2. Upload a real Fitbod CSV (or use demo data)
3. View dashboard with populated data
4. Open browser DevTools (F12)
5. Set viewport to desktop: 1200px width
6. Screenshot the Progress Summary section:
   - Include the muscle group grid
   - Show mix of green/yellow/red indicators
   - Ensure clean, uncluttered view

**Tools**:
- Chrome DevTools: Cmd+Shift+P → "Capture screenshot"
- macOS: Cmd+Shift+4 → drag to select area
- Playwright: Can automate screenshot (see below)

### B. Add Overlay Text

**Design in Figma/Canva/Photoshop**:

1. Open 1200x630px canvas
2. Place dashboard screenshot (slightly zoomed/cropped if needed)
3. Add dark gradient overlay (top 30% of image)
4. Add text layer:
   ```
   Headline: "See which muscles aren't growing"
   Subtext: "30-second muscle group analytics for Fitbod users"
   ```
5. Add "JACKED" wordmark (top-left)
6. Add accent element (green indicator or arrow)

**Text Styling**:
- Headline: 60-80px, bold, white
- Subtext: 32-40px, regular, rgba(255,255,255,0.9)
- Font: System font stack (Arial/Helvetica) for universal compatibility

### C. Export and Optimize

1. Export as PNG
2. Optimize with ImageOptim or tinypng.com
3. Target: < 300KB file size
4. Save to `/public/og-image.png`

## Option 2: Automated Screenshot with Playwright

### A. Create Screenshot Script

Create `/scripts/generate-og-image.js`:

```javascript
const { chromium } = require('playwright');
const sharp = require('sharp');

async function generateOGImage() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 1000 }
  });

  // Navigate to dashboard (you'll need to upload CSV first manually)
  await page.goto('http://localhost:3004/dashboard');

  // Wait for content to load
  await page.waitForSelector('.progress-summary', { timeout: 10000 });

  // Take screenshot of specific element
  const element = await page.$('.progress-summary');
  const screenshot = await element.screenshot({ type: 'png' });

  await browser.close();

  // Resize and crop to 1200x630
  await sharp(screenshot)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center'
    })
    .toFile('public/og-image.png');

  console.log('✅ OG image generated at public/og-image.png');
}

generateOGImage();
```

**Run**:
```bash
npm install playwright sharp
node scripts/generate-og-image.js
```

### B. Add Text Overlay with Canvas

Enhance script to add text overlay:

```javascript
const { createCanvas, loadImage } = require('canvas');

async function addTextOverlay(imagePath) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');

  // Load screenshot
  const screenshot = await loadImage(imagePath);
  ctx.drawImage(screenshot, 0, 0, 1200, 630);

  // Add gradient overlay (top)
  const gradient = ctx.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 1200, 200);

  // Add headline
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 72px Arial';
  ctx.fillText('See which muscles aren\'t growing', 60, 100);

  // Add subtext
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.font = '36px Arial';
  ctx.fillText('30-second muscle group analytics for Fitbod users', 60, 150);

  // Add "JACKED" wordmark
  ctx.fillStyle = '#4ade80';
  ctx.font = 'bold 48px Arial';
  ctx.fillText('JACKED', 60, 580);

  // Save
  const buffer = canvas.toBuffer('image/png');
  require('fs').writeFileSync('public/og-image.png', buffer);

  console.log('✅ OG image with text overlay generated');
}
```

## Option 3: Design from Scratch (No Screenshot)

### A. Figma Template

**Layout**:
```
┌────────────────────────────────────────┐
│  JACKED              [Logo/Icon]       │ ← 100px height
│                                        │
│                                        │
│   See which muscles                    │ ← 200px centered
│   aren't growing                       │
│                                        │
│   ✓ Chest    ↓ Back     → Shoulders   │ ← 150px
│   ✓ Biceps   ↓ Triceps  → Quads      │    Visual indicators
│                                        │
│   30-second analytics for Fitbod      │ ← 80px
│   jacked.pro                          │
└────────────────────────────────────────┘
```

**Color Scheme**:
- Background: `#000000` (black)
- Accent: `#4ade80` (green)
- Text: `#ffffff` (white)
- Secondary: `#a3a3a3` (gray)

### B. Canva Template (No Code)

1. Go to canva.com
2. Create custom size: 1200 × 630px
3. Choose dark template or start blank
4. Add elements:
   - Background: Solid black or dark gradient
   - Text: "See which muscles aren't growing"
   - Subtext: "30-second Fitbod analytics"
   - Icons: Add 3-4 status indicators (✓ ↓ →)
   - Branding: "JACKED" in green
5. Download as PNG

## Option 4: Use AI Image Generation

### Using nano-banana-pro Skill

```bash
# Generate OG image with Gemini's Nano Banana Pro
# Prompt optimized for clarity at small sizes
```

**Prompt**:
```
Create a 1200x630px social media preview image for a fitness analytics app called "JACKED".

Style: Modern, high contrast, dark theme (black background)

Layout:
- Top left: "JACKED" wordmark in bright green (#4ade80)
- Center: Large headline text "See which muscles aren't growing" in white, bold, 72px
- Below headline: Smaller text "30-second analytics for Fitbod users" in light gray
- Bottom third: Stylized dashboard preview showing 3 muscle groups with status indicators:
  - Chest ✓ (green)
  - Back ↓ (red)
  - Shoulders → (yellow)

Requirements:
- High contrast for readability at thumbnail size
- Clean, professional design
- No photo-realistic elements, flat design preferred
- Emphasis on the headline
```

## Validation Checklist

After creating OG image:

- [ ] File exists at `/public/og-image.png`
- [ ] Dimensions are exactly 1200 × 630px
- [ ] File size < 1MB (ideally < 300KB)
- [ ] Text is readable when scaled to 200x105px
- [ ] Important content within safe zone (50px margin)
- [ ] Branding ("JACKED") is visible
- [ ] Value proposition is clear at a glance

## Testing the OG Image

### A. Local Testing

**Meta Tag Preview**:
```bash
curl http://localhost:3004 | grep "og:image"
```

**Expected output**:
```html
<meta property="og:image" content="http://localhost:3004/og-image.png"/>
```

### B. Social Media Preview Tools

1. **Facebook Debugger**
   - URL: https://developers.facebook.com/tools/debug/
   - Enter: https://jacked.pro
   - Click "Scrape Again" to refresh cache

2. **Twitter Card Validator**
   - URL: https://cards-dev.twitter.com/validator
   - Enter: https://jacked.pro
   - Verify image displays correctly

3. **LinkedIn Post Inspector**
   - URL: https://www.linkedin.com/post-inspector/
   - Enter: https://jacked.pro
   - Check thumbnail preview

4. **Slack Message Tester**
   - Post link in Slack channel
   - Verify unfurl preview shows image

### C. Automated Testing

```bash
# Check if image exists and is correct size
file public/og-image.png
# Expected: PNG image data, 1200 x 630

# Check file size
ls -lh public/og-image.png
# Expected: < 1MB
```

## Update Metadata After Creation

Once OG image is created, the metadata is already configured in `app/layout.tsx`:

```typescript
openGraph: {
  title: "Jacked - See which muscles aren't growing",
  description: "Upload your Fitbod data. See muscle group trends in 30 seconds.",
  url: "https://jacked.pro",
  images: [{
    url: "/og-image.png",  // ✅ Already configured
    width: 1200,
    height: 630,
    alt: "Jacked dashboard showing muscle group progress indicators"
  }]
}
```

No code changes needed - just add the image file!

## Best Practices

### Do's
- ✅ Use real dashboard screenshot (builds trust)
- ✅ Keep text large and bold (readable at small sizes)
- ✅ Use high contrast (black bg, white text, green accent)
- ✅ Show value prop immediately (don't make people guess)
- ✅ Include branding (JACKED wordmark)
- ✅ Test on multiple platforms (Twitter, LinkedIn, Slack)

### Don'ts
- ❌ Don't use small text (< 32px at full size)
- ❌ Don't clutter with too much information
- ❌ Don't use low contrast colors (gray on gray)
- ❌ Don't rely solely on icons without text
- ❌ Don't use photos of people (off-brand, doesn't explain product)
- ❌ Don't make it too "designed" (keep it functional)

## Quick Win: Temporary OG Image

If you need something immediately, use a simple text-only design:

1. Open https://www.opengraph.xyz/
2. Enter:
   - Title: "See which muscles aren't growing"
   - Description: "30-second muscle group analytics for Fitbod users"
   - Logo: Upload JACKED logo or skip
3. Download generated PNG
4. Save to `/public/og-image.png`

This gets you 80% of the way there in 5 minutes. Iterate later with dashboard screenshot.

## Priority: HIGH

The OG image significantly impacts:
1. **Social sharing CTR** - Good image = 2-3x more clicks
2. **Professional perception** - Shows polish and attention to detail
3. **AI citations** - Some AI engines show OG images in responses
4. **Link previews** - Slack, Discord, iMessage all use it

**Recommended**: Create temporary text-only version now (5 min), then iterate with dashboard screenshot later (1-2 hours).

## Next Steps

1. Choose creation method based on time/resources:
   - Quick (5 min): opengraph.xyz text-only
   - Good (1 hour): Screenshot + Canva overlay
   - Great (2 hours): Playwright automation + text overlay
   - Best (3+ hours): Custom Figma design with polished visuals

2. Create and save to `/public/og-image.png`

3. Test locally: Visit http://localhost:3004 and view page source

4. Deploy to jacked.pro

5. Validate with Facebook Debugger, Twitter Card Validator

6. Monitor social share CTR in analytics

7. Iterate based on performance data
