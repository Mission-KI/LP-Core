FROM python:3.11

WORKDIR /backend

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD /bin/sh -c "gunicorn --workers 2 daseen.wsgi:application --bind 0.0.0.0:8000"