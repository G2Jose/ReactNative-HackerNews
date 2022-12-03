# React Native Hacker News

A HackerNews client built on React Native using CRNA, Expo and MobX
[Download Link](https://exp.host/@gejose/hacker-news)

## Status

### Functionality 
The app currently has the following functionality:

- Display a list of top stories on the home page.
- Clicking on a top story link from the home page takes the user to a detailed story page including comments.
- Pull to refresh & cool loading animations

### Screenshots
<img src="https://raw.githubusercontent.com/G2Jose/ReactHackerNews/master/img/headlines.png" width="300" />
<img src="https://raw.githubusercontent.com/G2Jose/ReactHackerNews/master/img/story.png" width="300" />
<img src="https://raw.githubusercontent.com/G2Jose/ReactHackerNews/master/img/video.gif" width="300" />

### TODO

The following functionality is planned: 

- Display username of authors of stories and comments
- Display time / time elapsed since story / comment was posted
- Load next page of stories on scroll down
- Refresh page on pull down gesture
- Styling and visual improvements
- Option to change text sizes
- Android support

## How to run
1. Install node, npm
	
	```
	brew install node
	```
2. Set up watchman
    
    ```
    brew install watchman
    ```
3. Install react-native-cli
    
    ```
    npm install -g react-native-cli
    ```
4. Install dependencies 
    
    ```
    cd ReactHackerNews && npm install
    ```
5. Run project in iOS simulator
    
    ```
    react-native run-ios
    ```
Alternatively, you can also open the .xcodeproj file directly on Xcode and run from there

