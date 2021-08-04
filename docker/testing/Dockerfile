FROM gcr.io/zwcsce/robotframework:latest

WORKDIR /app

COPY robot_e2e .

ENV DOCKERIZE_VERSION v0.2.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ./docker-entrypoint.sh

# ENTRYPOINT [ "robot" ,"--exclude", "automatizacion" ,"--variable", "url:http://mcl_test_sigo_web", "--variable", "ambiente:testing", "--output", "NONE" , "--report" , "NONE" , "--log" , "NONE", "." ] 
