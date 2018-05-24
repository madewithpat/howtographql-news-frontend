import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class CreateLink extends Component {
  state = {
    description: "",
    url: ""
  };

  render() {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            type="text"
            className="mb2"
            value={this.state.description}
            placeholder="A description for the link"
            onChange={e => this.setState({ description: e.target.value })}
          />
          <input
            type="text"
            className="mb2"
            value={this.state.url}
            placeholder="A link URL"
            onChange={e => this.setState({ url: e.target.value })}
          />
          <button onClick={this._createLink}>Submit</button>
        </div>
      </div>
    );
  }
  _createLink = async () => {
    const { url, description } = this.state;
    await this.props.postMutation({
      variables: {
        description,
        url
      }
    });
  };
}

const POST_MUTATION = gql`
  mutation PostMutation($url: String!, $description: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;
export default graphql(POST_MUTATION, { name: "postMutation" })(CreateLink);

/* 
    Example mutation with apollo
    
    Here we define a mutation query (`POST_MUTATION`)
    and pass it to the graphql component.
    This creates and passes down a function,
    with the name that we specify in the config object.
    This function can then be called,
    with it's own config object that contains the variables
    for the mutation to use.
*/
