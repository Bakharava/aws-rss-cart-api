# Define the first stage with alias "step_1_dependencies"
FROM node:22-alpine As step_1_dependencies
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node


# Define the second "build" stage with alias "step_2_builder"
FROM node:22-alpine As step_2_builder
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=step_1_dependencies /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node


# Define the final stage "release" using Node.js 22 with Alpine Linux as base
FROM node:22-alpine As step_3_release
WORKDIR /usr/src/app
COPY --chown=node:node --from=step_2_builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=step_2_builder /usr/src/app/dist ./dist
EXPOSE 4000
ENV PORT=4000
CMD [ "node", "dist/main.js" ]