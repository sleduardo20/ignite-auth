import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';
import { setupAPIClient } from 'services/api';
import { api } from 'services/apiClient';
import { withSSRAuth } from 'utils/withSSRAuth';

const Dashboard = () => {
  const { user } = useAuth();

  useEffect(() => {
    api
      .get('me')
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }, []);

  return <h1>Dashboard:{user?.email}</h1>;
};

export default Dashboard;

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('me');
  console.log(response.data);

  return {
    props: {},
  };
});
