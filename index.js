import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";
import { createBareServer } from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import wisp from "wisp-server-node";
import request from '@cypress/request';
import chalk from 'chalk';
import packageJson from './package.json' with { type: 'json' };
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'node:fs/promises';

const __dirname = path.resolve();
const server = http.createServer();
const bareServer = createBareServer('/seal/');
const app = express(server);
const version = packageJson.version;
const discord = 'https://discord.gg/unblocking';
const routes = [
    { route: '/mastery', file: './static/loader.html' },
    { route: '/apps', file: './static/apps.html' },
    { route: '/gms', file: './static/gms.html' },
    { route: '/lessons', file: './static/agloader.html' },
    { route: '/info', file: './static/info.html' },
    { route: '/mycourses', file: './static/loading.html' }
];
const usersFilePath = path.join(__dirname, 'users.json');
const jwtSecret = 'your-secret-key'; // Replace with a strong, unique secret key

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

// Helper function to read users from the JSON file
async function getUsers() {
    try {
        const data = await fs.readFile(usersFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write users to the JSON file
async function saveUser(user) {
    const users = await getUsers();
    users.push(user);
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
}

// Route for user registration
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = await getUsers();
    if (users.find(user => user.username === username)) {
        return res.status(409).json({ message: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, password: hashedPassword };
    await saveUser(newUser);

    res.status(201).json({ message: 'User registered successfully.' });
});

// Route for user login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    const users = await getUsers();
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({ userId: user.username }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials.' });
    }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden (invalid token)
        }
        req.user = user;
        next();
    });
};

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './static/login.html'));
});

// Serve 404 page without authentication
app.use('/static/404.html', express.static(path.join(__dirname, './static/404.html')));

// Protect other static HTML files
app.use('/static', authenticateToken, (req, res, next) => {
    if (req.url.endsWith('.html') && !req.url.includes('404.html') && !req.url.includes('login.html')) {
        next(); // Proceed to serve the file if it's an HTML file other than 404.html or login.html
    } else {
        next(); // Allow access to other static assets (js, css, images, etc.)
    }
}, express.static(path.join(__dirname, 'static')));

// Serve specific routes (these will now be protected by the static middleware above if they serve HTML)
routes.forEach(({ route, file }) => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, file));
    });
});

app.get('/student', (req, res) => {
    res.redirect('/portal');
});

app.get('/worker.js', (req, res) => {
    request('https://worker.mirror.ftp.sh/worker.js', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.setHeader('Content-Type', 'text/javascript');
            res.send(body);
        } else {
            res.status(500).send('Error fetching worker script');
        }
    });
});

app.use((req, res) => {
    res.statusCode = 404;
    res.sendFile(path.join(__dirname, './static/404.html'));
});

server.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeRequest(req, res);
    } else app(req, res);
});

server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
        bareServer.routeUpgrade(req, socket, head);
    } else if (req.url.endsWith("/wisp/")) {
        wisp.routeRequest(req, socket, head);
    } else socket.end();
});

server.on('listening', () => {
    console.log(chalk.bgBlue.white.bold(`  Welcome to Doge V4, user!  `) + '\n');
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.green('  🌟 Status: ') + chalk.bold('Active'));
    console.log(chalk.green('  🌍 Port: ') + chalk.bold(chalk.yellow(server.address().port)));
    console.log(chalk.green('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.magenta('📦 Version: ') + chalk.bold(version));
    console.log(chalk.magenta('🔗 URL: ') + chalk.underline('http://localhost:' + server.address().port));
    console.log(chalk.cyan('-----------------------------------------------'));
    console.log(chalk.blue('💬 Discord: ') + chalk.underline(discord));
    console.log(chalk.cyan('-----------------------------------------------'));
});

function shutdown(signal) {
    console.log(chalk.bgRed.white.bold(`  Shutting Down (Signal: ${signal})  `) + '\n');
    console.log(chalk.red('-----------------------------------------------'));
    console.log(chalk.yellow('  🛑 Status: ') + chalk.bold('Shutting Down'));
    console.log(chalk.yellow('  🕒 Time: ') + chalk.bold(new Date().toLocaleTimeString()));
    console.log(chalk.red('-----------------------------------------------'));
    console.log(chalk.blue('  Exiting immediately...'));
    process.exit(1);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

server.listen({
    port: 8001,
});
