FROM trion/ng-cli:10.1.6 AS base

WORKDIR /app

COPY ./angular-project/  /app

RUN npm install
RUN ng build

RUN sed -i "s/commit_hash = ''/commit_hash = '${CI_COMMIT_SHA}'/" dist/app-ot/index.html
RUN sed -i "s/build_date = ''/build_date = '$(date)'/" dist/app-ot/index.html

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=base /app/dist/app-ot/ .
COPY docker/deploy/docker_entrypoint.sh .
RUN chmod +x docker_entrypoint.sh

ENTRYPOINT [ "/usr/share/nginx/html/docker_entrypoint.sh" ]
