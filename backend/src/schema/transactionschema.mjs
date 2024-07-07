
export const verify_transactions={
    // {
    //     "receiver_id":20,
    //     "sender_id":30,
    //     "amount":400
    //   }
    receiver_id :{
        notEmpty:{
            errorMessage: "receiversid  should not be empty",
        }
    },
    id: {
        notEmpty: {
          errorMessage: "sender_id  should not be empty",
        },
      },
}