import express from 'express';
const port = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the server',
    });
});

app.listen(port, function () {
    console.log(`Server listening on http://localhost:${port}`);
});
