import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Card, Avatar, Typography, CardContent, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { Post } from '../../../@types/property';
// components
import Image from '../../../components/Image';
import SvgIconStyle from '../../../components/SvgIconStyle';
import IllustrationRoomImg from '../../../assets/img/illustration_room.jpg';
import { fJpy, fTenThousandYen } from 'src/utils/formatNumber';
import useLocales from 'src/hooks/useLocales';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.8),
}));

// ----------------------------------------------------------------------

type Props = {
  post: Post;
  index?: number;
};

export default function PropertyPostCard({ post, index }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const {
    id,
    owner,
    createdAt,
    address,
    propertyPrice,
    builtAt,
    rentRevenue,
    repairReserve,
    managementCost,
    numberOfSquareMeters,
  } = post;

  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
      <Card>
        <Image alt="cover" src={IllustrationRoomImg} sx={{ height: 360 }} />
        <Avatar
          alt={owner?.name}
          src={owner?.avatarUrl}
          sx={{
            zIndex: 9,
            top: 24,
            left: 24,
            width: 40,
            height: 40,
            position: 'absolute',
          }}
        />
        <PostContent
          id={id || ''}
          createdAt={createdAt || ''}
          index={index}
          address={address}
          propertyPrice={propertyPrice}
          builtAt={builtAt}
          rentRevenue={rentRevenue}
          repairReserve={repairReserve}
          managementCost={managementCost}
          numberOfSquareMeters={numberOfSquareMeters}
        />
        <OverlayStyle />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Image
          alt="Living room illustration vector created by storyset - www.freepik.com"
          src={IllustrationRoomImg}
          ratio="4/3"
        />
        {/* <a href="https://www.freepik.com/vectors/living-room-illustration">
          Living room illustration vector created by storyset - www.freepik.com
        </a> */}
        <SvgIconStyle
          src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
          sx={{
            width: 80,
            height: 36,
            zIndex: 9,
            bottom: -15,
            position: 'absolute',
            color: 'background.paper',
          }}
        />
        <Avatar
          alt={owner?.name}
          src={owner?.avatarUrl}
          sx={{
            left: 24,
            zIndex: 9,
            width: 32,
            height: 32,
            bottom: -16,
            position: 'absolute',
          }}
        />
      </Box>

      <PostContent
        id={id || ''}
        createdAt={createdAt}
        address={address}
        propertyPrice={propertyPrice}
        builtAt={builtAt}
        rentRevenue={rentRevenue}
        repairReserve={repairReserve}
        managementCost={managementCost}
        numberOfSquareMeters={numberOfSquareMeters}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  index?: number;
  id: Post['id'];
  createdAt: Post['createdAt'];
  address?: Post['address'];
  propertyPrice: Post['propertyPrice'];
  rentRevenue: Post['rentRevenue'];
  managementCost: Post['managementCost'];
  repairReserve: Post['repairReserve'];
  numberOfSquareMeters: Post['numberOfSquareMeters'];
  builtAt: Post['builtAt'];
};

export function PostContent({
  id,
  createdAt,
  index,
  address,
  propertyPrice,
  builtAt,
  numberOfSquareMeters,
  repairReserve,
  managementCost,
  rentRevenue,
}: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');
  const { translate } = useLocales();

  const linkTo = `${PATH_DASHBOARD.properties.root}/${id}`;

  const latestPostLarge = index === 0;
  const latestPostSmall = index === 1 || index === 2;

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt || '')}
      </Typography>

      <Stack direction="column" alignItems="center">
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}>
            {`${address?.principal}${address?.city} ${numberOfSquareMeters}${translate(
              'units.squareMeters'
            )}`}
          </Typography>
        </Link>
      </Stack>

      <Stack mt={1} direction="column" alignItems="center">
        <Typography variant="caption">{`(${translate('property.propertyPrice')})`}</Typography>
        <Typography variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}>
          {fTenThousandYen(propertyPrice)}
        </Typography>
      </Stack>

      <Stack mt={1} direction="column" alignItems="center">
        <Typography variant="caption">{`(${translate('property.rentRevenue')})`}</Typography>
        <Typography variant={'subtitle2'}>{fJpy(rentRevenue)}</Typography>
        <Typography variant="caption">{`(${
          translate('property.managementCost') + ' + ' + translate('property.repairReserve')
        })`}</Typography>
        <Typography variant={'subtitle2'}>
          {fJpy(managementCost)} + {fJpy(repairReserve)}
        </Typography>
      </Stack>
    </CardContent>
  );
}
