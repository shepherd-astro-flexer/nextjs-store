"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function Comment({ comment }: { comment: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const longComment = comment.length > 130;
  const renderComment =
    longComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;

  const toggleComment = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h3>{renderComment}</h3>
      {longComment && (
        <Button
          variant="link"
          className="capitalize text-muted-foreground pl-0"
          onClick={toggleComment}
        >
          {isExpanded ? "show less" : "show more"}
        </Button>
      )}
    </div>
  );
}
export default Comment;
