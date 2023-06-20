# basic design
I chose monorepo to simplify sharing common code, I could have definetly shared more and reduced rebundancy with more utils,
but had to balance seeing how my time was short.
Both microservices access a single collection, Tasks. Ideally Notifications would access Tasks each time it wanted to 
look for tasks based on dueTime, but due to simplicity/time concerns I simply put the query directly in Notification for now.
I used relativly barebones express since I was unsure of what kind of framework was expected of me, and express is a pretty neutral one.
The logging utils are mostly placeholders for real logging and error handeling.
again due to simplicity I didn't make any proper configuration system, some things however can be configured with .env
I did not implement any retries for mongo, as part of the time constraint.

# Expected Requirements
First a declaimer: I had some troubles with running a local MongoDb on my machine, I didn't account for installation time 
and making it work nice with my machine. Some functionality might be untested due to that (as of time of writing),
my sincre apologies for that. 
The only real expectation beyond running `npm i` and installing node on the machine is have a mongodb server to connect to,
with database called "Todo" and a "Tasks" collection on it

# Tasks 
Not much to say. I will say that I took the oppertunity to learn a new tool called joi,
since I stated writing manual validations and realized it would eat too much time into the project.
Quite happy about it, it worked nicely for my needs here. The error handeling is quite messy here,
I didn't have time to write error handeling utils and custom errors to streamline it.

# Notifications
I choose a very simple implementation for the notifications. Mostly because I felt the complexities added by a more "precise" approach would ballon
the project beyond my allocated time. The precise approach would have timers for different tasks, but that includeds many complexities to scaling and handling edge cases of edits/deletion sin the Task Db, the simple solution is worth the loss of slight accuracy in my opinion in this case.
I have only a mock for sendNotifcation, since that was mentioned as a given in the task description.
Given more time I would seperate the notification checking logic to a class, that could handle "failed checks" and handle other kinds of notifications that might be added in the future.