FROM registryv2.zweicom.com:5000/robotframework:latest

WORKDIR /app

COPY robot_e2e .

ENTRYPOINT [ "robot" , "--output", "NONE" , "--report" , "NONE" , "--log" , "NONE", "." ]   