import './App.css';
import { DATA } from './utils';
import ClassStatisticsTable from './components/ClassStatisticsTable';

function App() {
  const dataWithGamma = DATA.map((entry) => ({
    ...entry,
    Gamma: (entry.Ash * entry.Hue) / entry.Magnesium,
  }));
  return (
    <div className='App'>
      <ClassStatisticsTable dataset={DATA} property="Flavanoids" measure="Alcohol" />
      <ClassStatisticsTable dataset={dataWithGamma} property="Gamma" measure="Alcohol" />
    </div>
  );
}

export default App;
