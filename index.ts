/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react'

// fork from koa-compose
function compose(middleware: Function[]) {
  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
  return function (context: any, next: any): any {
    // last called middleware #
    let index = -1
    function dispatch(i: number): any {
      if (i <= index) return
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return
      try {
        return fn(context, dispatch.bind(null, i + 1))
      } catch (err) {
        return
      }
    }
    return dispatch(0)
  }
}

export default function useTimeLineTask(
  middleware: Function[],
  delay: number
): void {
  const savedCallback = useRef<any>()

  // 保存新回调
  useEffect(() => {
    savedCallback.current = compose(middleware)
  })

  // 建立 interval
  useEffect(() => {
    function tick(): void {
      savedCallback.current({})
    }
    if (delay !== null) {
      const id = setInterval(tick, delay)
      return (): void => {
        clearInterval(id)
      }
    }
  }, [delay])
}
