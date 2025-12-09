import moment from "moment";

export const formatTimestamp = (dateString) => {
  return moment(dateString).fromNow();
}; 