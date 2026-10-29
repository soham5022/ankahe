import { describe, it, expect } from 'vitest';
import type { WritingItem } from '../types';

describe('Discovery & Multi-Filter Engine Tests', () => {
  const dataset: WritingItem[] = [
    {
      id: '1',
      title: 'चहाचा घोट',
      content: 'कधी कधी शांत बसणं हीच सगळ्यात मोठी गरज असते.',
      author: 'सई',
      type: 'Observation',
      language: 'Marathi',
      category: 'peace',
      visibility: 'public',
    },
    {
      id: '2',
      title: 'Dopehar ka sukoon',
      content: 'Chai thandi ho gayi thi, par aasmaan dekhna zaroori tha.',
      author: 'Samir',
      type: 'Thought',
      language: 'Hinglish',
      category: 'peace',
      visibility: 'public',
    },
    {
      id: '3',
      title: 'Morning Light',
      content: 'Tomorrow gets to be gentle with you.',
      author: 'Eleanor',
      type: 'Poetry',
      language: 'English',
      category: 'hope',
      visibility: 'public',
    },
    {
      id: '4',
      title: 'خاموش رات',
      content: 'رات بھر خالی کمرے میں ہوا چلتی رہی۔',
      author: 'Anonymous',
      type: 'Sher & Shayari',
      language: 'Urdu',
      category: 'loneliness',
      visibility: 'anonymous',
    },
    {
      id: '5',
      title: 'पुराने खत',
      content: 'कुछ बातें सिर्फ कागज़ ही समझ सकते हैं।',
      author: 'Anonymous',
      type: 'Unsent Letter',
      language: 'Hindi',
      category: 'nostalgia',
      visibility: 'anonymous',
    },
  ];

  it('filters accurately by language', () => {
    const filterByLang = (list: WritingItem[], lang: string) => {
      if (lang === 'All') return list;
      return list.filter((item) => item.language === lang);
    };

    const marathi = filterByLang(dataset, 'Marathi');
    expect(marathi).toHaveLength(1);
    expect(marathi[0].title).toBe('चहाचा घोट');

    const urdu = filterByLang(dataset, 'Urdu');
    expect(urdu).toHaveLength(1);
    expect(urdu[0].language).toBe('Urdu');

    const all = filterByLang(dataset, 'All');
    expect(all).toHaveLength(5);
  });

  it('filters accurately by content type', () => {
    const filterByType = (list: WritingItem[], type: string) => {
      if (type === 'All' || type === 'All Writing') return list;
      return list.filter((item) => item.type === type);
    };

    const poetry = filterByType(dataset, 'Poetry');
    expect(poetry).toHaveLength(1);
    expect(poetry[0].author).toBe('Eleanor');

    const letters = filterByType(dataset, 'Unsent Letter');
    expect(letters).toHaveLength(1);
    expect(letters[0].title).toBe('पुराने खत');
  });

  it('filters accurately by mood/atmosphere', () => {
    const filterByMood = (list: WritingItem[], mood: string) => {
      if (mood === 'All' || mood === 'all') return list;
      return list.filter((item) => item.category === mood);
    };

    const peace = filterByMood(dataset, 'peace');
    expect(peace).toHaveLength(2);

    const hope = filterByMood(dataset, 'hope');
    expect(hope).toHaveLength(1);
  });

  it('combines text search with language and content-type filters', () => {
    const searchAndFilter = (
      list: WritingItem[],
      query: string,
      type: string,
      lang: string,
      mood: string
    ) => {
      return list.filter((item) => {
        if (query.trim()) {
          const q = query.toLowerCase();
          const matchContent = item.content.toLowerCase().includes(q);
          const matchTitle = item.title?.toLowerCase().includes(q) || false;
          if (!matchContent && !matchTitle) return false;
        }
        if (type !== 'All' && item.type !== type) return false;
        if (lang !== 'All' && item.language !== lang) return false;
        if (mood !== 'All' && item.category !== mood) return false;
        return true;
      });
    };

    // Search "Chai" in Hinglish
    const results1 = searchAndFilter(dataset, 'Chai', 'Thought', 'Hinglish', 'peace');
    expect(results1).toHaveLength(1);
    expect(results1[0].id).toBe('2');

    // Search query with no match
    const resultsNone = searchAndFilter(dataset, 'NonExistentWord123', 'All', 'All', 'All');
    expect(resultsNone).toHaveLength(0);
  });
});

