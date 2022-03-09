import React from "react";
import Link from "./Link";
import { useQuery } from "@apollo/client";
import { FEED_QUERY } from "src/queries";

interface ILinkList {
  feed: {
    id: string;
    __typename: string;
    links: {
      id?: string;
      description?: string;
      url?: string;
      createdAt?: string;
    }[];
  };
}

const LinkList = () => {
  const { loading, error, data } = useQuery<ILinkList>(FEED_QUERY);

  console.log(data);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error...</div>;
  }

  return (
    <div>
      {data?.feed.links.map((link, index) => (
        <Link key={link.id} link={link} index={index} />
      ))}
    </div>
  );
};

export default LinkList;
