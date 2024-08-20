FROM quay.io/keycloak/keycloak:25.0 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_PROXY=edge
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_DB=mariadb
ENV KC_FEATURES=scripts,token-exchange,admin-fine-grained-authz
ENV TZ=Europe/Amsterdam

WORKDIR /opt/keycloak

ADD ./providers/* providers/

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:25.0
COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KC_HEALTH_ENABLED=true
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_DB=mariadb
ENV KC_FEATURES=scripts,token-exchange,admin-fine-grained-authz,organization
ENV TZ=Europe/Amsterdam

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
