FROM registryv2.zweicom.com:5000/robotframework:latest

WORKDIR /app

COPY robot_e2e .

ENTRYPOINT [ "robot" ,"--variable", "url:http://mcl_test_sigo_web", "--output", "NONE" , "--report" , "NONE" , "--log" , "NONE", "." ] 
