

const express = require('express');
const Lead = require('../models/Lead');

const router = express.Router();

// Escape user input so it is treated as plain text inside a regex
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// GET /api/leads?search=text
// View all leads or search by name/email
router.get('/', async (req, res, next) => {
  try {
    const search = (req.query.search || '').trim();

    const filter = search
      ? {
          $or: [
            { name: { $regex: escapeRegex(search), $options: 'i' } },
            { email: { $regex: escapeRegex(search), $options: 'i' } },
          ],
        }
      : {};

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    next(err);
  }
});

// POST /api/leads -> Add a lead
router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;

    const lead = await Lead.create({
      name,
      email,
      phone,
      status,
    });

    res.status(201).json(lead);
  } catch (err) {
    next(err);
  }
});

// PUT /api/leads/:id -> Edit a lead
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, phone, status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(lead);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/leads/:id -> Delete a lead
router.delete('/:id', async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
