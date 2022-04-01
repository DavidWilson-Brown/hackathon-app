import React from 'react';
import Articles from './components/Articles'
import './App.css';

let URL =
  "https://hn.algolia.com/api/v1/search_by_date?tags=story&hitsPerPage=50";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchSelect: "story",
      searchBy: "byPopularity",
      searchRange: "all",
      articles: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    console.log("mounted", this.state.articles);
    const res = await fetch(URL);
    const data = await res.json();
    this.setState({
      articles: data.hits,
    });
  }
  componentDidUpdate() {
    console.log("updated", this.state.articles);
  }



  updateFetch = (URLsearch) => {
    console.log("search", URLsearch);
    fetch(URLsearch)
      .then((res) => res.json())
      .then((searchData) => {
        console.log("searchData.hits", searchData.hits);
        this.setState({
          articles: searchData.hits,
        });
        console.log("this.state.articles", this.state.articles);
      });
  };


  handleSubmit = (event) => {
    event.preventDefault();
    console.log("this.state.searchSelect", this.state.searchSelect);
    // errors still need to be fixed to make this search work
    if (this.state.searchRange === "all") {
      this.state.searchSelect === "writer"
        ? this.updateFetch(
            `https://hn.algolia.com/api/v1/search?tags=story,author_${this.state.searchTerm}&hitsPerPage=50`
          )
        : this.updateFetch(
            `http://hn.algolia.com/api/v1/search?query=${this.state.searchTerm}&tags=${this.state.searchSelect}&hitsPerPage=50`
          );
    } else {
      this.state.searchSelect === "writer"
        ? this.updateFetch(
            `https://hn.algolia.com/api/v1/search?tags=story,author_${this.state.searchTerm}&numericFilters=created_at_i>${this.state.searchRange}&hitsPerPage=50`
          )
        : this.updateFetch(
            `http://hn.algolia.com/api/v1/search?query=${this.state.searchTerm}&tags=${this.state.searchSelect}&numericFilters=created_at_i>${this.state.searchRange}&hitsPerPage=50`
          );
    }
  };


  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };


  handleSelectChange = (event) => {
    event.preventDefault();
    console.log("event.target.value", event.target.value);
    this.setState({ searchSelect: event.target.value });
  };


  handleSelectSort = (event) => {
    event.preventDefault();
    console.log("event.target.value", event.target.value);
    this.setState({ searchBy: event.target.value });
    if (event.target.value === "byDate") {
      console.log("this.state.articles", this.state.articles);
      const sorted = this.state.articles.sort(
        (a, b) => b.created_at_i - a.created_at_i
      );
      console.log("sorted", sorted);
      this.setState({ articles: sorted });
    } else {
      console.log("this.state.articles", this.state.articles);
      const sorted = this.state.articles.sort((a, b) => b.points - a.points);
      console.log("sorted", sorted);
      this.setState({ articles: sorted });
    }
  };


  handleSearchRange = (event) => {
    event.preventDefault();
    let searchDate = new Date();
    switch (event.target.value) {
      case "all":
        console.log("event.target.value", event.target.value);
        this.setState({ searchRange: "all" });
        break;
      case "today":
        console.log("event.target.value", event.target.value);
        searchDate.setDate(searchDate.getDate() - 1);
        this.setState({
          searchRange: searchDate.valueOf().toString().slice(0, 10),
        });
        break;
      case "thisWeek":
        console.log("event.target.value", event.target.value);
        searchDate.setDate(searchDate.getDate() - 7);
        this.setState({
          searchRange: searchDate.valueOf().toString().slice(0, 10),
        });
        break;
      case "thisMonth":
        console.log("event.target.value", event.target.value);
        searchDate.setMonth(searchDate.getMonth() - 1);
        this.setState({
          searchRange: searchDate.valueOf().toString().slice(0, 10),
        });
        break;
      case "thisYear":
        console.log("event.target.value", event.target.value);
        searchDate.setFullYear(searchDate.getFullYear() - 1);
        this.setState({
          searchRange: searchDate.valueOf().toString().slice(0, 10),
        });


        break;
      default:
        console.log("event.target.value", event.target.value);
    }
  };


  render() {
    return (
      <div className="wrapper">
        <div className="search-bar">
          <form onSubmit={this.handleSubmit} className="searchWrapper">
            <input
              className="inputBar"
              type="text"
              onChange={this.handleChange}
            />
            <input type="submit" value="Submit" />
            <label>
              Search
              <select
                value={this.state.searchSelect}
                name={this.props.name}
                onChange={this.handleSelectChange.bind(this)}
              >
                <option value="story">Stories</option>
                <option value="writer">Writer</option>
                <option value="comment">Comments</option>
              </select>
            </label>
            <label>
              by
              <select
                value={this.state.searchBy}
                name={this.props.name}
                onChange={this.handleSelectSort.bind(this)}
              >
                <option value="byDate">Date</option>
                <option value="byPopularity">Popularity</option>
              </select>
            </label>
            <label>
              for
              <select
                name={this.props.name}
                onChange={this.handleSearchRange.bind(this)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
                <option value="thisYear">This Year</option>
              </select>
            </label>
          </form>
        </div>
       
        <Articles articleList={this.state.articles} />
      </div>
    );
  }
}


export default App;