import React, { Component } from "react";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavored: false,
    };

    // console.log("props", props);
    // console.log("props", props.singleArticle.created_at);
  }
  

  handleIsFavored = () => {
    this.setState((prevState) => ({ isFavored: !prevState.isFavored }));
    console.log(this.state.isFavored);
  };

  render() {
    const { isFavored } = this.state;
    const { objectID, url, title, points, writer, num_comments } =
      this.props.singleArticle;

    const age = formatDistanceToNowStrict(
      new Date(this.props.singleArticle.created_at)
    );


    // console.log("age", age);

    
    return (
      <div>
        {isFavored ? (
          <div className="not-favored" onClick={this.handleIsFavored}>
            <p>You've Read This</p>
          </div>
        ) : (
          <article key={objectID}>
            <a className="title" href={url}>
              {title}
            </a>
            <span className="url-text">{url}</span>
            <div className="story-text">
              {points} | {writer} | {age} | {num_comments} comments |{" "}
              <div className="favored" onClick={this.handleIsFavored}>
                📰
              </div>
            </div>
          </article>
        )}
      </div>
    );
  }
}

export default Article;