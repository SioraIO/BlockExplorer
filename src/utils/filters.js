import {Utils} from "xek-sdk";

export const upper = s => s.toUpperCase();

export const formatAmount = amount => {
  return Utils.toXek(amount);
};