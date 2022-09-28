import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { AxiosRequestConfig } from 'axios';
// @mui
import { Box, Card, Divider, Container, Typography } from '@mui/material';
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
import { FIREBASE_ID_TOKEN_KEY } from 'src/utils/firebase';

// ----------------------------------------------------------------------

export default function MyPropertyPost() {
  const { translate } = useLocales();
  const pageTitle = translate('dashboard.myProperty.title');
  const myPropertiesTitle = translate('dashboard.myProperties.title');
  const dashboardTitle = translate('dashboard.title');

  const { themeStretch } = useSettings();

  const isMountedRef = useIsMountedRef();

  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  const [error, setError] = useState(null);

  const [cookies, setCookie] = useCookies([FIREBASE_ID_TOKEN_KEY]);

  const getPost = useCallback(async () => {
    try {
      const firebaseToken = cookies[FIREBASE_ID_TOKEN_KEY];
      const options: AxiosRequestConfig = {
        headers: {
          'authorization': 'Bearer ' + firebaseToken,
        }
      }
      const response = await axiosOpenApiInstance.myPropertiesControllerFindOne(id || '', options);

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
    <Page title={`${myPropertiesTitle} | ${pageTitle}`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={pageTitle}
          links={[
            { name: dashboardTitle, href: PATH_DASHBOARD.root },
            { name: myPropertiesTitle, href: PATH_DASHBOARD.myProperties.root },
            { name: post?.title || '' },
          ]}
        />

        {post && (
          <Card>
            <PropertyPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              {post.description && (
                <Typography variant="h6" sx={{ mb: 5 }}>
                  {post.description}
                </Typography>
              )}

              {post.body && <Markdown children={post.body} />}

              {post.address && (
                <Box sx={{ mb: 5 }}>
                  <Divider />
                  <Typography sx={{ my: 2 }}>
                    {post.address.postalCode} {post.address.principal}
                    {post.address.city}
                    {post.address.additionalInfo}
                  </Typography>
                  <Divider />
                </Box>
              )}

              {/* {post.builtAt && (
                <Box sx={{ my: 5 }}>
                  <Divider />
                  <Typography sx={{ my: 2 }}>{post.builtAt}</Typography> <Divider />
                </Box>
              )} */}

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

        {!post && !error && <SkeletonPost />}

        {error && <Typography variant="h6">{error}</Typography>}
      </Container>
    </Page>
  );
}
