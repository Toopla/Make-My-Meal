const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);
app.use((req, res) => {
    res.json({
        error: 'Page introuvable',
    }).status(404);
});
app.listen(port, () => console.log(('listening on port ' + port)));