# RadPair Technical Challenge

This is my submission for the RADPair technical challenge. I built a frontend in React.js and the backend in Flask. To simplify the development I build docker images for each of these items, and the docker compose can be used to run these containers.

I will include instructions in this document for the docker related information.

## Building the Docker Images

If we edit the code we will need to build the docker image to ensure it is updated with the code. The commands for this are:

###React Frontend
`docker image build --file Dockerfile.frontend -t radpair-react:latest rad-diff-check`

###Flask Backend
`docker image build --file Dockerfile.api -t radpair-flask:latest api/`

## Run Docker Images
If we want to run a docker image on the current device we do the following command:

###React Frontend
`docker run -p 3000:3000 radpair-react`

###Flask Backend
`docker run -p 5000:5000 radpair-flask`

## Docker-Compose
If we wish to use Docker-Compose to run the entire application together in docker, we run `docker-compose up` in the current directory

