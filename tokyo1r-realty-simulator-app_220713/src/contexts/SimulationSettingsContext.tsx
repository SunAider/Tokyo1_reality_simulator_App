import { ReactNode, createContext } from 'react';
// hooks
import useLocalStorage from '../hooks/useLocalStorage';
// config
import { defaultSimulationSettings } from '../config';
// @type
import { SimulationSettingsContextProps } from '../components/simulation-settings/type';

// ----------------------------------------------------------------------

const initialState: SimulationSettingsContextProps = {
  ...defaultSimulationSettings,
  onToggleIsRentGuaranteed: () => {},
  setSettings: () => {},
};

const SimulationSettingsContext = createContext(initialState);

type SimulationSettingsProviderProps = {
  children: ReactNode;
};

function SimulationSettingsProvider({ children }: SimulationSettingsProviderProps) {
  const initialSettings = {
    general: initialState.general,
    property: initialState.property,
    loan: initialState.loan,
  };
  const [settings, setSettings] = useLocalStorage('simulationSettings', initialSettings);

  const onToggleIsRentGuaranteed = () => {
    setSettings({
      ...settings,
      property: {
        ...settings.property,
        isRentGuaranteed: !settings.property.isRentGuaranteed,
      },
    });
  };

  const onResetSetting = () => {
    setSettings(initialSettings);
  };

  return (
    <SimulationSettingsContext.Provider
      value={{
        ...settings,
        onToggleIsRentGuaranteed,
        onResetSetting,
        setSettings,
      }}
    >
      {children}
    </SimulationSettingsContext.Provider>
  );
}

export { SimulationSettingsProvider, SimulationSettingsContext };
