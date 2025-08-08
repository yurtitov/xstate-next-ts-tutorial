import { createMachine } from 'xstate';

export const myMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOnwHsAXACXIDcwAnSAYgFkB5AVQGUBRDgDU+AJQDaABgC6iUAAdysXJVzl8skAA9EARgAcAFhIA2AKwBmAJwAmHdb06DegOw2ANCACeu40YPO9Sx0JZxDrUx1TAwBfaI80LDxCUmx6JlZOXgEuABVJGSQQBSUVNQ1tBH09EmcAmztrCQlG3w9vSokTOolTSwsAhtNYuJAKCDgNBJwCYg1i5VV1QoqAWmM2xBXnYxNbCRtjS23jc2cdWPiMaeSyKloGZgg5xQWy5cQDaw2EPR3LPXMgOs1m2vWsxmMFxAUySxBIqQekGeJUW5UQ5gMRnMLgixhCpgJej030CJCcgPMwNBBz0w2iQA */
  initial: 'notHovered',
  states: {
    notHovered: {
      on: {
        MOUSEOVER: {
          target: 'hovered',
        },
      },
    },
    hovered: {
      on: {
        MOUSEOUT: {
          target: 'notHovered',
        },
      },
    },
  },
});
