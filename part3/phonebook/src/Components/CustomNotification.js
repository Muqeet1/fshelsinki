import React from "react";

const Customnotification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return <div className={notification.type}>{notification.message}</div>;
};
export default Customnotification;
