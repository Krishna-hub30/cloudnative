const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5000;

const server = http.createServer((req, res) => {

    // Serve HTML file
    if (req.method === "GET" && req.url === "/") {
        const filePath = path.join(__dirname, "index.html");
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end("Error loading file");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }

    // Handle Calculation
    else if (req.method === "POST" && req.url === "/calculate") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            try {
                const { expression } = JSON.parse(body);

                // Allow only numbers and operators
                if (!/^[0-9+\-*/. ]+$/.test(expression)) {
                    throw new Error("Invalid Expression");
                }

                const result = eval(expression);

                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ result }));
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ result: "Error" }));
            }
        });
    }

    else {
        res.writeHead(404);
        res.end("Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});