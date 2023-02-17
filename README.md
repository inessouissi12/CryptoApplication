Overview:
-The application allows users to get data for Cryptocurrencies of their choice. In the
home page, you enter in the search bar the cryptocurrency name and then you click
on it.
After that, you get a chart of the current week prices. Also, you can get a chart on
specific weeks by entering the begin date and the end date. (Make sure to enter
dates in the right format and make sure that the cryptocurrency exists in that date.).
Then, you click on the button “display” and you get the chart. You can also
download those results on your computer in json format. The total operation time
will be calculated and displayed.
Components:
1-Home component : contains home page that allows you to choose the
cryptocurrency.
2- Show component: contains information of the cryptocurrency chosen: chart
prices of the current week. You can also chose specific weeks and display the
chart.
You can download those charts data on your computer in json format.
the total operation time will be displayed.
Components methods:
1- Home component:
- debounce(): A javascript function used to ensure that the task doesn't fire so often
in order to brick browser performance.
- searchCoins(): helps the user to search the cryptocurrency.
- fetchCoins(): displays the cryptocurrencies.
2- Show component:
- fetchData(): displays the current week prices chart of the cryptocurrency.
- handleClick() : displays the chart of the cryptocurrency after choosing specific
dates.- formatDateWithoutTime(): convert the input value from date format to UNIX format
to use it in the API as parameter to get the cryptocurrency data.
Technologies used :
-ReactJS, axios, chartJS, express, zustand, css,
- I wanted to make it simple, optimized and easy to use with minimal downtime. I
aimed to put less information in the screen so the user doesn’t get confused and
gets what he wants easily.
Steps:
1-Node.js have to be installed.
2- Open coiner folder
3- run the command ‘npm install’ to install all of the necessary dependencies for the
project.
4- Run ‘npm start’.
5- Open the project on http://localhost:3000/ on the browser.
