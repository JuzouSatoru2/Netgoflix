import { useEffect, useState } from 'react';

import axios from 'axios';
import cookies from 'js-cookie';

/**
 * Authenticates a user by his token.
 *
 * Fetches the backend verification api with the cookie saved token.
 *
 * @since      0.0.1
 *
 * @return {Array} Returns the authenticated (boolean) and the username (string) and loading (boolean).
 */
export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/verify`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: cookies.get('netgoflix'),
        },
      })
      .then((res) => {
        // Handle success
        setAuthenticated(true);
        setUsername(res.data.username);
        setLoading(false);
      })
      .catch((err) => {
        // Handle error
        setLoading(false);
      });
  }, []);

  return [authenticated, username, loading];
};

export default useAuth;
