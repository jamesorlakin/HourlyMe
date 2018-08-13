import { createConnection } from 'typeorm/browser'
import { Organisation, Hours } from './tables'

export default async function getDB () {
  var connection = await createConnection({
    type: 'react-native',
    database: 'main',
    location: 'default',
    entities: [ Organisation, Hours ],
    synchronize: true,
    logging: true
  })
  return connection
}
