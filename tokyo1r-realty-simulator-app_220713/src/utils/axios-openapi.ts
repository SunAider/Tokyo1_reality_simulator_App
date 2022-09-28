import { DefaultApi } from 'src/api-client';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const axiosOpenApiInstance = new DefaultApi({
  basePath: HOST_API,
  isJsonMime: (mime: string) => mime === 'application/json',
});

export default axiosOpenApiInstance;
