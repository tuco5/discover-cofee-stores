const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_KEY
);

const table = base('coffee-stores');

const getRecord = (record) => {
  return { ...record.fields };
};

const getFieldRecords = (records) => records.map((record) => getRecord(record));

export { table, getFieldRecords };
