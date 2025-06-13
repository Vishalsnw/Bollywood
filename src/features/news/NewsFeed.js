import React from 'react';

const NewsFeed = ({ news }) => {
  return (
    <div>
      <h1>News Feed</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <strong>{item.headline}</strong> - {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
