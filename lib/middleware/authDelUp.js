const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  try {
    const item = await Item.getById(req.params.id);
    if (item && (req.user.email === 'admin' || item.user_id === req.user.id)) {
      next();
    } else {
      throw new Error('You do not have access to this page');
    }
  } catch (e) {
    next(e);
  }
};
