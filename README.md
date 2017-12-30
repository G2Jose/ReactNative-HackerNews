[![Build Status](https://travis-ci.org/G2Jose/ReactNative-HackerNews.svg?branch=master)](https://travis-ci.org/G2Jose/ReactNative-HackerNews)

<strong><h1 style="text-align: center;">React Native Hacker News</h1></strong>
A modern cross-platform HackerNews client built on React Native

<p align="center">
    <a href="https://exp.host/@gejose/hacker-news"><img src="https://raw.githubusercontent.com/G2Jose/ReactNative-HackerNews/master/screenshots/expo.png" width="200" /></a>
</p>
<p align="center">
     <a href="https://itunes.apple.com/WebObjects/MZStore.woa/wa/viewSoftware?id=1220272464&mt=8"><img src="https://rawgit.com/G2Jose/ReactHackerNews/master/screenshots/Download_on_the_App_Store_Badge_US-UK_135x40.svg" width="200" /></a>
</p>

<p align="center">
    <img src="https://raw.githubusercontent.com/G2Jose/ReactNative-HackerNews/master/screenshots/iOS/top.png" width="200" />
    <img src="https://raw.githubusercontent.com/G2Jose/ReactNative-HackerNews/master/screenshots/iOS/comments.png" width="200" />
    <img src="https://raw.githubusercontent.com/G2Jose/ReactNative-HackerNews/master/screenshots/android/top.png" width="200" />
    <img src="https://raw.githubusercontent.com/G2Jose/ReactNative-HackerNews/master/screenshots/android/comments.png" width="200" />
</p>

## Features

The app currently has the following functionality:

* Headlines - Top, New, Show, Ask, Jobs
* Touching a headline takes you to a comments view
* Lazy loading data, loading views
* Pull to refresh

## Technologies Used

* React Native
* Redux for state management
* Redux Observable, RxJS for side effects handling
* Reselect for memoized selectors
* [HackerNews API](https://github.com/HackerNews/API)

## Dev Tooling

* Eslint for linting
* Prettier, lint-staged for code formatting
* React [storybook](https://github.com/storybooks/storybook) for UI development & testing

## How to run

1. Install node, yarn
2. Install dependencies

   ```
   yarn
   ```

3. Run project using expo

   ```
   yarn start
   ```

## UI development / testing using storybook

* After installing dependencies by running `yarn`,

  ```
  yarn storybook:ios
  ```

  or

  ```
  yarn storybook:android
  ```

to start a storybook at [http://localhost:7007/](http://localhost:7007/)
