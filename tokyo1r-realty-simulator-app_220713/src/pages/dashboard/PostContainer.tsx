// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import useLocales from 'src/hooks/useLocales';
import { ReactNode } from 'react';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------
type Props = {
  title: string;
  headerBreadcrumbsLinks: { name: string; href: string }[];
  children: ReactNode;
};

export default function PostContainer({ title, headerBreadcrumbsLinks, children }: Props) {
  const { themeStretch } = useSettings();

  const { translate } = useLocales();
  const pageTitle = translate(title);

  return (
    <Page title={pageTitle}>
      <HeaderBreadcrumbs heading={pageTitle} links={headerBreadcrumbsLinks} />
      <Container maxWidth={themeStretch ? false : 'lg'}>{children}</Container>
    </Page>
  );
}
