import OSS from "ali-oss";
import { getSts } from "@/api/sys";
import { REGION, BUCKET } from "@/constants";

export const getOSSClient = async () => {
  const res = await getSts();
  return new OSS({
    // bucket 所在区域
    region: REGION,
    // id
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    stsToken: res.Credentials.SecurityToken,
    bucket: BUCKET,
    refreshSTSToken: async () => {
      const res = await getSts();
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken,
      };
    },
    refreshSTSTokenInterval: 5 * 1000,
  });
};
