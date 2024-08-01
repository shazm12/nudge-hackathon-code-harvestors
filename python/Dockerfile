# Use the specified Python image
FROM python:3.8.19-alpine3.20

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apk update && \
    apk add --no-cache \
    build-base \
    libffi-dev \
    musl-dev \
    openblas-dev \
    libjpeg-turbo-dev \
    zlib-dev && \
    pip install --upgrade pip

# Set the working directory
WORKDIR /app

# Copy requirements file and install Python dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the rest of the application code
COPY . /app

# Expose the port the app runs on
EXPOSE 5000

# Command to run the server
CMD ["python", "predict.py"]