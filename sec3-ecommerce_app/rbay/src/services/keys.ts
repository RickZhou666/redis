// export const pageCacheKey = (id: string) => 'pagecache#' + id;
export const pageCacheKey = (id: string) => `pagecache#${id}`;
export const usersKey = (userid: string) => `users#${userid}`;
export const sessionKey = (sessionId: string) => `sessions#${sessionId}`;
export const itemsKey = (itemId: string) => `items#${itemId}`;