# About Page Content Configuration

**Instructions for AI Assistant:**

When a user wants to update About page content, help them by editing the appropriate files in this folder.

## Files Structure:

```
content/pages/about/
├── config.json           # Page configuration (banner image, mission statement)
├── story.md             # Our Story content (long-form markdown)
├── team.json            # Team members to display
└── images/              # About page-specific images
    └── our_mission_banner.png
```

## Configuration Guide:

### 1. Hero Section (`config.json` → `hero`)

**Configurable:**
- `backgroundMedia` - YouTube/Vimeo embed URL or image path (no local video files)
  - If empty (`""`) or null, only shows background color (#080808)
- `mediaType` - Type of media: `"image"`, `"youtube"`, or `"vimeo"` (optional, defaults to `"image"`)

**Fixed (in code):**
- Title: "ABOUT US"
- Title styling and star frame decoration
- Background color: `#080808` (dark gray/black)

**Display:**
- 📍 Full-screen hero with YouTube/Vimeo embed or image background
- 📍 "ABOUT US" title centered with star frame decoration (top-left, bottom-right)
- 📍 If `backgroundMedia` is empty, only dark background color is shown

**Supported Media Types:**
- `image` - Static image (e.g., `"/images/hero/hero-bg.jpg"`)
- `youtube` - YouTube embed URL (e.g., `"https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1..."`)
- `vimeo` - Vimeo embed URL
- Empty string (`""`) - No media, just background color

---

### 2. Our Story Section (`config.json` → `ourStory`)

**Configurable:**
- `content` - Path to markdown file (e.g., `"story.md"`)
- Content in `story.md` - Long-form company story text

**Fixed (in code):**
- Section title: "OUR STORY"
- Section number: "1"
- Button text: "LEARN MORE"
- Scroll target: "our-mission" section
- Button icon: Downward chevron (animates white → blue on hover)

**Display:**
- 📍 Section 1 of About page
- 📍 Content area: 60% width (centered on mobile, left-aligned on desktop)
- 📍 Animated diagonal line decoration (top-right, triggers on scroll)
- 📍 "LEARN MORE" button scrolls to Our Mission section

**Markdown Syntax:**
- Use `[text]` for highlighted words (white, bold, larger)
- Use `/newline` to create paragraph breaks
- Example: `[Over three decades] we have been creating magic. /newline Our journey continues...`

---

### 3. Our Mission Section (`config.json` → `ourMission`)

**Configurable:**
- `bannerImage` - Path to banner image (e.g., `"/images/our_mission_banner.png"`)
- `statement` - Mission statement text

**Fixed (in code):**
- Section title: "OUR MISSION"
- Section number: "2"
- Section ID: "our-mission" (for scroll targeting)
- Image overlay: 40% black opacity
- Image filter: Grayscale (100%)

**Display:**
- 📍 Section 2 of About page
- 📍 Full-width banner image (aspect ratio 1440:603 on desktop, 4:3 on mobile)
- 📍 Text overlay on banner:
  - Mobile: Bottom center, 1.5rem font
  - Desktop: Center right, 2.25rem font
- 📍 Image is displayed in grayscale with dark overlay

---

### 4. Team Section (`team.json`)

**Configurable:**
- `team.json` - Array of team member references

**Special Behavior:**
- **Empty array (`"members": []`)** → Displays ALL team members from shared pool
- **With members** → Displays only specified team members in specified order

**Team Members:**
- Loaded from shared pool: `/content/shared/team-members/`
- Each member has: id, name, role, tags, image, description, bio

**Fixed (in code):**
- Section title: "TEAM"
- Section number: "3"

**Display:**
- 📍 Section 3 of About page
- 📍 Grid of team member cards
- 📍 Each card shows: image, name, role, description
- 📍 Cards are clickable and link to team member detail pages

**Example `team.json`:**

```json
{
  "members": []
}
```
☝️ Empty array = show all team members

```json
{
  "members": [
    { "memberId": "tram-nguyen", "order": 1 },
    { "memberId": "long-dinh", "order": 2 },
    { "memberId": "minh-nguyen", "order": 3 }
  ]
}
```
☝️ Show specific members in custom order

---

### 5. Contact Us Section

**Configurable:**
- Form configuration is in ContactSection component (not in config.json)

**Fixed (in code):**
- Section title: "CONTACT US"
- Section number: "4"
- Background color: Black (#040404)

**Display:**
- 📍 Section 4 of About page
- 📍 Contact form on left
- 📍 Map on right

---

## Page Display Map:

```
📄 About Page (/about)
├── Hero Section (Full Screen)
│   ├── {backgroundMedia} (image or YouTube/Vimeo embed only)
│   └── "ABOUT US" title (with star frame)
│
├── Section 1: Our Story
│   ├── story.md content (60% width)
│   │   ├── Markdown text with [highlighted] words
│   │   └── Paragraph breaks with /newline
│   ├── "LEARN MORE" button → scrolls to #our-mission
│   └── Diagonal line decoration (animated on scroll)
│
├── Section 2: Our Mission (id="our-mission")
│   └── Full-width banner
│       ├── {bannerImage} (grayscale + dark overlay)
│       └── {statement} text overlay (center-right on desktop)
│
├── Section 3: Team
│   └── Team member grid (from team.json)
│       └── If empty → show all members
│           If populated → show specified members in order
│
└── Section 4: Contact Us
    └── Contact form + map
```

## Example Configuration:

**config.json:**
```json
{
    "hero": {
        "backgroundMedia": "/images/hero/hero-bg.jpg",
        "mediaType": "image"
    },
    "ourStory": {
        "content": "story.md"
    },
    "ourMission": {
        "bannerImage": "/images/our_mission_banner.png",
        "statement": "We are dedicated to turning your vision into reality, delivering high-quality productions that resonate with audiences and leave a lasting impression."
    }
}
```

**Alternative hero with YouTube video:**
```json
{
    "hero": {
        "backgroundMedia": "https://www.youtube.com/embed/VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=VIDEO_ID&controls=0&showinfo=0&modestbranding=1&vq=hd1080&hd=1",
        "mediaType": "youtube"
    }
}
```

**Hero with no background media (just background color):**
```json
{
    "hero": {
        "backgroundMedia": "",
        "mediaType": "image"
    }
}
```

**story.md:**
```markdown
[Over the past three decades, Luna Pictures has been delighting and inspiring audiences worldwide, by creating some of Hollywood's most memorable screen moments.] /newline
RSP was established in 1995 in Adelaide, South Australia, by co-founders Tony Clark, Wayne Lewis and Gail Fuller, who named it after the Rising Sun Inn, the site of the first board meeting which was held over a Coopers Ale.
RSP's notable clients include Disney, Marvel, Warner Bros., Netflix, Amazon, and MGM, among many others.
```

**team.json (show all members):**
```json
{
    "members": []
}
```

**team.json (show specific members):**
```json
{
    "members": [
        { "memberId": "tram-nguyen", "order": 1 },
        { "memberId": "long-dinh", "order": 2 }
    ]
}
```

---

## Common Tasks:

### Change hero background:
1. For image: Add image to `/public/images/hero/` folder
2. Edit `config.json` → `hero.backgroundMedia` with path (e.g., `"/images/hero/hero-bg.jpg"`)
3. Edit `config.json` → `hero.mediaType` to `"image"`
4. For YouTube video: Use embed URL with autoplay parameters and set `mediaType` to `"youtube"`

### Update company story:
1. Edit `story.md`
2. Use `[text]` for highlights, `/newline` for paragraphs

### Change mission statement:
1. Edit `config.json` → `ourMission.statement`

### Change mission banner image:
1. Add new image to `images/` folder
2. Update `config.json` → `ourMission.bannerImage` with new path

### Show all team members:
1. Edit `team.json` → set `"members": []`

### Show specific team members:
1. Edit `team.json` → add members with order:
```json
{
    "members": [
        { "memberId": "member-id", "order": 1 }
    ]
}
```
