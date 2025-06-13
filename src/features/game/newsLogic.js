export function generateNews(producers) {
  const news = [];

  producers.forEach(producer => {
    if (producer.loanTaken) {
      news.push({
        type: 'loan',
        text: `Producer ${producer.name} took ₹${producer.loanAmount.toLocaleString()} loan!`,
        year: producer.loanYear,
      });
    }
    if (producer.isBankrupt) {
      news.push({
        type: 'bankrupt',
        text: `Producer ${producer.name} declared bankruptcy!`,
        year: producer.bankruptYear,
      });
    }
  });

  return news;
}