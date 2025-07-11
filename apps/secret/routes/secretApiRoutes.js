const express = require('express');
const router = express.Router();
const controller = require('../controllers/secretApiController');
const auth = require('../middlewares/auth');

// Auth & token
router.post('/register', controller.register);
router.get('/generate-api-key', controller.generateApiKey);
router.post('/get-auth-token', controller.getAuthToken);

// Public
router.get('/random', controller.getRandomSecret);

// Authenticated routes
router.get('/all', auth.basic, controller.getAllSecrets);
router.get('/filter', auth.apiKey, controller.filterSecrets);
router.get('/user-secrets', auth.bearer, controller.getUserSecrets);
router.get('/secrets/:id', auth.bearer, controller.getSecretById);
router.post('/secrets', auth.bearer, controller.createSecret);
router.put('/secrets/:id', auth.bearer, controller.updateSecret);
router.patch('/secrets/:id', auth.bearer, controller.partialUpdateSecret);
router.delete('/secrets/:id', auth.bearer, controller.deleteSecret);

router.get('/docs', (req, res) => {
  res.render('secret-docs', { title: 'Secrets API Docs' });
});

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/docs/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;