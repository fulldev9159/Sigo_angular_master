docker-compose stop mcl_api_otec mcl_otec_db mcl_sigo_test_web
docker-compose rm -f  mcl_api_otec mcl_otec_db mcl_sigo_test_web
docker pull registryv2.zweicom.com:5000/mcl-otec-webclient:latest-develop
docker-compose up -d mcl_sigo_test_web

cd demos-env/; docker-compose stop mcl_api_otec mcl_otec_db mcl_sigo_test_web;docker-compose rm -f  mcl_api_otec mcl_otec_db mcl_sigo_test_web;docker pull registryv2.zweicom.com:5000/mcl-otec-webclient:latest-develop;docker-compose up -d mcl_sigo_test_web