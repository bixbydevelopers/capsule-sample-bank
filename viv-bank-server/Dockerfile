# Think of these as constants, though they CAN be overridden with --build-arg
# when calling docker build:
ARG NODE_VERSION=10.15.2
ARG APP_USER=node
ARG APP_DIR=/home/node
ARG LOG_DIR=/var/log

# Let's get our dependencies together and build those first, for re-use in the
# final Docker image:
FROM node:${NODE_VERSION}-alpine AS prod_dependencies

# We need to re-declare these args without values just below each FROM
# statement in order to inherit the values defined at the top of this file:
ARG NODE_VERSION

# Assigning ARG again, below the FROM statement, allows these arguments to
# be used in the Dockerfile syntax. ARG definitions OUTSIDE (above) a FROM
# statement allows the arguments to be used in the FROM statement itself.
ARG APP_USER
ARG APP_DIR
ARG LOG_DIR

# Make sure we install everything into the app home directory:
WORKDIR ${APP_DIR}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# You are building your code for production
RUN npm install --only=production

# Bundle app source
COPY . .

# Default to production environment unless overridden by dev launch:
ENV NODE_ENV=production

# Fix file ownership, since Docker doesn't actually set ownership when copying
# files to an image. This is true even if you switch to your desired user
# before executing a COPY statement...
RUN chown -R ${APP_USER}:${APP_USER} ${LOG_DIR}
USER ${APP_USER}

EXPOSE 8080

CMD [ "npm", "start" ]
