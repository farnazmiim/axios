import { AppProps } from 'next/app';
import { useCallback, useEffect, useState } from 'react';
// import { clientUrl } from '../api/api-client/api-client';
import './styles.less';

import { clientUrl } from '@axios-workspace/http-interceptor';

function CustomApp({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const posts = await clientUrl.post.list();
      // const posts = await clientt.post.get('1');
      setPosts(posts);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <ul>
        {posts?.map((item, i) => (
          <li key={i}>{item?.title}</li>
        ))}
      </ul>
    </>
  );
}

export default CustomApp;
