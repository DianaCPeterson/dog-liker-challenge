# Dog Liker Challenge
## Getting Started
1. `git checkout -b #FIRSTNAMEHERE#`
2. `npm install`
3. `npm run start`
4. Your server will run on `localhost:3004/dogs`. Your React frontend will run on `localhost:3000`
5. Your server at `localhost:3004/dogs` returns a response that looks like this:
```JSON
[
    {
    "image": "https://images.dog.ceo/breeds/labradoodle/Cali.jpg",
    "likes": 0,
    "id": 1,
    "name": "Rover"
  },
  {
    "image": "https://images.dog.ceo/breeds/beagle/n02088364_16689.jpg",
    "likes": 0,
    "id": 2,
    "name": "Bingo"
  },
]
```
6. **DELIVERABLE 1**: Write code in `App.js` that fetches all dogs from the server and then renders them inside in the `div` with the `id` of `dogs`. Each dog should be represented in an individual div that looks like:
```jsx
<div className="dog">
    <img src="#IMAGE HERE#" alt="#NAME HERE#">
    <p>#NAME HERE#</p>
    <p>Likes: #LIKES HERE#</p>
    <button>Like</button>
</div>
```
7. **DELIVERABLE 2**: Refactor the code so that each `Dog` now has it's own component that is imported to `App.js` and passed props in order to render it. In addition to the server data, create a function `addLike` that will add a like to a particular dog (only locally, no persistence needed).

7. **DELIVERABLE 3**: Update the event handler for the `select` dropdown so it now filters successfully between `All Dogs` and dogs with one or more likes or `Liked Dogs`. If there are no dogs to show, instead of showing nothing show an `<h2>` with the phrase `No Dogs To Show ;(`.

8. **DELIVERABLE 4**: Refactor your `addLike` function so that it now makes a `PATCH` request to `http://localhost:3004/dogs/:id` where the id is the ID of the dog you wish to change. The body of the request (before JSON.stringify) should look like:
```JSON
    {"likes": "#NEW NUMBER OF LIKES HERE#"}
```
After doing this, you should be able to refresh the page and the likes should persist.

***

## To skip ahead/see sample solutions

1. `git add . && git commit -m "#PUT TIME HERE#"`
2. `git checkout deliverable-#NUMBER OF DELIVERABLE HERE#`
3. Check out what you need to check out, maybe copy/paste somewhere.
4. When you're done, to return to your work: `git stash && git checkout #FIRSTNAMEHERE#`


