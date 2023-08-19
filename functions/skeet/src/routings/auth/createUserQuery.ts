export const CreateUserQuery = `mutation CreateUser(
  $createUserUid: String
  $createUserEmail: String
  $createUserUsername: String
  $createUserIconUrl: String
) {
  createUser(
    uid: $createUserUid
    email: $createUserEmail
    username: $createUserUsername
    iconUrl: $createUserIconUrl
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
