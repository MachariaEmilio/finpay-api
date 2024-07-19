export const verify_transactions = {
  receiver_id: {
    notEmpty: {
      errorMessage: "receiversid  should not be empty",
    },
  },
  sender_id: {
    notEmpty: {
      errorMessage: "sender_id  should not be empty",
    },
  },
  amount: {
    notEmpty: {
      errorMessage: "amount should not be empty",
    },
  },  password: {
    notEmpty: {
      errorMessage: "amount should not be empty",
    },
  },
};
