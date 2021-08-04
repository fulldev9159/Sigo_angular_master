echo "wait db server"
dockerize -wait tcp://mcl_test_sigo_db:3306 -timeout 50s

echo "start robot test"
robot --exclude automatizacion --variable url:http://mcl_test_sigo_web --variable ambiente:testing --output NONE --report NONE --log NONE .