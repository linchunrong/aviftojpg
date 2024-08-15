#!/bin/bash

docker build -t aviftojpg .
docker run -d --name=aviftojpg -p 5000:5000 -v /tmp/aviftojpg/uploads:/app/uploads aviftojpg