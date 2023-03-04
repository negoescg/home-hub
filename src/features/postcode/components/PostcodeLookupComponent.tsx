import { PostcodeLookup } from "@ideal-postcodes/postcode-lookup";
import { createRef, useEffect } from "react";

const PostcodeLookupComponent = (props) => {
  const context = createRef();

  useEffect(() => {
    PostcodeLookup.setup({
      apiKey: "ak_leu2jz6twxrCy3E1gt2qt28s5N1Qw",
      context: context.current,
      buttonStyle: {
        backgroundColor: "green",
        color: "white",
      },
      ...props,
    });
  }, []);

  return <div ref={context}></div>;
};

export default PostcodeLookupComponent;
