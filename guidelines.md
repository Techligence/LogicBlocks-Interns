# Developer Guidelines 🌟

Hello, awesome devs! 🌟 We're all part of this fantastic journey, and it's crucial that we're on the same page to make our project shine. ✨ Before you submit your very first pull request, please take a moment to ensure your code meets the following guidelines.

1️⃣ [ES6 Syntaxing](https://www.w3schools.com/js/js_es6.asp)📚  : Utilize ES6 syntax in your JavaScript code for a cleaner and more modern style.
```
// 🎯 Example: Using arrow function and template literal
const greet = name => `Hello, ${name}!`;
```
2️⃣ Commenting, Commenting and Commenting 💬:
Your comments light the way for fellow devs! 🌟 Each function should have a brief comment explaining its purpose. If the code gets complicated, don't be afraid from adding many comments there as well.
```
// 🎯 Example: Function to calculate the square of a number
const square = num => {
  // Squaring operation
  return num * num;
};
```
3️⃣ Tests for your functions using [Jest](https://jestjs.io/)🧪 :
Test your functions rigorously using Jest. Cover not only the "easy path" 🌈 but also those tricky edge cases 🌪️ and failure scenarios 🛑.[Hint: Could be easily done with 🤖 [ChatGPT](https://chat.openai.com 👩‍💻👨‍💻]
```
// 🎯 Example: Jest test for square function
test('square of 2 should be 4', () => {
  expect(square(2)).toBe(4);
});
```
```
#To run all tests before submission
npm test
```
4️⃣ [Redux](https://redux.js.org) for State Management 🌍
Redux to the used for managing global states! 🦸 Use Redux to share states across different components whenever needed.
```
// 🎯 Example: Redux action to set username
export const setUsername = username => ({
  type: 'SET_USERNAME',
  payload: username,
});

// Redux reducer to manage username state 🔄
const usernameReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return action.payload;
    default:
      return state;
  }
};
```
5️⃣ [Material UI](https://mui.com) for UI Components 🎨
Material UI brings elegance and consistency to our UI. 🖌️ Make sure to stick to Material UI guidelines for that sleek look and feel.
```
// 🎯 Example: Using Material UI Button
import Button from '@material-ui/core/Button';

// Example of using Material UI Button
const MyButton = () => {
  return (
    <Button variant="contained" color="primary">
      Click Me
    </Button>
  );
};
```

Happy coding, everyone! Let's make this project a masterpiece! 🎨🚀



