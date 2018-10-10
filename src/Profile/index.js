import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Loading from "./../Loading/index";
import RepositoryList from "../Repository";

const GET_CURRENT_USER = gql`
  {
    viewer {
      login
      name
    }
  }
`;

const Profile = () => (
  <Query query={GET_REPOSITORIES_OF_CURRENT_USER}>
    {({ data }) => {
      const { viewer, loading } = data;
      if (loading || !viewer) {
        return <Loading />;
      }

      return <RepositoryList repositories={viewer.repositories} />;
    }}
  </Query>
);

const GET_REPOSITORIES_OF_CURRENT_USER = gql`
  {
    viewer {
      repositories(first: 5, orderBy: { direction: DESC, field: STARGAZERS }) {
        edges {
          node {
            id
            name
            url
            descriptionHTML
            primaryLanguage {
              name
            }
            owner {
              login
              url
            }
            stargazers {
              totalCount
            }
            viewerHasStarred
            watchers {
              totalCount
            }
            viewerSubscription
          }
        }
      }
    }
  }
`;

export default Profile;
