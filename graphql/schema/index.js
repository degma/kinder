const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Product {
  _id: ID!
  categoryId: Category!
  manufacturerId: Manufacturer!
  genderId: Gender!
  name: String!
  description: String!
  productprices: [ProductPrice!]!
  creator: User!
}

type Category {
  _id: ID!
  name: String!
  creator: User!
}

type ProductPrice {
  _id: ID!
  productId: Product!
  pricelistId: PriceList!
  price: Float
}

type PriceList {
  _id: ID!
  name: String!
  validFrom: String!
  validTo: String!
  prices: [ProductPrice]
  creator: User
  
}

type Manufacturer {
  _id: ID!
  name: String!
  address: String
  phone: String
  primary_contact_name: String
  primary_contact_phone: String
  creator: User!
}

type Gender {
  _id: ID!
  name: String!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdProducts: [Product!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}


input UserInput {
  email: String!
  password: String!
}

input ProductInput {
  categoryId: ID!
  manufacturerId: ID!
  genderId: ID!
  name: String!
  description: String
  price: Float
}

input CategoryInput {
  name: String!
}

input ManufacturerInput {
  name: String!
  address: String
  phone: String
  primary_contact_name: String
  primary_contact_phone: String
  
}

input GenderInput {
  name: String!
}

input ProductPriceInput {
  productId: ID!
  pricelistId: ID!
  price: Float
}

input PriceListInput {
  name: String!
  validFrom: String
  validTo: String
  status: String
}

type RootQuery {
    
    products: [Product!]!
    categories: [Category!]!
    genders: [Gender!]!
    manufacturers: [Manufacturer!]!
    login(email: String!, password: String!): AuthData!
    pricelists: [PriceList!]!
    productprices(pricelistId: ID!): [ProductPrice!]!
    
}

type RootMutation {
    
    createUser(userInput: UserInput): User
    createProductPrice(productpriceInput: ProductPriceInput): ProductPrice
    createPriceList(pricelistInput: PriceListInput): PriceList
    createProduct(productInput: ProductInput): Product
    createCategory(categoryInput: CategoryInput): Category
    createManufacturer(manufacturerInput: ManufacturerInput): Manufacturer
    createGender(genderInput: GenderInput): Gender
    
  
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
