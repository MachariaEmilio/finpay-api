//     "id":6,
//     "phone":" 07434034456",
//     "name": "hn",
//     "email": "email.com",
//     "balance":600,
//     "password":"12345"

export const verify_regusers = {
  id: {
    notEmpty: {
      errorMessage: "id  should not be empty",
    },
  },
  phone: {
    notEmpty: {
      errorMessage: "phone should not be empty ",
    },
  },
  name: {
    notEmpty: {
      errorMessage: "name should not be empty",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "email should not be empty",
    },
  },
  balance: {
    notEmpty: {
      errorMessage: " balance  should not be empty",
    },
  },
  password: {
    notEmpty: {
      errorMessage: " Password should not be empty",
    },
  },
  
};
