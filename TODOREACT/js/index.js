'use strict';

var _class, _class2, _class4, _class5, _class7;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var /*
    React is a javascript Library (NOT a framework!) built by the folks at Facebook and it's used to build user interfaces with (relative) ease! To quote their site, "Lots of people use React as the V in MVC"
    
    This pen is a bare-bones example of how to build a React component, along with some other fancy-pants, new-wave, hypenated-phrase, front-end technologies. Basically http://html9responsiveboilerstrapjs.com/.
    
    JSX/ES2015 will be used instead of plain old Javascript; then I'm using Babel to transpile that code into vanilla JS. To draw a comparison, JSX is to Javascript as SCSS/Sass/Less is to CSS; and Babel would be like Compass (or libsass if you don't feel like waiting for like ten days every time you want to run your build)
    
    React doesn't actually *require* that you write JSX code, but JSX is just much simpler to write, especially once you get over that knee-jerk "oh god I'm writing HTML in my Javascript what am I doing?" reaction. Also we get "arrow functions" which save a LOT of headaches related to using "this".
    
    Instead of having a stylesheet I'm going to use Radium to turn some CSS-like Javascript Objects into inline styles. I understand that the very idea of inline styles is pretty gross, but if you think about *why* they're bad you can see that in this case it's not so bad. Remember you're still getting all the benefits of cascading css, plus the optimization benefits of inline styles! Just think of it like CriticalCSS on all your stuff, all the time.
    */

/*
Putting '@Radium' before the class definition to "decorate" my class. If this weren't CodePen and I had my source split into multiple files, I could also decorate the component with Radium by passing it into Radium on its way into being exported like so:

var Radium = require('Radium');
class SomeComponent extends React.Component { blah blah blah code here }
export default Radium(SomeComponent);
*/

/*
I define a component by creating a class that extends React.Component and giving it a render() function that returns a *single* element. That element can contain children of course; I just mean that the returned JSX must have a root element. 
*/
Header = Radium(_class = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    /*
    This object defines the styles for this component. Technically I could have put this pretty much anywhere, but I'm putting it in the component because I want to encapsulate the styles, template, and logic inside the component. 
    */
    var headerStyles = {
      base: {
        h1: {
          margin: '0 0 0.667em 0'
        }
      }
    };

    /*
    Yeah, super weird. Just go with it. Remember that this isn't really a DOM element; Babel is going to parse this and turn it into nice, normal Javascript that creates a component object and returns it. This means when you're manipulating data and re-rendering your components you're not actually doing DOM manipulation, which keeps things nice and fast. The DOM doesn't ever get touched unless something actually changes!
    */
    return React.createElement(
      'div',
      { className: 'header' },
      React.createElement(
        'h1',
        { style: headerStyles.base.h1 },
        'React To-Do List'
      )
    );
  };

  return Header;
}(React.Component)) || _class;

var App = Radium(_class2 = function (_React$Component2) {
  _inherits(App, _React$Component2);

  function App(props, context) {
    _classCallCheck(this, App);

    /*
    In the Component's constructor function we initialize this.state by simply setting it. If you already know a bit of React you might be looking for a call to setInitialState(), but since we're creating the classes ourselves instead of using React.createClass() that won't do anything.
    */

    var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props, context));

    _this2.componentWillMount = function () {
      /*
      I'm just going to use LocalStorage to save my data. Remember that React is NOT a Framework, it's just a View library. There's nothing to help manage your data; just bring whatever library you like.
      */
      var savedData = JSON.parse(localStorage.getItem('REACT_JS_TODO_LIST_TASKS'));

      if (savedData) {
        _this2.setState({ 'tasks': savedData });
      } else {
        _this2.setState({ 'tasks': [{ id: 1, text: 'Learn React.js', completed: false }] });
      }
    };

    _this2.addTask = function (task) {
      _this2.setState({ 'tasks': _this2.state.tasks.concat([task]) });
      _this2.saveTasks();
    };

    _this2.updateTask = function (task) {
      _this2.setState({ 'tasks': _this2.state.tasks });
      _this2.saveTasks();
    };

    _this2.saveTasks = function () {
      localStorage.setItem('REACT_JS_TODO_LIST_TASKS', JSON.stringify(_this2.state.tasks));
    };

    _this2.state = { tasks: [] };
    return _this2;
  }
  /*
  componentWillMount() is one of React's "Lifecycle Methods". This one is called right before the component is added, and you can basically think of it as the "initialize" function.
  */

  /*
  Arrow Functions, check 'em. Instead of:  
    functon addTask(task){
      // do stuff with this. oh wait, what is "this"?
      // window? myself? this = self? should I have instantiated this?
      // oh god I hate Javascript.
    }  
    
    // No problem, I'll just use bind. Right? Or call? this.prototype.apply.call.bind(function(callback), this) ?
    addTask = addTask.bind(this);
  
  I just use an arrow function, write less code, and "this" makes actual sense.
  */

  /*
  I am *positive* this is bad React practice. This is like manipulating the DOM in an Angular controller.
  */

  /*
  JSX is weird! It looks like I'm returning bare HTML that got stuck in the middle of my Javascript! Babel is going to parse this code and turn it into native JS that is crazy verbose
  */

  App.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'app' },
      React.createElement(Header, null),
      React.createElement(TodoList, { tasks: this.state.tasks, onUpdateTask: this.updateTask }),
      React.createElement(TodoForm, { onSubmitForm: this.addTask })
    );
  };

  return App;
}(React.Component)) || _class2;

