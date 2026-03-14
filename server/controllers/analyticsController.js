import { TABLES } from '../models/tableNames.js';
import { listRows } from '../services/dataService.js';

export const getResourceUsage = async (_req, res) => {
  const resources = await listRows(TABLES.resources);
  return res.json(
    resources.map((item) => ({
      _id: item.id,
      resourceName: item.resourceName || item.name,
      currentStock: Number(item.quantity || 0),
      status: item.status || 'available',
    }))
  );
};

export const getEventParticipation = async (_req, res) => {
  const events = await listRows(TABLES.events);
  return res.json({
    events: events.map((event) => ({
      _id: event.id,
      title: event.title || event.name,
      assignedCount: (event.assignedVolunteers || []).length,
    })),
  });
};

export const getLeaderboard = async (_req, res) => {
  const volunteers = await listRows(TABLES.volunteers);
  const leaderboard = [...volunteers]
    .sort((a, b) => Number(b.impactScore || 0) - Number(a.impactScore || 0))
    .map((row, index) => ({
      _id: row.id,
      volunteerId: row.id,
      name: row.name,
      rank: index + 1,
      points: Number(row.impactScore || 0),
      hoursWorked: Number(row.hoursWorked || 0),
    }));

  return res.json(leaderboard);
};
