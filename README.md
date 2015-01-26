![Observer](http://wiki.teamliquid.net/starcraft/images2/d/d3/Observer.png)

[Official sound effects](https://www.youtube.com/watch?v=2e0CRuS14ho) (see [Livefyre/Observer](https://github.com/Livefyre/Observer)).

The EEObserverMixin adds a `.listenTo` method to a React component. Events that are subscribed to using this method will have their handlers automatically unsubscribed when the component unmounts.

### Usage

`npm install ee-observer-mixin`

```js
var EEObserverMixin = require('ee-observer-mixin');
var React = require('react');

React.createClass({
  componentDidMount: function () {
    this.listenTo(eventEmitter, 'eventName', callback);
  },

  mixins: [EEObserverMixin]
});
```
