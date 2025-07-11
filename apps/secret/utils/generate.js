const { randomUUID } = require('crypto');

exports.generateApiKey = () => randomUUID();
exports.generateToken = () => randomUUID();
exports.generateId = () => randomUUID();