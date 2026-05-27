# Photos go here

Drop your memory photos into this folder, then reference them from
`src/data/memories.ts` like:

```ts
{
  id: 'mem-1',
  title: 'The first photo',
  date: '2014',
  description: 'Where it all started.',
  imageUrl: '/memories/2014-firstdate.jpg',  //  <-- path starts with /memories/
}
```

## Recommendations

- Format: `.jpg` or `.webp` (avoid PNG for photos — much larger files)
- Width: ~1200px is plenty; the gallery scales them down
- Naming: lowercase, no spaces (e.g. `2014-firstdate.jpg`, not `First Date.JPG`)
- File size: keep each under ~500KB if possible — your gallery loads faster
