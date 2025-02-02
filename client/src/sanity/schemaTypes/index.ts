import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import home from './page/home'
import cart from './page/cart'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, home, cart],
}
