"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var GradientProgressBar_1 = __importDefault(require("./GradientProgressBar"));
function App() {
    return (react_1.default.createElement("div", { className: "App" },
        react_1.default.createElement("h1", null, "hi"),
        react_1.default.createElement(GradientProgressBar_1.default, { initialValue: 50, min: 0, max: 100, step: 5, disabled: false, loading: false, colors: {
                colors: ['#ff0000', '#00ff00', '#0000ff'],
                angle: 45
            }, formatValue: function (value) { return "".concat(value, " points"); }, onChange: function (value) { return console.log("New value: ".concat(value)); } })));
}
exports.default = App;
//# sourceMappingURL=App.js.map