export const DEFAULT_BACKEND_URL = import.meta.env.PROD
  ? '/api'
  : 'https://localhost:7004/api';

export const PATHS_ALLOWED_FOR_UNAUTHORIZED = ['/login', '/register'];
export const PATHS_ONLY_FOR_UNAUTHORIZED = ['/login', '/register'];

export const NOTIFICATION_TIMEOUT = 5000;
export const NOTIFICATION_INTERVAL = 500;

export const ALLOWED_IMAGE_FORMATS = ['.jpg', '.jpeg', '.png', '.gif'];
export const ALLOWED_VIDEO_FORMATS = ['.mp4', '.avi', '.mkv', '.webm'];

export const ALLOWED_IMAGE_OBJECT = { 'image/*': ALLOWED_IMAGE_FORMATS };
export const ALLOWED_VIDEO_OBJECT = { 'video/*': ALLOWED_VIDEO_FORMATS };

export const MAX_VIDEO_TITLE_LENGTH = 100;
export const MAX_VIDEO_DESCRIPTION_LENGTH = 1000;

export const ROUTES = {
  NOT_FOUND: '/404',
  HOMEPAGE: '',
  LOGIN: '/login',
  REGISTER: '/register',
  UPLOAD: '/upload',
  USER: '/user',
  VIDEO: '/video',
  PLAYLIST: '/playlist',
  SEARCH: '/search',
  SWITCH_BACKEND: '/switch-backend',
};

export const SEARCH_PARAMS = {
  QUERY: 'query',
  SORT_BY: 'sortBy',
  SORT_DIRECTION: 'sort',
  START_DATE: 'startDate',
  END_DATE: 'endDate',
};

export const AUTO_HIDE_DURATION = 5000;
export const METADATA_REFETCH_INTERVAL = 1000;

export const MODE_DURATION = 60000;
