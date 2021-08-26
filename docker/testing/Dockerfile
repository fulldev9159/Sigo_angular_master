FROM gcr.io/zwcsce/robotframework:latest

WORKDIR /app

COPY robot_e2e .

# ENTRYPOINT [ "robot" ,"--exclude", "automatizacion" ,"--variable", "url:http://mcl_test_sigo_web", "--variable", "ambiente:testing", "--output", "NONE" , "--report" , "NONE" , "--log" , "NONE", "." ] 
ENTRYPOINT [ "robot" ,"--exclude", "automatizacion" ,"--variable", "url:http://34.122.92.38:4300", "--variable", "ambiente:testing", "."] 
