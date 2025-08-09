import { createMachine, assign } from 'xstate';

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUH0C2BDAxgBYCWAdmAHQAyquEZUmALuqrAMQbkVkBuqAa0poMOAiW406DZq1gI+qfLibFUpANoAGALradiUAAc2xVesMgAHogC0ANgBMFAIyOXAThcB2XwA4tLQBmLT8AGhAATzsPDwoAVgD4gBZAj3jvR2SXIIBfXIiRLDwiMkopelJGFgwOMAAnetR6iiMAGxUAM2bsCiKxUslaSuq5BVJ+ZXNNXX1LE1gzNVJLGwRbR28giiC-Dy14oIyg+3tkjwjo9ZcKP3s-eJzve287+yCXP0d8wtYBiWEckwbWGkHYAGF6mAVGAAATkADucyQIAWSwsKLWRzi9n2JwCgWSuOS8UudleFEc8WpQVSoW86Ucfh+IH6JQBFEh0NUVXhYARsJqqAoAGVCKgEQxYd16thYWQjABXJjsABiPXlpCVTFhRFwVTAyOMpmmq0QH2SFG88X2HiyWhc9i0WTJCA8208ny0dtiNrO+QKIFI6DgljZ4jK8xNyzN6yCVNu8b8LnijiCeNS9ldtk+cSO1KJLiLGRT9hZ4cG5WGMiF8BRaNNmLsmxuySTn3OZydyWzLmdFAONOtXyCtPsLnLf3ZZT6QJBdEgUcWjdAa0dredDPSba0vkc2Yp9mph28qWpjk2yUnomnQ2kVVktUwnVwxDai-r0Yxq+bvkTTJTNMMy0LMokQPs4kdfNngdXYUjyQMKw5LkVClRFBVYJd0RWJsEEcU4rRtb17UdZ0ezAhB4luLxk02Kl4mCRxAnia9igjbgUJ5KA+QFIVRXFSVeRlOUFWVLCV2sRB4heChsndYIQI+BigldCDXHeakYJyB42wDXIgA */
export const todosMachine = createMachine(
  {
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
      },
      events: {} as
        | {
            type: 'Create new';
          }
        | {
            type: 'Form input change';
            value: string;
          },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      createNewTodoFormInput: '',
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

      Todos_loaded: {
        on: {
          'Create new': 'Creating new todo',
        },
      },

      Loading_todos_failed: {},
      'Creating new todo': {
        states: {
          'Showing form input': {
            on: {
              'Form input change': {
                target: 'Showing form input',
                internal: true,
                actions: 'assignFormInputToContext',
              },
            },
          },
        },

        initial: 'Showing form input',
      },
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
      assignFormInputToContext: assign((context, event) => {
        return {
          createNewTodoFormInput: event.value,
        };
      }),
    },
  }
);
