FROM registryv2.zweicom.com:5000/robotframework:latest

WORKDIR /app
RUN chown -R chrome:chrome /app
COPY tests_e2e .

ENTRYPOINT [ "robot" , "." ]   