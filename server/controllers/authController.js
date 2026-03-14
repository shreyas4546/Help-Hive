import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TABLES } from '../models/tableNames.js';
import { getById, insertRow, listRows, upsertVolunteerProfile } from '../services/dataService.js';

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sanitizeUser = (user) => ({
  id: user.id,
  _id: user.id,
  fullName: user.fullName,
  name: user.fullName,
  email: user.email,
  role: user.role,
  phone: user.phone || '',
  location: user.location || '',
  skills: user.skills || [],
});

export const register = async (req, res) => {
  const { fullName, email, password, role = 'volunteer', phone, location, skills = [] } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'fullName, email and password are required' });
  }

  const users = await listRows(TABLES.users, { filters: { email: String(email).toLowerCase() } });
  if (users.length) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await insertRow(TABLES.users, {
    fullName,
    email: String(email).toLowerCase(),
    passwordHash,
    role,
    phone,
    location,
    skills,
  });

  if (role === 'volunteer') {
    try {
      await upsertVolunteerProfile(user);
    } catch (error) {
      // Keep auth functional even when volunteer profile schema is not initialized yet.
      console.warn('Volunteer profile sync skipped:', error.message);
    }
  }

  return res.status(201).json({ token: signToken(user.id), user: sanitizeUser(user) });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const users = await listRows(TABLES.users, { filters: { email: String(email || '').toLowerCase() } });
  const user = users[0];

  if (!user || !(await bcrypt.compare(password || '', user.passwordHash || ''))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return res.json({ token: signToken(user.id), user: sanitizeUser(user) });
};

export const me = async (req, res) => {
  const user = await getById(TABLES.users, req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(sanitizeUser(user));
};
