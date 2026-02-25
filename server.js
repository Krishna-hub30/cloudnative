const http = require('http');

// Simple calculation function
function calculateExpression(expr) {
    try {
        // Only allow numbers, operators and dot
        if (!/^[0-9+\-*/%. ()]+$/.test(expr)) {
            throw new Error("Invalid characters in expression");
        }
        const result = eval(expr);
        if (result === Infinity || result === -Infinity) throw new Error("Division by zero");
        return result;
    } catch {
        throw new Error("Invalid expression");
    }
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/calculate') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                const { expression } = JSON.parse(body);
                const result = calculateExpression(expression);
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: true, result }));
            } catch (err) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ success: false, error: err.message }));
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Route not found' }));
    }
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));