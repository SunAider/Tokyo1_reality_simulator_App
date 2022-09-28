// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Avatar, Typography } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// @types
import { Post } from '../../../@types/property';
// components
import Image from '../../../components/Image';
import IllustrationRoomImg from '../../../assets/img/illustration_room.jpg';
import useLocales from 'src/hooks/useLocales';
import fullUrl  from '../../../utils/firebase';

// ----------------------------------------------------------------------

const OverlayStyle = styled('h1')(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 9,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
}));

const TitleStyle = styled('h1')(({ theme }) => ({
  ...theme.typography.h2,
  top: 0,
  zIndex: 10,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3),
  color: theme.palette.common.white,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

const FooterStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 10,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  post: Post;
};

export default function PropertyPostHero({ post }: Props) {
  const { translate } = useLocales();
  const { owner, cover, createdAt, address, numberOfSquareMeters } = post;
  let coverFullUrl = cover ? fullUrl(cover) : IllustrationRoomImg;

  const postTitle = post
    ? `${address?.principal}${address?.city} ${numberOfSquareMeters}${translate(
        'units.squareMeters'
      )}`
    : '';

  return (
    <Box sx={{ position: 'relative' }}>
      <Image alt="post cover" src={coverFullUrl} ratio="16/9" />

      <TitleStyle>{postTitle}</TitleStyle>

      <FooterStyle>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt={owner?.name} src={owner?.avatarUrl} sx={{ width: 48, height: 48 }} />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" sx={{ color: 'common.white' }}>
              {owner?.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.500' }}>
              {fDate(createdAt || '')}
            </Typography>
          </Box>
        </Box>
      </FooterStyle>

      <OverlayStyle />
    </Box>
  );
}
