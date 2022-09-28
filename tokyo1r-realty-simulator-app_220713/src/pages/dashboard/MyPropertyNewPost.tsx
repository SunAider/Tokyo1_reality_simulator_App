// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import { PropertyNewPostForm } from '../../sections/@dashboard/property';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

export default function MyPropertyNewPost() {
  const { translate } = useLocales();
  const pageTitle = translate('dashboard.newProperty.title');
  const myPropertiesTitle = translate('dashboard.myProperties.title');
  const dashboardTitle = translate('dashboard.title');

  const { themeStretch } = useSettings();

  return (
    <Page title={`${myPropertiesTitle} | ${pageTitle}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={pageTitle}
          links={[
            { name: dashboardTitle, href: PATH_DASHBOARD.root },
            { name: myPropertiesTitle, href: PATH_DASHBOARD.myProperties.root },
            { name: pageTitle },
          ]}
        />

        <PropertyNewPostForm />
      </Container>
    </Page>
  );
}
