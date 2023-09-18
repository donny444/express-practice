const express= require("express");

const app = express();
app.use(express.json());

//Getting a resource
app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const response = await fetch(url)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Listing all resources
app.get("/posts", async (req, res) => {
    try {
        const url = `https://jsonplaceholder.typicode.com/posts`;
        const response = await fetch(url)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Creating a resource
app.post("/posts", async (req, res) => {
    try {
        const url = `https://jsonplaceholder.typicode.com/posts`;
        const options = {
            method: "POST",
            body: JSON.stringify({
                title: "foo",
                body: "bar",
                userId: 1
            }),
            headers: {
                'Content-type': 'application/json; chatser=UTF-8'
            }
        }
        const response = await fetch(url, options)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Updating a resource
app.put("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const options = {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                title: "foo",
                body: "bar",
                userId: id
            }),
            headers: {
                "Content-type": "application/json; charser=UTF-8"
            }
        }
        const response = await fetch(url, options)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Patching a resource
app.patch("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const options = {
            method: "PUT",
            body: JSON.stringify({
                id: id,
                title: "foo",
                body: "bar",
                userId: id
            }),
            headers: {
                "Content-type": "application/json; charser=UTF-8"
            }
        }
        const response = await fetch(url, options)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Deleting a resource
app.delete("/posts/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
        const options = {
            method: "DELETE"
        }
        const response = await fetch(url, options)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Filtering resources
app.get("/posts", async (req, res) => {
    const userId = req.query.userId;
    try {
        const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
        const response = await fetch(url)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})

//Listing nested resources
app.get("/posts/:postId/comments", async (req, res) => {
    const postId = req.params.postId;
    try {
        const url = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
        const response = await fetch(url)
        .then((response) => response.json())
        return res.status(200).send(response);
    } catch (err) {
        console.error(err);
    }
})
//This is equivalent to /comments?postId=postId

app.listen(8000, () => console.log("Server is running on port 8000"));