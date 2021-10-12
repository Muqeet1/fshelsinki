import React from "react";

const Customnotification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return <div className={notification.type}>{notification.msg}</div>;
};
export default Customnotification;
