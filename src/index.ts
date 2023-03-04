import type { MongoDriver } from '@mikro-orm/mongodb' // or any other driver package
import { MikroORM, QueryOrder } from '@mikro-orm/core'
import { MongoBook } from './entities/MongoBook'

main().catch(err => console.log('Hubo un error', err))

async function main() {

  const orm = await MikroORM.init<MongoDriver>({
    entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
    entitiesTs: ['./src/entities'], // path to our TS entities (src), relative to `baseDir`
    dbName: 'my-db-name',
    type: 'mongo',
  })
  const em = orm.em.fork(); // <-- create the fork, https://stackoverflow.com/questions/71117269/validation-error-using-global-entity-manager-instance-methods-for-context-speci

  const bookRepository = em.getRepository(MongoBook)

  const book = em.create(MongoBook, { name: 'Libro1', age: 32 })
  book.getOlder()
  // wrap(book.author, true).__initialized = true;
  await bookRepository.persist(book).flush()
  console.log('Persisted book', book._id)

  const books = await bookRepository.findAll({
    // populate: ['author'],
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  })

  console.log(books)
}