"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const incidentController_1 = require("../controllers/incidentController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Define specific routes before dynamic routes
router.get('/statistics', auth_1.default, incidentController_1.getIncidentStatistics);
router.post('/', auth_1.default, incidentController_1.reportIncident);
router.get('/', auth_1.default, incidentController_1.getIncidents);
router.get('/:id', auth_1.default, incidentController_1.getIncidentById);
router.post('/sign/:id', incidentController_1.signIncident);
exports.default = router;
