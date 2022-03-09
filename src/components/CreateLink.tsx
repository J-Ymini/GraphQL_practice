import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FEED_QUERY, CREATE_LINK_MUTATION } from "src/queries";
import { useNavigate } from "react-router-dom";

const CreateLink = () => {
  const [formState, setFormState] = useState({
    url: "",
    description: "",
  });

  const navigate = useNavigate();

  const { url, description } = formState;

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url,
      description,
    },
    update: (cache, { data: { post } }) => {
      const data = cache.readQuery({
        query: FEED_QUERY,
      });

      cache.writeQuery({
        query: FEED_QUERY,
        data: {
          feed: {
            // @ts-ignore
            links: [post, ...data.feed.links],
          },
        },
      });
    },
    onCompleted: () => navigate("/"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
          navigate("/");
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={(e) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <input
            className="mb2"
            value={url}
            onChange={(e) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;
