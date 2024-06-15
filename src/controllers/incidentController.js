"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncidentStatistics = exports.signIncident = exports.getIncidentById = exports.getIncidents = exports.reportIncident = void 0;
const Incident_1 = __importDefault(require("../models/Incident"));
const reportIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { childName, details, signature, signatureType, comments } = req.body;
        const newIncident = new Incident_1.default({
            institution: req.institutionId,
            childName,
            details,
            signature,
            signatureType,
            status: 'reported',
            comments,
        });
        yield newIncident.save();
        res.status(201).json(newIncident);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.reportIncident = reportIncident;
const getIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidents = yield Incident_1.default.find();
        res.status(200).json(incidents);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.getIncidents = getIncidents;
const getIncidentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const incident = yield Incident_1.default.findById(id);
        if (!incident) {
            res.status(404).json({ message: 'Incident not found' });
            return;
        }
        res.status(200).json(incident);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.getIncidentById = getIncidentById;
const signIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { parentSignature, parentSignatureType } = req.body;
        const incident = yield Incident_1.default.findById(id);
        if (!incident) {
            res.status(404).json({ message: 'Incident not found' });
            return;
        }
        if (incident.signedByParent) {
            res.status(400).json({ message: 'Incident already signed by parent' });
            return;
        }
        incident.parentSignature = parentSignature;
        incident.parentSignatureType = parentSignatureType;
        incident.signedByParent = true;
        yield incident.save();
        res.status(200).json(incident);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(400).json({ message: 'An unknown error occurred' });
        }
    }
});
exports.signIncident = signIncident;
const getIncidentStatistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statistics = yield Incident_1.default.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $project: {
                    _id: 0,
                    date: '$_id',
                    count: 1,
                },
            },
        ]);
        res.status(200).json(statistics);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch statistics' });
    }
});
exports.getIncidentStatistics = getIncidentStatistics;
