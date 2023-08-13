'use client'

import {UserButton, useUser} from "@clerk/nextjs";

const Admin = () => {
  const {user} = useUser()
  return <div>
    <UserButton />
    <h2>{user?.id}</h2>
  </div>;
};

export default Admin;
