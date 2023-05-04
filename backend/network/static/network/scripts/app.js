const Index = window.require.Index;
const Profile = window.require.Profile;
// const { BrowserRouter, Routes, Route } = ReactRouterDOM;

const App = () => {
  return (
    <div>
      <Index />
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
