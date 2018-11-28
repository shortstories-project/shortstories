export default (process.env.NODE_ENV === 'development'
  ? 'http://localhost:4000'
  : 'http://localhost:8000/graphql')
