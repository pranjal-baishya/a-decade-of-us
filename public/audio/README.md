# Audio files go here

Drop your voice note (or background music in the future) into this folder.

To wire up a voice note, edit `src/data/letter.ts`:

```ts
voiceNote: {
  audioUrl: '/audio/letter.mp3',   //  <-- path starts with /audio/
  label: 'A note for you',
},
```

To remove the voice note, set `voiceNote: null`.

## Recommendations

- Format: `.mp3` works everywhere; `.m4a`/`.aac` are great for voice memos from phones
- Length: under 2 minutes is ideal for a love letter voice note
- Volume: normalize to around -3dB peak so it doesn't blow out earbuds
