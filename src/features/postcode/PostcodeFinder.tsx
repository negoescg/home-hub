import { useState } from "react";
import PostcodeLookupComponent from "./components/PostcodeLookupComponent";

const PostcodeFinder = () => {
  const [address, setAddress] = useState({
    line_1: "",
    line_2: "",
    line_3: "",
    post_town: "",
    postcode: "",
  });

  return (
    <div className="App">
      <PostcodeLookupComponent
        onAddressSelected={(address) => setAddress(address)}
      />

      <label>Address Line One</label>
      <input
        type="text"
        value={address.line_1}
        onChange={(e) => setAddress({ ...address, line_1: e.target.value })}
      />
      <label>Address Line Two</label>
      <input
        type="text"
        value={address.line_2}
        onChange={(e) => setAddress({ ...address, line_2: e.target.value })}
      />
      <label>Address Line Three</label>
      <input
        type="text"
        value={address.line_3}
        onChange={(e) => setAddress({ ...address, line_3: e.target.value })}
      />
      <label>Post Town</label>
      <input
        type="text"
        value={address.post_town}
        onChange={(e) => setAddress({ ...address, post_town: e.target.value })}
      />
      <label>Postcode</label>
      <input
        type="text"
        value={address.postcode}
        onChange={(e) => setAddress({ ...address, postcode: e.target.value })}
      />
    </div>
  );
};
export default PostcodeFinder;