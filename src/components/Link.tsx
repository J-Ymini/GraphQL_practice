import React from "react";
import { useMutation } from "@apollo/client";
import { AUTH_TOKEN } from "src/constants";
import { timeDifferenceForDate } from "src/utils/timeDifference";
import { FEED_QUERY, VOTE_MUTATION } from "src/queries";

interface ILinkProps {
  link: {
    id?: string;
    description?: string;
    url?: string;
    postedBy?: any;
    votes?: any;
    createdAt?: string;
  };
  index: number;
}

const Link = ({ link, index }: ILinkProps) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },
    update: (cache, { data: { vote } }) => {
      // @ts-ignore
      const { feed } = cache.readQuery({
        query: FEED_QUERY,
      });

      const updatedLinks = feed.links.map((feedLink: any) => {
        if (feedLink.id === link.id) {
          return {
            ...feedLink,
            votes: [...feedLink.votes, vote],
          };
        }
        return feedLink;
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            links: updatedLinks,
          },
        },
      });
    },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>
        {
          <div className="f6 lh-copy gray">
            {link.votes?.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        }
      </div>
    </div>
  );
};

export default Link;
