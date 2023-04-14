import {gql} from '@apollo/client';
export const SIGNUP_USER = gql`
  mutation createNewUser($userNew: UserInput!) {
    user: signupUser(userNew: $userNew) {
      firstName
      lastName
      email
    }
  }
`;

export const LOGIN_USER = gql`
  mutation SignInUser($userCredential: UserSingInInput!) {
    user: signInUser(userSignIn: $userCredential) {
      token
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createNewQuote($quote: String!) {
    quote: createQuote(name: $quote)
  }
`;