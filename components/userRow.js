import React from "react";

const UserRow = ({ user }) => {
  return (
    <div className="container d-flex">
      <p className="mx-4">
        {user.firstName} {user.lastName}
      </p>
      <p className="mx-4">{user.email}</p>
      <p className="mx-4">{user.role}</p>
      <p className="mx-4">{user.id}</p>
    </div>
  );
};

export default UserRow;
