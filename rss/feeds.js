import Parser from 'rss-parser';

const parser = new Parser();

// যে যে সাইটের নিউজ চান তার RSS URL-এর তালিকা
const FEED_URLS = [
  { source: 'Prothom Alo', url: 'https://www.prothomalo.com/feed' },
  { source: 'BBC Bangla', url: 'https://www.bbc.com/bangla/index.xml' }
];

export async function fetchAllNews() {
  let allArticles = [];

  for (let feed of FEED_URLS) {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      const articles = feedData.items.map(item => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        summary: item.contentSnippet || item.content,
        source: feed.source
      }));

      allArticles.push(...articles);
    } catch (error) {
      console.error(`Error fetching from ${feed.source}:`, error.message);
    }
  }

  // নতুন খবরগুলো আগে দেখানোর জন্য সর্ট করা
  return allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
}
