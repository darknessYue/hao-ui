
interface CheckCondition {
  format?: string[];
  // 使用多少 M为单位
  size?: string;
}

type ErrorType = "format" | "size" | null;
export function beforeUploadCheck(file: File, condition: CheckCondition) {
  const { format, size } = condition;
  const isValidFormat = format ? format.includes(file.type) : true;
  const isValidSize = size ? file.size / 1024 / 1024 < Number(size) : true;
  let error: ErrorType = null;
  if(!isValidFormat) {
    error = "format";
  }
  if(!isValidSize) {
    error = "size";
  }
  return {
    passed: isValidFormat && isValidSize,
    error
  }
}

export const commonUploadCheck = (file: File) => {
  const { format, size } = {
    format: ["image/jpeg", "image/png"],
    size: "2"
  };
  const { passed, error } = beforeUploadCheck(file, { format, size });
  if(error === 'format') {
    alert(`上传图片格式错误, 请上传${format.map(item => item.split("/")[1]).join("/")}格式`);
  }
  if(error === 'size') {
    alert(`上传图片大小不能超过${size}M`);
  }
  return passed
}