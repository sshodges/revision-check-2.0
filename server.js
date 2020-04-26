const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');

const app = express();

//Cors Settings
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: true,
  optionsSuccessStatus: 204,
  exposedHeaders: 'auth-token',
};
app.use(cors(corsOptions));

// Security Settings
app.use(
  session({
    secret: process.env.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // Only allow cookies to be sent over HTTPS in production
      secure: app.get('env') === 'production' ? true : false,
      // Cookies only accessed through HTTPS calls and not scripts
      httpOnly: true,
      // Only allow cookies to be sent to the below domains
      domain:
        app.get('env') === 'production' ? 'revisioncheck.com' : 'localhost',
      // Max age of cookies
      maxAge: 72000000,
      // Similar to domain, only allow cookies from same site
      sameSite: true,
    },
    // Default name is connect.sid, betting to change it away from default
    name: 'revisioncheckPoolSecurity',
  })
);
// Only allow scripts, styles and font be run from whitelisted domains
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", 'fonts.googleapis.com'],
      fontSrc: ["'self'", 'fonts.gstatic.com', 'data:'],
      scriptSrc: ["'self'", 'code.jquery.com'],
      // Send report data to the below endpoint (not coded yet)
      reportUri: '/api/securityreport',
    },
  })
);
// Blocks our site from being used in iframes on malicious sites
app.use(helmet.frameguard({ action: 'deny' }));
app.use(bodyParser.json());

// Connect to DB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log('Server started on port: ' + PORT)
);

// Setup websocket connection
const io = require('socket.io')(server, {
  pingTimeout: 60000,
});
io.on('connection', (socket) => {
  socket.emit('connection:sid', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/users', require('./routes/users.js'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/folders', require('./routes/folders'));
app.use('/api/documents', require('./routes/documents.js'));
app.use('/api/revisions', require('./routes/revisions.js'));
