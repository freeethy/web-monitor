module.exports = {
  addDays: function(dayIn) {
    var CurrentDate;
    var date = new Date();
    var myDate = new Date(date.getTime() + dayIn * 24 * 60 * 60 * 1000);
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    CurrentDate = year + "-";
    if (month >= 10) {
      CurrentDate = CurrentDate + month + "-";
    } else {
      CurrentDate = CurrentDate + "0" + month + "-";
    }
    if (day >= 10) {
      CurrentDate = CurrentDate + day;
    } else {
      CurrentDate = CurrentDate + "0" + day;
    }
    return CurrentDate;
  }
};
