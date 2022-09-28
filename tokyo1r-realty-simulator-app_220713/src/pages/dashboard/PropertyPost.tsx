import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Box, Card, Divider, Container, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// @types
import { Post } from '../../@types/property';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { SkeletonPost } from '../../components/skeleton';
// sections
import { PropertyPostHero, PropertyPostTags } from '../../sections/@dashboard/property';
import axiosOpenApiInstance from 'src/utils/axios-openapi';
import useLocales from 'src/hooks/useLocales';
import ImageCaption from 'src/components/ImageCaption';

// ----------------------------------------------------------------------

export default function PropertyPost() {
  const { translate } = useLocales();
  const propertiesTitle = translate('dashboard.properties.title');
  const pageTitle = translate('dashboard.property.title');
  const dashboardTitle = translate('dashboard.title');

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const postTitle = post
    ? `${post.address?.principal}${post.address?.city} ${post.numberOfSquareMeters}${translate(
        'units.squareMeters'
      )}`
    : '';

  const [error, setError] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosOpenApiInstance.propertiesControllerFindOne(id || '');

      if (isMountedRef.current) {
        setPost(response.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }, [isMountedRef, id]);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return (
    <Page title={`${propertiesTitle} | ${pageTitle}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: dashboardTitle, href: PATH_DASHBOARD.root },
            { name: propertiesTitle, href: PATH_DASHBOARD.properties.root },
            {
              name: postTitle,
            },
          ]}
        />

        {post && (
          <Card>
            <PropertyPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                {post.description}
              </Typography>

              <Markdown children={post.body || ''} />

              {post.tags && post.tags.length > 0 && (
                <Box sx={{ my: 5 }}>
                  <Divider />
                  <PropertyPostTags tags={post.tags} />
                  <Divider />
                </Box>
              )}
            </Box>
          </Card>
        )}

        {post && (
          <Stack mt={1} direction="row" alignItems="center" justifyContent="end">
            <ImageCaption />
          </Stack>
        )}

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">{error}</Typography>}
      </Container>
    </Page>
  );
}
