![Observer](http://wiki.teamliquid.net/starcraft/images2/d/d3/Observer.png)

In the grand tradition of [Livefyre/Observer](https://github.com/Livefyre/Observer).

The EEObserverMixin adds a `.listenTo` method to your React component. Events that are subscribed to using this method will be automatically removed when the component unmounts.

### Usage

`npm install ee-observer-mixin`

```js
  componentDidMount: function () {
    this.listenTo(eventEmitter, 'eventName', callback);
  }
```
