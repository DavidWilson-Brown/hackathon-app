import React, { Component } from "react";
import Article from "./ArticleCard";

class Articles extends Component {
  constructor(props) {
    super(props);

    console.log("props.articleList", props.articleList);
    // console.log("props.singleArticle", props.singleArticle.created_at);
  }

  render() {
    return (
      <div>
        {this.props.articleList.map((article, index) => {
          return <Article singleArticle={article} key={index} />;
        })}
      </div>
    );
  }
}

export default Articles;