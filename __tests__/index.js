var compo;
var EEObserverMixin;
var elementContainer;
var emitter;
var EventEmitter;
var React;
var ReactTestUtils;
var TestComponent;
var testElement;

jest.dontMock('../index');
jest.dontMock('events');

describe('EEObserverMixin', function () {

  beforeEach(function () {
    EEObserverMixin = require('../index');
    EventEmitter = require('events').EventEmitter;
    React = require('react/addons');
    TestUtils = React.addons.TestUtils;

    TestComponent = React.createClass({
      componentDidMount: function () {
        this.listenTo(this.props.emitter, 'greeting', function (data) {
          this.setState({
            greeting: data.greeting
          });
        }.bind(this));

        this.listenTo(this.props.emitter, 'ginteerg', function (data) {
          this.setState({
            ginteerg: data.ginteerg
          });
        }.bind(this));
      },

      getInitialState: function () {
        return {
          greeting: 'yo',
          ginteerg: 'oy'
        }
      },

      mixins: [EEObserverMixin],

      render: function () {
        return React.createElement('div', null, this.state.greeting + '_' + this.state.ginteerg);
      }
    });

    emitter = new EventEmitter();
    elementContainer = document.createElement('div');
    compo = React.createFactory(TestComponent)({emitter: emitter});
    testElement = React.render(compo, elementContainer);
    expect(testElement.getDOMNode().textContent).toEqual('yo_oy');

    emitter.emit('greeting', {greeting: 'hello'});
    emitter.emit('ginteerg', {ginteerg: 'olleh'});
  });

  it('adds listeners', function () {
    expect(testElement.getDOMNode().textContent).toEqual('hello_olleh');
    expect(testElement._events.length).toEqual(2);
    expect(emitter._events.greeting).toBeTruthy;
    expect(emitter._events.ginteerg).toBeTruthy;
  });

  it('removes listeners', function () {
    React.unmountComponentAtNode(elementContainer);
    emitter.emit('greeting', {greeting: 'yo'});
    emitter.emit('ginteerg', {ginteerg: 'oy'});

    expect(testElement.state.greeting).toEqual('hello');
    expect(testElement.state.ginteerg).toEqual('olleh');
    expect(testElement._events.length).toEqual(0);
    expect(Object.keys(emitter._events).length).toEqual(0);
  });
});
