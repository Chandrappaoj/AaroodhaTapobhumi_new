# WordPress + Elementor Migration Guide

This React application serves as a high-fidelity prototype for the **Sri Siddaroodha Swamiji Ashrama** website. Follow this guide to recreate the design and functionality using WordPress and Elementor.

## 1. Design System Setup

Before building pages, configure your Elementor Global Settings to match the prototype.

### Global Colors
Add these to **Elementor > Site Settings > Global Colors**.

| Color Name | Hex / HSL Value | Description |
| :--- | :--- | :--- |
| **Primary (Saffron)** | `#FF9933` / `hsl(30, 100%, 60%)` | Main brand color, buttons, icons |
| **Saffron Light** | `#FFCC99` / `hsl(30, 100%, 80%)` | Backgrounds, accents |
| **Saffron Dark** | `#CC6600` / `hsl(30, 100%, 40%)` | Hover states, gradients |
| **Earth Brown** | `#5D4037` / `hsl(14, 23%, 30%)` | Footers, dark overlays |
| **Cream** | `#FFFDD0` / `hsl(57, 100%, 91%)` | Light text on dark backgrounds |
| **Background** | `#FFFAFA` / `hsl(0, 0%, 98%)` | Main page background |
| **Text (Foreground)** | `#333333` / `hsl(0, 0%, 20%)` | Body text |

### Typography
Configure **Elementor > Site Settings > Typography**.

| Element | Font Family | Weight | Size (Desktop) |
| :--- | :--- | :--- | :--- |
| **Headings (Display)** | **Playfair Display** | 700 (Bold) | H1: 60px, H2: 40px, H3: 32px |
| **Body Text** | **Source Sans 3** | 400 (Regular) | P: 18px |
| **Kannada Text** | **Noto Sans Kannada** | 400/700 | 16px - 20px |

---

## 2. Component Mapping

How to recreate the React components using Elementor Widgets.

### Hero Section
*   **Widget**: Section (1 Column)
*   **Settings**:
    *   **Height**: Min Height (90vh)
    *   **Background**: Image (Hero Image)
    *   **Background Overlay**: Gradient (Earth Brown #5D4037 -> Transparent) with Opacity 0.8
*   **Content**: Heading (Title), Text Editor (Subtitle), Button (CTA)

### Section Headers
*   **Structure**: Group of 3 widgets
*   **Kannda Title**: Heading (H6), Color: Primary
*   **English Title**: Heading (H2), Font: Playfair Display
*   **Subtitle**: Text Editor, Color: Text Gray

### Seva / Activity Cards
*   **Widget**: **Icon Box**
*   **Settings**:
    *   **Icon Position**: Top or Left
    *   **View**: Stacked
    *   **Style**: Primary Color Icon, White Background, Box Shadow on Hover

### Event Cards
*   **Widget**: Inner Section (2 Columns) or Container
*   **Column 1**: Date Badge (Heading + Text)
*   **Column 2**: Event Details (Title, Time/Location Icon List, Description)
*   **Style**: Border Radius 12px, White Background, Soft Shadow

### Gallery
*   **Widget**: **Basic Gallery** or **Gallery** (Pro)
*   **Settings**: Grid Layout, 4 Columns, Lightbox Enabled

### Contact Form
*   **Plugin**: Contact Form 7 or Elementor Form (Pro)
*   **Fields**: Name, Phone, Email, Subject, Message
*   **Style**: Match buttons to "Primary" style

---

## 3. Page-by-Page Breakdown

### Home Page (`Index.tsx`)
1.  **Hero**: Full screen, image bg.
2.  **About Preview**: 2 Column Section (Text + Image).
3.  **Visiting Hours**: 3 Column Inner Section with Icon Boxes.
4.  **Seva Preview**: 4 Column Grid of Icon Boxes.
5.  **Featured Image (Parallax)**: Section with Fixed Background Attachment.
6.  **Upcoming Events**: 3 Column Grid of Cards.
7.  **Quote**: Single Column, Centered Text, Italic.
8.  **Gallery**: 4 Column Image Grid.
9.  **Donation CTA**: Gradient Background Section.

### About Page (`About.tsx`)
1.  **Hero**: Smaller height (50vh).
2.  **History**: Text + Image side-by-side.
3.  **Mission & Vision**: 2 Cards (Target/Eye icons).
4.  **Values**: 4 Cards (Compassion, Wisdom, Devotion, Service).

### Seva Page (`Seva.tsx`)
1.  **Annadanam**: Detailed section with Counters (Meals Served, Days).
2.  **Spiritual Programs**: Standard Text + List.
3.  **All Services**: Grid of all available services.

### Events Page (`Events.tsx`)
1.  **Upcoming**: List of future events.
2.  **Past Events**: List of completed events (grayed out or separate section).

### Contact Page (`Contact.tsx`)
1.  **Info Columns**: Address, Phone, Email (Icon List).
2.  **Form**: Contact Form widget.
3.  **Map**: Google Maps Embed widget.

---

## 4. Assets & Images
*   All images used in the React app are located in `src/assets`.
*   You will need to upload these to the WordPress Media Library.
*   **Recommendation**: Use `.webp` format for better performance in WordPress.

## 5. Plugins to Install
1.  **Elementor Website Builder** (Required)
2.  **Elementor Header & Footer Builder** (For custom header/footer)
3.  **Contact Form 7** (If not using Elementor Pro Forms)
4.  **Essential Addons for Elementor** (Optional: for better cards/grids)
