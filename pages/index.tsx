import { useMachine } from '@xstate/react';
import type { NextPage } from 'next';
import { todosMachine } from '../machines/todoAppMachine';

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine);

  return (
    <div>
      {JSON.stringify(state.value)}

      <button
        onClick={() =>
          send({
            type: 'todos_loaded',
            todos: ['Take bins out'],
          })
        }
      >
        Todos loaded
      </button>

      <button
        onClick={() =>
          send({
            type: 'loading_todos_failed',
            errorMessage: 'Oh no',
          })
        }
      >
        Loading todos failed
      </button>
    </div>
  );
};

export default Home;
