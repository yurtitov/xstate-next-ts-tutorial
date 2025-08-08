import { createMachine, assign } from 'xstate';

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUH0C2BDAxgBYCWAdmAHQAyquEZUmALuqrAMQbkVkBuqAa0poMOAiW406DZq1gI+qfLibFUpANoAGALradiUAAc2xVesMgAHogCMtgJwUALLecOAzFoDsANm8ArAG2vgEANCAAnogAtL4ATBQe3vZaHg6+bg4BDvG+AL75ESJYeERklFL0pIwsGBxgAE6NqI0URgA2KgBmrdgUJWLlkrTVtXIKpPzK5pq6+pYmsGZqpJY2CDEeHonO6VoAHF7b8bbe3hHRm74eFAcpWg6P8T5aWvF+hUUgpOhwloMyhIwItTLN1rEPActC59kc0jszhcorFbNCKBlvBl7rlfA4DmdCsVWENgdRRjI6mxQctwUhrKjbIkUgEbs4CacCb5fJdYp4KNysaEXgdnCkPM4iSBAeIKgM5JgOqNIDSVhZ6Rt7E4ElobrrvPF4g4HOdeQhbGkKIdnM4tM48Qd4vb-FKZcNKhSarJ6phurhiB0VfSlmq1hrYh8YakHCE0ck8maLbdrbb7findyHF98kA */
export const todosMachine = createMachine(
  {
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
    },
    id: 'Todo_machine',
    initial: 'Loading_todos',
    states: {
      Loading_todos: {
        invoke: {
          src: 'loadTodos',

          onDone: {
            actions: 'assignTodosToContext',
            target: 'Todos_loaded',
          },

          onError: {
            actions: 'assignErrorToContext',
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
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
    },
  }
);
