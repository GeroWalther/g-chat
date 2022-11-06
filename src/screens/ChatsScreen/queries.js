export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          _deleted
          chatRoom {
            id
            updatedAt
            name
            image
            users {
              items {
                id
                user {
                  id
                  name
                  image
                }
              }
            }
            LastMessage {
              id
              createdAt
              text
            }
          }
        }
      }
    }
  }
`;
