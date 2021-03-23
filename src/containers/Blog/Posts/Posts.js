import React, {Component} from 'react';
import axios from "../../../axios";
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router-dom";

class Posts extends Component {
	state = {
		posts: [],
		// selectedPostId: null,
		// error: false
	}

	componentDidMount() {
		console.log(this.props);
		axios.get('/posts')
				.then(response => {
					const posts = response.data.slice(0, 4);
					const updatedPosts = posts.map(post => {
						return {...post, author: 'Andrei'};
					});
					this.setState({posts: updatedPosts});
				})
				.catch(error => {
					console.log('Server get Error', error);
					// this.setState({error: true});
				});
	}

	postSelectedHandler = (id) => {
		// вариант без роутинга
		// this.setState({selectedPostId: id});

		// вариант с роутингом
		// используется вместо Link с props to=""
		this.props.history.push({pathname: '/posts/' + id});
		// можно и так писать
		// this.props.history.push('/posts/' + id);
	}

	render() {
		let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
		if (!this.state.error) {
			posts = this.state.posts.map(post => {
				return (
						// Варианто перехода к посту по ссылке через Link
						// <Link to={'/posts/' + post.id} key={post.id}>
							<Post
								key={post.id}
								title={post.title}
								author={post.author}
								clicked={() => this.postSelectedHandler(post.id)}/>
						// </Link>
				);
			});
		}
		return (
				<div>
					<section className="Posts">
						{posts}
					</section>
					<Route path={this.props.match.url + '/:id'} exact component={FullPost} />
				</div>
		);
	}
}

export default Posts;