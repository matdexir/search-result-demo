"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
  name: "Name",
  tel: "Phone",
  save: "Save",
  confirm: "Confirm",
  cancel: "Cancel",
  delete: "Delete",
  complete: "Complete",
  loading: "Loading...",
  telEmpty: "Please fill in the tel",
  nameEmpty: "Please fill in the name",
  nameInvalid: "Malformed name",
  confirmDelete: "Are you sure you want to delete?",
  telInvalid: "Malformed phone number",
  vanCalendar: {
    end: "End",
    start: "Start",
    title: "Calendar",
    startEnd: "Start/End",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthTitle: function (year, month) {
      return "".concat(year, "/").concat(month);
    },
    rangePrompt: function (maxRange) {
      return "Choose no more than ".concat(maxRange, " days");
    },
  },
  vanCascader: {
    select: "Select",
  },
  vanContactCard: {
    addText: "Add contact info",
  },
  vanContactList: {
    addText: "Add new contact",
  },
  vanPagination: {
    prev: "Previous",
    next: "Next",
  },
  vanPullRefresh: {
    pulling: "Pull to refresh...",
    loosing: "Loose to refresh...",
  },
  vanSubmitBar: {
    label: "Total：",
  },
  vanCoupon: {
    unlimited: "Unlimited",
    discount: function (discount) {
      return "".concat(discount * 10, "% off");
    },
    condition: function (condition) {
      return "At least ".concat(condition);
    },
  },
  vanCouponCell: {
    title: "Coupon",
    tips: "No coupons",
    count: function (count) {
      return "You have ".concat(count, " coupons");
    },
  },
  vanCouponList: {
    empty: "No coupons",
    exchange: "Exchange",
    close: "Close",
    enable: "Available",
    disabled: "Unavailable",
    placeholder: "Coupon code",
  },
  vanAddressEdit: {
    area: "Area",
    postal: "Postal",
    areaEmpty: "Please select a receiving area",
    addressEmpty: "Address can not be empty",
    postalEmpty: "Wrong postal code",
    defaultAddress: "Set as the default address",
    telPlaceholder: "Phone",
    namePlaceholder: "Name",
    areaPlaceholder: "Area",
  },
  vanAddressEditDetail: {
    label: "Address",
    placeholder: "Address",
  },
  vanAddressList: {
    add: "Add new address",
  },
};
