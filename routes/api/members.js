const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//Simple API
router.get('/', (req, res) => {
    // return arrays as json here in postman
    res.json(members);
});
// Get individual member
router.get(`/:id`, (req, res) => {

    // this will just print id as a string
    // res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {

        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }
    else {
        res.status(400).json({ msg: `Member not found with id of ${req.params.id}` });

    }
});

// Creating members
// to add any data we make post request
router.post(`/`, (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

//Update member
router.put(`/:id`, (req, res) => {

    // this will just print id as a string
    // res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {

        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: 'Member Updated', member });

            }
        });
    }
    else {
        res.status(400).json({ msg: `Member not found with id of ${req.params.id}` });

    }
});

//Delete member
router.delete(`/:id`, (req, res) => {

    // this will just print id as a string
    // res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {

        res.json({
            msg: 'Member Deleted',
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });
    }
    else {
        res.status(400).json({ msg: `Member not found with id of ${req.params.id}` });

    }
});


module.exports = router;