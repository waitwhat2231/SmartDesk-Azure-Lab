const { app } = require('@azure/functions');
 
app.http('tickets', {
  methods: ['POST'],
  authLevel: 'anonymous',
  route: 'tickets',
  handler: async (request) => {
    let data = null;
    try { data = await request.json(); } catch (e) { data = null; }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return { status: 400, jsonBody: { error: 'Request body must be a JSON object' } };
    }
    const subject = typeof data.subject === 'string' ? data.subject.trim() : '';
    const description = typeof data.description === 'string' ? data.description.trim() : '';
    if (!subject || subject.length > 100) {
      return { status: 400, jsonBody: { error: 'Subject is required (max 100 characters)' } };
    }
    if (!description || description.length > 500) {
      return { status: 400, jsonBody: { error: 'Description is required (max 500 characters)' } };
    }
    return {
      status: 201,
      jsonBody: {
        subject, description, category: 'technical', confidence: 0.5,
        priority: 'normal', created_at: new Date().toISOString()
      }
    };
  }
});
