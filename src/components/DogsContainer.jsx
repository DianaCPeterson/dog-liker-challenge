import DogDiv from "./DogDiv";
import { allFilters, setFilter } from "../redux/filterSlice";
import { changeDogStatus } from "../redux/dogsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";

const DogsContainer = ({ dogs }) => {
  // we still need to access dispatch each time we use it in different components
  const dispatch = useDispatch();
  // get the dropdown object from redux
  const dropdownValues = useSelector(allFilters);

  //example of useCallback, a hook that lets you memoize a function so react doesn't have to recalculate its return value
  const setGoodBoy = useCallback(
    (dog) => dispatch(changeDogStatus(dog.url)),
    [dispatch]
  );
  return (
    <div>
      {/* example of a drodown implementation */}
      <select
        onChange={(e) => {
          // onChange is used for a dropdown and the value is the value of the option selected
          dispatch(setFilter(e.target.value));
        }}
      >
        {Object.keys(dropdownValues).map((key) => {
          return (
            <option key={key} value={dropdownValues[key]}>
              {key}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      {/* complex state example using the dogs state */}

      {/* we use Array.prototype.map because an array of JSX object is valid react code */}
      {/* even though we're using redux, let's still pass down the toggleGoodBoy function to make our div as "dumb" as possible */}
      {/* we use a ternary to check whether all the currently filtered dogs have a length greater than 0 */}
      {/* a length > 0 is truthy and less than or equal to 0 is falsy! */}
      {dogs.length ? (
        dogs.map((dog) => {
          return (
            <DogDiv
              dog={dog}
              key={dog.url}
              toggleGoodBoy={() => setGoodBoy(dog)}
            />
          );
        })
      ) : (
        <h2>No Dogs To Show ;(</h2>
      )}
    </div>
  );
};

export default DogsContainer;
