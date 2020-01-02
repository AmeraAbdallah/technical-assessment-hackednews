import React from 'react';

// Build out the view for the top ten HackerNews stories here. 
// Each story should have a title, author, and score. 
// You may wish to refactor the existing component structure - that's fine.
const TopTenAuthors = ({authors}) => (

  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Karma</th>
          <th>About</th>
        </tr>
      </thead>
      <tbody>
      {
        authors.sort((b, a) => a.karma - b.karma).slice(0, 10).map(author => (
          <tr key = {author.id}>
              <td>{author.id}</td>
              <td>{author.karma}</td>
              <td>{author.about}</td>
          </tr>
        ))
      }
      </tbody>
  </table>
</div>
);

export default TopTenAuthors;