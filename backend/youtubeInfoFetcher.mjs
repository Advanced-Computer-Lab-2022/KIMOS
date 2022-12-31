import fetch from 'node-fetch';
import { URL, URLSearchParams } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();
const getDuration = (durationString = '') => {
  const duration = { hours: 0, minutes: 0, seconds: 0 };
  const durationParts = durationString
    .replace('PT', '')
    .replace('H', ':')
    .replace('M', ':')
    .replace('S', '')
    .split(':');

  if (durationParts.length === 3) {
    duration['hours'] = durationParts[0];
    duration['minutes'] = durationParts[1];
    duration['seconds'] = durationParts[2];
  }

  if (durationParts.length === 2) {
    duration['minutes'] = durationParts[0];
    duration['seconds'] = durationParts[1];
  }

  if (durationParts.length === 1) {
    duration['seconds'] = durationParts[0];
  }

  return parseInt(duration['hours'] || 0) * 60 + parseInt(duration['minutes'] || 0);
};

export default async (youtubeVideoId = '') => {
  const url = new URL('https://www.googleapis.com/youtube/v3/videos');
  url.search = new URLSearchParams({
    key: process.env.YOUTUBE_API_KEY,
    part: ['contentDetails', 'snippet'],
    id: youtubeVideoId
  }).toString();

  return fetch(url)
    .then(async (response) => {
      const data = await response.json();
      const videos = data?.items || [];
      return videos.map((video) => {
        return {
          id: video?.id,
          title: video?.snippet?.title,
          duration: getDuration(video?.contentDetails?.duration)
        };
      });
    })
    .catch((error) => {
      console.warn(error);
    });
};
