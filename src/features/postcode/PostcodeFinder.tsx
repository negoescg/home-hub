import { useEffect, useState } from 'react';
import { useGetEnergyInfoQuery } from '../../apis/energy.api';
import { useAppSelector } from '../../app/hooks';
import PostcodeLookupComponent from './components/PostcodeLookupComponent';
import React from 'react';

export type Address = {
  line_1: string;
  line_2: string;
  line_3: string;
  post_town: string;
  postcode: string;
};

const PostcodeFinder = () => {
  const [address, setAddress] = useState<Address>({
    line_1: '',
    line_2: '',
    line_3: '',
    post_town: '',
    postcode: '',
  });
  const [postcode, setPostcode] = useState<string>('');
  const { result, rowsArray, valuesArray } = useAppSelector((state) => state.energy);
  const [selectedAddress, setSelectedAddress] = useState<string>('-1');
  const [selectedResults, setSelectedResults] = useState();

  const { isSuccess } = useGetEnergyInfoQuery(postcode, {
    refetchOnMountOrArgChange: true,
    skip: postcode === '' || postcode === null,
  });

  useEffect(() => {
    if (isSuccess) {
      const find = valuesArray.find(
        (x: any) => x[1].replaceAll(',', '').toLowerCase() === address.line_1.toLowerCase(),
      );
      if (find) {
        setSelectedAddress(find);
        setSelectedResults(find);
      }
    }
  }, [isSuccess]);

  return (
    <>
      <PostcodeLookupComponent onAddressSelected={(address: Address) => setAddress(address)} />

      <label>Address Line One</label>
      <input type="text" value={address.line_1} onChange={(e) => setAddress({ ...address, line_1: e.target.value })} />
      <label>Address Line Two</label>
      <input type="text" value={address.line_2} onChange={(e) => setAddress({ ...address, line_2: e.target.value })} />
      <label>Address Line Three</label>
      <input type="text" value={address.line_3} onChange={(e) => setAddress({ ...address, line_3: e.target.value })} />
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
      <button
        type="button"
        onClick={() => setPostcode(address.postcode)}
        className="idpc-button px-2"
        style={{ backgroundColor: 'blue', color: 'white' }}>
        Get Info
      </button>
      {result && (
        <>
          <label>Choose and Address</label>
          <select
            value={selectedAddress}
            onChange={(e) => {
              setSelectedAddress(e.target.value);
              const result = valuesArray.find((x: any) => x[0] === e.target.value);
              setSelectedResults(result);
            }}>
            <option value={'-1'} disabled>
              Select
            </option>
            {valuesArray.map((item: string[], index: number) => {
              return (
                <option key={index} value={item[0]}>
                  {item[1]}
                </option>
              );
            })}
          </select>
        </>
      )}
      {selectedAddress !== '-1' ? (
        <>
          <div className="grid grid-cols-2">
            {rowsArray[0].map((item: any, index: number) => {
              return (
                <React.Fragment key={`${index}`}>
                  <div>{item}</div>
                  <div>{selectedResults ? selectedResults[index] ?? 'No Data' : 'N/A'}</div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default PostcodeFinder;
