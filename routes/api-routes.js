const express = require('express');
const path = require('path');
var session = require('express-session');
const router = express.Router();

const { getLog, getHome, getevent, addevent, saveevent, editevent, updateevent, deleteevent, getcommunication, addcommunication, savecommunication, editcommunication, updatecommunication, deletecommunication} = require("../controllers/pushController.js")

router.post('/auth',getLog);

router.get('/home', getHome);



router.get('/getevent',getevent);

router.get('/addevent',addevent);

router.post('/saveevent', saveevent);

router.get('/editevent/:eventId', editevent);

router.post('/updateevent', updateevent);

router.get('/deleteevent/:eventId', deleteevent);

// router.get('/getcommunication',getcommunication);

router.get('/getcommunication/:event_id',getcommunication);

router.get('/addcommunication',addcommunication);

router.post('/savecommunication', savecommunication);

router.get('/getcommunication/editcommunication/:communicationId', editcommunication);

router.post('/updatecommunication', updatecommunication);

router.get('/getcommunication/deletecommunication/:communicationId', deletecommunication);

module.exports = router;