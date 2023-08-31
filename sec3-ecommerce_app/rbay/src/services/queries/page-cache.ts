import { pageCacheKey } from '$services/keys';
import { client } from '$services/redis';

const cacheRoutes = ['/about', '/privacy', '/auth/signin', '/auth/signup'];

export const getCachedPage = (route: string) => {
	if (cacheRoutes.includes(route)) {
		// return client.get('pagecache#' + route);
		return client.get(pageCacheKey(route));
	}
	return null;
};

export const setCachedPage = (route: string, page: string) => {
	if (cacheRoutes.includes(route)) {
		// return client.set('pagecache#' + route, page, {
		return client.set(pageCacheKey(route), page, {
			// expire in 2 seconds
			EX: 2
		});
	}
};
