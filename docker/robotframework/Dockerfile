FROM alpine:latest

RUN apk update && apk upgrade \
  && echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/community >> /etc/apk/repositories \
  && echo @latest-stable http://nl.alpinelinux.org/alpine/latest-stable/main >> /etc/apk/repositories \
  && apk add --no-cache \
    chromium@latest-stable \
    chromium-chromedriver@latest-stable \
    python3 \
    py-pip \
  && pip3 install robotframework-faker \
  && pip3 install robotframework==3.2.2 \
  && pip3 install robotframework-seleniumlibrary==4.5.0 \
  && rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/*

RUN pip freeze | grep robot
# Add Chrome as a user
RUN mkdir -p /robot \
    && adduser -D chrome \
    && chown -R chrome:chrome /robot
# Run Chrome as non-privileged
USER chrome
WORKDIR /robot

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/
