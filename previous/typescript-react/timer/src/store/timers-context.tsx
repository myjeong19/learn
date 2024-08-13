import { ReactNode, createContext, useContext, useReducer } from 'react';

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

const TimersConetext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timersContext = useContext(TimersConetext);

  if (timersContext === null) {
    throw new Error('TimersContext is null - that should not be the case!');
  }

  return timersContext;
}

type TimersContextProviderProps = {
  children: ReactNode;
};

type StartTimersAction = {
  type: 'START_TIMERS';
};

type StopTimersAction = {
  type: 'STOP_TIMERS';
};

type AddTimerAction = {
  type: 'ADD_TIMER';
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === 'START_TIMERS') {
    return {
      ...state,
      isRunning: true,
    };
  }

  if (action.type === 'STOP_TIMERS') {
    return {
      ...state,
      isRunning: false,
    };
  }

  if (action.type === 'ADD_TIMER') {
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }

  return state;
}

export default function TimersContextProvider({ children }: TimersContextProviderProps) {
  const [timersState, dispath] = useReducer(timersReducer, initialState);

  const ctxValue: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispath({ type: 'ADD_TIMER', payload: timerData });
    },
    startTimers() {
      dispath({ type: 'START_TIMERS' });
    },
    stopTimers() {
      dispath({ type: 'STOP_TIMERS' });
    },
  };

  return <TimersConetext.Provider value={ctxValue}>{children}</TimersConetext.Provider>;
}
