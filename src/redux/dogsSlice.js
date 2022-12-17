import { createSlice } from "@reduxjs/toolkit";
import { faker } from "@faker-js/faker";

// makes the number of dogs we get variable
const getNumDogs = (num) => `https://dog.ceo/api/breeds/image/random/${num}`;

// a "slice" is a small piece of redux state relating to a particular domain
// in this case, this will handle all our dogs
export const dogsSlice = createSlice({
  name: "dogs",
  initialState: {
    dogArray: [],
  },
  reducers: {
    // the second argument to a reducer is an object
    // there is a key of the action, i.e: "setDogs"
    // more valuably, there is the payload, which is whatever input we need
    setDogs: (state, { payload }) => {
      const dogs = payload.map((url) => {
        // use faker to generate semi-unique fake first names for the dogs
        const name = faker.name.firstName();
        // dogs will be an array of objects
        return {
          // fun fact: did you know in JS, if you have a variable that you want to put in an object and you're ok with the key being the name of the variable and it's value being the value of the variable, you can use short hand like so?
          // for instance:
          // const name = "nic"
          // const person = {name, age: 35}
          //person.name -> "nic"
          name,
          url,
          // initially they're all ok dogs
          isGoodBoy: false,
        };
      });
      state.dogArray = dogs;
    },
    changeDogStatus: (state, { payload }) => {
      // find the index of the dog we want to change
      const foundIndex = state.dogArray.findIndex((dog) => dog.url === payload);
      // create a shallow copy of current dogs
      const copy = [...state.dogArray];
      // find the dog to update in our copy array
      const dogToUpdate = copy[foundIndex];
      //set their goodBoy status to reverse
      dogToUpdate.isGoodBoy = !dogToUpdate.isGoodBoy;
      // set the copy to be the new state
      state.dogArray = copy;
    },
  },
});

// this is a "thunk" pattern that allows us to do fetches in our redux reducers!
export const fetchNumDogs = (num) => async (dispatch) => {
  // any async await logic should be wrapped in a try/catch
  try {
    const resp = await fetch(getNumDogs(num));
    // we know the response from the api is an object with {message, status}
    // we know message is an array of dog img urls
    const { message } = await resp.json();
    dispatch(setDogs(message));
  } catch (error) {
    console.error(error);
  }
};

// let's export all the things we need from here

// this generates "magic" functions that change the redux state for us when dispatched
export const { setDogs, changeDogStatus } = dogsSlice.actions;

// let's also export our state for easier access, the pattern of which is a function
export const dogsState = (state) => state.dogs.dogArray;

// by default, let's export the reducer so it can go in our store
export default dogsSlice.reducer;
