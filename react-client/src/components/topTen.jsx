import React from 'react';

// Build out the view for the top ten HackerNews stories here. 
// Each story should have a title, author, and score. 
// You may wish to refactor the existing component structure - that's fine.
const TopTen = ({stories}) => (

  <div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
      {
        stories.slice(stories.length - 10, stories.length).map(story => (
          <tr key = {story.id}>
              <td>{story.title}</td>
              <td>{story.by}</td>
              <td>{story.score}</td>
          </tr>
        ))
      }
      </tbody>
  </table>
</div>
);

export default TopTen;