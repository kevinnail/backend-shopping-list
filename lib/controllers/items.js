const { Router } = require('express');
const authDelUp = require('../middleware/authDelUp');
const Item = require('../models/Item.js');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);

      res.json(items);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const item = await Item.insert({
        description: req.body.description,
        bought: req.body.bought,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', authDelUp, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', authDelUp, async (req, res, next) => {
    try {
      const data = await Item.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