var TodoList = Radium(_class4 = function (_React$Component3) {
  _inherits(TodoList, _React$Component3);

  function TodoList() {
    _classCallCheck(this, TodoList);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  /*
  A weird thing about the JSX syntax compared to most templates you've probably worked with is that you can't stick repeaters and conditionals in your markup. Instead, create a "todoItems" variable by mapping the data to a function that returns some JSX...
  */

  TodoList.prototype.render = function render() {
    var _this4 = this;

    /*
    I set each TodoItem's props.onUpdate to this.props.onUpdateTask, which was set in the App component's JSX.
    */
    var todoItems = this.props.tasks.map(function (task) {
      return React.createElement(
        TodoItem,
        { key: task.id, task: task, onUpdate: _this4.props.onUpdateTask },
        task.text
      );
    });

    {/* ...And then I just put that array of "elements" in my JSX */}
    return React.createElement(
      'div',
      { className: 'todoList' },
      todoItems
    );
  };

  return TodoList;
}(React.Component)) || _class4;

var TodoItem = Radium(_class5 = function (_React$Component4) {
  _inherits(TodoItem, _React$Component4);

  function TodoItem() {
    var _temp, _this5, _ret;

    _classCallCheck(this, TodoItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this5 = _possibleConstructorReturn(this, _React$Component4.call.apply(_React$Component4, [this].concat(args))), _this5), _this5.handleChange = function (e) {
      var task = _this5.props.task;
      task.completed = e.target.checked;
      _this5.props.onUpdate(task);
    }, _temp), _possibleConstructorReturn(_this5, _ret);
  }
  /* 
  This gets called when the checkbox in the item changes, which in turn calls the method passed in by setting the onUpdate property.
  */

  TodoItem.prototype.render = function render() {
    var itemStyles = {
      base: {
        padding: '1em 0',
        borderTop: '1px solid #ccc'
      },
      checkbox: {
        base: {
          display: 'none'
        }
      },
      checkMark: {
        base: {
          color: 'green'
        }
      },
      label: {
        base: {
          paddingLeft: '1em'
        },
        completed: {
          color: '#ccc',
          textDecoration: 'line-through'
        }
      }
    };

    var checkMark = null;
    if (this.props.task.completed) {
      checkMark = React.createElement(
        'span',
        { style: itemStyles.checkMark.base },
        '✔'
      );
    }

    return React.createElement(
      'div',
      { className: 'todoItem', style: itemStyles.base },
      React.createElement('input', { type: 'checkbox',
        id: this.props.task.id,
        checked: this.props.task.completed,
        onChange: this.handleChange,
        style: itemStyles.checkbox.base
      }),
      checkMark,
      React.createElement(
        'label',
        {
          htmlFor: this.props.task.id,
          style: [itemStyles.label.base, this.props.task.completed && itemStyles.label.completed] },
        this.props.children
      )
    );
  };

  return TodoItem;
}(React.Component)) || _class5;

var TodoForm = Radium(_class7 = function (_React$Component5) {
  _inherits(TodoForm, _React$Component5);

  function TodoForm(props) {
    _classCallCheck(this, TodoForm);

    var _this6 = _possibleConstructorReturn(this, _React$Component5.call(this, props));

    _this6.handleSubmit = function (e) {
      e.preventDefault();
      var task = {
        id: Date.now(),
        text: _this6.state.text,
        completed: false
      };
      _this6.props.onSubmitForm(task);
      _this6.setState({ 'text': '' });
    };

    _this6.handleTextChange = function (e) {
      _this6.setState({ 'text': e.target.value });
    };

    _this6.state = { text: '' };
    return _this6;
  }

  TodoForm.prototype.render = function render() {
    var formStyles = {
      base: {},
      input: {
        base: {
          width: '90%'
        }
      },
      submit: {
        base: {
          width: '8%'
        }
      }
    };

    return React.createElement(
      'form',
      { className: 'todoForm', onSubmit: this.handleSubmit, style: formStyles.base },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Enter a task…',
        value: this.state.text,
        onChange: this.handleTextChange,
        style: formStyles.input.base
      }),
      React.createElement('input', { style: formStyles.submit.base, type: 'submit', value: 'Add' })
    );
  };

  return TodoForm;
}(React.Component)) || _class7;

/*
Here's where I actually put the app on the page. Kinda boring really.
*/

React.render(React.createElement(App, null), document.getElementById('app'));