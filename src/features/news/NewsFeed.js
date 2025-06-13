import React from 'react';

const NewsFeed = ({ news = [] }) => {
  if (news.length === 0) {
    return (
      <div>
        <h1>News Feed</h1>
        <p>No news available at the moment.</p>
      </div>
    );
  }

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
