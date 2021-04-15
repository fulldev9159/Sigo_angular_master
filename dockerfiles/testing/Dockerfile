FROM registryv2.zweicom.com:5000/robotframework:latest

# WORKDIR /app
# RUN chown -R chrome:chrome /app
# USER chrome
RUN mkdir -p /app \
    && adduser -D chrome \
    && chown -R chrome:chrome /app
# Run Chrome as non-privileged
USER chrome
WORKDIR /app

COPY tests_e2e .

ENTRYPOINT [ "robot" , "." ]   