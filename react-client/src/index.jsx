import React from 'react';
import ReactDOM from 'react-dom';
import TopTen from './components/topTen.jsx';

let stories = require('../dummy_data');

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            stories: []
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
    }

    render(){
        return(
            <TopTen stories = {this.state.stories}/>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('app'));

