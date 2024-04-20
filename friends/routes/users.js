const express = require('express');
const router = express.Router();

let users = [
    {
        firstName: "Tanadorn",
        lastName: "Galaxy",
        nickName: "Donny",
        birthDate: "04-04-2004"
    },
    {
        firstName: "Tanadorn",
        lastName: "Pluto",
        nickName: "Donna",
        birthDate: "04-05-2004"
    },
    {
        firstName: "Tanadorn",
        lastName: "Blackhole",
        nickName: "Donno",
        birthDate: "31-12-2004"
    },
];

router.get("/", (req, res) => {
    res.send(users);
});

router.get("/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    let filtered_users = users.filter((user) => user.lastName === lastName);
    res.send(filtered_users);
});

router.post("/",(req,res)=>{
    users.push({"firstName":req.body.firstName,"lastName":req.body.lastName,"nickName":req.body.nickName,"birthDate":req.body.birthDate});
    res.send("The user" + (' ')+ (req.body.nickName) + " Has been added!")
});

router.put("/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    let filtered_users = users.filter((user) => user.lastName === lastName);
    if (filtered_users.length > 0) {
        let filtered_user = filtered_users[0];
        let firstName = req.query.firstName;
        let lastName = req.query.lastName;
        let nickName = req.query.nickName;
        let birthDate = req.query.birthDate;
        if(firstName) {
            filtered_user.firstName = firstName;
        }
        if(lastName) {
            filtered_user.lastName = lastName;
        }
        if(nickName) {
            filtered_user.nickName = nickName;
        }
        if(birthDate) {
            filtered_user.birthDate = birthDate;
        }
        users = users.filter((user) => user.lastName != lastName);
        users.push(filtered_user);
        res.send(`User with the lastName ${lastName} updated.`);
    }
    else{
        res.send("Unable to find user!");
    }
});

router.delete("/:lastName", (req, res) => {
    const lastName = req.params.lastName;
    users = users.filter((user) => user.lastName != lastName);
    res.send(`๊Use with the lastName ${lastName} deleted.`)
});

module.exports = router;