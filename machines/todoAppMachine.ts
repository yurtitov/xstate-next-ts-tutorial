import { createMachine } from 'xstate';

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUH0C2BDAxgBYCWAdmAHQAyquEZUmALuqrAMQsayYA2tESAG0ADAF1EoAA5tiTYqlKSQAD0QAOAKwUALAEYAbAGYAnAfUmd6kQYDsAGhABPRAFpjFdbb0iTvgEwitiIi-rYGAL4RjmgYOAQk5NQCDMysHPx0qVxsmABmuMS8wuLKMrByCkpIqm5GRv66piLqRiL1-nq2Ds5uHl4+fiaBwaHhUdEgpOhwyrFYeERkYGWy8orKagiuRtZNfq3tDV09Ltt6e2a2ZruaJiaGRlExrPFLSTRZpIw58DXllQ2NS2rj0eka3k0xis4IuhgMjjOrhMRgoBjsZk0gXUOm8Rh0zxA8zeiUo8x4mUEEFWFXW1VAW1sqJEYLxdx8OiMTMRiB8zJxOhEOgMJnU-mFdkJxMWpOSXx+6XyhWK1P+ayqmzcYREFDBvkMFy5-gRvQQfIoLR0guFovF6JMEwiQA */
export const todosMachine = createMachine(
  {
    id: 'Todo_machine',
    initial: 'Loading_todos',
    schema: {
      events: {} as
        | { type: 'todos_loaded'; todos: string[] }
        | { type: 'loading_todos_failed'; errorMessage: string },
    },
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    states: {
      Loading_todos: {
        on: {
          todos_loaded: {
            target: 'Todos_loaded',
            actions: 'consoleLogTodos',
          },
          loading_todos_failed: {
            target: 'Loading_todos_failed',
          },
        },
      },

      Todos_loaded: {},
      Loading_todos_failed: {},
    },
  },
  {
    actions: {
      consoleLogTodos: (context, event) => {
        alert(JSON.stringify(event.todos));
      },
    },
  }
);
