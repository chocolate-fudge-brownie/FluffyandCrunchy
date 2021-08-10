# Notes on Front-end Work

- Everytime the Routes component loads. It will load on '/' first because isLoggedIn will be false. After component mounts, isLoggedIn's value is changed to true. I added a spinner that will load UNTIL the component mounts. Then if the component mounts and isLoggedIn is still false, it will load the Products component instead of the Home component. Similarly, if the component mounts and isLoggedIn is true, it will load the Home component as usual. This is a quality of life feature that improves the overall look of the site.

`console.log(isLoggedIn);`

- npm install react-loader-spinner 

- With Angie's guidance, we were able to notice that the me() thunk creator is an async function. So when we map dispatch to props, we can then await(dispatch(me)). Furthermore, when we call that mapped function in the component we can await it in the asynchronous componentDidMount() lifecycle.
