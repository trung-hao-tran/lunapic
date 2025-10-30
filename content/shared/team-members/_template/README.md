# Team Member Creation Guide

**Instructions for AI Assistant:**

When a user wants to add a new team member, help them by:

1. **Ask for member details:**
   - Full name (will be displayed in UPPERCASE)
   - Role/job title
   - Team(s) they belong to (VFX, Production, or both)
   - Short bio/description (under 150 characters)
   - Email address (optional)
   - Phone number (optional)
   - Photo location

2. **Create folder structure:**
   ```
   content/shared/team-members/{member-slug}/
   ├── data.json
   └── bio.md
   ```

3. **Generate `data.json` with this structure:**
   ```json
   {
     "id": "member-slug",
     "name": "FULL NAME",
     "role": "VFX Team",
     "tags": ["VFX"],
     "image": "/images/team/Member Name.jpg",
     "description": "Short bio for team grid pages...",
     "email": "member@lunapictures.com",
     "phone": "+1 (555) 123-4567",
     "contactLink": "/contact"
   }
   ```

4. **Create `bio.md`:**
   - Ask user for full biography (2-4 paragraphs)
   - Can include markdown headings, lists, bold, italic
   - Professional but personable tone
   - Include key achievements/skills

5. **Instruct user about photo:**
   - Portrait orientation (3:4 ratio recommended)
   - Size: 800x1066px or similar
   - Place in `/public/images/team/` folder
   - Professional quality

## Field Reference & Display Locations:

### Required Fields:

- **`id`** - URL slug (lowercase-with-hyphens, should match folder name)
  - 📍 Used in: Team member detail page URL (`/team/{id}`)

- **`name`** - Full name in UPPERCASE
  - 📍 Team grid pages: On team member card
  - 📍 About page: In team sections
  - 📍 Team detail page: Large heading at top
  - 📍 Portfolio detail page: In "Crew Included" if member worked on project

- **`role`** - Job title or team designation
  - 📍 Team grid pages: Below name on member card
  - 📍 Team detail page: Below name

- **`tags`** - Array: ["VFX"], ["Production"], or ["VFX", "Production"]
  - 📍 Used for: Filtering which pages show this member
  - 📍 VFX team page: Shows members with "VFX" tag
  - 📍 Production team page: Shows members with "Production" tag
  - 📍 About page: Determines which team section(s) to appear in

- **`image`** - Path to photo
  - 📍 Team grid pages: Team member card photo
  - 📍 Team detail page: Large profile photo with star frame

- **`description`** - Brief bio (under 150 chars)
  - 📍 Team grid pages: Below role on member card
  - 📍 About page: In team member card

### Optional Fields:

- **`email`** - Email address (creates mailto: link)
  - 📍 Team detail page: Contact information section with clickable mailto: link

- **`phone`** - Phone number
  - 📍 Team detail page: Contact information section below photo

- **`contactLink`** - URL for "Get In Touch" button (defaults to `/contact`)
  - 📍 Team detail page: "Get In Touch" button destination

- **`bio.md`** - Full biography markdown file
  - 📍 Team detail page: Main content area (right column or below photo on mobile)

## Team Tags:

- **VFX only**: `["VFX"]` - Shows on VFX team page
- **Production only**: `["Production"]` - Shows on Production team page
- **Both teams**: `["VFX", "Production"]` - Shows on both team pages

## URL Structure:

The member's detail page URL will be: `/team/{id}`

Example: `id: "john-doe"` → `/team/john-doe`

**Important**: The `id` field should match the folder name.

## Page Display Map:

```
📄 Team Grid Pages (VFX, Production, About)
├── Team Member Grid
│   └── Team Member Card
│       ├── image (photo with star frame)
│       ├── name (UPPERCASE)
│       ├── role (below name)
│       └── description (short bio)

📄 Team Member Detail Page (/team/{id})
├── Left Column (60%)
│   ├── image (large profile photo with star frame)
│   └── Contact Information
│       ├── EMAIL ADDRESS: {email} (clickable mailto:)
│       └── PHONE: {phone}
└── Right Column (40%)
    ├── name (large heading, UPPERCASE)
    ├── role (below name)
    ├── bio.md (full biography with markdown)
    └── GET IN TOUCH button → {contactLink}

📄 About Page
├── VFX Team Section
│   └── Shows members with tags: ["VFX"]
└── Production Team Section
    └── Shows members with tags: ["Production"]

📄 Portfolio Detail Pages
└── Crew Included Section
    └── Lists team member names from portfolio item's crew[] array
```

## Example Reference:

See `tram-nguyen/` folder for a complete example.
