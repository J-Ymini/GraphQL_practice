import React from "react";

interface ILinkProps {
  link: {
    id?: string;
    description?: string;
    url?: string;
    postedBy?: string;
    votes?: string;
    createdAt?: string;
  };
}

const Link = ({ link }: ILinkProps) => {
  return (
    <div>
      <div>
        {link.description} {link.url}
      </div>
    </div>
  );
};

export default Link;
