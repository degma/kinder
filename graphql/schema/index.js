const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Product {
  _id: ID!
  category: String!
  manufacturer: String!
  gender: String!
  name: String!
  price: Float!
  creator: User!
}

type Category {
  _id: ID!
  name: String!
  creator: User!
}

type Manufacturer {
  _id: ID!
  name: String!
  address: String!
  phone: String!
  primary_contact_name: String!
  primary_contact_phone: String!
}

type Gender {
  _id: ID!
  name: String!
}

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}

input UserInput {
  email: String!
  password: String!
}

input ProductInput {
  category: String!
  manufacturer: String!
  gender: String!
  name: String!
  price: Float!
}

input CategoryInput {
  name: String!
}

input ManufacturerInput {
  name: String!
  address: String!
  phone: String!
  primary_contact_name: String!
  primary_contact_phone: String!
}

input GenderInput {
  name: String!
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    products: [Product!]!
    categories: [Category!]!
    genders: [Gender!]!
    manufacturers: [Manufacturer!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
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
