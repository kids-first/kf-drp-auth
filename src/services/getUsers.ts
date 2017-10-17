import ajax from 'services/ajax';
import { useDummyData } from 'common/injectGlobals';
import queryString from 'querystring';
import { User } from 'common/typedefs/User';

const dummyUsers = require('./dummyUsers.json') as User[];

export const getUsers = (
  offset = 0,
  limit = 20,
): Promise<{ count: number; results: User[] }> => {
  return useDummyData
    ? Promise.resolve({
        count: dummyUsers.length,
        results: dummyUsers.slice(offset, offset + limit),
      })
    : ajax
        .get(
          `/users?${queryString.stringify({
            limit,
            offset,
          })}`,
        )
        .then(r => r.data);
};
