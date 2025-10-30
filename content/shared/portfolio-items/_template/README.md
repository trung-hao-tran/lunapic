# Portfolio Item Creation Guide

**Instructions for AI Assistant:**

When a user wants to create a new portfolio item, help them by:

1. **Ask for project details:**
   - Project name/title
   - Completion date
   - Categories (Documentary, Music Video, Commercial, Event, etc.)
   - Team involvement (VFX, Production, or both)
   - Brief description
   - Crew members involved
   - Whether they have videos (YouTube/Vimeo) or images for headers
   - Any gallery images

2. **Create folder structure:**
   ```
   content/shared/portfolio-items/{project-slug}/
   ├── data.json
   ├── overview.md
   └── images/
   ```

3. **Generate `data.json` with this structure:**
   ```json
   {
     "id": "project-slug",
     "title": "Project Title (Year)",
     "date": "Month Day Year",
     "categories": ["Category1", "Category2"],
     "tags": ["VFX", "Production"],
     "thumbnail": "/content/shared/portfolio-items/{project-slug}/images/thumbnail.jpg",
     "description": "Brief description...",
     "headerLeft": "YouTube URL or image path",
     "headerRight": "YouTube URL or image path",
     "crew": ["Member 1", "Member 2"],
     "gallery": [
       "/content/shared/portfolio-items/{project-slug}/images/gallery-1.jpg",
       "/content/shared/portfolio-items/{project-slug}/images/gallery-2.jpg"
     ]
   }
   ```

4. **Create `overview.md`:**
   - Ask user for detailed project overview (2-4 paragraphs)
   - Support markdown formatting
   - Support `[text]` for highlighted text
   - Support `/newline` for explicit breaks

5. **Instruct user to add images:**
   - Tell them to place images in the `images/` folder
   - Recommended sizes:
     - Thumbnail: 1200x900px (4:3 ratio)
     - Gallery: portrait (9:16) or landscape (16:9)

## Field Reference & Display Locations:

### Required Fields:

- **`id`** - URL slug (lowercase-with-hyphens)
  - 📍 Used in: Portfolio detail page URL (`/portfolio/{id}`)

- **`title`** - Display title
  - 📍 Gallery card: Below thumbnail image
  - 📍 Portfolio detail page: Large heading at top

- **`date`** - Format: "Mai 3 2020" or "Jan 15 2024"
  - 📍 Gallery card: Below title, aligned bottom
  - 📍 Portfolio detail page: In project details section

- **`categories`** - Array of categories
  - 📍 Gallery card: Right side as pill/badge chips
  - 📍 Portfolio detail page: In "Type" field of project details

- **`thumbnail`** - Path to thumbnail image
  - 📍 Gallery grid: Main image displayed in gallery
  - 📍 Size determines card width in masonry layout

### Optional Fields:

- **`tags`** - ["VFX"] or ["Production"] or both
  - 📍 Used for: Filtering which team pages show this item
  - 📍 VFX page: Shows items tagged "VFX"
  - 📍 Production page: Shows items tagged "Production"

- **`description`** - Short text (under 200 chars)
  - 📍 Portfolio detail page: Below header images in description section

- **`headerLeft`** - Video URL or image path
  - 📍 Portfolio detail page: Left column header media (video or image)

- **`headerRight`** - Video URL or image path
  - 📍 Portfolio detail page: Right column header media (larger, with project details)

- **`crew`** - Array of crew member names
  - 📍 Portfolio detail page: "Crew Included" field in project details section

- **`gallery`** - Array of image paths
  - 📍 Portfolio detail page: Horizontal scrolling gallery below project overview section

- **`overview.md`** - Detailed project text
  - 📍 Portfolio detail page: "Project Overview" section (Section 2)

### Video URLs:
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

## Page Display Map:

```
📄 Gallery Pages (Homepage, VFX, Production, Work)
├── Portfolio Grid
│   └── Portfolio Card
│       ├── thumbnail (image)
│       ├── title (text)
│       ├── date (text, bottom-aligned)
│       ├── categories (pills/badges, right side)
│       └── arrow icon (hover effect)

📄 Portfolio Detail Page (/portfolio/{id})
├── Section 1: Header
│   ├── Left Column
│   │   ├── title (large heading with star frame)
│   │   └── headerLeft (video or image)
│   └── Right Column
│       ├── headerRight (large video or image)
│       └── Project Details
│           ├── Client: Quantro
│           ├── Date: {date}
│           ├── Type: {categories}
│           └── Crew Included: {crew}
├── Section 2: Project Overview
│   └── overview.md (centered, 40% width, markdown content)
└── Section 3: Gallery
    └── gallery[] (horizontal scrolling images)
```

## Example Reference:

See `urban-dreams-2020/` folder for a complete example.
