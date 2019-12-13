# Desceiption

Know Thy Destiny, our final project, is a fascinating website that incorporates the fortune-telling techniques of both the western and eastern world. In this website, you will be required to register and provide your birth date and time.  Based on these, several requests would be sent to the APIs to retrieve the relevant information. Then, destiny predictions, such as Horoscope, Zodiac Animals, Life Numbers, Dream Interpretation, and other metrics and explanations will be displayed on the website in a dynamic way that enables users to interact with different astrology or zodiac charts.

## Functionality

1.Our application has a feature that helps users to complete dream interpretation. Users can input the keyword of their dreams in the search bar, click on the "Search", and the application will provide the user with the dream interpretation of the corresponding keyword. At the same time, we also provide users with autocomplete suggestions in the search bar. For instance, the user enters “ca” in the search bar and some common keyword suggestions will be displayed below the search bar, such as “cat”, “cable”, “cabbage”, etc. The autocomplete suggestions will help users to complete the keyword input and improve the user experience.

2.Account Creation/Alteration/Deletion							 
Our application requires users to log in when seeing their destiny prediction results. Each user should be prompted to log in when they land in the index of our website. If they don’t have accounts on our website, they can sign up. After they log in to our website, you can choose to edit their name displaying on the screen, their passwords, and other personal profile information. In addition, we also provide the function of deleting the account, which will result in the removal of user data in our backend data storage.

The data associated with the user that we want to restore, despite user name and password, would be at least the following, namely birth date and time, gender, profile picture, location, and biography. 	

3.Before login, the web page will dynamically read public data and show twelve charts of horoscope; When users are logging in, they can create or update their personal information which is stored as user data; After successful login, the web page will show the user’s Today Horoscope which is considered to be user data. For the other two functions after login, one is to enable users to enter keywords and return interpretation of their dreams (private data); another function is to enable users to enter their birthdays & names and then return users’ fortune (user data). Finally, all users can log out and delete their personal information.

4.The user data, including user names, passcode, will be stored at the backend. The webpage will be rendered each time when the user accesses it, and reflect any changes made by users. A good starting point is the provided starter back-end server, on which we can store our data separately (public, private, user), and perform CRUD operations. 	

5.Based on our functionalities of the website, we will try to consume these kinds of API:
Astrology and Horoscope API: we desired to POST the birthdate of a user and GET their astrology data. After some preliminary searching, we find the APIs might not be free, but there might be simpler but free ones like http://sandipbgt.com/theastrologer-api/api.html.
Daily Prediction API: we want to find the API that could return the daily prediction based on the zodiac sign. One of them is https://vedicastroapi.com/.
