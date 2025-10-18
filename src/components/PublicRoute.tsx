/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Navigate, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { useAuthenticated } from '../common/hooks/useAuthenticated';

export function PublicRoute() {
  const authenticated = useAuthenticated();
  const location = useLocation();

  const isInvitationLogin =
    location.pathname.startsWith('/login/') ||
    location.pathname.startsWith('/register/') ||
    location.search.includes('client_hash=');

  useEffect(() => {
    if (isInvitationLogin) {
      localStorage.removeItem('X-NINJA-TOKEN');
      localStorage.removeItem('X-CURRENT-INDEX');
    }
  }, [isInvitationLogin]);

  if (authenticated && !isInvitationLogin) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
