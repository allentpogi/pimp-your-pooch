export const getBookingtypeName = (bookingId) => {
  switch (bookingId) {
    case "1":
      return "Pamper my pooch";
    case "2":
      return "Doggy day out";
    case "3":
      return "Holiday";
    default:
      return null;
  }
};
