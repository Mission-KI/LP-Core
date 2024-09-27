FROM python:3.11

WORKDIR /backend

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . .

CMD /bin/sh -c "python manage.py collectstatic --noinput && gunicorn --workers 2 daseen.wsgi:application"