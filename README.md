# Thing Pink Exercise webapp in [REACT](https://react-bootstrap.github.io/) & [REDUX](https://github.com/reactjs/react-redux)
### Version 0.0.1


This is a webapp was created for exercise purposes only.
First you must authenticate yourself via one of the available methods ([Facebook](https://www.facebook.com/), [Twitter](https://twitter.com/) or [Github](https://github.com/) account).
After that you can get info about last [dribbble](https://dribbble.com/) shots and search or filter by tag and also sort them ascending or descending for likes count.
There's also an area where you have an SVG animation that you can interact with.
To start using it just follow the [Local Setup](#local-setup) steps.

## Local Setup
- First git clone this project `git clone https://github.com/noslenfa/thing-pink-exercise.git`
- Enter into the correct directory, normally `thing-pink-exercise/`
- Then we assume that you have already `node` installed, otherwise follow [installation process](https://nodejs.org/);
- Install all the dependencies with `npm install` (based on `package.json`);
- Enter the webapp folder and start the App by running `npm start`;
- App should open your browser and start automatically. If not access it via: `http://localhost:3000/`

## Build Setup
- Follow the steps in [Local Setup](#local-setup) until you installed all dependencies
- Enter the webapp folder and create a build by running `npm run build`;
- You can find your build information inside the dist folder
- **NOTE:** Under config/env.js you should update your production BASE_URL to your servers one (check the TODO there)

## App Information
This app is divided in four main parts as described bellow.

### Login
Where you can login yourself via one of the three methods described earlier.

![alt text](/../master/screenshots/screenshot_00.png?raw=true "Login")

### Home
You can only access this view after being logged in, otherwise you are going to be redirected to login view.
Here you can access the SVG Display page, or the Info Display page

![alt text](/../master/screenshots/screenshot_01.png?raw=true "Home")

### SVG Display
You can only access this view after being logged in, otherwise you are going to be redirected to login view.
Accessing SVG Display view you can where you cans view and animated SVG and interact with it, painting the letters fill and stroke.

![alt text](/../master/screenshots/screenshot_02.png?raw=true "SVG Display")

### Info Display
You can only access this view after being logged in, otherwise you are going to be redirected to login view.
Here you can get info about last [dribbble](https://dribbble.com/) shots and search or filter by tag and also sort them ascending or descending for likes count.

![alt text](/../master/screenshots/screenshot_03.png?raw=true "Info Display")

### Other Notes
- Whenever you enter a wrong url you are redirected to an 404 page.
- This webapp is prepared to mobile devices.

![alt text](/../master/screenshots/screenshot_04.png?raw=true "Mobile Login")
![alt text](/../master/screenshots/screenshot_05.png?raw=true "Mobile Info Display")

Hope you enjoy it :)

## License
[MIT](/../master/LICENSE.MD)
