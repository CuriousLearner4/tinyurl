const express = require("express");
const {alias,shorten,analytics,updateAlias,deleteAlias} = require("../controllers/restcontroller")
const router = express.Router();

router.get('/:alias',alias);
router.get('/analytics/:alias',analytics);
router.post('/shorten',shorten);
router.put('/update/:alias',updateAlias);
router.delete('/delete/:alias',deleteAlias);

module.exports = router;