const { callDB } = require('../models/db');
// const { request } = require('express');

const path = require('path');
var session = require('express-session');

exports.getLog = async (request, response) => {
    var username = request.body.username;
    var password = request.body.password;
    if (username && password) {
        const resp = await callDB('SELECT * FROM accounts WHERE username = "' + username + '" AND password = "' + password + '"');
        if (resp.length > 0) {
            request.session.loggedin = true;
            request.session.username = username;
            response.redirect('/home');
        } else {
            response.send('Incorrect Username and/or Password');
        }
        response.end();
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
};

exports.getHome = async (request, response) => {
    if (request.session.loggedin) {
        response.redirect('/getevent');
    } else {
        response.send('Please login to view this page!');
    }
    response.end();
}

exports.getevent = async (req, res) => {
    let sql = "SELECT * FROM events";
    let query = await callDB(sql);
    res.send(query)
}

exports.addevent = async (req, res) => {
    res.render('event_add', {
        title: 'CRUD Event'
    });
};

exports.saveevent = async (req, res) => {
    let data = { id: req.body.id, event_name: req.body.event_name };
    let query = "INSERT INTO events VALUES ('" + data.id + "','" + data.event_name + "')";
    console.log(query);
    let result = await callDB(query);
    res.redirect('/getevent')
}

exports.editevent = async (req, res) => {
    const eventId = req.params.eventId;
    let sql = `Select * from events where id = ${eventId}`;
    let query = await callDB(sql);
    res.render('event_edit', {
        title: 'CRUD Event',
        event: query[0]
    })
}

exports.updateevent = async (req, res) => {
    const eventId = req.body.id;
    let sql = "update events SET event_name='" + req.body.event_name + "' where id =" + eventId;
    let query = await callDB(sql);
    res.redirect('/getevent')
}

exports.deleteevent = async (req, res) => {
    const eventId = req.params.eventId;
    let sql = `DELETE from events where id = ${eventId}`;
    let query = await callDB(sql);
    res.redirect('/getevent');
}


exports.getcommunication = async (req, res) => {
    const event_id = req.params.event_id
    let event_detail = await callDB("SELECT * FROM events where id='" + event_id + "'")
    let communication_list = await callDB("SELECT * FROM communications where event_id='" + event_id + "'")
    // let sql = 'SELECT communications.*,events.event_name from communications INNER JOIN events ON (communications.event_id = events.id) where event_id ="' + event_id + '"';
    console.log(event_detail[0].event_name)
    res.render('communication_index', {
        title: 'Add Communication',
        event_name: event_detail[0].event_name,
        communications: communication_list,
    })
}

exports.addcommunication = async (req, res) => {
    res.render('communication_add', {
        title: 'CRUD Communication'
    });
};

exports.savecommunication = async (req, res) => {
    let data = { event_id: req.body.event_id, id: req.body.id, email_template: req.body.email_template, phone_template: req.body.phone_template, schedular: req.body.schedular };
    let sql = "INSERT INTO communications VALUES ('" + data.event_id + "','" + data.id + "', '" + data.email_template + "','" + data.phone_template + "', '" + data.schedular + "')";
    console.log(sql);
    let result = await callDB(sql)
    res.redirect('/getcommunication')
}

exports.editcommunication = async (req, res) => {
    const communicationId = req.params.communicationId;
    let sql = `Select * from communications where id = ${communicationId}`;
    let query = await callDB(sql);
    res.render('communication_edit', {
        title: 'CRUD Communication',
        communication: query[0]
    })
}

exports.updatecommunication = async (req, res) => {
    const communicationId = req.body.id;
    let sql = "update communications SET email_template='" + req.body.email_template + "',  phone_template='" + req.body.phone_template + "' where id =" + communicationId;
    let query = await callDB(sql);
    res.redirect('/getcommunication/:communicationId')
}

exports.deletecommunication = async (req, res) => {
    const communicationId = req.params.communicationId;
    let sql = `DELETE from communications where id = ${communicationId}`;
    let query = await callDB(sql);
    res.redirect('/getcommunication');
}