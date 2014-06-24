module.exports = {
  'asanaAuth': {
    'clientID'     : process.env.CLIENTID || '13235029827133',
    'clientSecret' : process.env.CLIENTSECRET || '829a75907ceff9ac6ce709d45f774c88',
    'callbackURL'  : process.env.CALLBACK || 'http://127.0.0.1:8080/auth/asana/callback'
  }
};