/**
 * ─────────────────────────────────────────────────────────────────────────
 *   LETTER + VOICE NOTE — your love letter and audio
 * ─────────────────────────────────────────────────────────────────────────
 *
 * To customize:
 *
 * 1. Edit the `paragraphs` array — each string becomes its own paragraph.
 *    Add as many as you want. Use `\n\n` for line breaks within a paragraph.
 * 2. Edit `signature` — the closing line shown after the letter.
 * 3. (Optional) Add a voice note:
 *      - Drop your audio file into `public/audio/` (e.g. `public/audio/letter.mp3`).
 *      - Set `voiceNote.audioUrl` to `/audio/letter.mp3`.
 *      - Set `voiceNote.label` to a short caption (e.g. "A note for you").
 *    To hide the voice note entirely, set `voiceNote: null`.
 *
 * Supported audio formats: mp3, wav, ogg, m4a, aac.
 */

export interface VoiceNoteConfig {
  audioUrl: string
  label: string
}

export interface LetterContent {
  paragraphs: string[]
  signature: string
  voiceNote: VoiceNoteConfig | null
}

export const LETTER: LetterContent = {
  paragraphs: [
    "Ten years ago, I never knew life could feel this beautiful. You've been my home, my peace, my greatest adventure. Thank you for choosing me, every single day.",
    "There were the easy years and the hard ones, and somehow you stayed for both. I don't take that for granted — not for one second.",
    "If the next ten are anything like the last, I'll be the luckiest person alive.",
  ],
  signature: 'Always yours, ♡',
  voiceNote: null,
  // Example with audio:
  // voiceNote: {
  //   audioUrl: '/audio/letter.mp3',
  //   label: 'A note for you',
  // },
}
