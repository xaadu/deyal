FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8-alpine3.10
ENV PYTHONUNBUFFERED 1

RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Asia/Dhaka /etc/localtime
RUN echo "Asia/Dhaka" > /etc/timezone
RUN apk del tzdata

COPY . /app
WORKDIR /app

RUN pip install -r requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7002", "--proxy-headers"]
