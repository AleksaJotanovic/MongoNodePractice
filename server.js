const { MongoClient } = require("mongodb");

const main = async () => {
  const uri = 'mongodb+srv://jotanovicaleksa:jotanovicaleksa@alexitcluster.5kd8ngp.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    await listDatabases(client);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};

const listDatabases = async (client) => {
  let databases = await client.db().admin().listDatabases();
  console.log("Databases: ");
  databases.databases.forEach((db) => console.log(`${db.name}`));
};

main().catch((err) => console.log(err));

