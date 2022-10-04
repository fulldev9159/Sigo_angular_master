FROM trion/ng-cli:14.1.0 AS base

WORKDIR /app

COPY ./  /app

RUN npm install
RUN ng build --prod

RUN sed -i "s/commit_hash = ''/commit_hash = '${CI_COMMIT_SHA}'/" dist/web-sigo/index.html
RUN sed -i "s/build_date = ''/build_date = '$(date)'/" dist/web-sigo/index.html

FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY --from=base /app/dist/web-sigo/ .
COPY docker/deploy/docker_entrypoint.sh .
RUN chmod +x docker_entrypoint.sh

ENTRYPOINT [ "/usr/share/nginx/html/docker_entrypoint.sh" ]
