import orderBy from 'lodash/orderBy';
import { useCallback, useEffect, useState } from 'react';
// @mui
import { Grid, Container, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// utils
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// @types
import { Post } from '../../@types/property';
// components
import Page from '../../components/Page';
import { SkeletonPostItem } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  PropertyPostCard,
  PropertyPostsSort,
  PropertyPostsSearch,
} from '../../sections/@dashboard/property';
import axiosOpenApiInstance from 'src/utils/axios-openapi';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import useLocales from 'src/hooks/useLocales';
import ImageCaption from 'src/components/ImageCaption';

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

export default function PropertyPosts() {
  const { translate } = useLocales();
  const pageTitle = translate('dashboard.properties.title');
  const dashboardTitle = translate('dashboard.title');

  const { themeStretch } = useSettings();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [, setError] = useState(null);

  const [filters, setFilters] = useState('latest');

  const sortedPosts = applySort(posts, filters);

  const isMountedRef = useIsMountedRef();

  const getAllPosts = useCallback(async () => {
    setIsPostsLoading(true);
    try {
      const response = await axiosOpenApiInstance.propertiesControllerFindAll();

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
            { name: pageTitle, href: PATH_DASHBOARD.properties.root },
          ]}
        />

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <PropertyPostsSearch />
          <PropertyPostsSort query={filters} options={SORT_OPTIONS} onSort={handleChangeSort} />
        </Stack>

        <Grid container spacing={3}>
          {(isPostsLoading && !posts.length ? [...Array(12)] : sortedPosts).map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <PropertyPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>

        <Stack mt={1} direction="row" alignItems="center" justifyContent="end">
          <ImageCaption />
        </Stack>
      </Container>
    </Page>
  );
}
