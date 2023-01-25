import LocationViewer from './components/map-vew/LocationViewer';

const App = () : JSX.Element => {
  return (
    <div className="App">
      <div style={{ height: 500, width: 800 }}>
        <LocationViewer/>
      </div>
    </div>
  );
}

export default App;
