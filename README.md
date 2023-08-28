# redis
This is the redis course from udemy
https://www.udemy.com/course/redis-the-complete-developers-guide-p<br>

https://www.drawio.com/<br>

https://rbook.cloud/<br>


# 0. Intro
1. why redis?
    - retrieve data from memory is fast from hard drive is slow
        1. All data stored in memory
        2. data is organized in simple data structures
        3. Redis has a simple feature set


2. Redis Setup
```bash

# pull redis image
$ docker pull redis

# start redis container
# https://blog.csdn.net/y117862654/article/details/129096050
$ docker run -d --name redis_container -p 6379:6379 redis redis-server --appendonly yes --requirepass "redis"


# connect to redis with redis-clit
$ docker exec -it redis_container redis-cli

# authentication vis redis-cli
>>AUTH "redis'
```