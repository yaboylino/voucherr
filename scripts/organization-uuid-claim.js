/**
 * Available variables:
 * user - the current user
 * realm - the current realm
 * token - the current token
 * userSession - the current userSession
 * keycloakSession - the current keycloakSession
 */

OrganizationProvider = Java.type("org.keycloak.organization.OrganizationProvider");

var provider = keycloakSession.getProvider(OrganizationProvider.class);

organization = provider.getByMember(user);

var organizations = [];

if (organization !== null && true === organization.isEnabled()) {
    organizations.push(organization.id);
}

JSON.stringify(organizations);


