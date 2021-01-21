FROM registryv2.zweicom.com:5000/trion/ng-cli:10.1.6 AS base

WORKDIR /app

COPY ./angular-project/  /app
COPY ./docker  /app/docker

RUN npm install
RUN ng build --prod

RUN sed -i "s/commit_hash = ''/commit_hash = '${CI_COMMIT_SHA}'/" dist/otec/index.html
RUN sed -i "s/build_date = ''/build_date = '$(date)'/" dist/otec/index.html

FROM registryv2.zweicom.com:5000/nginx:alpine

COPY angular-project/nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=base /app/dist/otec/ .
COPY --from=base /app/docker/deploy/docker_entrypoint.sh .

ENTRYPOINT [ "/usr/share/nginx/html/docker_entrypoint.sh" ]
