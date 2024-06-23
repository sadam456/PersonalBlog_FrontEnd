const convertBinaryToBase64 = (binaryData) => {
  // Convert the binary data to a Base64 string
  return `data:image/jpeg;base64,${binaryData}`;
};

export default convertBinaryToBase64;
