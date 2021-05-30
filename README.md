# Orbital

## How to setup (for win or mac)
1. download docker desktop
2. clone this repo
3. cd to root of project
4. `docker-compose up -d --build `
5. go to localhost:3000, you should see a "[]".

## Bugs for setup which i am figuring out how to fix
1. some error relating to "entrypoint.sh"
 - this is because the entrypoint.sh file in frontend does not have write permission due to it being created without it and being copied over to docker image
 - Solution 
 - `cd frontend`
 - `chmod +x entrypoint.sh`
2. some error regarding user/grou permissions
 - this is because docker image doesn't know the permission of the host machine, so everytime you build a new container with docker compose the permissions are the same as what is in the container, which is root. so when it gets copied over in the volume directive, there is permission error.
 - Solution is to recursively chown every single file in ur local machine
 - `ls -la`
 - `sudo chown user:user -R .` 
 - Do this in the root directory, replace user with your local machine's user id, go google how to do this.
