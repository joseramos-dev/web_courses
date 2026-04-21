FROM node:20-alpine

WORKDIR /app

COPY frontend/web_courses_frontend/package.json frontend/web_courses_frontend/package-lock.json* ./
RUN npm install

COPY frontend/web_courses_frontend .
RUN npm run build

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
