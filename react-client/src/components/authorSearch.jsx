import React, {Component} from 'react';
import TopTen from './topTen.jsx';

class AuthorSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            txtSearch: ''
        };
        this.onTxtChangeHandler = this.onTxtChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onTxtChangeHandler(event){
        let txtSearch = event.target.value;
        this.setState(() => ({txtSearch}));
    }

    onSubmitHandler(event){
        event.preventDefault();
        let txtSearch = this.state.txtSearch;
        this.props.searchAuthor(txtSearch);
        this.setState(() => ({txtSearch: ''}));
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.onSubmitHandler}>
                    <input type= "text" value = {this.state.txtSearch} onChange = {this.onTxtChangeHandler}/>
                    <button>Submit</button>
                </form>
                {
                    this.props.filteredStories.length > 0 &&
                    <TopTen stories = {this.props.filteredStories}/>
                }
            </div>
        )
    }
}

export default AuthorSearch;