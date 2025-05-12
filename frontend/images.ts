// src/assets/images.ts
const images = import.meta.glob('./src/bookscovers/*.{png,jpg,jpeg,svg,gif}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

export default images;
