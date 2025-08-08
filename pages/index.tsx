import { useMachine } from '@xstate/react';
import type { NextPage } from 'next';
import { todosMachine } from '../machines/todoAppMachine';

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        // throw new Error('Oh no!!!');
        return ['Take bins out', 'Do laundry'];
      },
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
};

export default Home;
