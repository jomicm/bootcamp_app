const { Pool } = require('pg');
const args = process.argv.splice(2);
const $cohortName = args[0];

const pool = new Pool({
  user: 'miguelcruz',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

pool.query(`
  SELECT DISTINCT t.name student_name, c.name cohort_name
  FROM teachers t
  JOIN assistance_requests a
  ON t.id = a.teacher_id
  JOIN students s
  ON a.student_id=s.id
  JOIN cohorts c
  ON c.id=s.cohort_id
  WHERE c.name='${$cohortName}';
`)
  .then(res => {
    res.rows.map(res => console.log(`${res.cohort_name}: ${res.student_name}`));
  })
  .catch(err => console.error('query error', err.stack));