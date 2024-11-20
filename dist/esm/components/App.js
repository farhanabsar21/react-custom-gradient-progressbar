import React from 'react';
import GradientProgressBar from './GradientProgressBar';
function App() {
    return (React.createElement("div", { className: "App" },
        React.createElement("h1", null, "hi"),
        React.createElement(GradientProgressBar, { initialValue: 50, min: 0, max: 100, step: 5, disabled: false, loading: false, colors: {
                colors: ['#ff0000', '#00ff00', '#0000ff'],
                angle: 45
            }, formatValue: function (value) { return "".concat(value, " points"); }, onChange: function (value) { return console.log("New value: ".concat(value)); } })));
}
export default App;
//# sourceMappingURL=App.js.map