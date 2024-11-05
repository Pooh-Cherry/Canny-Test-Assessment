import jwt from 'jsonwebtoken';

import validateInput from './validateInput';

const SingleSignOnKey = 'SingleSignOnKey';

export default async function authenticateUser(request, queryData) {
  const { ssoToken } = queryData;
  const userData = await jwt.verify(ssoToken, SingleSignOnKey);
  delete queryData.ssoToken;

  if (!userData.id) {
    throw new Error('Missing id in user data');
  } else if (userData.email && !validateInput.email(userData.email)) {
    throw new Error('Invalid email in user data');
  } else if (!userData.nayme) {
    throw new Error('Missing name in user data');
  }

  return userData;
}

module.exports = authenticateUser;
