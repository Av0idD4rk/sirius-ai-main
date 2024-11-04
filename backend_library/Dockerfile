FROM python:3.12.3-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .

RUN chmod +x /entrypoint.sh
EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]