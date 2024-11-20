var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState, useRef, useEffect } from 'react';
var DEFAULT_COLORS = {
    colors: ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'],
    angle: 45
};
var GradientProgressBar = function (_a) {
    var _b = _a.initialValue, initialValue = _b === void 0 ? 0 : _b, _c = _a.min, min = _c === void 0 ? 0 : _c, _d = _a.max, max = _d === void 0 ? 100 : _d, _e = _a.step, step = _e === void 0 ? 1 : _e, _f = _a.disabled, disabled = _f === void 0 ? false : _f, _g = _a.loading, loading = _g === void 0 ? false : _g, _h = _a.colors, colors = _h === void 0 ? DEFAULT_COLORS : _h, _j = _a.formatValue, formatValue = _j === void 0 ? function (value) { return "".concat(value, "%"); } : _j, onChange = _a.onChange, _k = _a.className, className = _k === void 0 ? '' : _k;
    var _l = useState(initialValue), value = _l[0], setValue = _l[1];
    var _m = useState({ isDragging: false, isTouching: false }), dragState = _m[0], setDragState = _m[1];
    var _o = useState(false), showTooltip = _o[0], setShowTooltip = _o[1];
    var progressRef = useRef(null);
    var isInteractive = !disabled && !loading;
    // Convert raw value to percentage
    var getPercentage = function (rawValue) {
        return ((rawValue - min) / (max - min)) * 100;
    };
    // Convert percentage to actual value
    var getValueFromPercentage = function (percentage) {
        var rawValue = (percentage * (max - min)) / 100 + min;
        var steppedValue = Math.round(rawValue / step) * step;
        return Math.min(max, Math.max(min, steppedValue));
    };
    var updateValueFromPosition = function (clientX) {
        if (progressRef.current && isInteractive) {
            var rect = progressRef.current.getBoundingClientRect();
            var percentage_1 = ((clientX - rect.left) / rect.width) * 100;
            var newValue = getValueFromPercentage(percentage_1);
            setValue(newValue);
            onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        }
    };
    // Mouse event handlers
    var handleMouseDown = function (e) {
        if (isInteractive) {
            setDragState(function (prev) { return (__assign(__assign({}, prev), { isDragging: true })); });
            updateValueFromPosition(e.clientX);
            e.preventDefault();
        }
    };
    var handleMouseMove = function (e) {
        if (dragState.isDragging) {
            updateValueFromPosition(e.clientX);
        }
    };
    var handleMouseUp = function () {
        setDragState(function (prev) { return (__assign(__assign({}, prev), { isDragging: false })); });
    };
    // Touch event handlers
    var handleTouchStart = function (e) {
        if (isInteractive) {
            setDragState(function (prev) { return (__assign(__assign({}, prev), { isTouching: true })); });
            updateValueFromPosition(e.touches[0].clientX);
        }
    };
    var handleTouchMove = function (e) {
        if (dragState.isTouching) {
            updateValueFromPosition(e.touches[0].clientX);
            e.preventDefault();
        }
    };
    var handleTouchEnd = function () {
        setDragState(function (prev) { return (__assign(__assign({}, prev), { isTouching: false })); });
    };
    // Keyboard event handlers
    var handleKeyDown = function (e) {
        if (!isInteractive)
            return;
        var newValue = value;
        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowUp':
                newValue = Math.min(max, value + step);
                break;
            case 'ArrowLeft':
            case 'ArrowDown':
                newValue = Math.max(min, value - step);
                break;
            case 'Home':
                newValue = min;
                break;
            case 'End':
                newValue = max;
                break;
            default:
                return;
        }
        setValue(newValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
        e.preventDefault();
    };
    // Event listeners
    useEffect(function () {
        if (dragState.isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            return function () {
                window.removeEventListener('mousemove', handleMouseMove);
                window.removeEventListener('mouseup', handleMouseUp);
            };
        }
    }, [dragState.isDragging]);
    useEffect(function () {
        if (dragState.isTouching) {
            window.addEventListener('touchmove', handleTouchMove, { passive: false });
            window.addEventListener('touchend', handleTouchEnd);
            return function () {
                window.removeEventListener('touchmove', handleTouchMove);
                window.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [dragState.isTouching]);
    // Generate gradient background
    var getGradientBackground = function () {
        var gradientColors = colors.colors, _a = colors.angle, angle = _a === void 0 ? 45 : _a;
        return "linear-gradient(".concat(angle, "deg, ").concat(gradientColors.join(', '), ")");
    };
    var percentage = getPercentage(value);
    var isActive = dragState.isDragging || dragState.isTouching;
    return (React.createElement("div", { className: "w-full max-w-md mx-auto p-4 ".concat(className) },
        React.createElement("div", { className: "relative pt-3 pb-3", ref: progressRef, role: "slider", "aria-valuemin": min, "aria-valuemax": max, "aria-valuenow": value, "aria-disabled": disabled, tabIndex: isInteractive ? 0 : -1, onKeyDown: handleKeyDown, onMouseEnter: function () { return setShowTooltip(true); }, onMouseLeave: function () { return setShowTooltip(false); } },
            React.createElement("div", { className: "\n            relative h-4 rounded-full overflow-hidden transition-colors duration-200\n            ".concat(isInteractive ? 'cursor-pointer' : 'cursor-not-allowed', "\n            ").concat(disabled ? 'opacity-50' : '', "\n            ").concat(loading ? 'animate-pulse' : '', "\n          "), onClick: isInteractive ? function (e) { return updateValueFromPosition(e.clientX); } : undefined },
                React.createElement("div", { className: "absolute inset-0 bg-gray-200" }),
                React.createElement("div", { className: "absolute inset-0 transition-all duration-200", style: {
                        background: getGradientBackground(),
                        clipPath: "polygon(0 0, ".concat(percentage, "% 0, ").concat(percentage, "% 100%, 0 100%)")
                    } })),
            React.createElement("div", { className: "\n            absolute top-0 w-10 -ml-5 flex items-center justify-center\n            transition-transform duration-200\n            ".concat(isActive ? 'scale-110' : '', "\n          "), style: {
                    left: "".concat(percentage, "%"),
                    cursor: isInteractive ? (isActive ? 'grabbing' : 'grab') : 'not-allowed'
                }, onMouseDown: handleMouseDown, onTouchStart: handleTouchStart },
                React.createElement("div", { className: "\n              w-8 h-8 rounded-full shadow-lg border-2 border-white\n              transition-all duration-200\n              ".concat(disabled ? 'bg-gray-400' : 'bg-blue-500', "\n              ").concat(isActive ? 'scale-110' : '', "\n            ") }),
                showTooltip && (React.createElement("div", { className: "\n                absolute -top-10 left-1/2 -translate-x-1/2\n                px-2 py-1 rounded bg-gray-800 text-white text-sm\n                transition-opacity duration-200\n                ".concat(showTooltip ? 'opacity-100' : 'opacity-0', "\n              ") },
                    formatValue(value),
                    React.createElement("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full" },
                        React.createElement("div", { className: "border-4 border-transparent border-t-gray-800" })))))),
        React.createElement("div", { className: "text-center mt-4" }, formatValue(value)),
        loading && (React.createElement("div", { className: "absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center" },
            React.createElement("div", { className: "w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" })))));
};
export default GradientProgressBar;
//# sourceMappingURL=GradientProgressBar.js.map