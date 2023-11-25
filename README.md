# Overview

This project is a simple replica of Twitter. You can make an account, and then you can post using a text area almost exactly like you do in Twitter. You can like other posts made by people on the platform and you can edit your own posts. You can visit peoples' profiles by clicking on their pfp or name on the post, and you can choose to follow them or see their posts and likes.

# How to use

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
