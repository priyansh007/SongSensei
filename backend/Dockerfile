FROM python:3.9.12

ENV CYANITE_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiSW50ZWdyYXRpb25BY2Nlc3NUb2tlbiIsInZlcnNpb24iOiIxLjAiLCJpbnRlZ3JhdGlvbklkIjo2NjcsInVzZXJJZCI6NTQ2MjMsImFjY2Vzc1Rva2VuU2VjcmV0IjoiMjVkMDlhMDNmMjA3ZDg1NGYwYTlkNTRlOGJmNmI1NzM4MmVkMmM1N2YxMmZhYWQzNTEyZTU4NGUzYTFkMWFlYiIsImlhdCI6MTY5MTYxNDY2MX0.a6N8krZ8ptdBGmkbXAh3_-yrjXxFEPHJczh_tJlQuxk"
ENV DJANGO_SECRET_KEY = 'django-insecure-)ngq+m#lxw@6j6ck3%26#p5f9ao8wh)eza67pc2joc0s1sgh'
ENV CLIENT_ID='be5b97021e8f4991965bc3c2223a7a0d'
ENV CLIENT_SECRET='371dd634c5dd4749a0a8c1fbdf3e1251'
ENV REDIRECT_URI='http://localhost:3000/search'

WORKDIR /backend

COPY . .

RUN pip install --upgrade pip 
RUN pip install -r Requirements.txt

EXPOSE 8000

WORKDIR /backend/SongSenseiBackend
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]