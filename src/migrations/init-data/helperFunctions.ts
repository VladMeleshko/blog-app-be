export const insertValueInTableWithQuery = async (
  queryRunner,
  tableName: string,
  dataObj: any
) => {
  const fields: string[] = [];
  const values: any[] = [];

  Object.entries(dataObj).forEach(([key, value]) => {
    let insertValue = value;

    if (typeof value === 'string') {
      insertValue = `'${value.replace('\'', '\'\'')}'`;
    }

    fields.push(key);
    values.push(insertValue ?? 'NULL');
  });

  await queryRunner.query(`INSERT INTO "public"."${tableName}" ("${fields.join('", "')}") VALUES (${values.join(', ')})`);
};

export const insertArrayWithQuery = async (
  queryRunner,
  tableName: string,
  array: any[]
) => {
  for await (const item of array) {
    await insertValueInTableWithQuery(queryRunner, tableName, item);
  }
};
