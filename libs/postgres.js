import pkg from 'pg';
const {Pool} = pkg;

const pool = new Pool({
  host: 'localhost',
  post: 5432,
  user: 'josedev',
  password: 'dev1234',
  database: 'store_db'
});

export default pool;
