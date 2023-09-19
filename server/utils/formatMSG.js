module.exports = format = (username, message) => {
  return {
    username,
    message,
    sent_at: Date.now(),
  };
};
