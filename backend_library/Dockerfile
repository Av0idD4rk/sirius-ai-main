FROM python:3.12.3-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

RUN chmod +x /entrypoint.sh
RUN apt-get -q update && apt-get -qy install netcat
 
ENTRYPOINT ["/entrypoint.sh"]