const user = require('./lib/userVD');
const auth = require('./lib/authVD');
const folder = require('./lib/folderVD');
const document = require('./lib/documentVD');
const revision = require('./lib/revisionVD');

exports.userValidator = user;
exports.authValidator = auth;
exports.folderValidator = folder;
exports.documentValidator = document;
exports.revisionValidator = revision;
