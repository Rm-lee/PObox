import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";

function MessageToast(props) {
  const handleDismiss = () => {
    props.close(false);
  };
  useEffect(() => {
    if (props.show) {
      setTimeout(() => {
        props.close(false);
      }, 2500);
    }
  }, [props.show]);
  return (
    <>
      {props.show ? (
        <Message
          style={{
            position: "absolute",
            top: 100,
            backgroundColor: "#333",
            width: "280px",
            color: "white"
          }}
          onDismiss={handleDismiss}
          header={props.messageHeader}
          content={props.messageContent}
        />
      ) : null}
    </>
  );
}
export default MessageToast;
