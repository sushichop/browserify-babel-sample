module.exports = {
  msgs: {
    "message1": "This is message1.",
    "message2": "This is message2."
  },
  get: function(id) {
    return this.msgs[id]
  }
};