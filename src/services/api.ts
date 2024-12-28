import axios from 'axios';
import { Article, NewsFilters } from '../types/news';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;
const BBC_API_KEY = import.meta.env.VITE_BBC_API_KEY;

const guardianApi = axios.create({
  baseURL: 'https://content.guardianapis.com',
});

const nytApi = axios.create({
  baseURL: 'https://api.nytimes.com/svc',
});

const bbcApi = axios.create({
  baseURL: 'https://newsapi.org/v2',
});

export async function fetchGuardianNews(filters: NewsFilters): Promise<Article[]> {
  const response = await guardianApi.get('/search', {
    params: {
      'api-key': GUARDIAN_API_KEY,
      q: filters.search,
      'section': filters.categories.join('|'),
      'from-date': filters.startDate,
      'to-date': filters.endDate,
    },
  });

  return response.data.response.results.map((article: any) => ({
    id: article.id,
    title: article.webTitle,
    description: article.fields?.trailText || '',
    url: article.webUrl,
    imageUrl: article.fields?.thumbnail,
    source: 'The Guardian',
    category: article.sectionName,
    author: article.fields?.byline,
    publishedAt: article.webPublicationDate,
  }));
}

export async function fetchNytNews(filters: NewsFilters): Promise<Article[]> {
  const beginDate = filters.startDate ? filters.startDate.replace(/-/g, '') : new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const endDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const response = await nytApi.get('/search/v2/articlesearch.json', {
    params: {
      'api-key': NYT_API_KEY,
      q: filters.search,
      fq: filters.categories.map(category => `section_name:("${category}")`).join(' OR '),
      'begin_date': beginDate,
      'end_date': endDate,
    },
  });

  return response.data.response.docs.map((article: any) => ({
    id: article._id,
    title: article.headline.main,
    description: article.abstract || '',
    url: article.web_url,
    imageUrl: article.multimedia?.find((media: any) => media.subtype === 'thumbnail')?.url
      ? `https://www.nytimes.com/${article.multimedia.find((media: any) => media.subtype === 'thumbnail').url}`
      : '',
    source: 'The New York Times',
    category: article.section_name,
    author: article.byline?.original || 'Unknown',
    publishedAt: article.pub_date,
  }));
}

export async function fetchBbcNews(filters: NewsFilters): Promise<Article[]> {
  const today = new Date().toISOString().slice(0, 10);
  const searchQuery = filters.search || 'news';

  const response = await bbcApi.get('/everything', {
    params: {
      apiKey: BBC_API_KEY,
      q: searchQuery,
      from: filters.startDate || today,
      to: today,
      language: 'en',
    },
  });

  return response.data.articles.map((article: any) => ({
    id: article.url,
    title: article.title,
    description: article.description || '',
    url: article.url,
    imageUrl: article.urlToImage || '',
    source: 'BBC News',
    category: article.source.name || 'General',
    author: article.author || 'Unknown',
    publishedAt: article.publishedAt,
  }));
}

export async function fetchAllNews(filters: NewsFilters): Promise<Article[]> {
  const apis = [];
  
  if (filters.sources.includes('guardian')) {
    apis.push(fetchGuardianNews(filters));
  }

  if (filters.sources.includes('nyt')) {
    apis.push(fetchNytNews(filters));
  }

  if (filters.sources.includes('bbc')) {
    apis.push(fetchBbcNews(filters));
  }
  
  const results = await Promise.all(apis);
  return results.flat();
}