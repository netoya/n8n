import express = require('express');
import * as request from 'supertest';

import * as utils from './common/utils';

describe('/me endpoints', () => {
	let testServer: {
		app: express.Application;
		restEndpoint: string;
	};

	const meRoutes = ['GET /me', 'PATCH /me', 'PATCH /me/password', 'POST /me/survey'];

	beforeAll(async () => {
		testServer = utils.initTestServer();
	});

	describe('Unauthorized requests', () => {
		meRoutes.forEach((route) => {
			const [method, endpoint] = route.split(' ').map((i) => i.toLowerCase());

			test(`${route} should return 401 Unauthorized`, async () => {
				const response = await request(testServer.app)[method](endpoint).use(utils.restPrefix);

				expect(response.statusCode).toBe(401);
			});
		});
	});
});