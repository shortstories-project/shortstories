export default (process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : process.env.API_URL)
