var context = $evaluation.getContext();

if(context.getIdentity().hasClientRole('nl.voucherr.mijn', 'global-viewer')) {
    // the user is a global viewer, allow all
    $evaluation.grant();
} else {
    var organizationsInScope = context.getIdentity().getAttributes().toMap().get('nl.voucherr.mijn.organizations');

    if (null !== organizationsInScope && organizationsInScope.size() > 0) {
        //user has organization claim, allow and set filter hint.

        $evaluation.grant();
        $evaluation.getPermission().addClaim(
            'filter-hint',
            'organization' + organizationsInScope
        );
    } else {
        print('Organization policy: No organization claim in token.');
        $evaluation.deny();
    }
}

