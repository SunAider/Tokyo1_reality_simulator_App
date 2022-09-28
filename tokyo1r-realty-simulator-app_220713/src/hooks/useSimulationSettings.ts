import { useContext } from 'react';
import { SimulationSettingsContext } from 'src/contexts/SimulationSettingsContext';

// ----------------------------------------------------------------------

const useSimulationSettings = () => useContext(SimulationSettingsContext);

export default useSimulationSettings;
