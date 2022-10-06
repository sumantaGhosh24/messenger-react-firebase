import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";

const Message = ({message, username}) => {
  const isUser = username === message.username;

  return (
    <Card className={`message ${isUser && "message__user"}`}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {message.username}:{message.message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Message;
