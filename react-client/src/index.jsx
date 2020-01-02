import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';
import TopTenAuthors from './components/topTenAuthors.jsx';

let stories = require('../dummy_data');
let seed_data = require('../../seed_data');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stories: [],
            authors: [],
            //tTS => top ten stories
            //tTA => top ten Authors
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

    render(){
        let {view} = this.state;
        return(
            <div>
                <div>
                    <button onClick = {() => this.setState(() => ({view: 'tTS'}))}>Top Ten Stories</button>
                    <button onClick = {() => this.setState(() => ({view: 'tTA'}))}>Top Ten Authors</button>
                </div>
                <div>
                    {
                        (view === 'tTS')? <TopTen stories = {this.state.stories}/>:
                        (view === 'tTA')? <TopTenAuthors authors = {this.state.authors}/>:
                        <div></div>
                    }
                </div>
                
            </div>
            
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));

