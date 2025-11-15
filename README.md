# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

For dev
# Start development server
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop development server
docker-compose -f docker-compose.dev.yml down


For production
# Build and start production container
docker-compose up -d --build

# Rebuild after code changes
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop production container
docker-compose down