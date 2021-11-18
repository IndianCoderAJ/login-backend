import server from './src';
const port = process.env.PORT || 8081;

console.time(`⚡️ server started in `);

server.listen(port, () => {
	console.timeEnd(`⚡️ server started in `);
	// latLongJob.start();
});

