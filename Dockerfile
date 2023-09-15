# Frontend and Backend Dockerfile

# Frontend Build Stage
FROM node:18 AS frontend-build
WORKDIR /frontend
ENV PORT=3000
RUN mkdir server && mkdir app
RUN npm install -g pm2

# Copy and install server dependencies
COPY frontend/server/package.json server/
COPY frontend/server/package-lock.json server/
RUN cd server && yarn install
COPY frontend/server/ server/

# Copy and install app dependencies and build frontend code
COPY frontend/app/package.json app/
COPY frontend/app/yarn.lock app/
RUN cd app && yarn install
COPY frontend/app/ app/
RUN cd app && yarn build

# Move static files to server
RUN mv app/dist server/
WORKDIR /frontend/server
EXPOSE 3000
CMD [ "pm2-runtime", "start", "server.js" ]

# # Backend Stage
FROM python:3.9.12 AS backend
ENV CYANITE_ACCESS_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo2NjcsInVzZXJJZCI6NTQ2MjMsImFjY2Vzc1Rva2VuU2VjcmV0IjoiMjVkMDlhMDNmMjA3ZDg1NGYwYTlkNTRlOGJmNmI1NzM4MmVkMmM1N2YxMmZhYWQzNTEyZTU4NGUzYTFkMWFlYiIsImlhdCI6MTY5MTYxNDY2MX0.a6N8krZ8ptdBGmkbXAh3_-yrjXxFEPHJczh_tJlQuxk"
ENV DJANGO_SECRET_KEY='django-insecure-)ngq+m#lxw@6j6ck3%26#p5f9ao8wh)eza67pc2joc0s1sgh'
ENV CLIENT_ID='be5b97021e8f4991965bc3c2223a7a0d'
ENV CLIENT_SECRET='371dd634c5dd4749a0a8c1fbdf3e1251'
ENV REDIRECT_URI='http://localhost:3000/search'
WORKDIR /backend

# Copy the backend code
COPY /backend/ /backend/

# Upgrade pip and install backend dependencies
RUN pip install --upgrade pip 
RUN pip install -r Requirements.txt

# Expose ports for frontend and backend

EXPOSE 8000

WORKDIR /backend/SongSenseiBackend
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
