# API Doc 
##  Words Of Strangers
---
###  Here is a simple documentation guide to the API

<br>

# Base URL
### All requests must be send to this server
     https://dagmawibabi.com

# API Routes 

## __1. Get Notes__

## Description:
    This API route will allow you to fetch all the notes with their title, content, 
    likes and dislikes from the database sorted and ordered in the way you like.

## Route 
   /wot/getNotes/sort/order
    
## Route Parameters
    sort: String 
        values: 
            likes - to sort by number of likes
            dislikes - to sort by number of dislikes
            time - to sort chronologically
    order: Number 
        values: 
            1 - ascending
           -1 - descending

## Response Object Schema:
    [
        {
            _id: MongoDB_ID,
            title: String,
            content: String,
            date: String,
            time: String,
            likes: Number,
            dislikes: Number,
        }
        ...
    ]
    

## Example Request
    /wot/getNotes/likes/1

## Example Response
    [  
        {
            _id: "62890696ded433581b7ae46d"
            title: "This is sick"
            content: "Babi_stark_hendrics you rock"
            date: "5/21/2022"
            time: "4:34:46 PM"
            likes: 0
            dislikes: 0
        },
        {
            _id: "62890748ded433581b7ae479"
            title: "Hello world"
            content: "And I am the stranger who's using it."
            date: "5/21/2022"
            time: "4:37:44 PM"
            likes: 0
            dislikes: 0
        }
        ...
    ]

---

<br>

## __2. Send Notes__

## Description:
    This API route will allow you to post notes on the wall.

## Route 
    /wot/sendNote/title/content
    
## Route Parameters
    title: String [limit: 100]
    content: String [limit: 400]

## Response Object Schema:
    String

## Example Request
    /wot/sendNote/Joa/Ate Bread

## Example Response
    "done"

---

<br>

## __3. Like Post__

## Description:
    This API route will allow you to like a specific post

## Route 
    /wot/likeNote/title/content

## Route Parameters
    title: String [limit: 100]
    content: String [limit: 400]    

## Response Object Schema:
    String

## Example Request
    /wot/likeNote/Joa/Ate Bread

## Example Response
    "done"

---

<br>

## __3. Dislike Post__

## Description:
    This API route will allow you to dislike a specific post

## Route 
    /wot/dislikeNote/title/content

## Route Parameters
    title: String [limit: 100]
    content: String [limit: 400]    

## Response Object Schema:
    String

## Example Request
    /wot/dislikeNote/Joa/Ate Bread

## Example Response
    "done"
---


> By DagmawiBabi

> April 15/ 2022

