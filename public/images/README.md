# Images Directory

This directory contains all the static images used in the Hardy Technology website.

## Structure

- `/brand`: Logo and brand assets
- `/hero`: Hero section images
- `/team`: Team member photos
- `/projects`: Project screenshots and thumbnails
- `/services`: Service-related illustrations
- `/training`: Training event images
- `/testimonials`: Customer testimonial photos
- `/icons`: Custom icons (SVG format)
- `/backgrounds`: Background patterns and textures
- `/blog`: Blog post featured images

## Usage Guidelines

1. Use WebP format when possible for better performance
2. Keep image sizes under 200KB when possible
3. Use descriptive filenames (e.g., `react-training-workshop.webp`)
4. Include appropriate alt text when using images in components

## Optimization

All images should be optimized before adding to this directory. You can use tools like:
- [Squoosh](https://squoosh.app/)
- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)

## Responsive Images

For responsive images, use the Next.js Image component with appropriate sizes:

```jsx
import Image from 'next/image';

<Image
  src="/images/projects/project-name.webp"
  alt="Project description"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

