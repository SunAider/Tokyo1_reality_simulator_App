// @mui
import { Box, Chip } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  tags: string[];
};

export default function PropertyPostTags({ tags }: Props) {
  return (
    <Box sx={{ py: 3 }}>
      {(tags || []).map((tag: string) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}
    </Box>
  );
}
