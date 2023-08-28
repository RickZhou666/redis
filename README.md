# redis
This is the redis course from udemy
https://www.udemy.com/course/redis-the-complete-developers-guide-p<br>

https://www.drawio.com/<br>

https://rbook.cloud/<br>

# 0. Tips
1. bypass udemy black screen
```bash
# 1. [NOT GOOD]
chrome exteions: nimbus

# 2. 
disable chrome hardware acceleration
```



# 0. Intro
1. why redis?
    - retrieve data from memory is fast from hard drive is slow
        1. All data stored in memory
        2. data is organized in simple data structures
        3. Redis has a simple feature set


2. Redis Setup
- setup in docker container
```bash
# pull redis image
$ docker pull redis

# start redis container
# https://blog.csdn.net/y117862654/article/details/129096050
$ docker run -d --name redis_container -p 6379:6379 redis redis-server --appendonly yes --requirepass "redis"


# connect to redis with redis-clit
$ docker exec -it redis_container redis-cli

# authentication vis redis-cli
>>AUTH "redis"
```

- setup in macos
    - https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/

<br><br><br><br><br><br>

# 2. Redis commands

<br><br><br>

## 2.1 basic command
1. cmds
```bash
# authentication
$ AUTH "redis"

# list all keys
$ KEYS *

# set key value
$ SET message 'Hi there!'


# retrieve value via key
$ GET message
```

2. principles
![imgs](./imgs/Xnip2023-08-28_09-13-26.jpg)

3. Types of commands
![imgs](./imgs/Xnip2023-08-28_09-12-51.jpg)

<br><br><br>

## 2.2 docs of commands
1. commands
https://redis.io/commands/<br>

<br><br><br>

## 2.3  Working with string

1. NX | XX
    - key, key we are trying to set
    - value, value we want to store
    - EX | PX | EXAT | PXAT | KEEPTTL, options for when this value should expire
    - NX | XX, only set this key if..., NX - not exist, XX - exist
    - GET, return the previous value stored at this key
```bash
# XX
127.0.0.1:6379> SET color green XX
OK
127.0.0.1:6379> SET ghgkhjk green XX
(nil)

# NX
127.0.0.1:6379> SET ghgkhjk green NX
OK
127.0.0.1:6379> SET color green NX
(nil)
```

2. EX | PX | EXAT | PXAT | KEEPTTL
    - https://redis.io/commands/set/
    - redis automatically delete your data after a certain amount of time
    - why we need this auto-deletion mechanism?
        1. redis built for caching
        2. hit cache checking redis first
        3. disable cache in some time period later
        4. when searching, return from traditional database and save copy to the redis

```bash
# 
127.0.0.1:6379> SET color red EX 2
OK
# immediately
127.0.0.1:6379> GET color
"red"
# wait after 2 seconds
127.0.0.1:6379> GET color
(nil)

```

3. SET multiple keys
```bash
# SETEX = SET + EX
$ SETEX color 2 black

# SETNX = SET + NX
$ SETNX color black

# MSET
$ MSET color black car toyota


# MSETNX, if any of the keys already exist, no set is done
$ MSETNX color black car toyota
```


4. GET and MGET
```bash
127.0.0.1:6379> MGET color car
1) "black"
2) "toyota"
```

5. String range
```bash
# GETRANGE
127.0.0.1:6379> GETRANGE car 0 2
"toy"

# SETRANGE, update portion of a string
127.0.0.1:6379> GET car
"toyota"
127.0.0.1:6379> SETRANGE car 2 blue
(integer) 6
127.0.0.1:6379> GET car
"toblue"
```

6. are above cmds useful?
    - scenarios in traditional database
        1. fetch one to three properties of a single item
        2. update one to three properties of a single item
        3. fetch all propeties related to several items
        4. create several items
    - tricks in redis
        1. limited values for each features, encode into a: red, b: green

![imgs](./imgs/screenshot-www.udemy.com-2023.08.28-10_17_28.png)

- in this way, redis make accessing and updating data as fast as possible
![imgs](./imgs/screenshot-2023.08.28-10_22_43.png)


<br><br><br>

## 2.4 Working with numbers

1. integer operations cmds

```bash
127.0.0.1:6379> SET age 20
OK
127.0.0.1:6379> INCR age
(integer) 21
127.0.0.1:6379> DECR age
(integer) 20
127.0.0.1:6379> INCRBY age 20
(integer) 40
127.0.0.1:6379> DECRBY age 15
(integer) 25


# increase by float
127.0.0.1:6379> INCRBYFLOAT age 6.22
"31.22"

# if it's after u incr by float
(error) ERR value is not an integer or out of range

# decrease by float
127.0.0.1:6379> INCRBYFLOAT age -1.05
"26.95"
```

2. why those DECR etc cmds exist?
    - two requests at the same time
        - facing concurrency issue
        - ![imgs](./imgs/Xnip2023-08-28_10-47-29.jpg)
    - Possible solutions
        1. use a Redis txn with "WATCH"
        2. Use a lock
        3. Use INCR
    - Redis only has one thread and process 1 cmd at a time. 
        - first one 21
        - second one 22
        - ![imgs](./imgs/Xnip2023-08-28_11-04-03.jpg)


## 2.5 Exercise
```bash
# not exist set
$ SETNX shape triangle
$ SET shape square NX


# expire after 5 seconds
$ SETEX news 5 "Today's Headlines"
$ SET news "Today's Headlines" EX 5
$ SET news "Today's Headlines" PX 5000
$ GET news
```


