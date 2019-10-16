const { Pool } = require('pg');
const args = process.argv.splice(2);

const $cohortName = args[0];
const $queryLimit = args[1] || 5;
const values = [`%${$cohortName}%`, $queryLimit];

const pool = new Pool({
  user: 'miguelcruz',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const queryString = `
SELECT s.id, s.name student_name, c.name cohort_name
FROM students s
JOIN cohorts c
ON s.cohort_id=c.id
WHERE c.name LIKE $1
LIMIT $2
`;
pool.query(queryString, values)
  .then(res => {
    res.rows.map(res => console.log(`${res.student_name} has an id of ${res.id} and was in the ${res.cohort_name} cohort`));
  })
  .catch(err => console.error('query error', err.stack));