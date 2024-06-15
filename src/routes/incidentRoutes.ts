import express from 'express';
import {
  reportIncident,
  getIncidents,
  signIncident,
  getIncidentById,
  getIncidentStatistics,
} from '../controllers/incidentController';
import auth from '../middleware/auth';

const router = express.Router();

// Define specific routes before dynamic routes
router.get('/statistics', auth, getIncidentStatistics);
router.post('/', auth, reportIncident);
router.get('/', auth, getIncidents);
router.get('/:id', auth, getIncidentById);
router.post('/sign/:id', signIncident);

export default router;
