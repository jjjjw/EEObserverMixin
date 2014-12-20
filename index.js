module.exports = {

  componentWillMount: function () {
    this._events = [];
  },

  componentWillUnmount: function () {
    var source;
    while (source = this._events.pop()) {
      source[0].removeListener(source[1], source[2]);
    }
  },

  listenTo: function (ee, ev, cb) {
    ee.on(ev, cb);
    this._events.push(arguments);
  }
};
