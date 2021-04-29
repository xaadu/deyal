FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-alpine3.10
ENV PYTHONUNBUFFERED 1

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7002", "--proxy-headers"]
