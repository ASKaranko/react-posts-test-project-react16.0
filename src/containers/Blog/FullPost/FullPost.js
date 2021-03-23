import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';
import Blog from "../Blog";

class FullPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadedPost: null,
    }
  }

  componentDidMount() {
    console.log('FullPost', this.props);
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    if (this.props.match.params.id) {
      // Нужно учитывать, что id в loadedPost - number,
      // а id в params.id - строка, поэтому будет постоянно выполнять axios запрос и setState вызывать
      // infinite loop с обновлением componentDidUpdate
      if (!this.state.loadedPost ||
          (this.state.loadedPost && this.state.loadedPost.id !== +this.props.match.params.id)) {
        axios.get('/posts/' + this.props.match.params.id)
            .then(response => {
              this.setState({loadedPost: response.data});
            });
      }
    }
  }

  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
        .then(response => {
          console.log(response);
        });
  }

  render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
          post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
          post = (
              <div className="FullPost">
                <h1>{this.state.loadedPost.title}</h1>
                <p>{this.state.loadedPost.body}</p>
                <div className="Edit">
                  <button
                      className="Delete"
                      onClick={this.deletePostHandler}
                  >Delete</button>
                </div>
              </div>
          );
        }
        return post;
    }
}

export default FullPost;