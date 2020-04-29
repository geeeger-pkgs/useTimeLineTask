"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
var react_1 = require("react");
// fork from koa-compose
function compose(middleware) {
    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */
    return function (context, next) {
        // last called middleware #
        var index = -1;
        function dispatch(i) {
            if (i <= index)
                return;
            index = i;
            var fn = middleware[i];
            if (i === middleware.length)
                fn = next;
            if (!fn)
                return;
            try {
                return fn(context, dispatch.bind(null, i + 1));
            }
            catch (err) {
                return;
            }
        }
        return dispatch(0);
    };
}
function useTimeLineTask(middleware, delay) {
    var savedCallback = react_1.useRef();
    // 保存新回调
    react_1.useEffect(function () {
        savedCallback.current = compose(middleware);
    });
    // 建立 interval
    react_1.useEffect(function () {
        function tick() {
            savedCallback.current({});
        }
        if (delay !== null) {
            var id_1 = setInterval(tick, delay);
            return function () {
                clearInterval(id_1);
            };
        }
    }, [delay]);
}
exports.default = useTimeLineTask;
