export type Address = {
  id: string;
  label: "Home" | "Work" | "Other";
  fullName: string;
  mobile: string;
  flatHouseNo: string;
  streetArea: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
};