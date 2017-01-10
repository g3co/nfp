import React from '../../node_modules/react/lib/React.js';
import ReactDOM from '../../node_modules/react-dom/lib/ReactDOM.js';

const App = React.createClass({
    render() {
        return <div>Hello, world!</div>
    }
});

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);