import 'dotenv/config';
import { client } from '../src/services/redis';

const run = async () => {
	await client.hSet('car', {
		color: 'red',
		year: 1950
		// engine: { cylinders: 8 },
		// owner: null || '',
		// service: undefined || ''
	});
	// HSET car color read year 1950

	const car = await client.hGetAll('car#1993');
	// const car = await client.hGetAll('car');

	// if (!car) {
	if (Object.keys(car).length === 0) {
		console.log('Car not found, respond with 404');
		return;
	}

	console.log(car);
};
run();
