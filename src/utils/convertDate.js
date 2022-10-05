const convertDate = date => {
  const daysLeft = Math.round(
    Math.abs(new Date(date) - new Date()) / (1000 * 60 * 60 * 24)
  );

  if (daysLeft === 0) return `today`;
  if (daysLeft === 1) return `${daysLeft} day ago`;
  if (daysLeft <= 14) return `${daysLeft} days ago`;

  const date_ = new Date(date);
  const day = `${date_.getDate()}`.padStart(2, 0);
  const month = `${date_.getMonth() + 1}`.padStart(2, 0);
  const year = date_.getFullYear();

  return `${day}.${month}.${year}`;
};
export default convertDate;
