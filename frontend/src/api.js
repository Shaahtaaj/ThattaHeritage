import axios from 'axios';
import sampleData from './data/sampleData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
});

export async function getHeritage() {
  try {
    const { data } = await client.get('/api/heritage');
    return data;
  } catch {
    return sampleData.heritage;
  }
}

export async function getCrafts() {
  try {
    const { data } = await client.get('/api/crafts');
    return data;
  } catch {
    return sampleData.crafts;
  }
}

export async function getEnvironment() {
  try {
    const { data } = await client.get('/api/environment');
    return data;
  } catch {
    return sampleData.environment;
  }
}

export async function askQuestion(question) {
  try {
    const { data } = await client.post('/api/ask', { question });
    return data;
  } catch {
    return {
      answer: 'في الحال سرور سان ڳنڍجڻ نه پيو ٿئي، پر توهان مڪلي، ڪينجھر، اجرڪ يا موسم بابت ٻيهر سوال پڇي سگهو ٿا.',
      source: 'frontend-fallback',
    };
  }
}
