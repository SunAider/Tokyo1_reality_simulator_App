// @mui
import {
  // Grid,  Stack,
  Container,
} from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import { SettingsDetail } from '../../sections/@dashboard/general/settings';

// ----------------------------------------------------------------------

export default function GeneralSettings() {
  const { themeStretch } = useSettings();

  return (
    <Page title="General: Settings">
      <Container maxWidth={themeStretch ? false : 'md'}>
        <SettingsDetail />
      </Container>
    </Page>
  );
}
