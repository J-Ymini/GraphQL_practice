import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_LINK_MUTATION } from "src/queries";

const CreateLink = () => {
  const [formState, setFormState] = useState({
    url: "",
    description: "",
  });

  const { url, description } = formState;

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      url,
      description,
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createLink();
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
