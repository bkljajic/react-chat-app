import React from "react";

const MessageItem = React.forwardRef((props, ref) => {
  return <div {...props} ref={ref} className={"messages-list"}/>
});

export default MessageItem
