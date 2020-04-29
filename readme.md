# usage

```javascript
import useTimeLineTask from "@geeeger/use-timeline-task"
const preventRunTaskIfPlayListIsEmpty = useCallback((_, next) => {
  if (!list || !list.length) {
    return
  }
  next()
}, [list])

const countDown = useCallback((context, next) => {
  setStep(step + 1)
  next()
}, [step])

const skipTaskIfPlayInTime = useCallback((context, next) => {
  if (step < TIMEOUT_OVERFLOW) {
    context.skip = true
  }
  next()
}, [step])

const handle = useCallback((content, _) => {
  if (context.skip) {
    return
  }
  // resetStep
  setStep(0)
  // do something
}, [])

// arg1 => composed conditionfunc
// arg2 => interval
useTimeLineTask([
  preventRunTaskIfPlayListIsEmpty,
  countDown,
  skipTaskIfPlayInTime,
  handle,
], 1000)
```