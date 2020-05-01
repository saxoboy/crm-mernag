process.env.PORT = process.env.PORT || 4500 // Port express
process.env.EXPTOKEN = "2h" // Time live valid tokens 3 days
process.env.SEED = process.env.SEED || 'No, I am your father' // Seed SECRET encrypt token

// Configuration MongoDB
process.env.DBHOST = process.env.DBHOST || 'ds213755.mlab.com';
process.env.DBNAME = process.env.DBNAME || 'kayosos';
process.env.DBUSER = process.env.DBUSER || 'admin';
process.env.DBPASS = process.env.DBPASS || 'sofia81';
process.env.DBPORT = process.env.DBPORT || 13755;

// For development
//process.env.URI = `mongodb://${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`;

// For production
process.env.URI = `mongodb://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DBNAME}`;

// Credentials Google OAuth
process.env.OAUTH_CLIENT_ID = process.env.OAUTH_CLIENT_ID || '710982516234-pk44q53rr67vguamt0qhhqf97rukvb9u.apps.googleusercontent.com'