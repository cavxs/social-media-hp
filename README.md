# Overview

This project is a simple replica of Twitter. You can make an account, and then you can post using a text area almost exactly like you do in Twitter. You can like other posts made by people on the platform and you can edit your own posts. You can visit peoples' profiles by clicking on their pfp or name on the post, and you can choose to follow them or see their posts and likes.

# How to use

You have to install node in order to use this project since the frontend is made using the javascript React library from start-react-app.

1. Open a terminal, cd into `backend`
2. Install the python requirements using `pip install -r requirements.txt`
3. Make migrations and migrate using `py manage.py makemigrations network` and py `manage.py migrate` into the terminal
4. Start the server using `py manage.py runserver`
5. Open another terminal; then, cd into `frontend`
6. Install the packages required for React using npm i
7. After successful installation, run `npm start` in the terminal and wait for the local server to start
8. A browser window will open automatically on localhost:3000

# Features (Grouped by URL)

### Index

- You can post just like in Twitter
- You can see all the posts posted by people on the platform in a paginated view that shows only 10 posts per page
- You can see all the posts of the people you follow
- Every post has the time of the post, the name of the poster, the profile picture of the poster, and a few buttons on the bottom
- You can like peoples' posts
- You can visit peoples' profiles by clicking on their name or profile picture in the post
- You can edit a post you posted

### Profile `/*`

- If it's your profile, you can change your profile picture by clicking on the profile picture, it will open a file selection popup
- If it's not your profile, you can follow/unfollow a user
- You can see the user's name and username
- You can see the number of posts, followers, and following a user has
- You can see a user's posts
- You can see a user's liked posts (just like in Twitter)

I wanted to add the functionality of changing the bio and the profile banner, that's why there's a TODO label there.

# What I learned

- I have utilized React for frontend (it's a Javascript library I've been learning this time period)
- I have learned and utilized Django Rest Framework for backend
- I have made my own AuthContext based on JWT Authentication
- I learned how to connect django DRF and React

# Why the project is this way

When I read the specification of project 4 I wanted to make a social media platform the likes of Twitter. I used Django purely at first but I hated it because the feel of the project and the coding was really ugly. My code felt unflexible, the website felt unnatural, and the linking of Javascript with Django templates was really messy. So I had an idea of using React, the library the professor was talking about. When I tried to use it within Django templates, I stumbled across a lot of issues with importing and using global variables. I figured the best way to use React is by separating it from the backend and writing it in its own frontend folder. This way the code won't be messy and I'll learn to be like the professionals. I had some background knowledge of React too so it helped with that. But the other issue is I didn't know how to link Django and React. After a lot of searching, I stumbled upon Django Rest Framework and decided to learn it. It was really tough but I got the hang of it after 2 days. Later, I faced an issue with Authentication because it was so tough especially since the frontend and backend are separated. I tried my best to learn JWT authentication and I eventually did and wrote (with a lot of help) AuthContext.js --I've written my own version of the file later in project 5. It is a challenge writing such a file (I was stuck for about 3 days trying to grasp the concepts behind it).
