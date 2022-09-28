// @mui
import {
  // Box,
  // Button,
  // Avatar,
  // Tooltip,
  // Typography,
  // CardHeader,
  // IconButton,
  Card,
  Stack,
} from '@mui/material';
// components
// import Iconify from '../../../../components/Iconify';
import SettingSimulation from 'src/components/simulation-settings/SettingSimulation';

// ----------------------------------------------------------------------

export default function SettingsDetail() {
  return (
    <Card>
      {/* <CardHeader
        title="Contacts"
        subheader="You have 122 contacts"
        action={
          <Tooltip title="Add Contact">
            <IconButton color="primary" size="large">
              <Iconify icon={'eva:plus-fill'} width={20} height={20} />
            </IconButton>
          </Tooltip>
        }
      /> */}

      <Stack spacing={3} sx={{ p: 3 }}>
        <SettingSimulation />
        {/* 
        <Button variant="outlined" size="large" color="inherit">
          View All
        </Button> */}
      </Stack>
    </Card>
  );
}
