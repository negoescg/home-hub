import { PostcodeLookup } from '@ideal-postcodes/postcode-lookup';
import { createRef, useEffect } from 'react';

const PostcodeLookupComponent = (props: any) => {
  const context = createRef<any>();

  useEffect(() => {
    PostcodeLookup.setup({
      apiKey: 'ak_leu2jz6twxrCy3E1gt2qt28s5N1Qw',
      context: context.current,
      buttonStyle: {
        backgroundColor: 'green',
        color: 'white',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
      ...props,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={context}></div>;
};

export default PostcodeLookupComponent;
