import React, { Component } from 'react';
// import axios from 'axios';
// import axios from '../../axios';
import Posts from "./Posts/Posts";
// import FullPost from "./FullPost/FullPost";
import './Blog.css';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
// NewPost мы хотим загружать по-необходимость - lazy loading
// Используем HOC asyncComponent, webpack не включает в bundle NewPost.js,
// а добавляет его во вспомогательный bundle
// import NewPost from "./NewPost/NewPost";
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true,
  }

  render () {

        return (
            <div className="Blog">
              <header>
                <nav>
                  <ul>
                    {/* to может принимать строку или объект
                      NavLink, в отличии от Link, содержит дополнительные props, которые позволят
                      задать стили для активных ссылок
                    */}
                    {/* если имя класса нужно переименовать, сделать не active,
                        а своим именем, то используется activeClassName="my-active"
                        activeStyle позволяет задать свои стили через inline стили
                        */}
                    <li><NavLink
                        to="/posts"
                        exact
                        activeClassName="my-active"
                        activeStyle={{
                          color: '#fa923f',
                          textDecoration: 'underline'
                        }}
                    >Posts</NavLink></li>
                    <li><NavLink to={{
                      // this.props.match.url + позволяет использовать relative path,
                      // так как по умолчанию new-post будет добавлен к корню сайта -
                      // absolute path
                      pathname: '/new-post',
                      hash: '#submit', // example
                      search: '?quick-submit=true' // example
                    }}
                    >New Post</NavLink></li>
                  </ul>
                </nav>
              </header>
              {/*Названия props в Route четко заданы, их нельзя менять
                exact - boolean, если указан props exact, то это true
                exact отвечает за четкое соответствие props path
                он учитывает весь абсолютный путь!
              */}
              {/*<Route*/}
              {/*    path="/"*/}
              {/*    exact*/}
              {/*    render={() => <h1>Home</h1>}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*    path="/"*/}
              {/*    render={() => <h1>Home2</h1>}*/}
              {/*/>*/}

              {/*props component принимает весь класс или функциональный компонент.
                Важен, также, порядок размещения Route, чтобы не было конфликта new-post и
                :id (он может быть любым значением), и new-post может быть интерпретирован
                как id
              */}
              {/* Switch отображает только один из компонентов - первый, который будет
               удовлетворять пути, и пропустит остальные удовлетворяющие, то есть, один за раз
               ОЧЕНЬ ВАЖЕН ПОРЯДОК КОМПОНЕНТОВ ROUTE
               */}
              {/* Может быть несколько Route с одинаковыми компонентами, но
               разными path*/}
              {/* Redirect не рендерит компонент, а только перенаправляет */}
              <Switch>
                {/* Грубая реализация Guard без вынесения кода отдельно:
                 если пользователь не авторизован, то auth - false и мы не находим
                 /new-post и срабатывает redirect*/}
                {/*{this.state.auth ? <Route path="/new-post" component={NewPost} /> : null}*/}
                {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                <Route path="/posts" component={Posts} />
                {/* если не указан path или он не известен и redirect также
                 не отработает, то последним всегда указывают Route 404 not found
                 запрещенные страницы для неаторизованных также покажут not found
                 */}
                <Route render={() => <h1>Not found</h1>}/>
                {/*<Redirect from="/" to="/posts" />*/}
                {/*<Route path="/" component={Posts} />*/}
                {/*<Route path="/:id" exact component={FullPost} />*/}
              </Switch>
            </div>
        );
    }
}

export default Blog;