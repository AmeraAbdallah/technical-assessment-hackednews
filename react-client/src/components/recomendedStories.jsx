import React from 'react';
import TopTen from './topTen.jsx';

const RecomendedStories = (props) => {
    console.log(props.recomendedStories)
    return(
        <div>
            {
                props.recomendedStories.length > 0 && <TopTen getRecomended = {props.getRecomended} stories= {props.recomendedStories}/>
            }
        </div>
    )
}

export default RecomendedStories;