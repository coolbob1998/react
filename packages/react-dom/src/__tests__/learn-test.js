'use strict';

let React;
let ReactDOM;
let ReactDOMClient;
let ReactTestUtils;
let act;
let Scheduler;

describe('ReactUpdates', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactDOM = require('react-dom');
    ReactDOMClient = require('react-dom/client');
    ReactTestUtils = require('react-dom/test-utils');
    const InternalTestUtils = require('internal-test-utils');
    act = InternalTestUtils.act;
    Scheduler = require('scheduler');
  });

  // once the extra div wrapper is no longer necessary.

  it('test effects', async () => {
    const App = () => {
      const [cnt, setCnt] = React.useState(0);
      React.useEffect(() => {
        setCnt(cnt => cnt + 1);
      }, []);
      return <div>{cnt}</div>;
    };
    const container = document.createElement('div');
    const root = ReactDOMClient.createRoot(container);
    await act(() => root.render(<App />));
    expect(container.innerHTML).toBe('<div>1</div>');
  });

  it('test', async () => {
    let renderSetSate = null;
    const P1 = () => {
      const [_, setState] = React.useState(0);
      renderSetSate = setState;
      return 'p1';
    };

    const P2 = () => {
      renderSetSate?.(c => c + 1);
      return 'p2';
    };

    function App() {
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <P1 />
          <P2 />
        </div>
      );
    }
    const container = document.createElement('div');
    const root = ReactDOMClient.createRoot(container);
    await act(() => root.render(<App />));
  });

  it('test', async () => {
    const P1 = () => {
      const [_, setState] = React.useState(0);
      setState(1);
      return 'p1';
    };

    function App() {
      return (
        <div className="App">
          <h1>Hello CodeSandbox</h1>
          <h2>Start editing to see some magic happen!</h2>
          <P1 />
        </div>
      );
    }
    const container = document.createElement('div');
    const root = ReactDOMClient.createRoot(container);
    await act(() => {
      return root.render(<App />);
    });
  });
});
