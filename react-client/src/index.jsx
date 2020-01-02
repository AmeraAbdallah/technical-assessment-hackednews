import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
import TopTenAuthors from './components/topTenAuthors.jsx';
import AuthorSearch from './components/authorSearch.jsx';

let stories = require('../dummy_data');
let seed_data = require('../../seed_data');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stories: [],
            authors: [],
            filteredStories: [],
            //tTS => top ten stories
            //tTA => top ten Authors
            //aS => author search
            view: 'tTS'
        }
    }

    componentDidMount(){ 
        fetch('/api/story', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(docs => this.setState(() => ({stories: [...docs]})));

        fetch('/api/author', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(docs => this.setState(() => ({authors: [...docs]})));
    }

    searchAuthor(author){
        let stories = this.state.stories.filter(story => story.by === author);
        this.setState(() => ({filteredStories: [...stories]}));
    }

    render(){
        let {view} = this.state;
        return(
            <div>
                <div>
                    <button onClick = {() => this.setState(() => ({view: 'tTS'}))}>Top Ten Stories</button>
                    <button onClick = {() => this.setState(() => ({view: 'tTA'}))}>Top Ten Authors</button>
                    <button onClick = {() => this.setState(() => ({view: 'aS'}))}>Author Search</button>
                </div>
                <div>
                    {
                        (view === 'tTS')? <TopTen stories = {this.state.stories}/>:
                        (view === 'tTA')? <TopTenAuthors authors = {this.state.authors}/>:
                        (view === 'aS')? <AuthorSearch searchAuthor = {(author) => this.searchAuthor(author)} filteredStories = {this.state.filteredStories}/>:
                        <div></div>
                    }
                </div>
                
            </div>
            
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));

