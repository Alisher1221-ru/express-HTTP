import http from "http";
import env from "./config/env.config.js";

const port = env.PORT;

const server = http.createServer((req, res) => {
    let body = '';

    req.on('data', (chunk) => {
        // This event is emitted when a chunk of data is received
        body += chunk;
    });

    req.on('end', () => {
        // This event is emitted when the entire request has been received
        // You can access the complete 'body' variable here

        const contentType = req.headers['content-type'];

        const methodHandlers = {
            GET: () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(body || '');
            },
            POST: () => {
                try {
                    const parsedBody = JSON.parse(body);
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(parsedBody));
                } catch (error) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Invalid JSON format');
                }
            },
            PUT: () => {
                // Your PUT handling logic here
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(body || '');
            },
            PATCH: () => {
                // Your PATCH handling logic here
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(body || '');
            },
            DELETE: () => {
                // Your DELETE handling logic here
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(body || '');
            },
            default: () => {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        };

        // Get the method handler or use the default if not found
        const handler = methodHandlers[req.method] || methodHandlers.default;

        // Call the handler
        handler();
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
