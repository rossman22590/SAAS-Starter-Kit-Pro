import React, { useState } from 'react';
import styled from 'styled-components';
import axios from '../../../services/axios';
import { Link } from '@reach/router';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 1px solid black;
  max-width: 14rem;
`;

const Dashboard = () => {
  const [apps, setApps] = useState();

  const getApps = async () => {
    let user_id = 1;

    let params = {
      user_id
    };

    const result = await axios.get(`/api/get/app`, { params }).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result);
    setApps(result.data);
  };

  const postApp = async (event) => {
    event.preventDefault();
    console.log(event.target.title.value);
    let name = event.target.name.value;

    let data = {
      name
    };

    const result = await axios.post(`/api/post/app`, data).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result);

    //returning ID
    //createRole
    let app_id = result.data[0].app_id;
    let user_id = 1;
    let is_admin = true;
    let is_user = false;

    let data2 = {
      app_id,
      user_id,
      is_admin,
      is_user
    };

    const result2 = await axios.post(`/api/post/role`, data2).catch((err) => {
      //  fetchFailure(err);
      console.log(err);
    });

    console.log(result2);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Create App</h2>
      <form onSubmit={postApp}>
        <input type="text" name="name" />
        <button type="submit">Save</button>
      </form>
      <Link to="/user/settings/account">Account</Link>
      <Link to="/user/settings/payment">Account</Link>
      <Link to="/user/settings/subscription">Account</Link>
      <h2>My Apps:</h2>
      <button onClick={getApps}>Get Apps</button>
      {apps &&
        apps.map((app) => (
          <Card key={app.app_id}>
            <Link to={`/app/${app.app_id}/dashboard`} state={{ app }}>
              {app.app_name}
            </Link>
            <button>Delete App</button>
            <button>Invite</button>
          </Card>
        ))}
    </div>
  );
};

export default Dashboard;
