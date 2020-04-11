import React, { useState, useEffect } from "react";
import { Message } from "semantic-ui-react";

function MessageToast(props) {
  const handleDismiss = () => {
    props.close(false);
  };
  return (
    <>
      {props.show ? (
        <Message
          style={{ position: "absolute", top: 100 }}
          onDismiss={handleDismiss}
          header={props.messageHeader}
          content={props.messageContent}
        />
      ) : null}
    </>
  );
}
export default MessageToast;
