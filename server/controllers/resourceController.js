import { TABLES } from '../models/tableNames.js';
import { deleteRow, insertRow, listRows, updateRow } from '../services/dataService.js';

export const getResources = async (_req, res) => {
  const resources = await listRows(TABLES.resources);
  return res.json(resources);
};

export const createResource = async (req, res) => {
  const resource = await insertRow(TABLES.resources, {
    ...req.body,
    status: req.body.status || 'available',
  });
  return res.status(201).json(resource);
};

export const updateResource = async (req, res) => {
  const resource = await updateRow(TABLES.resources, req.params.id, req.body);
  return res.json(resource);
};

export const deleteResource = async (req, res) => {
  await deleteRow(TABLES.resources, req.params.id);
  return res.status(204).send();
};
