# FinalCta Daughter Photo Integration

## Summary

Add the doctor's daughter photo (holding a toy telephone) to the "Залишились запитання?" FinalCta section. The toy phone creates a visual metaphor for contacting the doctor.

## Layout

### Desktop (>768px)

- Two-column grid layout replacing the current centered single-column
- Left column: daughter cutout (transparent PNG), aligned to bottom, max-height ~400px
- Right column: heading, subtext, CTA button — left-aligned, vertically centered
- Container max-width widened from 700px to ~900px

### Mobile (<768px)

- Single column, stacked
- Photo centered above text, ~180-220px tall, bottom-fade gradient mask
- Text + CTA centered below (preserves existing mobile layout)

## Photo Treatment

- Background removed using `rembg` Python library
- Saved as transparent PNG in `public/images/`
- CSS `mask-image: linear-gradient(to bottom, black 60%, transparent 100%)` for soft bottom fade into dark bg
- Image is decorative: `alt="" aria-hidden="true"`

## Implementation Steps

1. Install `rembg` and remove photo background, save as PNG
2. Update `FinalCta.tsx` to add the image element and two-column grid
3. Update `FinalCta.module.css` with grid layout, photo styling, gradient mask, mobile responsive rules
4. Verify on mobile and desktop
