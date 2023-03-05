import { useEffect, useState } from 'react';
import { useGetEnergyInfoQuery } from '../../apis/energy.api';
import { useAppSelector } from '../../app/hooks';
import PostcodeLookupComponent from './components/PostcodeLookupComponent';
import React from 'react';
import { useGetCrimeQuery, useGetDemographicsQuery, useGetPlanningQuery } from '../../apis/propertyData.api';

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
  const { demographics, crime, planning } = useAppSelector((state) => state.property);

  const [selectedAddress, setSelectedAddress] = useState<string>('-1');
  const [selectedResults, setSelectedResults] = useState();

  const [isCrime, setIsCrime] = useState<boolean>(false);
  const [isDemo, setIsDemo] = useState<boolean>(false);

  const { isSuccess } = useGetEnergyInfoQuery(postcode, {
    refetchOnMountOrArgChange: true,
    skip: postcode === '' || postcode === null,
  });

  const { isSuccess: crimeSuccess } = useGetCrimeQuery(postcode, {
    refetchOnMountOrArgChange: true,
    skip: postcode === '' || postcode === null || !isCrime,
  });

  useGetDemographicsQuery(postcode, {
    refetchOnMountOrArgChange: true,
    skip: postcode === '' || postcode === null || !isDemo,
  });

  const { isSuccess: planningSuccess } = useGetPlanningQuery(postcode, {
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

  useEffect(() => {
    if (planningSuccess) {
      setTimeout(() => {
        setIsCrime(true);
      }, 4000);
    }
  }, [planningSuccess]);

  useEffect(() => {
    if (crimeSuccess) {
      setTimeout(() => {
        setIsDemo(true);
      }, 4000);
    }
  }, [crimeSuccess]);

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
          <div className="py-4 text-xl">
            This data is from{' '}
            <a className="text-blue-900" target="_blank" href="https://epc.opendatacommunities.org/" rel="noreferrer">
              opendatacommunities
            </a>
          </div>
          <div className="grid grid-cols-2 w-full p-3">
            {rowsArray[0].map((item: any, index: number) => {
              return (
                <React.Fragment key={`${index}`}>
                  <div className="font-bold">{item}</div>
                  <div>{selectedResults ? selectedResults[index] ?? 'No Data' : 'N/A'}</div>
                </React.Fragment>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
      {postcode && (
        <>
          {planning && (
            <>
              <div className="py-4 text-xl">
                This data is from{' '}
                <a
                  className="text-blue-900"
                  target="_blank"
                  href="https://propertydata.co.uk/api/documentation/planning"
                  rel="noreferrer">
                  Property Data Planning
                </a>
              </div>
              {planning.data &&
                planning.data.planning_applications.map((item: any, index: number) => {
                  return (
                    <div className="grid grid-cols-2 w-full p-3" key={`${index}`}>
                      <div className="font-bold">Application URL</div>
                      <div>
                        <a target="_blank" href={item.url} rel="noreferrer">
                          Click here
                        </a>
                      </div>
                      <div className="font-bold">Address</div>
                      <div>{item.address}</div>
                      <div className="font-bold">Agent</div>
                      <div>
                        <div>{item.agent.name}</div>
                        <div>{item.agent.company}</div>
                        <div>{item.agent.address}</div>
                      </div>
                      <div className="font-bold">Authority</div>
                      <div>{item.authority}</div>
                      <div className="font-bold">Ward</div>
                      <div>{item.ward}</div>
                      <div className="font-bold">Case Officer</div>
                      <div>{item.case_officer}</div>
                    </div>
                  );
                })}
            </>
          )}
          {crime && (
            <>
              <div className="py-4 text-xl">
                This data is from{' '}
                <a
                  className="text-blue-900"
                  target="_blank"
                  href="https://propertydata.co.uk/api/documentation/crime"
                  rel="noreferrer">
                  Property Data Crime
                </a>
              </div>
              <div className="grid grid-cols-2 w-full p-3">
                {crime && (
                  <React.Fragment>
                    <div className="font-bold">Population</div>
                    <div>{crime.population}</div>
                    <div className="font-bold">Crime in last 12 months</div>
                    <div>{crime.crimes_last_12m}</div>
                    <div className="font-bold">Crime Rating</div>
                    <div>{crime.crime_rating}</div>
                  </React.Fragment>
                )}
              </div>
            </>
          )}
          {demographics && (
            <>
              <div className="py-4 text-xl">
                This data is from{' '}
                <a
                  className="text-blue-900"
                  target="_blank"
                  href="https://propertydata.co.uk/api/documentation/demographics"
                  rel="noreferrer">
                  Property Data Demographics
                </a>
              </div>
              <div className="grid grid-cols-2 w-full p-3">
                {demographics.data && (
                  <React.Fragment>
                    <div className="font-bold">Health</div>
                    <div>{demographics.health}</div>
                    <div className="font-bold">vehicles_per_household</div>
                    <div>{demographics.vehicles_per_household}</div>
                    <div className="font-bold">proportion_with_degree</div>
                    <div>{demographics.proportion_with_degree}</div>
                  </React.Fragment>
                )}
              </div>
              {/* <iframe title="test" src={`${demographics.url} #map-canvas`}></iframe> */}
            </>
          )}

          <>
            <div className="py-4 text-xl">
              This data is from{' '}
              <a className="text-blue-900" target="_blank" href="https://cadentgas.com/" rel="noreferrer">
                Cadentgas
              </a>
            </div>
            <div className="w-full">
              <iframe
                className="w-full flex justify-center"
                title="test"
                src={`https://cadentgas.com/in-your-area?postcode=${postcode
                  .replace(/\s/g, '')
                  .toLocaleLowerCase()}`}></iframe>
            </div>
          </>
        </>
      )}
    </>
  );
};
export default PostcodeFinder;
