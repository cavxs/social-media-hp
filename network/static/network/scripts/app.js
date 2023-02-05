const Index = window.require.Index;
let useState = React.useState;

const App = () => {
  return (
    <div>
      <Index />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
