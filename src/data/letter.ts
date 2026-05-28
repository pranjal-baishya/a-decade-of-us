/**
 * ─────────────────────────────────────────────────────────────────────────
 *   LETTER + VOICE NOTE — your love letter and audio
 * ─────────────────────────────────────────────────────────────────────────
 *
 * To customize:
 *
 * 1. Edit `opener` — the salutation rendered above the body (e.g. "My love,").
 * 2. Edit the `paragraphs` array — each string becomes its own stanza.
 *    Use real `\n` newlines INSIDE a string to add line breaks within a stanza
 *    (rendered via white-space: pre-line). Use separate array entries for
 *    visually separated stanzas.
 * 3. Edit `signature` — the closing line shown after the letter.
 * 4. (Optional) Add a voice note:
 *      - Drop your audio file into `public/audio/` (e.g. `public/audio/letter.mp3`).
 *      - Set `voiceNote.audioUrl` to `/audio/letter.mp3`.
 *      - Set `voiceNote.label` to a short caption (e.g. "A note for you").
 *    To hide the voice note entirely, set `voiceNote: null`.
 */

export interface VoiceNoteConfig {
  audioUrl: string
  label: string
}

export interface LetterContent {
  /** Salutation/title rendered above the body, e.g. "My love," or "Ten years of us". */
  opener: string
  paragraphs: string[]
  signature: string
  voiceNote: VoiceNoteConfig | null
}

export const LETTER: LetterContent = {
  opener: 'Ten years of us',
  paragraphs: [
    `I do not know
what you think about me,
maybe good, maybe not,
maybe near, maybe far,
but I love you…`,

    `Ten years have passed,
but my heart still feels
the same soft feeling
when I think of you,
when I hear your name,
when I see your smile…`,

    `Pari, you are very special to me,
more than words can say.
Everything about you
becomes close to my heart.
Your smile, your eyes,
your voice, your care,
all are precious to me…`,

    `Sometimes I may not say it well,
sometimes I may not show it right,
but inside me
there is only one truth,
I love you…`,

    `You came into my life
like a sweet dream.
Your face stays in my heart,
your smile stays in my mind,
your love stays in my soul,
like a moon in a quiet night…`,

    `I may not be perfect for you,
I may make mistakes,
I may fail to give you
all the happiness you deserve,
but still I want to stay
beside you, always…`,

    `I do not know
how to bring smile
every single time,
but I know one thing,
I want to see that smile
on your face forever…`,

    `Ten years with you
is not just time,
it is my memory,
my peace,
my home,
my love…`,

    `So today I just want to say,
Pari, you are my special one,
you are my dream,
you are my favorite person,
and even after ten years,
I still love you…`,

    `And I will keep loving you,
quietly, deeply, truly,
today, tomorrow,
and always…`,
  ],
  signature: 'Always yours, ♡',
  voiceNote: null,
  // Example with audio:
  // voiceNote: {
  //   audioUrl: '/audio/letter.mp3',
  //   label: 'A note for you',
  // },
}
