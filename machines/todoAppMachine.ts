import { createMachine, assign } from 'xstate';

/** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUH0C2BDAxgBYCWAdmAHQAyquEZUmALuqrAMQbkVkBuqAa0poMOAiW406DZq1gI+qfLibFUpANoAGALradiUAAc2xVesMgAHogC0ANgBMFAIyOXAThcB2XwA4tLQBmLT8AGhAATzsPDwoAVgD4gBZAj3jvR2SXIIBfXIiRLDwiMkopelJGFgwOMAAnetR6iiMAGxUAM2bsCiKxUslaSuq5BVJ+ZXNNXX1LE1gzNVJLGwRbRycKexd7Pz9HP3jHbz8g73sI6IQLimT7YK0PJ49zrJd8wtYBiWE5TDaw0g7AAwvUwCowAACcgAdzmSBACyWFkRayC8Ti9meQT2gS09w8yXiVzspwojniVKCqVC3nSh0+IH6JV+FDBENUVRhYFhUJqqAoAGVCKhYQwod16tgoWQjABXJjsABiPVlpAVTChRFwVTACOMpmmq0Q9mSrgOmXinhyyUcRNJCBcxLujiCBx83i0jlC9jyBWZ31ZZXZ4JUErh-NYwtF4u5UplcsV7CF8oARtgzAakUbliaEPFQhQibE8T4zd5iY7KVoKU5CwSDo4ffEmSzxCGOeHuZGBcLcLwJQLOOpKIohH0gx3uF2uVAeXy+0KB0PWONJuH1Pps8jjWjEJj7MWdm6-G4PCfwlFEOb9rjdi5gsdca2A+3BpRZxHeVGMP3B9yw4NE0LTtF0PSTqIwYzmGc4Lr+grLgB84CuuSibjMei6PMuaoqA6JBC4FAEsk2TuBilKeCS14IO6cRnjiyR+BcgSvgGpDoHAljvr8OGLHu+F2IRcTJEEhwuH4yQXvcBKOrYElxBi1JOFJ3jxEEHh+G2U4ftQwwyAK8CIrueb7usJxEaJ4mSdJDzJHJj7OFoVLqWpBxBDSOzaVB05-LUAJAhAfEoisZkPnc3r0ukolaL4jhyeS9guecqRUs2lbecUvl6dIVSyP5nS4MQbSQMFAnWHYmzeMRDz1taLgNd4LjVi48TbM6fhOJsGk+KEmU-J2sHfourBlaZglOkeEknJRXg0va9k0Ykrinm6jmnB4lL9dBn5DT2P5LrGEoJuqmpjXhFUIM2bWZKREn7M8vjJN41aYhQYlic5DweWapHbdlX77SNf5IauGDnaFE17M4exnrFGKZMElw0W6bWbZ9RyljW3j5PkQA */
export const todosMachine = createMachine(
  {
    tsTypes: {} as import('./todoAppMachine.typegen').Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: void;
        };
      },
      events: {} as
        | {
            type: 'Create new';
          }
        | {
            type: 'Form input change';
            value: string;
          }
        | {
            type: 'Submit';
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

              Submit: 'Saving todo',
            },
          },
          'Saving todo': {
            invoke: {
              src: 'saveTodo',
              onDone: {
                target: '#Todo_machine.Loading_todos',
              },
              onError: {
                target: 'Showing form input',
                actions: 'assignErrorToContext',
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
