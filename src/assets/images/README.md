# Images Folder

## How to Add Your Images

### For Image Showcase Section:
1. Add your photos to this folder (JPG, PNG, or WebP format recommended)
2. Name them descriptively: `portrait-1.jpg`, `work-setup.jpg`, etc.
3. Update the `slides` array in `src/components/ImageShowcase/ImageShowcase.tsx`

Example:
```typescript
const slides: ImageSlide[] = [
  { id: 1, src: '/src/assets/images/portrait-1.jpg', alt: 'Professional portrait' },
  { id: 2, src: '/src/assets/images/workspace.jpg', alt: 'My workspace' },
  { id: 3, src: '/src/assets/images/coding.jpg', alt: 'Coding session' },
];
```

### Recommended Image Specs:
- **Format**: JPG or WebP for photos
- **Size**: 1200-1800px on longest side
- **Aspect Ratio**: 4:3 works best with current layout
- **File Size**: Keep under 500KB for performance (use compression tools)

### Tips:
- Use high-quality, professional photos
- Ensure good lighting and composition
- Consider having a mix of portrait and action shots
- Optimize images before uploading (use tools like TinyPNG, Squoosh, or ImageOptim)
