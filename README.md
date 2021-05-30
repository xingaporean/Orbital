# Orbital

## How to setup (for win (you have wsl2) or mac)
1. download docker desktop
2. go google the instructions on how to allow docker to interact with wsl2
3. clone this repo
4. cd to root of project
5. go read the bugs section first before you run the below commands
6. `docker-compose up -d --build `
7. go to localhost:3000, you should see a "[]".

## Bugs for setup which i am figuring out how to fix
0. ***DON'T DO ANY OF THE BELOW WHILE DOCKER IS RUNNING***
1. some error relating to "entrypoint.sh"
   - this is because the entrypoint.sh file in frontend does not have execute permission due to it being created without it and being copied over to docker image
   - Solution 
   - `cd frontend`
   - `chmod +x entrypoint.sh`
2. some error regarding user/grou permissions
   - this is because docker image doesn't know the permission of the host machine, so everytime you build a new container with docker compose the permissions are the same as what is in the container, which is root. so when it gets copied over in the volume directive, there is permission error.
   - Solution is to recursively chown every single file in ur local machine
   - `ls -la`
   - `sudo chown user:user -R .` 
   - Do this in the root directory, replace user with your local machine's user id, go google how to do this.
