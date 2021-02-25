const app = require('./app.js');

const PORT = 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`listening at http://${HOST}:${PORT}`);
});
