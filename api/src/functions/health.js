const { app } = require('@azure/functions');
 
app.http('health', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'health',
  handler: async () => ({
    jsonBody: { status: 'ok', service: 'SmartDesk Azure API' }
  })
});
