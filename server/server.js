const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.get('/api/github/callback', async (req, res) => {
    try {
        const code = req.query.code;
        const clientId = process.env.GITHUB_CLIENT_ID;
        const clientSecret = process.env.GITHUB_CLIENT_SECRET;

        const response = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: clientId,
            client_secret: clientSecret,
            code: code
        }, {
            headers: {
                accept: 'application/json'
            }
        });

        const accessToken = response.data.access_token;
        // Use the access token to make further requests to the GitHub API
        console.log(response.data)
        res.send({
            accessToken: accessToken,
            message: 'Access token received. You can now use it to make requests to the GitHub API.'
        });
    } catch (error) {
        console.error('Error while handling GitHub callback:', error);
        res.status(500).send('An error occurred during the callback process.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});