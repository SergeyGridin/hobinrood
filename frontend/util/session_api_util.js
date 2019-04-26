export const signup = user => (
  $.ajax({
    url: `/api/users`,
    method: 'POST',
    data: { user }
  })
);

export const login = user => (
  $.ajax({
    url: `/api/session`,
    method: 'POST',
    data: { user }
  })
);

export const logout = () => (
  $.ajax({
    url: `/api/session`,
    method: 'DELETE',
  })
);

export const fetchUserInfo = ({id}) => {
  return $.ajax({
    url: `/api/users/${id}`,
    method: 'get'
  });
};

export const fetchCompleteUserInfo = ( id ) => {
  return $.ajax({
    url: `/api/users/${id}/complete`,
    method: 'get'
  });
};

export const fetchHistoricalUserInfo = ( id ) => {
  return $.ajax({
    url: `/api/users/${id}/historical`,
    method: 'get'
  });
};
