import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
import TopTenAuthors from './components/topTenAuthors.jsx';
import AuthorSearch from './components/authorSearch.jsx';
import RecomendedStories from './components/recomendedStories.jsx';

let stories = require('../dummy_data');
let seed_data = require('../../seed_data');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stories: [],
            authors: [],
            filteredStories: [],
            recomendedStories: [],
            //tTS => top ten stories
            //tTA => top ten Authors
            //aS => author search
            //rS => Recomended Stories
            view: 'tTS'
        };
        this.getRecomended = this.getRecomended.bind(this)
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

    getRecomended(event, story){
        console.log(story)
        let allStories = []
        fetch(`https://hacker-news.firebaseio.com/v0/topstories.json`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            data.forEach(element => {
            fetch(`https://hacker-news.firebaseio.com/v0/user/${element}.json?print=pretty`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(ss => {
                // console.log(ss)
                allStories.push(ss);
            })
            .catch(err => console.log(err));
            
            })
        }).catch(err => console.log(err));
        
        let recomendedStories = allStories.map(storyData => {
            let counter = 0;
            storyData.kids.forEach(kid => {
                story.kids.forEach(kidA => {
                    // console.log(kid, kidA)
                    if(kid === kidA){
                        ++counter;
                    }
                })
            });
            if(counter > 3){
                return storyData;
            }
        })
        this.setState(() => ({recomendeStories: [...recomendedStories],view: 'rS'}))
    }

    render(){
        let {view} = this.state;
        return(
            <div>
                <div>
                    <button onClick = {() => this.setState(() => ({view: 'tTS'}))}>Top Ten Stories</button>
                    <button onClick = {() => this.setState(() => ({view: 'tTA'}))}>Top Ten Authors</button>
                    <button onClick = {() => this.setState(() => ({view: 'aS'}))}>Author Search</button>
                    <button onClick = {() => this.setState(() => ({view: 'rS'}))}>Recomended Stories</button>
                </div>
                <div>
                    {
                        (view === 'tTS')? <TopTen stories = {this.state.stories} getRecomended = {this.getRecomended}/>:
                        (view === 'tTA')? <TopTenAuthors authors = {this.state.authors}/>:
                        (view === 'aS')? <AuthorSearch searchAuthor = {(author) => this.searchAuthor(author)} filteredStories = {this.state.filteredStories}/>:
                        (view === 'rS')? <RecomendedStories recomendedStories = {this.state.recomendedStories} getRecomended = {this.getRecomended}/>:
                        <div></div>
                    }
                </div>
                
            </div>
            
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));

