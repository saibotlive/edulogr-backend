import { Request, Response } from 'express';
import Incident from '../models/Incident';

interface ReportIncidentRequestBody {
  childName: string;
  details: string;
  signature: string;
  signatureType: 'handwritten' | 'typed';
  comments?: string;
}

interface SignIncidentRequestBody {
  parentSignature: string;
  parentSignatureType: 'handwritten' | 'typed';
}

interface AuthRequest extends Request {
  institutionId?: string;
}

export const reportIncident = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childName, details, signature, signatureType, comments } = req.body;
    const newIncident = new Incident({
      institution: req.institutionId,
      childName,
      details,
      signature,
      signatureType,
      status: 'reported',
      comments,
    });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getIncidents = async (req: Request, res: Response): Promise<void> => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getIncidentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const incident = await Incident.findById(id);
    if (!incident) {
      res.status(404).json({ message: 'Incident not found' });
      return;
    }
    res.status(200).json(incident);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
};

export const signIncident = async (
  req: Request<{ id: string }, {}, SignIncidentRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { parentSignature, parentSignatureType } = req.body;

    const incident = await Incident.findById(id);
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

    await incident.save();

    res.status(200).json(incident);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
    }
  }
};

export const getIncidentStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const statistics = await Incident.aggregate([
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
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch statistics' });
  }
};
