
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "done.invoke.Todo_machine.Loading_todos:invocation[0]": { type: "done.invoke.Todo_machine.Loading_todos:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.Todo_machine.Loading_todos:invocation[0]": { type: "error.platform.Todo_machine.Loading_todos:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "loadTodos": "done.invoke.Todo_machine.Loading_todos:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: "loadTodos";
        };
        eventsCausingActions: {
          "assignErrorToContext": "error.platform.Todo_machine.Loading_todos:invocation[0]";
"assignFormInputToContext": "Form input change";
"assignTodosToContext": "done.invoke.Todo_machine.Loading_todos:invocation[0]";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "loadTodos": "xstate.init";
        };
        matchesStates: "Creating new todo" | "Creating new todo.Showing form input" | "Loading_todos" | "Loading_todos_failed" | "Todos_loaded" | { "Creating new todo"?: "Showing form input"; };
        tags: never;
      }
  