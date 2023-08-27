export const CreateUserQuery = `mutation CreateUser(
  $uid: String
  $email: String
  $username: String
  $iconUrl: String
) {
  createUser(
    uid: $uid
    email: $email
    username: $username
    iconUrl: $iconUrl
  ) {
    id
    rawId
    uid
    username
    email
    iconUrl
    role
    iv
    createdAt
    updatedAt
  }
}
`
