import React, { Component } from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false,
    }

    componentDidMount() {
      // это не код, просто логика реализации Guard
      // if unauth => this.props.history.replace('/posts')
      console.log('NewPost', this.props);
    }

  postDataHandler = () => {
      const post  = {
        title: this.state.title,
        body: this.state.content,
        author: this.state.author
      };
      axios.post('/posts', post)
          .then(response => {
            console.log(response);
            // Вариант перенаправления через history
            this.props.history.replace('/posts');

            // Вариант перенапрвления через Redirect по условию
            // Redirect замещает текущую страницу и, при нажатии в браузере кнопки
            // Назад, мы не сможем вернуться на страницу до перенаправления
            // this.props.history.replace('/posts') с replace дублирует такой функционал
            // this.setState({submitted: true});
          })
          .catch(error => {
            console.log(error);
          })
    }

    render () {
        // Redirect вне компонента Switch использует только props to=""
        let redirect = null;
        if (this.state.submitted) {
          redirect = <Redirect to="/posts" />;
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;