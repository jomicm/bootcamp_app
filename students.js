const args = process.argv.splice(2);

const $cohortName = args[0];
const $queryLimit = args[1];
const { Pool } = require('pg');

const pool = new Pool({
  user: 'miguelcruz',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT s.id, s.name student_name, c.name cohort_name
  FROM students s
  JOIN cohorts c
  ON s.cohort_id=c.id
  WHERE c.name LIKE '%${$cohortName}%'
  LIMIT ${$queryLimit};
`)
  .then(res => {
    res.rows.map(res => console.log(`${res.student_name} has an id of ${res.id} and was in the ${res.cohort_name} cohort`));
  })
  .catch(err => console.error('query error', err.stack));

// pool.query(`
// SELECT s.id, s.name student_name, c.name cohort_name
// FROM students s
// JOIN cohorts c
// ON s.cohort_id=c.id
// LIMIT 5;
// `)
//   .then(res => {
//     console.log(res.rows);
//   })
//   .catch(err => console.error('query error', err.stack));

