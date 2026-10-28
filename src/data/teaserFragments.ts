import type { TeaserFragment } from '../types';

export const TEASER_FRAGMENTS: TeaserFragment[] = [
  {
    id: 'tf-1',
    theme: 'Nostalgia',
    sourceNote: 'A memory from three years ago',
    language: 'English',
    lines: [
      "Some people leave your life,",
      "but never quite leave your thoughts."
    ]
  },
  {
    id: 'tf-2',
    theme: 'Unsent words',
    sourceNote: 'A draft written at 2 AM',
    language: 'English',
    lines: [
      "Dear you,",
      "There are still things I wish I had said.",
      "Perhaps writing them here is where I begin."
    ]
  },
  {
    id: 'tf-3',
    theme: 'Healing',
    sourceNote: 'Quiet reflection',
    language: 'English',
    lines: [
      "Maybe someday,",
      "the things that hurt to remember",
      "will simply become stories."
    ]
  },
  {
    id: 'tf-4',
    theme: 'Time',
    sourceNote: 'An ordinary afternoon',
    language: 'English',
    lines: [
      "Not every beautiful moment",
      "knows it is becoming a memory."
    ]
  },
  {
    id: 'tf-5',
    theme: 'Peace',
    sourceNote: 'Subway commute note',
    language: 'English',
    lines: [
      "Some days, you don't need an answer.",
      "You just need somewhere to put the question."
    ]
  },
  {
    id: 'tf-6',
    theme: 'Friendship',
    sourceNote: 'Thursday evening message',
    language: 'English',
    lines: [
      "A friend asked if I had eaten.",
      "It was such a mundane question,",
      "yet it held my whole tired week together."
    ]
  }
];

export const MULTILINGUAL_RECOGNITION = [
  {
    id: 'ml-hindi',
    language: 'Hindi',
    script: 'devanagari',
    tone: 'Peace & Solitude',
    lines: [
      "ज़रूरी नहीं हर ख़ामोशी में कोई उदासी ही छुपी हो।",
      "कभी-कभी इंसान बस खुद से बात करने के लिए दुनिया से खामोश हो जाता है।"
    ]
  },
  {
    id: 'ml-hinglish',
    language: 'Hinglish',
    script: 'sans',
    tone: 'Nostalgia',
    lines: [
      "kabhi kabhi kisi ki yaad nahi,",
      "bas uske saath wala apna aap yaad aata hai."
    ]
  },
  {
    id: 'ml-marathi',
    language: 'Marathi',
    script: 'devanagari',
    tone: 'Quiet Reflection',
    lines: [
      "आज काही विशेष घडलं नाही, पण मनात खूप काही साचलं होतं.",
      "कधी कधी रिकाम्या हातात चहाचा कप धरून बसणं हीच सगळ्यात मोठी गरज असते."
    ]
  },
  {
    id: 'ml-english',
    language: 'English',
    script: 'serif',
    tone: 'Gentle Hope',
    lines: [
      "You survived all the days you thought you couldn't.",
      "Tomorrow gets to be gentle with you."
    ]
  },
  {
    id: 'ml-urdu',
    language: 'Urdu',
    script: 'nastaliq',
    tone: 'Longing',
    lines: [
      "رات بھر خالی کمرے میں ہوا چلتی رہی،",
      "ہم یہی سمجھے کہ شاید کوئی दर पर लौट आया है।"
    ]
  }
];
