const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const helmet = require('helmet');
const session = require('express-session');
const cors = require('cors');

const User = require('./models').User;
const Folder = require('./models').Folder;

// User.create({
//   firstName: 'Sam',
//   lastName: 'Hodges',
//   email: 'sss@sss.com',
//   company: 'ABC Pty Ltd',
//   parent: 1,
//   active: true,
//   accountConfirmCode: 'dscdsrggrg',
//   passwordResetCode: 'tn5n5tt5bt55',
//   inviteCode: '5th5h5h55n',
//   password: 'password'
// });

User.findAll({ where: { id: 1 }, include: [{ model: Folder }] }).then(user => {
  const users = user[0].dataValues;
  console.log(users.Folders);
});

// Folder.create({
//   name: 'folder 1',
//   userId: 1
// });

// //Cors Settings
// var corsOptions = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST, DELETE, OPTIONS',
//   preflightContinue: true,
//   optionsSuccessStatus: 204,
//   exposedHeaders: 'Auth'
// };

// const app = express();
// app.use(cors(corsOptions));

// app.use(
//   session({
//     secret: process.env.sessionSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       // Only allow cookies to be sent over HTTPS in production
//       secure: app.get('env') === 'production' ? true : false,
//       // Cookies only accessed through HTTPS calls and not scripts
//       httpOnly: true,
//       // Only allow cookies to be sent to the below domains
//       domain: app.get('env') === 'production' ? 'office-pool.com' : 'localhost',
//       // Max age of cookies
//       maxAge: 72000000,
//       // Similar to domain, only allow cookies from same site
//       sameSite: true
//     },
//     // Default name is connect.sid, betting to change it away from default
//     name: 'officePoolSecurity'
//   })
// );
// // Only allow scripts, styles and font be run from whitelisted domains
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", 'fonts.googleapis.com'],
//       fontSrc: ["'self'", 'fonts.gstatic.com', 'data:'],
//       scriptSrc: ["'self'", 'code.jquery.com'],
//       // Send report data to the below endpoint (not coded yet)
//       reportUri: '/api/securityreport'
//     }
//   })
// );
// // Blocks our site from being used in iframes on malicious sites
// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(bodyParser.json());

// // Connect to DB
// connectDB();

// // Routes
// app.use('/api/users', require('./routes/users.js'));
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/folders', require('./routes/folders'));
// app.use('/api/documents', require('./routes/documents.js'));
// app.use('/api/revisions', require('./routes/revisions.js'));

// // Serve static assets in production - USED FOR HEROKU DEPLOYMENT
// if ((process.env.NODE_ENV = 'production')) {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log('Server started on port: ' + PORT));
