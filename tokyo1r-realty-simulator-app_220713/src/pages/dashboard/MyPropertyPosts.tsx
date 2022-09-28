import orderBy from 'lodash/orderBy';
import { Link as RouterLink } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { AxiosRequestConfig } from 'axios';
// @mui
import { Grid, Button, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { Post } from '../../@types/property';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  MyPropertyPostCard,
  PropertyPostsSort,
  PropertyPostsSearch,
} from '../../sections/@dashboard/property';
import axiosOpenApiInstance from 'src/utils/axios-openapi';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useLocales from 'src/hooks/useLocales';
import { FIREBASE_ID_TOKEN_KEY } from 'src/utils/firebase';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  // { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const applySort = (posts: Post[], sortBy: string) => {
  if (sortBy === 'latest') {
    return orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    return orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    return orderBy(posts, ['view'], ['desc']);
  }
  return posts;
};

export default function MyPropertyPosts() {
  const { translate } = useLocales();
  const pageTitle = translate('dashboard.myProperties.title');
  const dashboardTitle = translate('dashboard.title');

  const { themeStretch } = useSettings();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [, setError] = useState(null);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const isMountedRef = useIsMountedRef();

  const [cookies, setCookie] = useCookies([FIREBASE_ID_TOKEN_KEY]);

  const getAllPosts = useCallback(async () => {
    setIsPostsLoading(true);
    try {
      const firebaseToken = cookies[FIREBASE_ID_TOKEN_KEY];
      const options: AxiosRequestConfig = {
        headers: {
          'authorization': 'Bearer ' + firebaseToken,
        }
      }
      const response = await axiosOpenApiInstance.myPropertiesControllerFindAll(options);

      if (isMountedRef.current) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setIsPostsLoading(false);
  }, [isMountedRef]);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  const handleChangeSort = (value: string) => {
    if (value) {
      setFilters(value);
    }
  };

  return (
    <Page title={pageTitle}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={pageTitle}
          links={[
            { name: dashboardTitle, href: PATH_DASHBOARD.root },
            { name: pageTitle, href: PATH_DASHBOARD.myProperties.root },
          ]}
          action={
            <Button
              variant="contained"
              component={RouterLink}
              to={PATH_DASHBOARD.myProperties.newProperty}
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              {translate('buttons.create')}
            </Button>
          }
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PropertyPostsSearch />
          <PropertyPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {(isPostsLoading && !posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <MyPropertyPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </Page>
  );
}
