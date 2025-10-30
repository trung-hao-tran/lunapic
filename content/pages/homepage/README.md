# Homepage Content Configuration

**Instructions for AI Assistant:**

When a user wants to update homepage content, help them by editing the appropriate files in this folder.

## Files Structure:

```
content/pages/homepage/
├── config.json           # Main page configuration
├── portfolio.json        # Portfolio items to display
├── testimonials.json     # Testimonials to show
└── images/              # Homepage-specific images
    ├── hero-bg.jpg      # Hero background (if using image instead of video)
    └── about-us.jpg     # About section image
```

## Configuration Guide:

### 1. Hero Section (`config.json` → `hero`)

**Configurable:**
- `backgroundMedia` - YouTube/Vimeo embed URL or image path (no local video files)
  - If empty (`""`) or null, only shows background color (#080808)
- `mediaType` - Type of media: `"image"`, `"youtube"`, or `"vimeo"` (optional, defaults to `"image"`)
- `subtitle` - Text below logo

**Fixed (in code):**
- Logo: `/Logo full.svg`
- Button text: "LET'S TALK"
- Button link: `/contact`
- Scroll target: About Us section
- Background color: `#080808` (dark gray/black)

**Display:**
- 📍 Full-screen hero with YouTube/Vimeo embed or image background
- 📍 If `backgroundMedia` is empty, only dark background color is shown
- 📍 Logo centered with star frame decoration
- 📍 Subtitle below logo
- 📍 CTA button at bottom

---

### 2. About Us Section (`config.json` → `aboutUs`)

**Configurable:**
- `heading` - Main heading (use `[brackets]` for highlighted words)
- `description` - Paragraph text
- `image` - Image path

**Fixed (in code):**
- Section title: "ABOUT US"
- Section number: "2"
- Button text: "OUR STORY"
- Button link: `/about` (or configurable if needed)

**Display:**
- 📍 Section 2 of homepage
- 📍 Left: Heading + description + button
- 📍 Right: Image with star frame
- 📍 Highlighted words in heading appear in white (rest is gray)

---

### 3. Our Work Section (`config.json` → `ourWork`)

**Configurable:**
- `showreelUrl` - YouTube/Vimeo embed URL
- `galleryConfig.hasViewWorkButton` - Show "VIEW PORTFOLIO" button
- `galleryConfig.hasViewMoreButton` - Show "VIEW MORE" expand button

**Portfolio Items (`portfolio.json`):**
- List of portfolio items with `itemId`, `order`, and `weight`
- Items reference shared pool: `/content/shared/portfolio-items/`

**Fixed (in code):**
- Section title: "OUR WORK"
- Section number: "3"
- Background text: "SHOW" (top-left) and "REEL" (bottom-right)
- Portfolio heading: "OUR PORTFOLIO"

**Display:**
- 📍 Section 3 of homepage
- 📍 Showreel video centered with decorative text behind
- 📍 Portfolio gallery below with masonry layout
- 📍 Items displayed based on `weight` (width) and `order`

---

### 4. Testimonials Section (`config.json` → `testimonials`)

**Configurable:**
- `bannerNumber` - Number displayed in banner (e.g., 5034)

**Testimonials (`testimonials.json`):**
- Array of testimonial objects with name, title, company, quote, image
- Use `[brackets]` in quotes for highlighted text

**Fixed (in code):**
- Section title: "TESTIMONIALS"
- Section number: "4"
- Banner text: "SATISFIED CLIENTS"
- Background color: White (#FDFDFD)

**Display:**
- 📍 Section 4 of homepage
- 📍 Banner with rolling number animation (0 → bannerNumber)
- 📍 Carousel of testimonial cards
- 📍 Progress bar showing current testimonial

---

### 5. Contact Us Section

**Configurable:**
- Form configuration is in ContactSection component (not in config.json)

**Fixed (in code):**
- Section title: "CONTACT US"
- Section number: "5"
- Background color: White (#FDFDFD)

**Display:**
- 📍 Section 5 of homepage
- 📍 Contact form on left
- 📍 Map on right

---

## Page Display Map:

```
📄 Homepage (/)
├── Hero Section (Full Screen)
│   ├── backgroundMedia (video or image)
│   ├── Logo (centered with star frame)
│   ├── subtitle
│   └── "LET'S TALK" button → {ctaButtonLink}
│
├── Section 2: About Us
│   ├── Left Column (60%)
│   │   ├── heading (with [highlighted] words)
│   │   ├── description
│   │   └── "OUR STORY" button → /about
│   └── Right Column (40%)
│       └── image (with star frame)
│
├── Section 3: Our Work
│   ├── Showreel Video
│   │   └── {showreelUrl} (centered with star frame)
│   └── Portfolio Gallery
│       ├── "OUR PORTFOLIO" heading
│       ├── Gallery grid (from portfolio.json)
│       └── "VIEW PORTFOLIO" button (if hasViewWorkButton: true)
│
├── Section 4: Testimonials (White background)
│   ├── Banner
│   │   ├── {bannerNumber} (rolling animation)
│   │   └── "SATISFIED CLIENTS"
│   └── Testimonials Carousel
│       └── Cards from testimonials.json
│
└── Section 5: Contact Us (White background)
    └── Contact form + map
```

## Example Values:

**Hero:**
```json
{
  "backgroundMedia": "https://www.youtube.com/embed/VIDEO_ID",
  "subtitle": "Premier video production studio in the heart of Australia",
  "ctaButtonLink": "/contact"
}
```

**About Us:**
```json
{
  "heading": "We transform ideas into visual stories that [inspire and connect]",
  "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  "image": "/content/pages/homepage/images/about-us.jpg"
}
```

**Our Work:**
```json
{
  "showreelUrl": "https://www.youtube.com/embed/RL-mQorhj-4",
  "galleryConfig": {
    "hasViewWorkButton": true,
    "hasViewMoreButton": false
  }
}
```

**Testimonials:**
```json
{
  "bannerNumber": 5034
}
```
