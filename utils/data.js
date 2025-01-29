// format dates
const formatDate = (timestamp) => {
    // forat timestamp 
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  module.exports = { formatDate };
  