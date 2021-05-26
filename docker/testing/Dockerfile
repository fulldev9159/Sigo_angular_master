FROM gcr.io/zwcsce/robotframework:latest

WORKDIR /app

COPY robot_e2e .

ENTRYPOINT [ "robot" ,"--variable", "url:http://mcl_test_sigo_web", "--variable", "ambiente:testing", "--output", "NONE" , "--report" , "NONE" , "--log" , "NONE", "." ] 
